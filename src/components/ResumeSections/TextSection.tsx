import type { FC } from "react";
import type { Variants } from "framer-motion";

import { Typography } from "@heroui/react";

import { SectionCard, getSectionConfig } from "./SectionCard";

interface TextSectionProps {
  entries: string[] | undefined;
  sectionName: string;
  sectionIndex: number;
  itemVariants: Variants;
}

export const TextSection: FC<TextSectionProps> = ({
  entries,
  sectionName,
  sectionIndex,
  itemVariants,
}) => {
  const { displayTitle } = getSectionConfig(sectionName);

  return (
    <SectionCard
      index={sectionIndex}
      itemVariants={itemVariants}
      title={displayTitle}
    >
      <div className="max-w-3xl space-y-4">
        {entries?.map((text, index) => (
          <Typography
            key={`${sectionName}-text-${index}`}
            className="text-sm leading-7 text-muted"
            type="body-sm"
          >
            {text}
          </Typography>
        ))}
      </div>
    </SectionCard>
  );
};
