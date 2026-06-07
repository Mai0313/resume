import type { FC, ReactNode } from "react";
import type { Variants } from "framer-motion";

import { m } from "framer-motion";
import { Typography } from "@heroui/react";

interface SectionCardProps {
  title: string;
  index: number;
  itemVariants: Variants;
  children: ReactNode;
}

export const SectionCard: FC<SectionCardProps> = ({
  title,
  index,
  itemVariants,
  children,
}) => {
  return (
    <m.section className="scroll-mt-28" variants={itemVariants}>
      <div className="mb-5 grid grid-cols-[3rem_1fr] items-start gap-4">
        <div className="rounded-full border border-border/70 bg-default/65 px-2.5 py-1 text-center font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted">
          {String(index).padStart(2, "0")}
        </div>
        <div className="border-t border-border/80 pt-3">
          <Typography.Heading
            className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground"
            level={2}
          >
            {title}
          </Typography.Heading>
        </div>
      </div>
      <div>{children}</div>
    </m.section>
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
