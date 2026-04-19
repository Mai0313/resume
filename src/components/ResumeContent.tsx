import type {
  RenderCVData,
  Entry,
  ExperienceEntry,
  EducationEntry,
  PublicationEntry,
  NormalEntry,
  OneLineEntry,
  BulletEntry,
} from "../utils/resumeLoader";

import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  ExperienceSection,
  EducationSection,
  PublicationSection,
  NormalSection,
  OneLineSection,
  BulletSection,
  TextSection,
} from "./ResumeSections";

import { fadeInStagger } from "@/utils/animations";
import { envHelpers } from "@/utils/env";
import { buildSocialUrl, detectEntryType } from "@/utils/resumeLoader";

interface ResumeContentProps {
  data: RenderCVData & { sectionOrder: string[] };
}

function findLanguagesSection(
  sections: Record<string, Entry[]>,
): { key: string; entries: OneLineEntry[] } | null {
  for (const [key, entries] of Object.entries(sections)) {
    if (key.toLowerCase() === "languages" && Array.isArray(entries)) {
      const kind = detectEntryType(entries);

      if (kind === "oneline") {
        return { key, entries: entries as OneLineEntry[] };
      }
    }
  }

  return null;
}

const ArrowUpRight = () => (
  <svg
    aria-hidden="true"
    fill="none"
    height="14"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width="14"
  >
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);

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

export const ResumeContent: React.FC<ResumeContentProps> = ({ data }) => {
  const { container: containerVariants, item: itemVariants } = fadeInStagger;
  const [photoLoaded, setPhotoLoaded] = useState(true);

  const { cv } = data;
  const languages = findLanguagesSection(cv.sections);
  const pdfPath = envHelpers.getResumePdfPath();

  const renderSection = React.useCallback(
    (sectionName: string) => {
      if (languages && sectionName === languages.key) {
        return null;
      }

      const entries = cv.sections[sectionName];

      if (!entries || entries.length === 0) {
        return null;
      }

      const kind = detectEntryType(entries);

      switch (kind) {
        case "experience":
          return (
            <ExperienceSection
              key={sectionName}
              entries={entries as ExperienceEntry[]}
              itemVariants={itemVariants}
              sectionName={sectionName}
            />
          );
        case "education":
          return (
            <EducationSection
              key={sectionName}
              entries={entries as EducationEntry[]}
              itemVariants={itemVariants}
              sectionName={sectionName}
            />
          );
        case "publication":
          return (
            <PublicationSection
              key={sectionName}
              entries={entries as PublicationEntry[]}
              itemVariants={itemVariants}
              sectionName={sectionName}
            />
          );
        case "normal":
          return (
            <NormalSection
              key={sectionName}
              entries={entries as NormalEntry[]}
              itemVariants={itemVariants}
              sectionName={sectionName}
            />
          );
        case "oneline":
          return (
            <OneLineSection
              key={sectionName}
              entries={entries as OneLineEntry[]}
              itemVariants={itemVariants}
              sectionName={sectionName}
            />
          );
        case "bullet":
          return (
            <BulletSection
              key={sectionName}
              entries={entries as BulletEntry[]}
              itemVariants={itemVariants}
              sectionName={sectionName}
            />
          );
        case "text":
          return (
            <TextSection
              key={sectionName}
              entries={entries as string[]}
              itemVariants={itemVariants}
              sectionName={sectionName}
            />
          );
        default:
          return null;
      }
    },
    [cv.sections, itemVariants, languages],
  );

  if (!cv || !cv.name) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h3 className="font-display mb-3 text-3xl text-fg">
          Invalid resume data
        </h3>
        <p className="text-fg-muted">
          The resume file is missing a{" "}
          <code className="font-mono">cv.name</code> field. Check{" "}
          <code className="font-mono">public/resume.yaml</code>.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      animate="visible"
      className="mx-auto max-w-4xl px-6 pb-24 pt-32 sm:pt-40"
      initial="hidden"
      variants={containerVariants}
    >
      <motion.header
        className="mb-16 border-b border-border pb-14 md:mb-20 md:pb-20"
        variants={itemVariants}
      >
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
              {cv.location && cv.email && (
                <span className="text-border">·</span>
              )}
              {cv.email && (
                <a
                  className="link-underline text-fg"
                  href={`mailto:${cv.email}`}
                >
                  {cv.email}
                </a>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              {cv.social_networks?.map(({ network, username }) => (
                <a
                  key={network}
                  className="group inline-flex items-center gap-1.5 text-[13.5px] text-fg transition-opacity hover:opacity-80"
                  href={buildSocialUrl(network, username)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="link-underline">{network}</span>
                  <span className="text-fg-muted transition-colors group-hover:text-fg">
                    <ArrowUpRight />
                  </span>
                </a>
              ))}
              <a
                className="group inline-flex items-center gap-1.5 text-[13.5px] text-fg transition-opacity hover:opacity-80"
                href={pdfPath}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="link-underline">Download PDF</span>
                <span className="text-fg-muted transition-colors group-hover:text-fg">
                  <ArrowUpRight />
                </span>
              </a>
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
      </motion.header>

      <div className="space-y-20 md:space-y-24">
        {data.sectionOrder.map((sectionName) => renderSection(sectionName))}
      </div>
    </motion.div>
  );
};

ResumeContent.displayName = "ResumeContent";
