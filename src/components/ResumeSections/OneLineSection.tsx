import type { OneLineEntry } from "@/utils/resume";

import React from "react";
import { Variants } from "framer-motion";
import { Chip } from "@heroui/react";

import { SectionCard, getSectionConfig } from "./SectionCard";

interface OneLineSectionProps {
  entries: OneLineEntry[] | undefined;
  sectionName: string;
  itemVariants: Variants;
}

/**
 * Layout for OneLineEntry sections.
 * - With keywords (Skills/Interests): label + level + keyword chips
 * - Without keywords (Languages-like): compact label · details pairs
 */
export const OneLineSection: React.FC<OneLineSectionProps> = ({
  entries,
  sectionName,
  itemVariants,
}) => {
  const { displayTitle } = getSectionConfig(sectionName);

  const hasKeywords = !!entries?.some(
    (entry) => entry.keywords && entry.keywords.length > 0,
  );

  return (
    <SectionCard itemVariants={itemVariants} title={displayTitle}>
      {hasKeywords ? (
        <div className="divide-y divide-border">
          {entries?.map((entry, index) => (
            <div
              key={`${sectionName}-${entry.label || "unknown"}-${index}`}
              className="py-6"
            >
              <div className="mb-3 flex items-baseline justify-between gap-4">
                <h3 className="text-base font-semibold text-foreground">
                  {entry.label}
                </h3>
                {entry.details && (
                  <span className="shrink-0 text-xs text-muted">
                    {entry.details}
                  </span>
                )}
              </div>
              {entry.keywords && entry.keywords.length > 0 && (
                <div className="flex max-w-3xl flex-wrap gap-1.5">
                  {entry.keywords.map((keyword) => (
                    <Chip key={keyword} size="sm" variant="soft">
                      {keyword}
                    </Chip>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
          {entries?.map((entry, index) => (
            <div
              key={`${sectionName}-${entry.label || "unknown"}-${index}`}
              className="flex items-baseline justify-between gap-3 border-b border-border py-3"
            >
              <span className="text-sm text-foreground">{entry.label}</span>
              {entry.details && (
                <span className="text-xs text-muted">{entry.details}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
};
