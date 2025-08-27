import type { GitHubContribution } from "@/types";

import { useEffect, useState } from "react";

import DefaultLayout from "@/layouts/default";
import PortfolioContent from "@/components/PortfolioContent";

export default function PortfolioPage() {
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const CACHE_KEY = "portfolio_cache_v1";
    const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

    const fetchContributions = async () => {
      setError(null);

      try {
        // Serve cached data immediately if fresh
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
          try {
            const parsed: { data: GitHubContribution[]; generatedAt: number } =
              JSON.parse(cached);

            if (Date.now() - parsed.generatedAt < CACHE_TTL_MS) {
              setContributions(parsed.data);
              setLoading(false);
            }
          } catch (e) {
            console.warn(
              "Failed to parse portfolio cache. Removing invalid item.",
              e,
            );
            localStorage.removeItem(CACHE_KEY);
          }
        }

        // Always try to refresh from serverless API
        const resp = await fetch("/api/portfolio", { cache: "no-store" });

        if (!resp.ok) {
          throw new Error(`API error: ${resp.status} ${resp.statusText}`);
        }
        const apiData: { data: GitHubContribution[]; generatedAt: number } =
          await resp.json();

        setContributions(apiData.data);
        localStorage.setItem(CACHE_KEY, JSON.stringify(apiData));
        setLoading(false);
      } catch (apiError) {
        // Fallback to direct GitHub fetch in dev or if API unavailable
        try {
          const [{ envHelpers }, { getUserContributions }] = await Promise.all([
            import("@/utils/env"),
            import("@/utils/githubApi"),
          ]);
          const username = await envHelpers.getGitHubUsername();
          const userContributions = await getUserContributions(username);

          setContributions(userContributions);
          setLoading(false);
        } catch (fallbackError) {
          const err =
            fallbackError instanceof Error
              ? fallbackError
              : (apiError as Error);

          setError(err.message || "An unknown error occurred");
          setLoading(false);
        }
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
