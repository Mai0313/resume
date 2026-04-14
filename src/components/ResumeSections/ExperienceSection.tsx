import type { ExperienceEntry } from "@/utils/resumeLoader";

import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, getSectionConfig } from "./SectionCard";

import {
  ItemCard,
  ExternalLink,
  DateRange,
  BulletList,
  LocationIcon,
} from "@/components/shared";

interface ExperienceSectionProps {
  entries: ExperienceEntry[] | undefined;
  sectionName: string;
  itemVariants: Variants;
}

/**
 * Renders a rendercv section containing ExperienceEntry items.
 * Used for Experience, Volunteer, and any other section with {company, position}.
 */
export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  entries,
  sectionName,
  itemVariants,
}) => {
  const { colorScheme, displayTitle } = getSectionConfig(sectionName);

  return (
    <SectionCard
      colorScheme={colorScheme}
      data={entries}
      itemVariants={itemVariants}
      sectionKey={sectionName}
      title={displayTitle}
    >
      <div className="space-y-8">
        {entries?.map((entry, index) => (
          <div
            key={`${sectionName}-${entry.company || "unknown"}-${index}`}
            className="pb-8 last:pb-0"
          >
            <ItemCard>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {entry.company}
                  </h3>
                  <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">
                    {entry.position}
                  </p>
                  {entry.location && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <LocationIcon />
                      {entry.location}
                    </p>
                  )}
                </div>
                <div className="mt-2 lg:mt-0 lg:text-right">
                  {(entry.start_date || entry.end_date || entry.date) && (
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                      <DateRange
                        endDate={entry.date ?? (entry.end_date || "Present")}
                        startDate={entry.start_date}
                      />
                    </span>
                  )}
                </div>
              </div>

              {entry.description && (
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 italic">
                  {entry.description}
                </p>
              )}

              {entry.summary && (
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {entry.summary}
                </p>
              )}

              {entry.highlights && entry.highlights.length > 0 && (
                <BulletList
                  bulletColor="blue-500"
                  items={entry.highlights}
                  title="Key Achievements:"
                />
              )}

              {entry.url && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <ExternalLink
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                    url={entry.url}
                  >
                    Website
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
