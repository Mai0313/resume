import type { GitHubContribution } from "@/types";

import { useState, useEffect } from "react";

import DefaultLayout from "@/layouts/default";
import PortfolioContent from "@/components/PortfolioContent";
import {
  getUserContributions,
  isGitHubTokenAvailable,
} from "@/utils/githubApi";

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME;

export default function PortfolioPage() {
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTokenMissing, setIsTokenMissing] = useState(false);

  useEffect(() => {
    // 檢查 GitHub Token 是否可用
    if (!isGitHubTokenAvailable()) {
      setIsTokenMissing(true);
      setLoading(false);

      return;
    }

    const fetchContributions = async () => {
      try {
        setLoading(true);
        setError(null);

        const userContributions = await getUserContributions(GITHUB_USERNAME);

        setContributions(userContributions);
      } catch (err) {
        if (err instanceof Error && err.message === "GITHUB_TOKEN_MISSING") {
          setIsTokenMissing(true);
        } else {
          setError(
            err instanceof Error ? err.message : "An unknown error occurred",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="max-w-7xl w-full px-6">
          <PortfolioContent
            contributions={contributions}
            error={error}
            isTokenMissing={isTokenMissing}
            loading={loading}
          />
        </div>
      </section>
    </DefaultLayout>
  );
}
