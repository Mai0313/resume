import type { FC } from "react";
import type { BulletEntry } from "@/utils/resume";

import { SectionCard, getSectionConfig } from "./SectionCard";

import { BulletList } from "@/components/shared";

interface BulletSectionProps {
  entries: BulletEntry[] | undefined;
  sectionName: string;
}

export const BulletSection: FC<BulletSectionProps> = ({
  entries,
  sectionName,
}) => {
  const { displayTitle } = getSectionConfig(sectionName);

  const items = entries?.map((entry) => entry.bullet) ?? [];

  return (
    <SectionCard title={displayTitle}>
      <BulletList items={items} />
    </SectionCard>
  );
};
