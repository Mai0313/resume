import type { GitHubContribution } from "@/types";

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";

import SpotlightCard from "@/components/SpotlightCard/SpotlightCard";
import { ErrorDisplay, LoadingSpinner, EmptyState } from "@/components/shared";
import { fadeInStagger } from "@/utils/animations";
import { formatDate, getLanguageColor } from "@/utils/formatters";

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
  // fadeInStagger is a static constant, no need to memoize
  const { container: containerVariants, item: itemVariants } = fadeInStagger;

  if (loading) {
    return <LoadingSpinner message="Loading portfolio..." />;
  }

  if (error) {
    return (
      <ErrorDisplay
        actionButton={{
          label: "Try Again",
          onClick: () => window.location.reload(),
        }}
        details={error}
        icon="error"
        message="Failed to fetch portfolio data from GitHub. This could be due to network issues, API rate limits, or token problems."
        title="GitHub API Error"
      />
    );
  }

  if (contributions.length === 0) {
    return (
      <EmptyState
        message="No public repositories available to display at the moment."
        title="No Repositories Found"
      />
    );
  }

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
            <SpotlightCard
              className="h-full transition-shadow duration-300 flex flex-col"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <Card className="h-full bg-transparent border-none shadow-none flex flex-col">
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
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-500">
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
                      {contribution.repository.topics
                        .slice(0, 3)
                        .map((topic) => (
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
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Recent Commits:
                    </h4>
                    {contribution.commits.slice(0, 2).map((commit) => (
                      <div
                        key={commit.sha}
                        className="text-xs text-gray-600 dark:text-gray-400"
                      >
                        <Link
                          className="hover:text-primary truncate block"
                          href={commit.html_url}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {commit.commit.message.split("\n")[0]}
                        </Link>
                        <span className="text-gray-500 dark:text-gray-400">
                          {formatDate(commit.commit.author.date)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Fixed bottom area - always stays at card bottom */}
                  <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-500">
                      <span>
                        Updated:{" "}
                        {formatDate(contribution.repository.updated_at)}
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
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

PortfolioContent.displayName = "PortfolioContent";

export default PortfolioContent;
