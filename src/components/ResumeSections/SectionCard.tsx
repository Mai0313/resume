import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface SectionCardProps {
  title: string;
  itemVariants: Variants;
  sectionKey: string;
  children: ReactNode;
  data?: unknown[];
}

/**
 * Oxide editorial section wrapper.
 * Renders a mono-label title followed by a full-width divider, then content.
 */
export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  itemVariants,
  sectionKey,
  children,
  data,
}) => {
  if (data !== undefined && (!data || data.length === 0)) {
    return null;
  }

  return (
    <motion.section
      key={sectionKey}
      className="scroll-mt-24"
      variants={itemVariants}
    >
      <div className="mb-8 flex items-baseline gap-4">
        <h2 className="label-mono text-fg">{title}</h2>
        <span className="h-px flex-1 bg-border" />
      </div>
      <div>{children}</div>
    </motion.section>
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
