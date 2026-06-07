import type { ComponentPropsWithRef } from "react";

import { lazy, Suspense } from "react";
import { Link as RouterLink } from "react-router-dom";
import { m } from "framer-motion";
import { Link, Typography } from "@heroui/react";

import DecryptedText from "@/components/DecryptedText/DecryptedText";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BriefcaseIcon,
  CircuitryIcon,
  CodeIcon,
  GitHubIcon,
} from "@/components/shared";
import DefaultLayout from "@/layouts/default";
import { siteConfig } from "@/config/site";
import { envHelpers } from "@/utils/env";

const Threads = lazy(() => import("@/components/Threads/Threads"));

const THREADS_COLOR: [number, number, number] = [0.72, 0.95, 0.82];

const impactItems = [
  { label: "Pixel firmware", value: "TF-A / RF-A" },
  { label: "C2 suspend latency", value: "14% cut" },
  { label: "Peer-reviewed papers", value: "3" },
];

const focusItems = [
  {
    icon: CircuitryIcon,
    label: "Trusted firmware",
    detail: "Secure low-power paths and silicon bringup.",
  },
  {
    icon: BriefcaseIcon,
    label: "Pre-silicon validation",
    detail: "Baremetal tests that unblock platform readiness.",
  },
  {
    icon: CodeIcon,
    label: "AI for EDA",
    detail: "Physics-aware modeling and multi-agent design flows.",
  },
];

export default function IndexPage() {
  const resumeAvailable = envHelpers.isResumeFileAvailable();

  return (
    <DefaultLayout>
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.18] dark:opacity-[0.24]"
        >
          <Suspense fallback={null}>
            <Threads amplitude={0.9} color={THREADS_COLOR} distance={0.28} />
          </Suspense>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent to-background"
        />

        <m.div
          animate="visible"
          className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end"
          initial="hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          <m.div
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.75, ease: [0.32, 0.72, 0, 1] },
              },
            }}
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]">
              <span className="size-1.5 rounded-full bg-accent" />
              {siteConfig.profile.handle} Portfolio
            </div>

            <Typography.Heading
              className="max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-normal text-foreground sm:text-6xl lg:text-7xl"
              level={1}
            >
              <DecryptedText
                className="text-foreground"
                encryptedClassName="text-muted/55"
                revealDirection="start"
                speed={48}
                text={siteConfig.profile.displayName}
              />
            </Typography.Heading>

            <Typography
              className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl sm:leading-9"
              type="body"
            >
              {siteConfig.profile.summary}
            </Typography>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {resumeAvailable && (
                <Link
                  className="group inline-flex min-h-12 items-center gap-4 rounded-full bg-foreground py-1.5 pl-5 pr-1.5 text-sm font-semibold text-background no-underline shadow-[0_18px_38px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.015] active:scale-[0.985]"
                  href="/resume"
                  render={(props) => {
                    const anchorProps = {
                      ...(props as ComponentPropsWithRef<"a">),
                    };

                    delete anchorProps.href;

                    return <RouterLink {...anchorProps} to="/resume" />;
                  }}
                >
                  View Resume
                  <span className="flex size-9 items-center justify-center rounded-full bg-background/12 text-background transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    <ArrowRightIcon size={17} />
                  </span>
                </Link>
              )}
              <Link
                className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-border/80 bg-surface/70 px-5 text-sm font-semibold text-foreground no-underline transition-[background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.015] hover:border-accent/45 hover:bg-surface active:scale-[0.985]"
                href={siteConfig.links.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                <GitHubIcon size={18} />
                GitHub
                <ArrowUpRightIcon
                  className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  size={16}
                />
              </Link>
            </div>

            <div className="mt-14 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
              {impactItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border/70 bg-surface/55 p-4 shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]"
                >
                  <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                    {item.label}
                  </div>
                  <div className="mt-2 text-xl font-semibold text-foreground">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </m.div>

          <m.aside
            className="rounded-[2rem] border border-border/70 bg-default/45 p-2 shadow-[var(--surface-shadow)]"
            variants={{
              hidden: { opacity: 0, y: 34 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.85, ease: [0.32, 0.72, 0, 1] },
              },
            }}
          >
            <div className="rounded-[1.5rem] border border-border/65 bg-surface/82 p-5 sm:p-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <Typography
                    className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted"
                    type="body-xs"
                  >
                    Current focus
                  </Typography>
                  <Typography.Heading
                    className="mt-3 text-2xl font-semibold tracking-normal text-foreground"
                    level={2}
                  >
                    {siteConfig.profile.role}
                  </Typography.Heading>
                </div>
                <div className="rounded-full border border-accent/30 bg-accent/12 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-foreground">
                  Open CV
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {focusItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-border/70 pt-4"
                    >
                      <div className="flex size-10 items-center justify-center rounded-xl bg-default text-foreground">
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          {item.label}
                        </div>
                        <div className="mt-1 text-sm leading-6 text-muted">
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {siteConfig.profile.focusAreas.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border/70 bg-default/70 px-3 py-1.5 text-xs font-medium text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </m.aside>
        </m.div>
      </section>
    </DefaultLayout>
  );
}
