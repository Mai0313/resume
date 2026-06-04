import type { FC } from "react";
import type { Variants } from "framer-motion";
import type { OneLineEntry } from "@/utils/resume";

import { Chip, Typography } from "@heroui/react";

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
export const OneLineSection: FC<OneLineSectionProps> = ({
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
                <Typography.Heading
                  className="text-base font-semibold tracking-normal text-foreground"
                  level={3}
                >
                  {entry.label}
                </Typography.Heading>
                {entry.details && (
                  <Typography
                    className="shrink-0 text-xs leading-4 text-muted"
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
              <Typography
                className="text-sm leading-5 text-foreground"
                type="body-sm"
              >
                {entry.label}
              </Typography>
              {entry.details && (
                <Typography
                  className="text-xs leading-4 text-muted"
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
