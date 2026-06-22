import type { FC } from "react";
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
}

export const NormalSection: FC<NormalSectionProps> = ({
  entries,
  sectionName,
}) => {
  const { displayTitle } = getSectionConfig(sectionName);

  return (
    <SectionCard title={displayTitle}>
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
                  <Typography.Heading
                    className="text-lg font-semibold leading-snug tracking-normal text-foreground"
                    level={3}
                  >
                    <ExternalLink className="text-foreground" url={entry.url}>
                      {entry.name}
                    </ExternalLink>
                  </Typography.Heading>
                  {metaLine && (
                    <Typography
                      className="mt-1.5 font-mono text-xs leading-4 text-muted"
                      type="body-xs"
                    >
                      {metaLine}
                    </Typography>
                  )}
                  {entry.roles && entry.roles.length > 0 && (
                    <Typography
                      className="mt-0.5 text-sm leading-5 text-muted"
                      type="body-sm"
                    >
                      {formatList(entry.roles)}
                    </Typography>
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
                    <Chip
                      key={keyword}
                      className="font-mono tracking-tight"
                      size="sm"
                      variant="soft"
                    >
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
