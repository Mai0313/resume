import type { JSONResumeEducation } from "@/utils/resumeLoader";

import React from "react";
import { Link } from "@heroui/link";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

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
      title="Education"
      icon={SectionIcons.education}
      colorScheme="indigo"
      itemVariants={itemVariants}
      sectionKey="education"
      data={education}
    >
      <div className="space-y-6">
        {education?.map((edu, index) => (
          <div
            key={`education-${edu.institution || "unknown"}-${index}`}
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        clipRule="evenodd"
                        d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 000 2h8a1 1 0 100-2H6z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {edu.url ? (
                        <Link
                          isExternal
                          className="hover:text-indigo-600 dark:hover:text-indigo-400"
                          href={edu.url}
                        >
                          {edu.institution}
                        </Link>
                      ) : (
                        edu.institution
                      )}
                    </h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                      {edu.studyType} in {edu.area}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {edu.startDate && (
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          clipRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          fillRule="evenodd"
                        />
                      </svg>
                      <span>
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
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
          </div>
        ))}
      </div>
    </SectionCard>
  );
};