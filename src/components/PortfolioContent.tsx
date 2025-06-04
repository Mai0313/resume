import type { GitHubContribution } from "@/types";

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Link } from "@heroui/link";
import { Spinner } from "@heroui/spinner";
import { motion } from "framer-motion";

interface PortfolioContentProps {
  contributions: GitHubContribution[];
  loading: boolean;
  error: string | null;
  isTokenMissing?: boolean;
}

const PortfolioContent: React.FC<PortfolioContentProps> = ({
  contributions,
  loading,
  error,
  isTokenMissing = false,
}) => {
  // 如果沒有設定 GitHub Token，顯示設定提示
  if (isTokenMissing) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Card className="max-w-2xl">
          <CardHeader className="text-center">
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              設定 GitHub Token
            </h3>
          </CardHeader>
          <CardBody className="text-center space-y-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              需要設定{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">
                VITE_GITHUB_TOKEN
              </code>{" "}
              環境變數來獲取 GitHub 專案和 Pinned repositories。
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                如何設定：
              </h4>
              <ol className="text-left text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
                <li>
                  1. 前往{" "}
                  <Link
                    isExternal
                    className="text-blue-600 dark:text-blue-400 underline"
                    href="https://github.com/settings/tokens"
                  >
                    GitHub Personal Access Tokens
                  </Link>
                </li>
                <li>2. 點擊 &quot;Generate new token (classic)&quot;</li>
                <li>
                  3. 勾選 &quot;public_repo&quot; 權限（用於存取公開儲存庫）
                </li>
                <li>4. 複製產生的 token</li>
                <li>
                  5. 在專案根目錄建立 <code>.env</code> 檔案，加入：
                  <br />
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block mt-1 font-mono">
                    VITE_GITHUB_TOKEN=your_token_here
                  </code>
                </li>
                <li>6. 重新啟動開發伺服器</li>
              </ol>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              設定完成後即可查看 GitHub 專案和貢獻記錄
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg mx-auto p-8"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              GitHub API Error
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Failed to fetch portfolio data from GitHub. This could be due to
              network issues, API rate limits, or token problems.
            </p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
              Error Details:
            </h4>
            <p className="text-sm text-red-700 dark:text-red-300 font-mono bg-red-100 dark:bg-red-800/30 p-2 rounded">
              {error}
            </p>
          </div>
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (contributions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto p-8"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No Repositories Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              No public repositories available to display at the moment.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      JavaScript: "#f1e05a",
      TypeScript: "#2b7489",
      Python: "#3572A5",
      Java: "#b07219",
      Go: "#00ADD8",
      Rust: "#dea584",
      "C++": "#f34b7d",
      C: "#555555",
      HTML: "#e34c26",
      CSS: "#1572B6",
      Vue: "#4FC08D",
      React: "#61DAFB",
      PHP: "#4F5D95",
    };

    return colors[language || ""] || "#666666";
  };

  return (
    <motion.div
      animate="visible"
      className="space-y-6"
      initial="hidden"
      variants={containerVariants}
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Recent contributions and projects from GitHub
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contributions.map((contribution) => (
          <motion.div key={contribution.repository.id} variants={itemVariants}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-start justify-between">
                    <Link
                      className="text-lg font-semibold hover:text-primary truncate flex-1 min-w-0 mr-2"
                      href={contribution.repository.html_url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {contribution.repository.name}
                    </Link>
                    <div className="flex items-center space-x-2 shrink-0">
                      {contribution.repository.isPinned && (
                        <Chip
                          className="text-xs"
                          color="primary"
                          size="sm"
                          variant="flat"
                        >
                          📌 Pinned
                        </Chip>
                      )}
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>
                          ⭐ {contribution.repository.stargazers_count}
                        </span>
                        <span>🍴 {contribution.repository.forks_count}</span>
                      </div>
                    </div>
                  </div>

                  {contribution.repository.language && (
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: getLanguageColor(
                            contribution.repository.language,
                          ),
                        }}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {contribution.repository.language}
                      </span>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardBody className="pt-0 flex-grow flex flex-col">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {contribution.repository.description ||
                    "No description available"}
                </p>

                {contribution.repository.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {contribution.repository.topics.slice(0, 3).map((topic) => (
                      <Chip
                        key={topic}
                        className="text-xs"
                        size="sm"
                        variant="flat"
                      >
                        {topic}
                      </Chip>
                    ))}
                    {contribution.repository.topics.length > 3 && (
                      <Chip className="text-xs" size="sm" variant="flat">
                        +{contribution.repository.topics.length - 3}
                      </Chip>
                    )}
                  </div>
                )}

                <div className="space-y-2 flex-grow">
                  <h4 className="text-sm font-semibold">Recent Commits:</h4>
                  {contribution.commits.slice(0, 2).map((commit) => (
                    <div
                      key={commit.sha}
                      className="text-xs text-gray-500 dark:text-gray-400"
                    >
                      <Link
                        className="hover:text-primary truncate block"
                        href={commit.html_url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {commit.commit.message.split("\n")[0]}
                      </Link>
                      <span className="text-gray-400">
                        {formatDate(commit.commit.author.date)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 底部固定區域 - 始終保持在卡片底部 */}
                <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>
                      Updated: {formatDate(contribution.repository.updated_at)}
                    </span>
                    {contribution.repository.homepage && (
                      <Link
                        className="hover:text-primary"
                        href={contribution.repository.homepage}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        🔗 Link
                      </Link>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PortfolioContent;
