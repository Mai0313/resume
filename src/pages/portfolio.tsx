import type { GitHubContribution } from "@/types";

import { useState, useEffect } from "react";

import DefaultLayout from "@/layouts/default";
import PortfolioContent from "@/components/PortfolioContent";
import { getUserContributions } from "@/utils/githubApi";
import { envHelpers } from "@/utils/env";

const CACHE_KEY = "github_contributions_cache";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

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
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
          try {
            const { data, timestamp, cachedUsername } = JSON.parse(cached);

            // Verify cache is valid: correct user and not expired
            if (
              cachedUsername === username &&
              Date.now() - timestamp < CACHE_TTL
            ) {
              setContributions(data);
              setLoading(false);

              return;
            }
          } catch {
            // Invalid cache data, clear it
            localStorage.removeItem(CACHE_KEY);
          }
        }

        // Fetch fresh data
        const userContributions = await getUserContributions(username);

        // Save to cache
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              data: userContributions,
              timestamp: Date.now(),
              cachedUsername: username,
            }),
          );
        } catch {
          // Ignore cache save errors (e.g., quota exceeded)
        }

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
