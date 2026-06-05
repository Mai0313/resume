import type { FC } from "react";
import type { Variants } from "framer-motion";

import { Typography } from "@heroui/react";

import { SectionCard, getSectionConfig } from "./SectionCard";

interface TextSectionProps {
  entries: string[] | undefined;
  sectionName: string;
  itemVariants: Variants;
}

export const TextSection: FC<TextSectionProps> = ({
  entries,
  sectionName,
  itemVariants,
}) => {
  const { displayTitle } = getSectionConfig(sectionName);

  return (
    <SectionCard itemVariants={itemVariants} title={displayTitle}>
      <div className="max-w-3xl space-y-4">
        {entries?.map((text, index) => (
          <Typography
            key={`${sectionName}-text-${index}`}
            className="text-sm leading-relaxed text-muted"
            type="body-sm"
          >
            {text}
          </Typography>
        ))}
      </div>
    </SectionCard>
  );
};
