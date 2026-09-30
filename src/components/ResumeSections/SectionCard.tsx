import type { FC, ReactNode } from "react";

import { Separator, Typography } from "@heroui/react";

interface SectionCardProps {
  title: string;
  children: ReactNode;
}

/**
 * Section wrapper: an uppercase heading (HeroUI Typography rendered as h2)
 * followed by a full-width HeroUI Separator, then content.
 */
export const SectionCard: FC<SectionCardProps> = ({ title, children }) => {
  return (
    <section className="scroll-mt-24">
      <div className="mb-8 flex items-center gap-4">
        <Typography.Heading
          className="font-mono text-xs font-medium uppercase leading-4 tracking-[0.15em] text-muted"
          level={2}
        >
          {title}
        </Typography.Heading>
        <Separator className="flex-1" />
      </div>
      <div>{children}</div>
    </section>
  );
};

export interface SectionConfig {
  displayTitle: string;
}

/**
 * Human-friendly display titles for known rendercv section names.
 * Unknown names fall back to the raw section name.
 */
const SECTION_TITLES: Record<string, string> = {
  experience: "Experience",
  work: "Experience",
  education: "Education",
  publications: "Selected Publications",
  projects: "Selected Projects",
  skills: "Skills",
  languages: "Languages",
  volunteer: "Volunteer",
  certificates: "Certificates",
  interests: "Research Interests",
  references: "References",
  awards: "Awards",
};

export function getSectionConfig(sectionName: string): SectionConfig {
  const key = sectionName.toLowerCase().replace(/[\s_-]/g, "");
  const match = SECTION_TITLES[key];

  return { displayTitle: match ?? sectionName };
}
