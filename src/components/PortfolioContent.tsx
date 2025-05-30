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
}

const PortfolioContent: React.FC<PortfolioContentProps> = ({
  contributions,
  loading,
  error,
}) => {
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
        <Card className="max-w-md">
          <CardBody className="text-center">
            <h3 className="text-lg font-semibold text-red-500 mb-2">Error</h3>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (contributions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Card className="max-w-md">
          <CardBody className="text-center">
            <h3 className="text-lg font-semibold mb-2">
              No Contributions Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No public contributions were found for this user.
            </p>
          </CardBody>
        </Card>
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
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
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

              <CardBody className="pt-0">
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

                <div className="space-y-2">
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

                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
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
                        🔗 Demo
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
