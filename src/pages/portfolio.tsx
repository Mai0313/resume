import type { GitHubContribution } from "@/types";

import { useState, useEffect } from "react";

import DefaultLayout from "@/layouts/default";
import PortfolioContent from "@/components/PortfolioContent";
import { getUserContributions } from "@/utils/githubApi";
import { envHelpers } from "@/utils/env";
import { localStorageManager } from "@/utils/localStorage";

const CACHE_KEY = "github_contributions_cache";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

interface CacheData {
  data: GitHubContribution[];
  timestamp: number;
  cachedUsername: string;
}

export default function PortfolioPage() {
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        setError(null);

        // Dynamically get GitHub username
        const username = await envHelpers.getGitHubUsername();

        // Check cache first
        const cached = localStorageManager.getItem<CacheData>(CACHE_KEY);

        if (
          cached &&
          cached.data &&
          cached.timestamp &&
          cached.cachedUsername
        ) {
          // Verify cache is valid: correct user and not expired
          if (
            cached.cachedUsername === username &&
            Date.now() - cached.timestamp < CACHE_TTL
          ) {
            setContributions(cached.data);
            setLoading(false);

            return;
          }
        }

        // Fetch fresh data
        const userContributions = await getUserContributions(username);

        // Save to cache with quota checking
        const cacheData: CacheData = {
          data: userContributions,
          timestamp: Date.now(),
          cachedUsername: username,
        };

        localStorageManager.setItem(CACHE_KEY, cacheData);

        setContributions(userContributions);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
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
            loading={loading}
          />
        </div>
      </section>
    </DefaultLayout>
  );
}
