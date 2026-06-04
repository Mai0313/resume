import type { FC } from "react";
import type { Variants } from "framer-motion";
import type { BulletEntry } from "@/utils/resume";

import { SectionCard, getSectionConfig } from "./SectionCard";

import { BulletList } from "@/components/shared";

interface BulletSectionProps {
  entries: BulletEntry[] | undefined;
  sectionName: string;
  itemVariants: Variants;
}

export const BulletSection: FC<BulletSectionProps> = ({
  entries,
  sectionName,
  itemVariants,
}) => {
  const { displayTitle } = getSectionConfig(sectionName);

  const items = entries?.map((entry) => entry.bullet) ?? [];

  return (
    <SectionCard itemVariants={itemVariants} title={displayTitle}>
      <BulletList items={items} />
    </SectionCard>
  );
};
