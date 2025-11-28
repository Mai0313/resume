import type { JSONResumeEducation } from "@/utils/resumeLoader";

import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

import { ItemCard, ExternalLink, DateRange } from "@/components/shared";

interface EducationSectionProps {
  education: JSONResumeEducation[] | undefined;
  itemVariants: Variants;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  itemVariants,
}) => {
  return (
    <SectionCard
      colorScheme="indigo"
      data={education}
      icon={SectionIcons.education}
      itemVariants={itemVariants}
      sectionKey="education"
      title="Education"
    >
      <div className="space-y-6">
        {education?.map((edu, index) => (
          <div key={`education-${edu.institution || "unknown"}-${index}`}>
            <ItemCard>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                <div className="flex-grow">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      <ExternalLink
                        className="hover:text-indigo-600 dark:hover:text-indigo-400"
                        showIcon={false}
                        url={edu.url}
                      >
                        {edu.institution}
                      </ExternalLink>
                    </h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      {edu.studyType} in {edu.area}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {edu.startDate && (
                      <DateRange
                        endDate={edu.endDate}
                        startDate={edu.startDate}
                      />
                    )}
                    {edu.score && (
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>GPA: {edu.score}</span>
                      </div>
                    )}
                  </div>

                  {edu.summary && (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {edu.summary}
                    </p>
                  )}

                  {edu.courses && edu.courses.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Relevant Coursework:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course: string, i: number) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 text-sm rounded-full"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ItemCard>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};
