import type { NormalEntry } from "@/utils/resume";

import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, getSectionConfig } from "./SectionCard";

import {
  ItemCard,
  ExternalLink,
  DateRange,
  BulletList,
  SummaryText,
} from "@/components/shared";
import { formatList } from "@/lib/utils";

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
    <SectionCard itemVariants={itemVariants} title={displayTitle}>
      <div className="divide-y divide-border">
        {entries?.map((entry, index) => {
          const metaLine = formatList([
            entry.entity ?? entry.issuer,
            entry.location,
          ]);

          return (
            <ItemCard key={`${sectionName}-${index}-${entry.name || ""}`}>
              <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
                <div className="flex-1">
                  <h3
                    className="font-display text-xl leading-tight text-fg md:text-[1.5rem]"
                    style={{ fontVariationSettings: "'opsz' 60, 'SOFT' 40" }}
                  >
                    <ExternalLink url={entry.url}>{entry.name}</ExternalLink>
                  </h3>
                  {metaLine && (
                    <p className="label-mono mt-1.5 text-fg-muted">
                      {metaLine}
                    </p>
                  )}
                  {entry.roles && entry.roles.length > 0 && (
                    <p className="mt-0.5 text-[13.5px] text-fg-muted">
                      {formatList(entry.roles)}
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

              <SummaryText text={entry.summary} />

              {entry.highlights && entry.highlights.length > 0 && (
                <BulletList className="mb-5" items={entry.highlights} />
              )}

              {entry.keywords && entry.keywords.length > 0 && (
                <p className="label-mono text-fg-subtle">
                  {formatList(entry.keywords)}
                </p>
              )}
            </ItemCard>
          );
        })}
      </div>
    </SectionCard>
  );
};
