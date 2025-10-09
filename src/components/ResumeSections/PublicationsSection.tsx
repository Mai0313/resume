import React from "react";
import { Link } from "@heroui/link";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

interface PublicationsSectionProps {
  publications: any[] | undefined;
  itemVariants: Variants;
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({
  publications,
  itemVariants,
}) => {
  return (
    <SectionCard
      title="Research Publications"
      icon={SectionIcons.publications}
      colorScheme="purple"
      itemVariants={itemVariants}
      sectionKey="publications"
      data={publications}
    >
      <div className="space-y-6">
        {publications?.map((publication: any, index: number) => (
          <div
            key={`publication-${publication.name || "unknown"}-${index}`}
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>

              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                  {publication.url ? (
                    <Link
                      isExternal
                      className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2"
                      href={publication.url}
                    >
                      {publication.name}
                      <svg
                        className="w-5 h-5"
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
                    publication.name
                  )}
                </h3>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-green-600 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        clipRule="evenodd"
                        d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 000 2h8a1 1 0 100-2H6z"
                        fillRule="evenodd"
                      />
                    </svg>
                    <span className="text-green-700 dark:text-green-300 font-semibold">
                      {publication.publisher}
                    </span>
                  </div>
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
                    <span className="text-gray-600 dark:text-gray-400">
                      {publication.releaseDate}
                    </span>
                  </div>
                </div>

                {publication.summary && (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {publication.summary}
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
