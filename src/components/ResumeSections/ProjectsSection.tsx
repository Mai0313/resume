import type { JSONResumeProject } from "@/utils/resumeLoader";

import React from "react";
import { Chip } from "@heroui/chip";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

import {
  ItemCard,
  ExternalLink,
  DateRange,
  BulletList,
  BuildingIcon,
} from "@/components/shared";

interface ProjectsSectionProps {
  data:
    | {
        projects?: JSONResumeProject[];
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
      colorScheme="green"
      data={data?.projects}
      icon={SectionIcons.projects}
      itemVariants={itemVariants}
      sectionKey="projects"
      title="Projects"
    >
      <div className="space-y-6">
        {data?.projects?.map((proj, idx) => (
          <ItemCard key={`project-${idx}-${proj.name || ""}`}>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                <ExternalLink url={proj.url}>{proj.name}</ExternalLink>
              </h3>
              <DateRange
                className="mb-2"
                endDate={proj.endDate}
                startDate={proj.startDate}
              />
            </div>

            {proj.entity && (
              <div className="flex items-center gap-2 mb-3">
                <BuildingIcon className="w-4 h-4 text-gray-500" />
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
                  {proj.roles.map((role, i) => (
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
              <BulletList
                bulletColor="purple-500"
                className="mb-4"
                items={proj.highlights}
                title="Key Highlights:"
              />
            )}

            {proj.keywords && proj.keywords.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex flex-wrap gap-1">
                  {proj.keywords.map((keyword, i) => (
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
          </ItemCard>
        ))}
      </div>
    </SectionCard>
  );
};
