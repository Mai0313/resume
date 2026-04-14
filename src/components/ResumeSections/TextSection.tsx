import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, getSectionConfig } from "./SectionCard";

interface TextSectionProps {
  entries: string[] | undefined;
  sectionName: string;
  itemVariants: Variants;
}

/**
 * Renders a rendercv section containing TextEntry items (plain strings).
 * Each entry becomes its own paragraph.
 */
export const TextSection: React.FC<TextSectionProps> = ({
  entries,
  sectionName,
  itemVariants,
}) => {
  const { colorScheme, displayTitle } = getSectionConfig(sectionName);

  return (
    <SectionCard
      colorScheme={colorScheme}
      data={entries}
      itemVariants={itemVariants}
      sectionKey={sectionName}
      title={displayTitle}
    >
      <div className="space-y-4">
        {entries?.map((text, index) => (
          <p
            key={`${sectionName}-text-${index}`}
            className="text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            {text}
          </p>
        ))}
      </div>
    </SectionCard>
  );
};
