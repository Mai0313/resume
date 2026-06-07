import type { FC } from "react";
import type { Variants } from "framer-motion";
import type { NormalEntry } from "@/utils/resume";

import { Chip, Typography } from "@heroui/react";

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
  sectionIndex: number;
  itemVariants: Variants;
}

export const NormalSection: FC<NormalSectionProps> = ({
  entries,
  sectionName,
  sectionIndex,
  itemVariants,
}) => {
  const { displayTitle } = getSectionConfig(sectionName);

  return (
    <SectionCard
      index={sectionIndex}
      itemVariants={itemVariants}
      title={displayTitle}
    >
      <div className="space-y-3">
        {entries?.map((entry, index) => {
          const metaLine = formatList([
            entry.entity ?? entry.issuer,
            entry.location,
          ]);

          return (
            <ItemCard key={`${sectionName}-${index}-${entry.name || ""}`}>
              <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
                <div className="flex-1">
                  <Typography.Heading
                    className="text-xl font-semibold leading-snug tracking-normal text-foreground"
                    level={3}
                  >
                    <ExternalLink
                      className="group text-foreground no-underline decoration-accent/50 underline-offset-4 hover:underline"
                      url={entry.url}
                    >
                      {entry.name}
                    </ExternalLink>
                  </Typography.Heading>
                  {metaLine && (
                    <Typography
                      className="mt-2 font-mono text-[11px] font-medium uppercase leading-4 tracking-[0.08em] text-muted"
                      type="body-xs"
                    >
                      {metaLine}
                    </Typography>
                  )}
                  {entry.roles && entry.roles.length > 0 && (
                    <Typography
                      className="mt-1 text-sm font-medium leading-6 text-muted"
                      type="body-sm"
                    >
                      {formatList(entry.roles)}
                    </Typography>
                  )}
                </div>
                <div className="shrink-0">
                  <DateRange
                    className="rounded-full border border-border/70 bg-default/65 px-2.5 py-1"
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
