import type { ExperienceEntry } from "@/utils/resumeLoader";

import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, getSectionConfig } from "./SectionCard";

import {
  ItemCard,
  ExternalLink,
  DateRange,
  BulletList,
} from "@/components/shared";

interface ExperienceSectionProps {
  entries: ExperienceEntry[] | undefined;
  sectionName: string;
  itemVariants: Variants;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
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
      <div className="divide-y divide-border">
        {entries?.map((entry, index) => (
          <ItemCard
            key={`${sectionName}-${entry.company || "unknown"}-${index}`}
          >
            <div className="mb-5 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
              <div className="flex-1">
                <h3
                  className="font-display text-2xl leading-tight text-fg md:text-[1.75rem]"
                  style={{ fontVariationSettings: "'opsz' 48, 'SOFT' 40" }}
                >
                  {entry.url ? (
                    <ExternalLink showIcon={false} url={entry.url}>
                      {entry.company}
                    </ExternalLink>
                  ) : (
                    entry.company
                  )}
                </h3>
                <p className="mt-0.5 text-[15px] text-fg-muted">
                  {entry.position}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-start md:items-end">
                <DateRange
                  endDate={entry.date ?? (entry.end_date || "Present")}
                  startDate={entry.start_date}
                />
                {entry.location && (
                  <span className="label-mono mt-1 text-fg-subtle">
                    {entry.location}
                  </span>
                )}
              </div>
            </div>

            {entry.summary && (
              <p className="mb-5 max-w-3xl text-[14.5px] leading-[1.65] text-fg-muted">
                {entry.summary}
              </p>
            )}

            {entry.highlights && entry.highlights.length > 0 && (
              <BulletList items={entry.highlights} />
            )}
          </ItemCard>
        ))}
      </div>
    </SectionCard>
  );
};
