import type { GitHubContribution } from "@/types";

import React from "react";
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
      className="space-y-12"
      initial="hidden"
      variants={containerVariants}
    >
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 mb-4">
          Portfolio
        </h1>
        <p className="text-xl text-default-500">
          Recent contributions and projects from GitHub
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contributions.map((contribution) => (
          <motion.div key={contribution.repository.id} variants={itemVariants}>
            <SpotlightCard
              className="h-full rounded-2xl bg-content1/50 border border-default-200 dark:border-default-100 backdrop-blur-sm hover:border-primary/50 transition-colors"
              spotlightColor="rgba(0, 112, 243, 0.2)"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0 mr-4">
                    <Link
                      isExternal
                      className="text-xl font-bold text-foreground hover:text-primary transition-colors truncate block"
                      href={contribution.repository.html_url}
                    >
                      {contribution.repository.name}
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {contribution.repository.isPinned && (
                      <Chip
                        className="bg-primary/10 text-primary border-primary/20"
                        size="sm"
                        variant="flat"
                      >
                        Pinned
                      </Chip>
                    )}
                  </div>
                </div>

                <p className="text-default-500 text-sm mb-6 line-clamp-3 flex-grow">
                  {contribution.repository.description ||
                    "No description available"}
                </p>

                <div className="space-y-4 mt-auto">
                  {/* Stats & Language */}
                  <div className="flex items-center justify-between text-sm text-default-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                        {contribution.repository.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                        {contribution.repository.forks_count}
                      </span>
                    </div>

                    {contribution.repository.language && (
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: getLanguageColor(
                              contribution.repository.language,
                            ),
                          }}
                        />
                        <span>{contribution.repository.language}</span>
                      </div>
                    )}
                  </div>

                  {/* Topics */}
                  {contribution.repository.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {contribution.repository.topics
                        .slice(0, 3)
                        .map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 rounded-full bg-default-100 text-default-500 text-[10px] font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      {contribution.repository.topics.length > 3 && (
                        <span className="px-2 py-0.5 rounded-full bg-default-100 text-default-500 text-[10px] font-medium">
                          +{contribution.repository.topics.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Recent Activity */}
                  <div className="pt-4 border-t border-default-100">
                    <div className="text-xs text-default-400 mb-2">
                      Recent Activity
                    </div>
                    <div className="space-y-2">
                      {contribution.commits.slice(0, 2).map((commit) => (
                        <div
                          key={commit.sha}
                          className="flex justify-between items-start gap-2 text-xs"
                        >
                          <Link
                            isExternal
                            className="text-default-600 hover:text-primary truncate flex-1 block"
                            href={commit.html_url}
                            title={commit.commit.message}
                          >
                            {commit.commit.message.split("\n")[0]}
                          </Link>
                          <span className="text-default-400 whitespace-nowrap">
                            {formatDate(commit.commit.author.date)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

PortfolioContent.displayName = "PortfolioContent";

export default PortfolioContent;
