import type { FC } from "react";
import type { ExperienceEntry } from "@/utils/resume";

import { SectionCard, getSectionConfig } from "./SectionCard";

import {
  ItemCard,
  BulletList,
  EntryHeader,
  SummaryText,
} from "@/components/shared";

interface ExperienceSectionProps {
  entries: ExperienceEntry[] | undefined;
  sectionName: string;
}

export const ExperienceSection: FC<ExperienceSectionProps> = ({
  entries,
  sectionName,
}) => {
  const { displayTitle } = getSectionConfig(sectionName);

  return (
    <SectionCard title={displayTitle}>
      <div className="divide-y divide-border">
        {entries?.map((entry, index) => (
          <ItemCard
            key={`${sectionName}-${entry.company || "unknown"}-${index}`}
          >
            <EntryHeader
              endDate={entry.date ?? (entry.end_date || "Present")}
              rightMeta={entry.location}
              startDate={entry.start_date}
              subtitle={entry.position}
              title={entry.company}
              url={entry.url}
            />

            <SummaryText text={entry.summary} />

            {entry.highlights && entry.highlights.length > 0 && (
              <BulletList items={entry.highlights} />
            )}
          </ItemCard>
        ))}
      </div>
    </SectionCard>
  );
};
