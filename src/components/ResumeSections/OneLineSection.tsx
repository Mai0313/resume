import type { FC } from "react";
import type { Variants } from "framer-motion";
import type { OneLineEntry } from "@/utils/resume";

import { Chip, Typography } from "@heroui/react";

import { SectionCard, getSectionConfig } from "./SectionCard";

import { ItemCard } from "@/components/shared";

interface OneLineSectionProps {
  entries: OneLineEntry[] | undefined;
  sectionName: string;
  sectionIndex: number;
  itemVariants: Variants;
}

export const OneLineSection: FC<OneLineSectionProps> = ({
  entries,
  sectionName,
  sectionIndex,
  itemVariants,
}) => {
  const { displayTitle } = getSectionConfig(sectionName);

  const hasKeywords = !!entries?.some(
    (entry) => entry.keywords && entry.keywords.length > 0,
  );

  return (
    <SectionCard
      index={sectionIndex}
      itemVariants={itemVariants}
      title={displayTitle}
    >
      {hasKeywords ? (
        <div className="space-y-3">
          {entries?.map((entry, index) => (
            <ItemCard
              key={`${sectionName}-${entry.label || "unknown"}-${index}`}
            >
              <div className="mb-3 flex items-baseline justify-between gap-4">
                <Typography.Heading
                  className="text-base font-semibold tracking-normal text-foreground"
                  level={3}
                >
                  {entry.label}
                </Typography.Heading>
                {entry.details && (
                  <Typography
                    className="shrink-0 rounded-full border border-border/70 bg-default/65 px-2.5 py-1 font-mono text-[11px] font-medium uppercase leading-4 tracking-[0.08em] text-muted"
                    type="body-xs"
                  >
                    {entry.details}
                  </Typography>
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
            </ItemCard>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
          {entries?.map((entry, index) => (
            <div
              key={`${sectionName}-${entry.label || "unknown"}-${index}`}
              className="flex items-baseline justify-between gap-3 rounded-2xl border border-border/70 bg-surface/58 px-4 py-3"
            >
              <Typography
                className="text-sm font-medium leading-5 text-foreground"
                type="body-sm"
              >
                {entry.label}
              </Typography>
              {entry.details && (
                <Typography
                  className="font-mono text-[11px] font-medium uppercase leading-4 tracking-[0.08em] text-muted"
                  type="body-xs"
                >
                  {entry.details}
                </Typography>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
};
