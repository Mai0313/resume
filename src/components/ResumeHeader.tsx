import type { CVData } from "@/utils/resumeLoader";
import type { LanguagesSection } from "@/components/ResumeSections/languages";

import { useState } from "react";

import { ArrowUpRightIcon } from "@/components/shared";
import { envHelpers } from "@/utils/env";
import { buildSocialUrl } from "@/utils/resumeLoader";

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

function ExternalHeaderLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      className="group inline-flex items-center gap-1.5 text-[13.5px] text-fg transition-opacity hover:opacity-80"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="link-underline">{label}</span>
      <span className="text-fg-muted transition-colors group-hover:text-fg">
        <ArrowUpRightIcon />
      </span>
    </a>
  );
}

export function ResumeHeader({ cv, languages }: ResumeHeaderProps) {
  const [photoLoaded, setPhotoLoaded] = useState(true);
  const pdfPath = envHelpers.getResumePdfPath();

  return (
    <header className="mb-16 border-b border-border pb-14 md:mb-20 md:pb-20">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-start md:gap-10">
        <div className="order-2 md:order-1">
          <div className="label-mono mb-8 flex items-center gap-2.5 text-fg-subtle">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
            PROFILE · {formatUpdatedAt()}
          </div>

          <h1
            className="font-display mb-4 font-normal leading-[1.02] text-fg"
            style={{
              fontSize: "clamp(3rem, 9vw, 6rem)",
              letterSpacing: "-0.04em",
            }}
          >
            {cv.name}
          </h1>

          {cv.headline && (
            <p
              className="font-display mb-10 text-xl font-light italic text-fg-muted md:text-2xl"
              style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}
            >
              {cv.headline}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14.5px] text-fg-muted">
            {cv.location && <span>{cv.location}</span>}
            {cv.location && cv.email && <span className="text-border">·</span>}
            {cv.email && (
              <a className="link-underline text-fg" href={`mailto:${cv.email}`}>
                {cv.email}
              </a>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            {cv.social_networks?.map(({ network, username }) => (
              <ExternalHeaderLink
                key={network}
                href={buildSocialUrl(network, username)}
                label={network}
              />
            ))}
            <ExternalHeaderLink href={pdfPath} label="Download PDF" />
          </div>
        </div>

        {cv.photo && photoLoaded && (
          <div className="order-1 flex justify-start md:order-2 md:justify-end">
            <img
              alt={cv.name}
              className="h-24 w-24 rounded-full border border-border object-cover md:h-32 md:w-32"
              src={cv.photo}
              onError={() => setPhotoLoaded(false)}
            />
          </div>
        )}
      </div>

      {languages && languages.entries.length > 0 && (
        <div className="mt-10 grid grid-cols-[auto_1fr] items-baseline gap-x-8 border-t border-border pt-6">
          <span className="label-mono text-fg-subtle">Languages</span>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            {languages.entries.map((lang, index) => (
              <span
                key={`lang-${index}-${lang.label}`}
                className="text-[14.5px]"
              >
                <span className="text-fg">{lang.label}</span>
                {lang.details && (
                  <>
                    <span className="mx-1.5 text-fg-subtle">·</span>
                    <span className="label-mono normal-case tracking-normal text-fg-muted">
                      {lang.details}
                    </span>
                  </>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
