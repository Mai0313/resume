import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

import {
  ItemCard,
  ExternalLink,
  BuildingIcon,
} from "@/components/shared";
import { AwardItem } from "@/utils/resumeLoader";

interface AwardsSectionProps {
  awards: AwardItem[] | undefined;
  itemVariants: Variants;
}

export const AwardsSection: React.FC<AwardsSectionProps> = ({
  awards,
  itemVariants,
}) => {
  const visibleAwards = awards?.filter(item => !item.hidden);
  
  return (
    <SectionCard
      colorScheme="yellow"
      data={visibleAwards}
      icon={SectionIcons.awards}
      itemVariants={itemVariants}
      sectionKey="awards"
      title="Awards & Recognition"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {visibleAwards?.map((award: AwardItem, index: number) => (
          <ItemCard key={award.id || `award-${index}`}>
            <div className="flex-grow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                {award.website?.url ? (
                  <ExternalLink
                    className="hover:text-yellow-600 dark:hover:text-yellow-400"
                    url={award.website.url}
                  >
                    {award.title}
                  </ExternalLink>
                ) : (
                  award.title
                )}
              </h3>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <BuildingIcon className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-yellow-700 dark:text-yellow-300 font-semibold">
                    {award.awarder}
                  </span>
                </div>
                {award.date && (
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {award.date}
                  </span>
                )}
              </div>

              {award.description && (
                <div 
                  className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: award.description }}
                />
              )}
            </div>
          </ItemCard>
        ))}
      </div>
    </SectionCard>
  );
};
