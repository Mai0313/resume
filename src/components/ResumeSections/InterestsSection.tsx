import React from "react";
import { Chip } from "@heroui/chip";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

interface InterestsSectionProps {
  interests: any[] | undefined;
  itemVariants: Variants;
}

export const InterestsSection: React.FC<InterestsSectionProps> = ({
  interests,
  itemVariants,
}) => {
  return (
    <SectionCard
      title="Research Interests"
      icon={SectionIcons.interests}
      colorScheme="cyan"
      itemVariants={itemVariants}
      sectionKey="interests"
      data={interests}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {interests?.map((interest: any, index: number) => (
          <div
            key={`interest-${interest.name || "unknown"}-${index}`}
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>

              <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {interest.name}
                </h3>

                {interest.keywords && interest.keywords.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm">
                      Research Areas:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {interest.keywords.map((keyword: string, i: number) => (
                        <Chip
                          key={i}
                          className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-200 dark:hover:bg-cyan-800/50 transition-colors"
                          color="primary"
                          size="sm"
                          variant="flat"
                        >
                          {keyword}
                        </Chip>
                      ))}
                    </div>
                  </div>
                )}

                {interest.summary && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      {interest.summary}
                    </p>
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
