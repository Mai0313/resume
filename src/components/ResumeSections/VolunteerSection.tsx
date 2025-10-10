import type { JSONResumeVolunteer } from "@/utils/resumeLoader";

import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

import {
  ItemCard,
  IconBadge,
  ExternalLink,
  DateRange,
  BulletList,
  UsersIcon,
} from "@/components/shared";

interface VolunteerSectionProps {
  volunteer: JSONResumeVolunteer[] | undefined;
  itemVariants: Variants;
}

export const VolunteerSection: React.FC<VolunteerSectionProps> = ({
  volunteer,
  itemVariants,
}) => {
  return (
    <SectionCard
      colorScheme="pink"
      data={volunteer}
      icon={SectionIcons.volunteer}
      itemVariants={itemVariants}
      sectionKey="volunteer"
      title="Volunteer & Community Engagement"
    >
      <div className="space-y-6">
        {volunteer?.map((volunteerItem, index) => (
          <div
            key={`volunteer-${volunteerItem.organization || "unknown"}-${index}`}
          >
            <ItemCard>
              <div className="flex items-start gap-4">
                <IconBadge
                  gradientFrom="pink-500"
                  gradientTo="pink-600"
                  icon={<UsersIcon />}
                />

                <div className="flex-grow">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {volunteerItem.organization}
                      </h3>
                      <p className="text-lg text-pink-600 dark:text-pink-400 font-semibold mb-2">
                        {volunteerItem.position}
                      </p>
                    </div>
                    <div className="mt-2 lg:mt-0 lg:text-right">
                      {(volunteerItem.startDate || volunteerItem.endDate) && (
                        <span className="inline-flex items-center px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 text-sm font-medium rounded-full">
                          <DateRange
                            endDate={volunteerItem.endDate || "Present"}
                            startDate={volunteerItem.startDate}
                          />
                        </span>
                      )}
                    </div>
                  </div>

                  {volunteerItem.summary && (
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {volunteerItem.summary}
                    </p>
                  )}

                  {volunteerItem.highlights &&
                    volunteerItem.highlights.length > 0 && (
                      <BulletList
                        bulletColor="pink-500"
                        items={volunteerItem.highlights}
                        title="Key Contributions:"
                      />
                    )}

                  {volunteerItem.url && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <ExternalLink
                        className="text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300 text-sm font-medium"
                        url={volunteerItem.url}
                      >
                        Organization Website
                      </ExternalLink>
                    </div>
                  )}
                </div>
              </div>
            </ItemCard>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};
