import type { BulletEntry } from "@/utils/resumeLoader";

import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, getSectionConfig } from "./SectionCard";

import { BulletList } from "@/components/shared";

interface BulletSectionProps {
  entries: BulletEntry[] | undefined;
  sectionName: string;
  itemVariants: Variants;
}

/**
 * Renders a rendercv section containing BulletEntry items as a simple
 * bullet list.
 */
export const BulletSection: React.FC<BulletSectionProps> = ({
  entries,
  sectionName,
  itemVariants,
}) => {
  const { colorScheme, displayTitle, icon } = getSectionConfig(sectionName);

  const items = entries?.map((entry) => entry.bullet) ?? [];

  return (
    <SectionCard
      colorScheme={colorScheme}
      data={entries}
      icon={icon}
      itemVariants={itemVariants}
      sectionKey={sectionName}
      title={displayTitle}
    >
      <BulletList bulletColor="blue-500" items={items} />
    </SectionCard>
  );
};
