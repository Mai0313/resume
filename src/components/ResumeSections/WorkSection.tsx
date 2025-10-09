import type { JSONResumeWork } from "@/utils/resumeLoader";

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";
import { motion, Variants } from "framer-motion";

interface WorkSectionProps {
  work: JSONResumeWork[] | undefined;
  itemVariants: Variants;
}

export const WorkSection: React.FC<WorkSectionProps> = ({
  work,
  itemVariants,
}) => {
  if (!work || work.length === 0) return null;

  return (
    <motion.div key="work" variants={itemVariants}>
      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Work Experience
            </h2>
          </div>
        </CardHeader>
        <CardBody className="space-y-8">
          {work.map((workItem, index) => (
            <div
              key={`work-${workItem.name || "unknown"}-${index}`}
              className="pb-8 last:pb-0"
            >
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                      {workItem.name}
                    </h3>
                    <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">
                      {workItem.position}
                    </p>
                    {workItem.location && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            clipRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            fillRule="evenodd"
                          />
                        </svg>
                        {workItem.location}
                      </p>
                    )}
                  </div>
                  <div className="mt-2 lg:mt-0 lg:text-right">
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          clipRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          fillRule="evenodd"
                        />
                      </svg>
                      {workItem.startDate} - {workItem.endDate || "Present"}
                    </span>
                  </div>
                </div>

                {workItem.description && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 italic">
                    {workItem.description}
                  </p>
                )}

                {workItem.summary && (
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {workItem.summary}
                  </p>
                )}

                {workItem.highlights && workItem.highlights.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-2">
                      {workItem.highlights.map(
                        (highlight: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm leading-relaxed">
                              {highlight}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}

                {workItem.url && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      isExternal
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                      href={workItem.url}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                      Company Website
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </motion.div>
  );
};
