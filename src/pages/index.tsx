import { lazy, Suspense } from "react";
import { Link as RouterLink } from "react-router-dom";

import DecryptedText from "@/components/DecryptedText/DecryptedText";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  GitHubIcon,
} from "@/components/shared";
import DefaultLayout from "@/layouts/default";
import { siteConfig } from "@/config/site";
import { env, envHelpers } from "@/utils/env";

const Threads = lazy(() => import("@/components/Threads/Threads"));

export default function IndexPage() {
  const resumeAvailable = envHelpers.isResumeFileAvailable();

  return (
    <DefaultLayout>
      {/* ────── Hero ────── */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.28]"
        >
          <Suspense fallback={null}>
            <Threads amplitude={1.4} color={[1, 1, 1]} distance={0.25} />
          </Suspense>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-b from-transparent to-background"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-32 sm:pt-40">
          <h1
            className="mb-12 font-bold leading-[1.02] tracking-tight"
            style={{ fontSize: "clamp(3.25rem, 10vw, 7rem)" }}
          >
            <DecryptedText
              className="text-foreground"
              encryptedClassName="text-muted/60"
              revealDirection="start"
              speed={55}
              text={env.WEBSITE_TITLE}
            />
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            {resumeAvailable && (
              <RouterLink className="button button--primary" to="/resume">
                View Resume
                <ArrowRightIcon />
              </RouterLink>
            )}
            <a
              className="button button--outline"
              href={siteConfig.links.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GitHubIcon />
              GitHub
              <ArrowUpRightIcon size={16} />
            </a>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
