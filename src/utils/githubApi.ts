import type {
  GitHubRepository,
  GitHubCommit,
  GitHubContribution,
} from "@/types";

import { env, envHelpers } from "@/utils/env";
import { githubRequestQueue } from "@/utils/requestQueue";
import { GitHubAPIError } from "@/types/errors";
import { PORTFOLIO } from "@/constants";

const GITHUB_API_BASE = "https://api.github.com";

// Common headers shared across all requests
const COMMON_HEADERS = {
  "User-Agent": "Portfolio-App",
};

/**
 * Ensure GitHub token is available, throws error if not
 */
function ensureAuthenticated(): void {
  if (!envHelpers.isGitHubTokenAvailable()) {
    throw new Error("GITHUB_TOKEN_MISSING");
  }
}

/**
 * Get current authenticated user information (via GitHub Token)
 */
export async function getAuthenticatedUser(): Promise<{
  login: string;
  name: string;
  avatar_url: string;
}> {
  ensureAuthenticated();

  try {
    const response = await enhancedFetch(`${GITHUB_API_BASE}/user`, {
      headers: getAuthHeaders(),
    });

    const userData = await response.json();

    return {
      login: userData.login,
      name: userData.name || userData.login,
      avatar_url: userData.avatar_url,
    };
  } catch (error) {
    console.error("Error fetching authenticated user:", error);
    throw error;
  }
}

/**
 * Get authorization headers for GitHub REST API
 */
