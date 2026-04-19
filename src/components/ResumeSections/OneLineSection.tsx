import type { OneLineEntry } from "@/utils/resumeLoader";

import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, getSectionConfig } from "./SectionCard";

interface OneLineSectionProps {
  entries: OneLineEntry[] | undefined;
  sectionName: string;
  itemVariants: Variants;
}

/**
 * Oxide style for OneLineEntry sections.
 * - With keywords (Skills/Interests): label + level + middle-dot keyword list
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
    <SectionCard
      data={entries}
      itemVariants={itemVariants}
      sectionKey={sectionName}
      title={displayTitle}
    >
      {hasKeywords ? (
        <div className="divide-y divide-border">
          {entries?.map((entry, index) => (
            <div
              key={`${sectionName}-${entry.label || "unknown"}-${index}`}
              className="py-6"
            >
              <div className="mb-2 flex items-baseline justify-between gap-4">
                <h3
                  className="font-display text-lg leading-tight text-fg md:text-xl"
                  style={{ fontVariationSettings: "'opsz' 48, 'SOFT' 40" }}
                >
                  {entry.label}
                </h3>
                {entry.details && (
                  <span className="label-mono shrink-0 text-fg-subtle">
                    {entry.details}
                  </span>
                )}
              </div>
              {entry.keywords && entry.keywords.length > 0 && (
                <p className="max-w-3xl text-[13.5px] leading-relaxed text-fg-muted">
                  {entry.keywords.join(" · ")}
                </p>
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
              <span className="text-[15px] text-fg">{entry.label}</span>
              {entry.details && (
                <span className="label-mono text-fg-subtle">
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
