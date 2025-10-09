import type { GitHubContribution } from "@/types";

import { useState, useEffect } from "react";

import DefaultLayout from "@/layouts/default";
import PortfolioContent from "@/components/PortfolioContent";
import { getUserContributions } from "@/utils/githubApi";
import { envHelpers } from "@/utils/env";
import { localStorageManager } from "@/utils/localStorage";
import { PORTFOLIO } from "@/constants";

const CACHE_KEY = PORTFOLIO.CACHE_KEY;
const CACHE_TTL = PORTFOLIO.CACHE_TTL_MS;

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
    let isMounted = true; // Track mounted state to prevent updates after unmount

    const fetchContributions = async (isBackgroundRefresh = false) => {
      try {
        if (!isMounted) return;
        if (!isBackgroundRefresh) {
          setLoading(true);
        }
        setError(null);

        // Dynamically get GitHub username
        const username = await envHelpers.getGitHubUsername();

        if (!isMounted) return;

        // Check cache first
        const cached = localStorageManager.getItem<CacheData>(CACHE_KEY);

        if (
          cached &&
          cached.data &&
          cached.timestamp &&
          cached.cachedUsername
        ) {
          // Verify cache has correct user
          if (cached.cachedUsername === username) {
            const cacheAge = Date.now() - cached.timestamp;
            const isCacheStale = cacheAge > CACHE_TTL;

            // SWR: Show cached data immediately
            if (isMounted) {
              setContributions(cached.data);
              setLoading(false);
            }

            // If cache is stale, refresh in background
            if (isCacheStale && isMounted) {
              // Background refresh
              setTimeout(() => {
                if (isMounted) {
                  fetchContributions(true);
                }
              }, 100);
            }

            // Don't fetch again if cache is fresh
            if (!isCacheStale) {
              return;
            }
          }
        }

        // Fetch fresh data (either no cache or background refresh)
        const userContributions = await getUserContributions(username);

        if (!isMounted) return;

        // Save to cache with quota checking
        const cacheData: CacheData = {
          data: userContributions,
          timestamp: Date.now(),
          cachedUsername: username,
        };

        localStorageManager.setItem(CACHE_KEY, cacheData);

        setContributions(userContributions);
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "An unknown error occurred",
          );
        }
      } finally {
        if (isMounted && !isBackgroundRefresh) {
          setLoading(false);
        }
      }
    };

    fetchContributions();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
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
