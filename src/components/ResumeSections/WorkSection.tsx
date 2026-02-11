import type { ExperienceItem } from "@/utils/resumeLoader";

import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

import {
  ItemCard,
  ExternalLink,
  LocationIcon,
} from "@/components/shared";

interface WorkSectionProps {
  work: ExperienceItem[] | undefined;
  itemVariants: Variants;
}

export const WorkSection: React.FC<WorkSectionProps> = ({
  work,
  itemVariants,
}) => {
  const visibleWork = work?.filter((item) => !item.hidden);
  
  return (
    <SectionCard
      colorScheme="blue"
      data={visibleWork}
      icon={SectionIcons.work}
      itemVariants={itemVariants}
      sectionKey="experience"
      title="Work Experience"
    >
      <div className="space-y-8">
        {visibleWork?.map((workItem, index) => (
          <div
            key={workItem.id || `work-${index}`}
            className="pb-8 last:pb-0"
          >
            <ItemCard>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {workItem.company}
                  </h3>
                  <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">
                    {workItem.position}
                  </p>
                  {workItem.location && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <LocationIcon />
                      {workItem.location}
                    </p>
                  )}
                </div>
                <div className="mt-2 lg:mt-0 lg:text-right">
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                    {workItem.period}
                  </span>
                </div>
              </div>

              {workItem.description && (
                <div 
                  className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: workItem.description }}
                />
              )}

              {workItem.website?.url && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <ExternalLink
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                    url={workItem.website.url}
                  >
                    {workItem.website.label || "Company Website"}
                  </ExternalLink>
                </div>
              )}
            </ItemCard>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};
