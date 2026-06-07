import type { FC } from "react";
import type { Variants } from "framer-motion";
import type { EducationEntry } from "@/utils/resume";

import { Typography } from "@heroui/react";

import { SectionCard, getSectionConfig } from "./SectionCard";

import { ItemCard, EntryHeader, SummaryText } from "@/components/shared";
import { formatList } from "@/lib/utils";

interface EducationSectionProps {
  entries: EducationEntry[] | undefined;
  sectionName: string;
  sectionIndex: number;
  itemVariants: Variants;
}

export const EducationSection: FC<EducationSectionProps> = ({
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
        {entries?.map((edu, index) => (
          <ItemCard
            key={`${sectionName}-${edu.institution || "unknown"}-${index}`}
          >
            <EntryHeader
              className="mb-4"
              endDate={edu.end_date}
              rightMeta={edu.grade ? `GPA ${edu.grade}` : undefined}
              startDate={edu.start_date}
              subtitle={formatList([edu.degree, edu.area], " in ")}
              title={edu.institution}
              url={edu.url}
            />

            <SummaryText text={edu.summary} />

            {edu.courses && edu.courses.length > 0 && (
              <div className="border-l border-accent/40 pl-4">
                <Typography
                  className="mb-2 font-mono text-[11px] font-medium uppercase leading-4 tracking-[0.12em] text-muted"
                  type="body-xs"
                >
                  Coursework
                </Typography>
                <Typography
                  className="text-sm leading-7 text-muted"
                  type="body-sm"
                >
                  {formatList(edu.courses)}
                </Typography>
              </div>
            )}
          </ItemCard>
        ))}
      </div>
    </SectionCard>
  );
};
