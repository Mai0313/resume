import type { ProjectItem } from "@/utils/resumeLoader";

import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

import {
  ItemCard,
  ExternalLink,
} from "@/components/shared";

interface ProjectsSectionProps {
  data:
    | {
        sections: {
          projects?: {
            items?: ProjectItem[];
          };
        };
      }
    | undefined;
  itemVariants: Variants;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  data,
  itemVariants,
}) => {
  const visibleProjects = data?.sections?.projects?.items?.filter(item => !item.hidden);
  
  return (
    <SectionCard
      colorScheme="green"
      data={visibleProjects}
      icon={SectionIcons.projects}
      itemVariants={itemVariants}
      sectionKey="projects"
      title="Projects"
    >
      <div className="space-y-6">
        {visibleProjects?.map((proj, idx) => (
          <ItemCard key={proj.id || `project-${idx}`}>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                {proj.website?.url ? (
                  <ExternalLink url={proj.website.url}>
                    {proj.name}
                  </ExternalLink>
                ) : (
                  proj.name
                )}
              </h3>
              {proj.period && (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {proj.period}
                </span>
              )}
            </div>

            {proj.description && (
              <div 
                className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: proj.description }}
              />
            )}
          </ItemCard>
        ))}
      </div>
    </SectionCard>
  );
};
