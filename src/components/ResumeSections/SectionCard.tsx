import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { Separator } from "@heroui/react";

interface SectionCardProps {
  title: string;
  itemVariants: Variants;
  children: ReactNode;
}

/**
 * Section wrapper: an uppercase heading followed by a full-width
 * HeroUI Separator, then content.
 */
export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  itemVariants,
  children,
}) => {
  return (
    <motion.section className="scroll-mt-24" variants={itemVariants}>
      <div className="mb-8 flex items-center gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
          {title}
        </h2>
        <Separator className="flex-1" />
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
