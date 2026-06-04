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
    <SectionCard itemVariants={itemVariants} title={displayTitle}>
      <div className="max-w-3xl space-y-4">
        {entries?.map((text, index) => (
          <p
            key={`${sectionName}-text-${index}`}
            className="text-sm leading-relaxed text-muted"
          >
            {text}
          </p>
        ))}
      </div>
    </SectionCard>
  );
};
