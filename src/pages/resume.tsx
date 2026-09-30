import { useState, useEffect } from "react";
import { Alert, Card, Skeleton, Typography } from "@heroui/react";

import { ResumeContent } from "@/components/ResumeContent";
import { loadResumeData, type LoadedResumeData } from "@/utils/resume";
import DefaultLayout from "@/layouts/default";

type ResumeState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: LoadedResumeData };

function useResumeData(): ResumeState {
  const [state, setState] = useState<ResumeState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    loadResumeData()
      .then((data) => {
        if (!cancelled) setState({ status: "ready", data });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            status: "error",
            message:
              err instanceof Error ? err.message : "Failed to load resume",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

function ResumeLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32 sm:pt-40">
      <Skeleton className="h-6 w-44 rounded-full" />
      <Skeleton className="mt-8 h-14 w-2/3 rounded-lg" />
      <Skeleton className="mt-4 h-6 w-1/2 rounded-lg" />
      <Skeleton className="mt-6 h-4 w-64 rounded-lg" />
      <div className="mt-8 flex gap-5">
        <Skeleton className="h-4 w-20 rounded-lg" />
        <Skeleton className="h-4 w-20 rounded-lg" />
        <Skeleton className="h-4 w-28 rounded-lg" />
      </div>
      <div className="mt-16 flex items-center gap-4">
        <Skeleton className="h-3 w-32 rounded-lg" />
        <Skeleton className="h-px flex-1" />
      </div>
      <div className="mt-8 space-y-3">
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-5/6 rounded-lg" />
        <Skeleton className="h-4 w-4/6 rounded-lg" />
      </div>
    </div>
  );
}

export default function ResumePage() {
  const resume = useResumeData();

  return (
    <DefaultLayout>
      {resume.status === "loading" ? (
        <ResumeLoadingSkeleton />
      ) : resume.status === "error" ? (
        <div className="mx-auto max-w-2xl px-6 pb-24 pt-40">
          <Alert status="danger">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Résumé loading failed</Alert.Title>
              <Alert.Description>{resume.message}</Alert.Description>
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
      ) : (
        <ResumeContent data={resume.data} />
      )}
    </DefaultLayout>
  );
}
