import type { FC, ReactNode } from "react";

import { Separator, Typography } from "@heroui/react";

import { useGlassPointer } from "@/hooks/useGlassPointer";

interface SectionCardProps {
  title: string;
  children: ReactNode;
}

/**
 * Section wrapper: a frosted glass panel with an uppercase heading (HeroUI
 * Typography rendered as h2), a full-width HeroUI Separator, then content.
 */
export const SectionCard: FC<SectionCardProps> = ({ title, children }) => {
  const glassRef = useGlassPointer();

  return (
    <section ref={glassRef} className="glass-panel scroll-mt-24 p-6 md:p-8">
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
