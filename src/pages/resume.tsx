import { useState, useEffect, useCallback } from "react";
import { Alert, Card, Skeleton, Typography } from "@heroui/react";

import { ResumeContent } from "../components/ResumeContent";
import { loadResumeData, type LoadedResumeData } from "../utils/resume";

import DefaultLayout from "@/layouts/default";

function useResumeData() {
  const [resumeData, setResumeData] = useState<LoadedResumeData | null>(null);
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

function ResumeLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32 sm:pt-40">
      <Skeleton className="h-6 w-44 rounded-full" />
      <Skeleton className="mt-8 h-14 w-2/3 rounded-lg" />
      <Skeleton className="mt-4 h-6 w-1/2 rounded-lg" />
      <div className="mt-12 space-y-3">
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-5/6 rounded-lg" />
        <Skeleton className="h-4 w-4/6 rounded-lg" />
      </div>
    </div>
  );
}

export default function ResumePage() {
  const { resumeData, isLoadingResume, loadResume, error } = useResumeData();

  useEffect(() => {
    loadResume();
  }, [loadResume]);

  return (
    <DefaultLayout>
      {isLoadingResume ? (
        <ResumeLoadingSkeleton />
      ) : error ? (
        <div className="mx-auto max-w-2xl px-6 pb-24 pt-40">
          <Alert status="danger">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Résumé loading failed</Alert.Title>
              <Alert.Description>{error}</Alert.Description>
            </Alert.Content>
          </Alert>

          <Card className="mt-6 w-full">
            <Card.Header>
              <Card.Title>Check VITE_RESUME_FILE</Card.Title>
              <Card.Description>
                Supported sources for the resume file.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-2.5 font-mono text-xs">
                <div>
                  <span className="text-muted">local &nbsp;</span>
                  <Typography.Code className="text-xs text-foreground">
                    resume.yaml
                  </Typography.Code>
                </div>
                <div>
                  <span className="text-muted">gist &nbsp;&nbsp;</span>
                  <Typography.Code className="break-all text-xs text-foreground">
                    https://gist.github.com/user/id
                  </Typography.Code>
                </div>
                <div>
                  <span className="text-muted">url &nbsp;&nbsp;&nbsp;</span>
                  <Typography.Code className="break-all text-xs text-foreground">
                    https://raw.githubusercontent.com/user/repo/main/resume.yaml
                  </Typography.Code>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      ) : resumeData && resumeData.cv && resumeData.cv.name ? (
        <ResumeContent data={resumeData} />
      ) : null}
    </DefaultLayout>
  );
}