function getAuthHeaders(): Record<string, string> {
  ensureAuthenticated();

  return {
    Authorization: `token ${env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    ...COMMON_HEADERS,
  };
}

/**
 * Enhanced fetch with rate limit header extraction
 */
async function enhancedFetch(
  url: string,
  options?: RequestInit,
): Promise<Response> {
  const response = await fetch(url, options);

  // Update rate limit info from response headers
  if (response.headers) {
    githubRequestQueue.updateFromHeaders(response.headers);
  }

  // Create enhanced error for rate limit detection
  if (!response.ok) {
    const resetTimeHeader = response.headers.get("x-ratelimit-reset");
    const resetTime = resetTimeHeader
      ? parseInt(resetTimeHeader, 10)
      : undefined;

    let message = `GitHub API error: ${response.status} ${response.statusText}`;

    if (resetTime && (response.status === 403 || response.status === 429)) {
      const resetDate = new Date(resetTime * 1000);

      message += ` Rate limit will reset at ${resetDate.toLocaleTimeString()}`;
    }

    throw new GitHubAPIError(
      message,
      response.status,
      response,
      response.headers,
      resetTime,
    );
  }

  return response;
}

/**
 * Get authorization headers for GitHub GraphQL API
 */
function getGraphQLHeaders(): Record<string, string> {
  ensureAuthenticated();

  return {
    "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
    "Content-Type": "application/json",
    ...COMMON_HEADERS,
  };
}

/**
 * Get user's pinned repositories (using GraphQL API)
 */
export async function getUserPinnedRepositories(
  username: string,
): Promise<GitHubRepository[]> {
  ensureAuthenticated();

  try {
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
                primaryLanguage {
                  name
                }
                stargazerCount
                forkCount
                updatedAt
                repositoryTopics(first: 10) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
                homepageUrl
                owner {
                  login
                  avatarUrl
                  url
                }
              }
            }
          }
        }
      }
    `;

    const response = await enhancedFetch("https://api.github.com/graphql", {
      method: "POST",
      headers: getGraphQLHeaders(),
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    const pinnedNodes = data.data?.user?.pinnedItems?.nodes || [];

    // Convert to standard GitHubRepository format
    const pinnedRepos: GitHubRepository[] = pinnedNodes.map((node: any) => ({
      id: node.id,
      name: node.name,
      full_name: node.nameWithOwner,
      html_url: node.url,
      description: node.description,
      language: node.primaryLanguage?.name || null,
      stargazers_count: node.stargazerCount,
      forks_count: node.forkCount,
      updated_at: node.updatedAt,
      topics: node.repositoryTopics?.nodes?.map((t: any) => t.topic.name) || [],
      homepage: node.homepageUrl,
      owner: {
        login: node.owner.login,
        avatar_url: node.owner.avatarUrl,
        html_url: node.owner.url,
      },
    }));

    return pinnedRepos;
  } catch (error) {
    throw new Error(`Failed to fetch pinned repositories: ${error}`);
  }
}

/**
 * Get user's public repositories
 */
export async function getUserRepositories(
  username: string,
): Promise<GitHubRepository[]> {
  ensureAuthenticated();

  try {
    const response = await enhancedFetch(
      `${GITHUB_API_BASE}/users/${username}/repos?type=public&sort=updated&per_page=100`,
      {
        headers: getAuthHeaders(),
      },
    );

    const repositories: GitHubRepository[] = await response.json();

    return repositories;
  } catch (error) {
    throw new Error(`Failed to fetch repositories: ${error}`);
  }
}

/**
 * Get repository commit records
 */
export async function getRepositoryCommits(
  owner: string,
  repo: string,
  author?: string,
  limit: number = 10,
): Promise<GitHubCommit[]> {
  try {
    const authorParam = author ? `&author=${author}` : "";
    const response = await enhancedFetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits?per_page=${limit}${authorParam}`,
      { headers: getAuthHeaders() },
    );

    const commits: GitHubCommit[] = await response.json();

    return commits;
  } catch (error) {
    throw new Error(`Failed to fetch commits: ${error}`);
  }
}

/**
 * Get user's contribution statistics, prioritizing Pinned projects
 */
export async function getUserContributions(
  username: string,
): Promise<GitHubContribution[]> {
  ensureAuthenticated();

  try {
    // Fetch pinned and all repositories in parallel
    const [pinnedRepos, allRepositories] = await Promise.all([
      getUserPinnedRepositories(username),
      getUserRepositories(username),
    ]);

    // Prepare list of repositories to process
    const processedRepoIds = new Set<string>();
    const contributions: GitHubContribution[] = [];

    // Filter remaining repos (excluding pinned)
    const remainingRepos = allRepositories
      .filter((repo) => {
        const isPinned = pinnedRepos.some(
          (p) => p.full_name === repo.full_name,
        );

        if (isPinned) processedRepoIds.add(repo.full_name);

        return !isPinned;
      })
      .slice(0, PORTFOLIO.MAX_REPOS_TO_FETCH);

    // Fetch commits for all repositories using request queue to prevent rate limiting
    const pinnedResults = await Promise.allSettled(
      pinnedRepos.map((repo) =>
        githubRequestQueue.enqueue(async () => {
          const commits = await getRepositoryCommits(
            repo.owner.login,
            repo.name,
            username,
            PORTFOLIO.COMMITS_PER_REPO,
          );

          return {
            repository: { ...repo, isPinned: true } as any,
            commits,
            total_commits: commits.length,
          };
        }),
      ),
    );

    const remainingResults = await Promise.allSettled(
      remainingRepos.map((repo) =>
        githubRequestQueue.enqueue(async () => {
          const commits = await getRepositoryCommits(
            repo.owner.login,
            repo.name,
            username,
            PORTFOLIO.COMMITS_PER_REPO,
          );

          return {
            repository: { ...repo, isPinned: false } as any,
            commits,
            total_commits: commits.length,
          };
        }),
      ),
    );

    // Collect successful results from pinned repos
    pinnedResults.forEach((result) => {
      if (result.status === "fulfilled") {
        contributions.push(result.value);
      }
    });

    // Collect successful results from remaining repos (with commits only)
    remainingResults.forEach((result) => {
      if (result.status === "fulfilled" && result.value.commits.length > 0) {
        contributions.push(result.value);
      }
    });

    // Sort by Pinned status and last update time
    contributions.sort((a, b) => {
      // Pinned repositories have priority
      const aPinned = (a.repository as any).isPinned;
      const bPinned = (b.repository as any).isPinned;

      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;

      // Sort by update time when same pinned status
      return (
        new Date(b.repository.updated_at).getTime() -
        new Date(a.repository.updated_at).getTime()
      );
    });

    return contributions;
  } catch (error) {
    throw new Error(`Failed to fetch user contributions: ${error}`);
  }
}

/**
 * Get user basic information
 */
export async function getUserProfile(username: string) {
  try {
    const response = await enhancedFetch(
      `${GITHUB_API_BASE}/users/${username}`,
      {
        headers: getAuthHeaders(),
      },
    );

    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch user profile: ${error}`);
  }
}
