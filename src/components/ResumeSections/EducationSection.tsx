import type { EducationEntry } from "@/utils/resume";

import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, getSectionConfig } from "./SectionCard";

import { ItemCard, EntryHeader, SummaryText } from "@/components/shared";
import { formatList } from "@/lib/utils";

interface EducationSectionProps {
  entries: EducationEntry[] | undefined;
  sectionName: string;
  itemVariants: Variants;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  entries,
  sectionName,
  itemVariants,
}) => {
  const { displayTitle } = getSectionConfig(sectionName);

  return (
    <SectionCard itemVariants={itemVariants} title={displayTitle}>
      <div className="divide-y divide-border">
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
              <div className="border-l border-border pl-4">
                <div className="label-mono mb-2 text-fg-subtle">Coursework</div>
                <p className="text-[13.5px] leading-relaxed text-fg-muted">
                  {formatList(edu.courses)}
                </p>
              </div>
            )}
          </ItemCard>
        ))}
      </div>
    </SectionCard>
  );
};
