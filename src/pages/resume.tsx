import { useState, useEffect, useCallback } from "react";

import { ResumeContent } from "../components/ResumeContent";
import { loadResumeData, RenderCVData } from "../utils/resumeLoader";

import DefaultLayout from "@/layouts/default";

function useResumeData() {
  const [resumeData, setResumeData] = useState<
    (RenderCVData & { sectionOrder: string[] }) | null
  >(null);
  const [isLoadingResume, setIsLoadingResume] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadResume = useCallback(async () => {
    setIsLoadingResume(true);
    setError(null);
    try {
      const data = await loadResumeData();

      if (!data || !data.cv || !data.cv.name) {
        throw new Error("Resume data is incomplete or missing required fields");
      }

      setResumeData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load resume");
      setResumeData(null);
    } finally {
      setIsLoadingResume(false);
    }
  }, []);

  return { resumeData, isLoadingResume, loadResume, error };
}

export default function ResumePage() {
  const { resumeData, isLoadingResume, loadResume, error } = useResumeData();

  useEffect(() => {
    loadResume();
  }, [loadResume]);

  return (
    <DefaultLayout>
      {isLoadingResume ? (
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="label-mono animate-pulse text-fg-muted">
            Loading résumé…
          </div>
        </div>
      ) : error ? (
        <div className="mx-auto max-w-2xl px-6 pb-24 pt-40">
          <div className="label-mono mb-4 text-fg-subtle">Error</div>
          <h3 className="font-display mb-4 text-3xl leading-tight text-fg">
            Résumé loading failed
          </h3>
          <p className="mb-8 leading-relaxed text-fg-muted">{error}</p>
          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="label-mono mb-4 text-fg-subtle">
              Check VITE_RESUME_FILE
            </div>
            <div className="space-y-2.5 font-mono text-[13px]">
              <div>
                <span className="text-fg-subtle">local &nbsp;</span>
                <code className="text-fg">resume.yaml</code>
              </div>
              <div>
                <span className="text-fg-subtle">gist &nbsp;&nbsp;</span>
                <code className="break-all text-fg">
                  https://gist.github.com/user/id
                </code>
              </div>
              <div>
                <span className="text-fg-subtle">url &nbsp;&nbsp;&nbsp;</span>
                <code className="break-all text-fg">
                  https://raw.githubusercontent.com/user/repo/main/resume.yaml
                </code>
              </div>
            </div>
          </div>
        </div>
      ) : resumeData && resumeData.cv && resumeData.cv.name ? (
        <ResumeContent data={resumeData} />
      ) : null}
    </DefaultLayout>
  );
}
