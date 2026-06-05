import type { CVData } from "@/utils/resume";
import type { LanguagesSection } from "@/components/ResumeSections/languages";

import { Avatar, Chip, Link, Typography } from "@heroui/react";

import { ExternalLink } from "@/components/shared";
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

export function ResumeHeader({ cv, languages }: ResumeHeaderProps) {
  const pdfPath = resolveAssetPath(env.RESUME_PDF_PATH);

  return (
    <header className="mb-16 border-b border-border pb-14 md:mb-20 md:pb-20">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-start md:gap-10">
        <div className="order-2 md:order-1">
          <div className="mb-8">
            <Chip size="sm" variant="soft">
              <span className="size-1.5 rounded-full bg-success" />
              <Chip.Label>PROFILE · {formatUpdatedAt()}</Chip.Label>
            </Chip>
          </div>

          <Typography.Heading
            className="mb-4 text-5xl font-bold tracking-tight text-foreground md:text-7xl"
            level={1}
          >
            {cv.name}
          </Typography.Heading>

          {cv.headline && (
            <Typography
              className="mb-10 text-xl leading-7 text-muted md:text-2xl md:leading-8"
              type="body"
            >
              {cv.headline}
            </Typography>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            {cv.location && (
              <Typography
                className="text-sm leading-5 text-muted"
                type="body-sm"
              >
                {cv.location}
              </Typography>
            )}
            {cv.location && cv.email && (
              <Typography
                className="text-sm leading-5 text-muted/50"
                type="body-sm"
              >
                ·
              </Typography>
            )}
            {cv.email && (
              <Link className="text-sm" href={`mailto:${cv.email}`}>
                {cv.email}
              </Link>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            {cv.social_networks?.map(({ network, username }) => (
              <ExternalLink
                key={network}
                className="text-sm"
                url={buildSocialUrl(network, username)}
              >
                {network}
              </ExternalLink>
            ))}
            <ExternalLink className="text-sm" url={pdfPath}>
              Download PDF
            </ExternalLink>
          </div>
        </div>

        {cv.photo && (
          <div className="order-1 flex justify-start md:order-2 md:justify-end">
            <Avatar className="size-24 md:size-32">
              <Avatar.Image alt={cv.name} src={cv.photo} />
              <Avatar.Fallback>{initials(cv.name)}</Avatar.Fallback>
            </Avatar>
          </div>
        )}
      </div>

      {languages && languages.entries.length > 0 && (
        <div className="mt-10 grid grid-cols-[auto_1fr] items-center gap-x-8 border-t border-border pt-6">
          <Typography
            className="text-xs font-semibold uppercase leading-4 tracking-wider text-muted"
            type="body-xs"
          >
            Languages
          </Typography>
          <div className="flex flex-wrap gap-1.5">
            {languages.entries.map((lang, index) => (
              <Chip
                key={`lang-${index}-${lang.label}`}
                size="sm"
                variant="soft"
              >
                {lang.details ? `${lang.label} · ${lang.details}` : lang.label}
              </Chip>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
