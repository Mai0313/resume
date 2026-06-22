import type { ComponentPropsWithRef } from "react";

import { lazy, Suspense } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Typography, useTheme } from "@heroui/react";

import DecryptedText from "@/components/DecryptedText/DecryptedText";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  GitHubIcon,
} from "@/components/shared";
import DefaultLayout from "@/layouts/default";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { env, envHelpers } from "@/utils/env";

const Threads = lazy(() => import("@/components/Threads/Threads"));

// Stable per-theme tuples: Threads rebuilds its WebGL context whenever the
// color reference changes, so never pass an inline array literal.
const THREADS_DARK: [number, number, number] = [1, 1, 1];
const THREADS_LIGHT: [number, number, number] = [0.1, 0.15, 0.25];

export default function IndexPage() {
  const resumeAvailable = envHelpers.isResumeFileAvailable();
  const { resolvedTheme } = useTheme("dark");
  const isDark = resolvedTheme !== "light";

  return (
    <DefaultLayout>
      {/* ────── Hero ────── */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* Static gradient backdrop: paints instantly, covers the moment
            before the WebGL canvas loads and the no-WebGL/reduced-motion case. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: isDark
              ? "radial-gradient(125% 85% at 50% 0%, rgba(255,255,255,0.06), transparent 60%)"
              : "radial-gradient(125% 85% at 50% 0%, rgba(26,51,102,0.05), transparent 60%)",
          }}
        />
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0",
            isDark ? "opacity-[0.28]" : "opacity-[0.18]",
          )}
        >
          <Suspense fallback={null}>
            <Threads
              amplitude={1.4}
              color={isDark ? THREADS_DARK : THREADS_LIGHT}
              distance={0.25}
            />
          </Suspense>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-b from-transparent to-background"
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-32 sm:pt-40">
          <Typography.Heading
            className="mb-6 font-bold leading-[1.02] tracking-[-0.02em]"
            level={1}
            style={{ fontSize: "clamp(3.25rem, 10vw, 7rem)" }}
          >
            <DecryptedText
              className="text-foreground"
              encryptedClassName="text-muted/60"
              revealDirection="start"
              speed={55}
              text={env.WEBSITE_TITLE}
            />
          </Typography.Heading>

          <Typography
            className="mb-12 font-mono text-sm leading-5 text-muted"
            type="body-sm"
          >
            {siteConfig.tagline}
          </Typography>

          <div className="flex flex-wrap items-center gap-3">
            {resumeAvailable && (
              <Link
                className="button button--primary gap-2"
                href="/resume"
                render={(props) => {
                  // Drop the placeholder href so RouterLink fully owns the
                  // basename-aware href it computes from `to`.
                  const anchorProps = {
                    ...(props as ComponentPropsWithRef<"a">),
                  };

                  delete anchorProps.href;

                  return <RouterLink {...anchorProps} to="/resume" />;
                }}
              >
                View Resume
                <ArrowRightIcon size={16} />
              </Link>
            )}
            <Link
              className="button button--outline gap-2"
              href={siteConfig.links.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GitHubIcon />
              GitHub
              <ArrowUpRightIcon size={16} />
            </Link>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
