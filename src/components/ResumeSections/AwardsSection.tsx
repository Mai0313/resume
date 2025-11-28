import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

import {
  ItemCard,
  ExternalLink,
  DateRange,
  BuildingIcon,
} from "@/components/shared";
import { JSONResumeAward } from "@/utils/resumeLoader";

interface AwardsSectionProps {
  awards: JSONResumeAward[] | undefined;
  itemVariants: Variants;
}

export const AwardsSection: React.FC<AwardsSectionProps> = ({
  awards,
  itemVariants,
}) => {
  return (
    <SectionCard
      colorScheme="yellow"
      data={awards}
      icon={SectionIcons.awards}
      itemVariants={itemVariants}
      sectionKey="awards"
      title="Awards & Recognition"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {awards?.map((award: JSONResumeAward, index: number) => (
          <ItemCard key={`award-${award.title || "unknown"}-${index}`}>
            <div className="flex-grow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                <ExternalLink
                  className="hover:text-yellow-600 dark:hover:text-yellow-400"
                  url={award.url}
                >
                  {award.title}
                </ExternalLink>
              </h3>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <BuildingIcon className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-yellow-700 dark:text-yellow-300 font-semibold">
                    {award.awarder}
                  </span>
                </div>
                <DateRange startDate={award.date} />
              </div>

              {award.summary && (
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {award.summary}
                </p>
              )}
            </div>
          </ItemCard>
        ))}
      </div>
    </SectionCard>
  );
};
