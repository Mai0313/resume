import type { EducationEntry } from "@/utils/resumeLoader";

import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, getSectionConfig } from "./SectionCard";

import { ItemCard, ExternalLink, DateRange } from "@/components/shared";

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
    <SectionCard
      data={entries}
      itemVariants={itemVariants}
      sectionKey={sectionName}
      title={displayTitle}
    >
      <div className="divide-y divide-border">
        {entries?.map((edu, index) => (
          <ItemCard
            key={`${sectionName}-${edu.institution || "unknown"}-${index}`}
          >
            <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
              <div className="flex-1">
                <h3
                  className="font-display text-2xl leading-tight text-fg md:text-[1.75rem]"
                  style={{ fontVariationSettings: "'opsz' 48, 'SOFT' 40" }}
                >
                  {edu.url ? (
                    <ExternalLink showIcon={false} url={edu.url}>
                      {edu.institution}
                    </ExternalLink>
                  ) : (
                    edu.institution
                  )}
                </h3>
                {(edu.degree || edu.area) && (
                  <p className="mt-0.5 text-[15px] text-fg-muted">
                    {[edu.degree, edu.area].filter(Boolean).join(" in ")}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 flex-col items-start md:items-end">
                <DateRange endDate={edu.end_date} startDate={edu.start_date} />
                {edu.grade && (
                  <span className="label-mono mt-1 text-fg-subtle">
                    GPA {edu.grade}
                  </span>
                )}
              </div>
            </div>

            {edu.summary && (
              <p className="mb-5 max-w-3xl text-[14.5px] leading-[1.65] text-fg-muted">
                {edu.summary}
              </p>
            )}

            {edu.courses && edu.courses.length > 0 && (
              <div className="border-l border-border pl-4">
                <div className="label-mono mb-2 text-fg-subtle">Coursework</div>
                <p className="text-[13.5px] leading-relaxed text-fg-muted">
                  {edu.courses.join(" · ")}
                </p>
              </div>
            )}
          </ItemCard>
        ))}
      </div>
    </SectionCard>
  );
};
