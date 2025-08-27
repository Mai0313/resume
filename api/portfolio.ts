// Vercel Serverless Function: /api/portfolio
// Aggregates GitHub portfolio data with server-side caching and CDN headers

type GitHubRepository = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  homepage: string | null;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  isPinned?: boolean;
};

type GitHubCommit = {
  sha: string;
  commit: {
    message: string;
    author: { name: string; email: string; date: string };
  };
  html_url: string;
};

type GitHubContribution = {
  repository: GitHubRepository;
  commits: GitHubCommit[];
  total_commits: number;
};

// In-memory cache (per warm function instance)
let cachedResponse: { data: GitHubContribution[]; generatedAt: number } | null = null;
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

const GITHUB_API_BASE = "https://api.github.com";

function getToken(): string {
  const token = process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN || "";
  if (!token) throw new Error("GITHUB_TOKEN_MISSING");
  return token;
}

function getRESTHeaders(): Record<string, string> {
  return {
    Authorization: `token ${getToken()}`,
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "resume-portfolio-api",
  };
}

function getGraphQLHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
    "User-Agent": "resume-portfolio-api",
  };
}

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

async function fetchJSON(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GitHub API error: ${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}

async function getAuthenticatedUser(): Promise<{ login: string; name: string; avatar_url: string }> {
  const data = await fetchJSON(`${GITHUB_API_BASE}/user`, { headers: getRESTHeaders() });
  return { login: data.login, name: data.name || data.login, avatar_url: data.avatar_url };
}

async function getPinnedRepositories(username: string): Promise<GitHubRepository[]> {
  const query = `
    query($username: String!) {
      user(login: $username) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              id
              name
              nameWithOwner
              url
              description
              primaryLanguage { name }
              stargazerCount
              forkCount
              updatedAt
              repositoryTopics(first: 10) { nodes { topic { name } } }
              homepageUrl
              owner { login avatarUrl url }
            }
          }
        }
      }
    }
  `;

  const resp = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: getGraphQLHeaders(),
    body: JSON.stringify({ query, variables: { username } }),
  });
  if (!resp.ok) throw new Error(`GitHub GraphQL error: ${resp.status} ${resp.statusText}`);
  const data = await resp.json();
  if (data.errors) throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  const nodes = data.data?.user?.pinnedItems?.nodes || [];

  const repos: GitHubRepository[] = nodes.map((node: any) => {
    const fullName: string = node.nameWithOwner;
    return {
      id: hashString(fullName),
      name: node.name,
      full_name: fullName,
      html_url: node.url,
      description: node.description,
      language: node.primaryLanguage?.name || null,
      stargazers_count: node.stargazerCount,
      forks_count: node.forkCount,
      updated_at: node.updatedAt,
      topics: (node.repositoryTopics?.nodes || []).map((n: any) => n.topic?.name).filter(Boolean),
      homepage: node.homepageUrl,
      owner: {
        login: node.owner?.login,
        avatar_url: node.owner?.avatarUrl,
        html_url: node.owner?.url,
      },
      isPinned: true,
    };
  });
  return repos;
}

async function getUserRepositories(username: string): Promise<GitHubRepository[]> {
  const repos: any[] = await fetchJSON(
    `${GITHUB_API_BASE}/users/${username}/repos?type=public&sort=updated&per_page=100`,
    { headers: getRESTHeaders() }
  );
  return repos.map((r) => ({
    id: r.id,
    name: r.name,
    full_name: r.full_name,
    html_url: r.html_url,
    description: r.description,
    language: r.language,
    stargazers_count: r.stargazers_count,
    forks_count: r.forks_count,
    updated_at: r.updated_at,
    topics: r.topics || [],
    homepage: r.homepage,
    owner: { login: r.owner.login, avatar_url: r.owner.avatar_url, html_url: r.owner.html_url },
  }));
}

async function getRepositoryCommits(owner: string, repo: string, author: string, limit = 5): Promise<GitHubCommit[]> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits?per_page=${limit}&author=${encodeURIComponent(author)}`;
  return fetchJSON(url, { headers: getRESTHeaders() });
}

async function buildPortfolio(): Promise<GitHubContribution[]> {
  const user = await getAuthenticatedUser();
  const [pinned, all] = await Promise.all([
    getPinnedRepositories(user.login).catch(() => []),
    getUserRepositories(user.login).catch(() => []),
  ]);

  const processed = new Set<string>(pinned.map((r) => r.full_name));
  const remaining = all.filter((r) => !processed.has(r.full_name)).slice(0, 15);

  const targetRepos: GitHubRepository[] = [...pinned, ...remaining];

  const concurrency = 4;
  const results: GitHubContribution[] = [];
  for (let i = 0; i < targetRepos.length; i += concurrency) {
    const slice = targetRepos.slice(i, i + concurrency);
    const settled = await Promise.allSettled(
      slice.map(async (repo) => {
        const commits = await getRepositoryCommits(repo.owner.login, repo.name, user.login, 5).catch(() => []);
        return {
          repository: repo,
          commits: Array.isArray(commits) ? commits : [],
          total_commits: Array.isArray(commits) ? commits.length : 0,
        } as GitHubContribution;
      })
    );
    for (const s of settled) if (s.status === "fulfilled") results.push(s.value);
  }

  results.sort((a, b) => {
    const aPinned = !!a.repository.isPinned;
    const bPinned = !!b.repository.isPinned;
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    return new Date(b.repository.updated_at).getTime() - new Date(a.repository.updated_at).getTime();
  });
  return results;
}

export default async function handler(req: any, res: any) {
  try {
    const now = Date.now();
    if (cachedResponse && now - cachedResponse.generatedAt < CACHE_TTL_MS) {
      res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=86400");
      return res.status(200).json(cachedResponse);
    }

    const data = await buildPortfolio();
    cachedResponse = { data, generatedAt: now };

    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=86400");
    return res.status(200).json(cachedResponse);
  } catch (error: any) {
    const message = error?.message || "Unknown error";
    const status = message.includes("GITHUB_TOKEN_MISSING") ? 400 : 500;
    return res.status(status).json({ error: message });
  }
}


