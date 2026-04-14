import type { OneLineEntry } from "@/utils/resumeLoader";

import React from "react";
import { Chip } from "@heroui/chip";
import { Variants } from "framer-motion";

import { SectionCard, getSectionConfig } from "./SectionCard";

import { ItemCard } from "@/components/shared";

interface OneLineSectionProps {
  entries: OneLineEntry[] | undefined;
  sectionName: string;
  itemVariants: Variants;
}

/**
 * Renders a rendercv section containing OneLineEntry items.
 * Used for Skills, Languages, Interests, and similar categorical lists.
 *
 * Layout adapts based on presence of keywords:
 * - Entries with keywords render as ItemCards with label header, level badge,
 *   and keyword chips (good for Skills/Interests).
 * - Entries without keywords render in a compact grid of label + details
 *   (good for Languages).
 */
export const OneLineSection: React.FC<OneLineSectionProps> = ({
  entries,
  sectionName,
  itemVariants,
}) => {
  const { colorScheme, displayTitle } = getSectionConfig(sectionName);

  const hasKeywords = !!entries?.some(
    (entry) => entry.keywords && entry.keywords.length > 0,
  );

  return (
    <SectionCard
      colorScheme={colorScheme}
      data={entries}
      itemVariants={itemVariants}
      sectionKey={sectionName}
      title={displayTitle}
    >
      {hasKeywords ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {entries?.map((entry, index) => (
            <ItemCard
              key={`${sectionName}-${entry.label || "unknown"}-${index}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {entry.label}
                </h3>
                {entry.details && (
                  <span className="px-3 py-1 bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-sm font-medium rounded-full">
                    {entry.details}
                  </span>
                )}
              </div>
              {entry.keywords && entry.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {entry.keywords.map((keyword, i) => (
                    <Chip
                      key={i}
                      className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-colors"
                      color="secondary"
                      size="sm"
                      variant="flat"
                    >
                      {keyword}
                    </Chip>
                  ))}
                </div>
              )}
            </ItemCard>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries?.map((entry, index) => (
            <div
              key={`${sectionName}-${entry.label || "unknown"}-${index}`}
              className="flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl"
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {entry.label}
              </span>
              {entry.details && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {entry.details}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
};
