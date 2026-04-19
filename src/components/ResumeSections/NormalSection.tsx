import type { NormalEntry } from "@/utils/resumeLoader";

import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, getSectionConfig } from "./SectionCard";

import {
  ItemCard,
  ExternalLink,
  DateRange,
  BulletList,
} from "@/components/shared";

interface NormalSectionProps {
  entries: NormalEntry[] | undefined;
  sectionName: string;
  itemVariants: Variants;
}

export const NormalSection: React.FC<NormalSectionProps> = ({
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
        {entries?.map((entry, index) => {
          const entityText = entry.entity ?? entry.issuer;
          const metaLine = [entityText, entry.location]
            .filter(Boolean)
            .join(" · ");

          return (
            <ItemCard key={`${sectionName}-${index}-${entry.name || ""}`}>
              <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
                <div className="flex-1">
                  <h3
                    className="font-display text-xl leading-tight text-fg md:text-[1.5rem]"
                    style={{ fontVariationSettings: "'opsz' 60, 'SOFT' 40" }}
                  >
                    {entry.url ? (
                      <ExternalLink url={entry.url}>{entry.name}</ExternalLink>
                    ) : (
                      entry.name
                    )}
                  </h3>
                  {metaLine && (
                    <p className="label-mono mt-1.5 text-fg-muted">
                      {metaLine}
                    </p>
                  )}
                  {entry.roles && entry.roles.length > 0 && (
                    <p className="mt-0.5 text-[13.5px] text-fg-muted">
                      {entry.roles.join(" · ")}
                    </p>
                  )}
                </div>
                <div className="shrink-0">
                  <DateRange
                    endDate={entry.date ?? entry.end_date}
                    startDate={entry.start_date}
                  />
                </div>
              </div>

              {entry.summary && (
                <p className="mb-5 max-w-3xl text-[14.5px] leading-[1.65] text-fg-muted">
                  {entry.summary}
                </p>
              )}

              {entry.highlights && entry.highlights.length > 0 && (
                <BulletList className="mb-5" items={entry.highlights} />
              )}

              {entry.keywords && entry.keywords.length > 0 && (
                <p className="label-mono text-fg-subtle">
                  {entry.keywords.join(" · ")}
                </p>
              )}
            </ItemCard>
          );
        })}
      </div>
    </SectionCard>
  );
};
