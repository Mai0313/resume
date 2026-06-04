import type { NormalEntry } from "@/utils/resume";

import React from "react";
import { Variants } from "framer-motion";
import { Chip } from "@heroui/react";

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
                  <h3 className="text-lg font-semibold text-foreground">
                    <ExternalLink className="text-foreground" url={entry.url}>
                      {entry.name}
                    </ExternalLink>
                  </h3>
                  {metaLine && (
                    <p className="mt-1.5 text-xs text-muted">{metaLine}</p>
                  )}
                  {entry.roles && entry.roles.length > 0 && (
                    <p className="mt-0.5 text-sm text-muted">
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
                <div className="flex flex-wrap gap-1.5">
                  {entry.keywords.map((keyword) => (
                    <Chip key={keyword} size="sm" variant="soft">
                      {keyword}
                    </Chip>
                  ))}
                </div>
              )}
            </ItemCard>
          );
        })}
      </div>
    </SectionCard>
  );
};
