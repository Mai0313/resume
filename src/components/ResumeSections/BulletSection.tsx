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

export const BulletSection: React.FC<BulletSectionProps> = ({
  entries,
  sectionName,
  itemVariants,
}) => {
  const { displayTitle } = getSectionConfig(sectionName);

  const items = entries?.map((entry) => entry.bullet) ?? [];

  return (
    <SectionCard
      data={entries}
      itemVariants={itemVariants}
      sectionKey={sectionName}
      title={displayTitle}
    >
      <BulletList items={items} />
    </SectionCard>
  );
};
