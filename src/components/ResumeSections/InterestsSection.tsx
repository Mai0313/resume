import type { JSONResumeInterest } from "@/utils/resumeLoader";

import React from "react";
import { Chip } from "@heroui/chip";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

import { ItemCard, IconBadge, LightBulbIcon } from "@/components/shared";

interface InterestsSectionProps {
  interests: JSONResumeInterest[] | undefined;
  itemVariants: Variants;
}

export const InterestsSection: React.FC<InterestsSectionProps> = ({
  interests,
  itemVariants,
}) => {
  return (
    <SectionCard
      colorScheme="cyan"
      data={interests}
      icon={SectionIcons.interests}
      itemVariants={itemVariants}
      sectionKey="interests"
      title="Research Interests"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {interests?.map((interest, index) => (
          <ItemCard key={`interest-${interest.name || "unknown"}-${index}`}>
            <div className="flex items-start gap-4">
              <IconBadge
                gradientFrom="cyan-500"
                gradientTo="blue-500"
                icon={<LightBulbIcon />}
              />

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
                      {interest.keywords.map((keyword, i) => (
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
              </div>
            </div>
          </ItemCard>
        ))}
      </div>
    </SectionCard>
  );
};
