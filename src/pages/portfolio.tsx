import type { GitHubContribution } from "@/types";

import { useState, useEffect } from "react";

import DefaultLayout from "@/layouts/default";
import PortfolioContent from "@/components/PortfolioContent";
import { getUserContributions } from "@/utils/githubApi";

export default function PortfolioPage() {
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        setError(null);

        // 使用你的 GitHub 用戶名
        const userContributions = await getUserContributions("Mai0313");

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
