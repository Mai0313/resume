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
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 pb-24 pt-28 sm:px-6 sm:pt-36 lg:grid-cols-[minmax(270px,340px)_minmax(0,1fr)] lg:gap-12">
      <div className="rounded-[2rem] border border-border/70 bg-default/45 p-2">
        <div className="rounded-[1.5rem] border border-border/65 bg-surface/80 p-6">
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="mt-10 h-12 w-4/5 rounded-lg" />
          <Skeleton className="mt-4 h-5 w-2/3 rounded-lg" />
          <Skeleton className="mt-8 h-12 w-full rounded-full" />
        </div>
      </div>
      <div className="space-y-5">
        <Skeleton className="h-6 w-44 rounded-full" />
        <Skeleton className="h-36 w-full rounded-2xl" />
        <Skeleton className="h-36 w-full rounded-2xl" />
        <Skeleton className="h-36 w-full rounded-2xl" />
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
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-36 sm:px-6 sm:pt-40">
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
