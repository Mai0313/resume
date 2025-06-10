import type {
  GitHubRepository,
  GitHubCommit,
  GitHubContribution,
} from "@/types";

import { env, envHelpers } from "@/utils/env";

const GITHUB_API_BASE = "https://api.github.com";

/**
 * 檢查 GitHub Token 是否已設定
 */
export function isGitHubTokenAvailable(): boolean {
  return envHelpers.isGitHubTokenAvailable();
}

/**
 * 獲取當前認證用戶的信息（通過 GitHub Token）
 */
export async function getAuthenticatedUser(): Promise<{
  login: string;
  name: string;
  avatar_url: string;
}> {
  if (!envHelpers.isGitHubTokenAvailable()) {
    throw new Error("GITHUB_TOKEN_MISSING");
  }

  try {
    const response = await fetch(`${GITHUB_API_BASE}/user`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(
        `GitHub API Error: ${response.status} ${response.statusText}`,
      );
    }

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

const headers = {
  "Authorization": `token ${env.GITHUB_TOKEN}`,
  "Accept": "application/vnd.github.v3+json",
  "User-Agent": "Portfolio-App",
};

const graphqlHeaders = {
  "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
  "Content-Type": "application/json",
  "User-Agent": "Portfolio-App",
};

/**
 * 獲取使用者的 Pinned 儲存庫 (使用 GraphQL API)
 */
export async function getUserPinnedRepositories(
  username: string,
): Promise<GitHubRepository[]> {
  if (!envHelpers.isGitHubTokenAvailable()) {
    throw new Error("GITHUB_TOKEN_MISSING");
  }

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

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: graphqlHeaders,
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error(
        `GitHub GraphQL API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
    }

    const pinnedNodes = data.data?.user?.pinnedItems?.nodes || [];

    // 轉換為標準的 GitHubRepository 格式
    const pinnedRepos: GitHubRepository[] = pinnedNodes.map((node: any) => ({
      id:
        parseInt(node.id.replace("MDEwOlJlcG9zaXRvcnk=", ""), 10) ||
        Math.random(),
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
 * 獲取使用者的公開儲存庫
 */
export async function getUserRepositories(
  username: string,
): Promise<GitHubRepository[]> {
  if (!envHelpers.isGitHubTokenAvailable()) {
    throw new Error("GITHUB_TOKEN_MISSING");
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?type=public&sort=updated&per_page=100`,
      {
        headers,
      },
    );

    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      );
    }

    const repositories: GitHubRepository[] = await response.json();

    return repositories;
  } catch (error) {
    throw new Error(`Failed to fetch repositories: ${error}`);
  }
}

/**
 * 獲取儲存庫的提交記錄
 */
export async function getRepositoryCommits(
  owner: string,
  repo: string,
  author?: string,
  limit: number = 10,
): Promise<GitHubCommit[]> {
  try {
    const authorParam = author ? `&author=${author}` : "";
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits?per_page=${limit}${authorParam}`,
      { headers },
    );

    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      );
    }

    const commits: GitHubCommit[] = await response.json();

    return commits;
  } catch (error) {
    throw new Error(`Failed to fetch commits: ${error}`);
  }
}

/**
 * 獲取使用者的貢獻統計，優先顯示 Pinned 專案
 */
export async function getUserContributions(
  username: string,
): Promise<GitHubContribution[]> {
  if (!envHelpers.isGitHubTokenAvailable()) {
    throw new Error("GITHUB_TOKEN_MISSING");
  }

  try {
    // 先獲取 Pinned 儲存庫
    const pinnedRepos = await getUserPinnedRepositories(username);

    // 再獲取所有儲存庫
    const allRepositories = await getUserRepositories(username);

    // 獲取每個儲存庫的貢獻記錄
    const contributions: GitHubContribution[] = [];
    const processedRepoIds = new Set<string>();

    // 首先處理 Pinned 儲存庫
    for (const repo of pinnedRepos) {
      try {
        const commits = await getRepositoryCommits(
          repo.owner.login,
          repo.name,
          username,
          5,
        );

        contributions.push({
          repository: { ...repo, isPinned: true } as any,
          commits,
          total_commits: commits.length,
        });

        processedRepoIds.add(repo.full_name);
      } catch {
        // 如果某個儲存庫獲取失敗，繼續處理其他儲存庫
        continue;
      }
    }

    // 然後處理其他儲存庫（排除已處理的 Pinned 儲存庫）
    const remainingRepos = allRepositories
      .filter((repo) => !processedRepoIds.has(repo.full_name))
      .slice(0, 15); // 限制數量

    for (const repo of remainingRepos) {
      try {
        const commits = await getRepositoryCommits(
          repo.owner.login,
          repo.name,
          username,
          5,
        );

        if (commits.length > 0) {
          contributions.push({
            repository: { ...repo, isPinned: false } as any,
            commits,
            total_commits: commits.length,
          });
        }
      } catch {
        // 如果某個儲存庫獲取失敗，繼續處理其他儲存庫
        continue;
      }
    }

    // 按照 Pinned 狀態和最後更新時間排序
    contributions.sort((a, b) => {
      // Pinned 儲存庫優先
      const aPinned = (a.repository as any).isPinned;
      const bPinned = (b.repository as any).isPinned;

      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;

      // 相同 pinned 狀態時按更新時間排序
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
 * 獲取使用者基本資訊
 */
export async function getUserProfile(username: string) {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch user profile: ${error}`);
  }
}
