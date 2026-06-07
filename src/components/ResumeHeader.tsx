import type { CVData } from "@/utils/resume";
import type { LanguagesSection } from "@/components/ResumeSections/languages";

import { Avatar, Chip, Link, Typography } from "@heroui/react";

import {
  ArrowUpRightIcon,
  DownloadIcon,
  FilePdfIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
} from "@/components/shared";
import { env } from "@/utils/env";
import { resolveAssetPath } from "@/utils/pathUtils";
import { buildSocialUrl } from "@/utils/resume";

interface ResumeHeaderProps {
  cv: CVData;
  languages: LanguagesSection | null;
}

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

function formatUpdatedAt(): string {
  const now = new Date();

  return `UPDATED ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function SocialIcon({ network }: { network: string }) {
  const normalized = network.toLowerCase();

  if (normalized.includes("github")) {
    return <GitHubIcon size={16} />;
  }

  if (normalized.includes("linkedin")) {
    return <LinkedInIcon size={16} />;
  }

  return <ArrowUpRightIcon size={16} />;
}

export function ResumeHeader({ cv, languages }: ResumeHeaderProps) {
  const pdfPath = resolveAssetPath(env.RESUME_PDF_PATH);

  return (
    <header className="rounded-[2rem] border border-border/70 bg-default/45 p-2 shadow-[var(--surface-shadow)]">
      <div className="rounded-[1.5rem] border border-border/65 bg-surface/86 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-5">
          <Chip className="font-mono" size="sm" variant="soft">
            <span className="size-1.5 rounded-full bg-accent" />
            <Chip.Label>{formatUpdatedAt()}</Chip.Label>
          </Chip>

          <Avatar className="size-16 rounded-2xl border border-border/70 bg-default text-foreground">
            {cv.photo && <Avatar.Image alt={cv.name} src={cv.photo} />}
            <Avatar.Fallback>{initials(cv.name)}</Avatar.Fallback>
          </Avatar>
        </div>

        <Typography.Heading
          className="mt-9 text-4xl font-semibold leading-none tracking-normal text-foreground sm:text-5xl lg:text-4xl xl:text-5xl"
          level={1}
        >
          {cv.name}
        </Typography.Heading>

        {cv.headline && (
          <Typography
            className="mt-4 text-base font-medium leading-7 text-muted"
            type="body"
          >
            {cv.headline}
          </Typography>
        )}

        <div className="mt-7 space-y-3 border-y border-border/70 py-5">
          {cv.location && (
            <div className="grid grid-cols-[1rem_1fr] items-center gap-3 text-sm text-muted">
              <MapPinIcon size={16} />
              <Typography
                className="text-sm leading-6 text-muted"
                type="body-sm"
              >
                {cv.location}
              </Typography>
            </div>
          )}
          {cv.email && (
            <Link
              className="grid grid-cols-[1rem_1fr] items-center gap-3 text-sm text-muted no-underline transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground"
              href={`mailto:${cv.email}`}
            >
              <MailIcon size={16} />
              <span className="truncate">{cv.email}</span>
            </Link>
          )}
        </div>

        <div className="mt-6 space-y-2.5">
          <Link
            className="group inline-flex min-h-12 w-full items-center justify-between gap-4 rounded-full bg-foreground py-1.5 pl-4 pr-1.5 text-sm font-semibold text-background no-underline shadow-[0_16px_34px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.01] active:scale-[0.985]"
            href={pdfPath}
          >
            <span className="inline-flex items-center gap-2">
              <FilePdfIcon size={17} />
              Download PDF
            </span>
            <span className="flex size-9 items-center justify-center rounded-full bg-background/12 text-background transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5">
              <DownloadIcon size={17} />
            </span>
          </Link>

          {cv.social_networks && cv.social_networks.length > 0 && (
            <div className="grid grid-cols-1 gap-2">
              {cv.social_networks.map(({ network, username }) => (
                <Link
                  key={network}
                  className="group inline-flex min-h-11 items-center justify-between gap-3 rounded-full border border-border/75 bg-default/65 px-4 text-sm font-medium text-foreground no-underline transition-[background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-accent/40 hover:bg-default"
                  href={buildSocialUrl(network, username)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <SocialIcon network={network} />
                    {network}
                  </span>
                  <ArrowUpRightIcon
                    className="text-muted transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                    size={15}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>

        {languages && languages.entries.length > 0 && (
          <div className="mt-7 border-t border-border/70 pt-5">
            <Typography
              className="font-mono text-[11px] font-medium uppercase leading-4 tracking-[0.16em] text-muted"
              type="body-xs"
            >
              Languages
            </Typography>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {languages.entries.map((lang, index) => (
                <Chip
                  key={`lang-${index}-${lang.label}`}
                  size="sm"
                  variant="soft"
                >
                  {lang.details
                    ? `${lang.label} · ${lang.details}`
                    : lang.label}
                </Chip>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
