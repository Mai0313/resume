import React from "react";
import { Link } from "@heroui/link";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

interface AwardsSectionProps {
  awards: any[] | undefined;
  itemVariants: Variants;
}

export const AwardsSection: React.FC<AwardsSectionProps> = ({
  awards,
  itemVariants,
}) => {
  return (
    <SectionCard
      title="Awards & Recognition"
      icon={SectionIcons.awards}
      colorScheme="yellow"
      itemVariants={itemVariants}
      sectionKey="awards"
      data={awards}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {awards?.map((award: any, index: number) => (
          <div
            key={`award-${award.title || "unknown"}-${index}`}
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>

              <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {award.url ? (
                    <Link
                      isExternal
                      className="hover:text-yellow-600 dark:hover:text-yellow-400 flex items-center gap-2"
                      href={award.url}
                    >
                      {award.title}
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
                    </Link>
                  ) : (
                    award.title
                  )}
                </h3>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-yellow-600 dark:text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        clipRule="evenodd"
                        d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 000 2h8a1 1 0 100-2H6z"
                        fillRule="evenodd"
                      />
                    </svg>
                    <span className="text-yellow-700 dark:text-yellow-300 font-semibold">
                      {award.awarder}
                    </span>
                  </div>
                  {award.date && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          clipRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          fillRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        {award.date}
                      </span>
                    </div>
                  )}
                </div>

                {award.summary && (
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {award.summary}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};
