import { lazy, Suspense } from "react";

import DecryptedText from "@/components/DecryptedText/DecryptedText";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  GitHubIcon,
} from "@/components/shared";
import DefaultLayout from "@/layouts/default";
import { siteConfig } from "@/config/site";
import { env, envHelpers } from "@/utils/env";
import { buildPath } from "@/utils/pathUtils";

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
          className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-b from-transparent to-bg"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-32 sm:pt-40">
          <h1
            className="font-display mb-12 font-normal leading-[1.02]"
            style={{
              fontSize: "clamp(3.25rem, 10vw, 7rem)",
              letterSpacing: "-0.04em",
            }}
          >
            <DecryptedText
              className="text-fg"
              encryptedClassName="text-fg-subtle opacity-60"
              revealDirection="start"
              speed={55}
              text={env.WEBSITE_TITLE}
            />
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            {resumeAvailable && (
              <a
                className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-all hover:opacity-90"
                href={buildPath("/resume")}
              >
                View Resume
                <span className="transition-transform group-hover:translate-x-0.5">
                  <ArrowRightIcon />
                </span>
              </a>
            )}
            <a
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium text-fg backdrop-blur-sm transition-colors hover:bg-elevated"
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
