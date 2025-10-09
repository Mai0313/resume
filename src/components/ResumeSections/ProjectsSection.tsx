import React from "react";
import { Chip } from "@heroui/chip";
import { Link } from "@heroui/link";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

interface ProjectsSectionProps {
  data:
    | {
        projects?: Array<{
          name?: string;
          url?: string;
          startDate?: string;
          endDate?: string;
          entity?: string;
          description?: string;
          roles?: string[];
          highlights?: string[];
          keywords?: string[];
        }>;
      }
    | undefined;
  itemVariants: Variants;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  data,
  itemVariants,
}) => {
  return (
    <SectionCard
      title="Projects"
      icon={SectionIcons.projects}
      colorScheme="green"
      itemVariants={itemVariants}
      sectionKey="projects"
      data={data?.projects}
    >
      <div className="space-y-6">
        {data?.projects?.map((proj: any, idx: number) => (
          <div
            key={`project-${idx}-${proj.name || ""}`}
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                {proj.url ? (
                  <Link
                    isExternal
                    className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2"
                    href={proj.url}
                  >
                    {proj.name}
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
                  proj.name
                )}
              </h3>
              {(proj.startDate || proj.endDate) && (
                <div className="flex items-center gap-2 mb-2">
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
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {proj.startDate}
                    {proj.endDate && ` - ${proj.endDate}`}
                  </span>
                </div>
              )}
            </div>

            {proj.entity && (
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
                <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                  {proj.entity}
                </span>
              </div>
            )}

            {proj.description && (
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                {proj.description}
              </p>
            )}

            {proj.roles && proj.roles.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {proj.roles.map((role: string, i: number) => (
                    <Chip
                      key={`role-${i}-${role}`}
                      className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200"
                      color="secondary"
                      size="sm"
                      variant="flat"
                    >
                      {role}
                    </Chip>
                  ))}
                </div>
              </div>
            )}

            {proj.highlights && proj.highlights.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm">
                  Key Highlights:
                </h4>
                <ul className="space-y-1">
                  {proj.highlights.map((h: string, i: number) => (
                    <li
                      key={`highlight-${i}-${h.substring(0, 20)}`}
                      className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400"
                    >
                      <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {proj.keywords && proj.keywords.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex flex-wrap gap-1">
                  {proj.keywords.map((keyword: string, i: number) => (
                    <span
                      key={`keyword-${i}-${keyword}`}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
};
