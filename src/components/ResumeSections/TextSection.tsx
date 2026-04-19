import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, getSectionConfig } from "./SectionCard";

interface TextSectionProps {
  entries: string[] | undefined;
  sectionName: string;
  itemVariants: Variants;
}

export const TextSection: React.FC<TextSectionProps> = ({
  entries,
  sectionName,
  itemVariants,
}) => {
  const { displayTitle } = getSectionConfig(sectionName);

  return (
    <SectionCard
      data={entries}
      itemVariants={itemVariants}
      sectionKey={sectionName}
      title={displayTitle}
    >
      <div className="max-w-3xl space-y-4">
        {entries?.map((text, index) => (
          <p
            key={`${sectionName}-text-${index}`}
            className="text-[14.5px] leading-[1.65] text-fg-muted"
          >
            {text}
          </p>
        ))}
      </div>
    </SectionCard>
  );
};
