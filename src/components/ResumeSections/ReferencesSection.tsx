import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

interface ReferencesSectionProps {
  data:
    | {
        references?: Array<{
          name?: string;
          title?: string;
          company?: string;
          email?: string;
          reference?: string;
        }>;
      }
    | undefined;
  itemVariants: Variants;
}

export const ReferencesSection: React.FC<ReferencesSectionProps> = ({
  data,
  itemVariants,
}) => {
  return (
    <SectionCard
      title="References"
      icon={SectionIcons.references}
      colorScheme="red"
      itemVariants={itemVariants}
      sectionKey="references"
      data={data?.references}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data?.references?.map((ref: any, idx: number) => (
          <div
            key={`reference-${idx}-${ref.name || ""}`}
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>

              <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {ref.name}
                </h3>

                {ref.title && (
                  <div className="flex items-center gap-2 mb-3">
                    <svg
                      className="w-4 h-4 text-violet-600 dark:text-violet-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        clipRule="evenodd"
                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                        fillRule="evenodd"
                      />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    <span className="text-violet-700 dark:text-violet-300 font-semibold text-sm">
                      {ref.title}
                    </span>
                  </div>
                )}

                {ref.company && (
                  <div className="flex items-center gap-2 mb-3">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        clipRule="evenodd"
                        d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                        fillRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      {ref.company}
                    </span>
                  </div>
                )}

                {ref.email && (
                  <div className="flex items-center gap-2 mb-4">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      {ref.email}
                    </span>
                  </div>
                )}

                {ref.reference && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic">
                      &ldquo;{ref.reference}&rdquo;
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
