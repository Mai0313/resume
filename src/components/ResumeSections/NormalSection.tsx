import type { NormalEntry } from "@/utils/resumeLoader";

import React from "react";
import { Chip } from "@heroui/chip";
import { Variants } from "framer-motion";

import { SectionCard, getSectionConfig } from "./SectionCard";

import {
  ItemCard,
  ExternalLink,
  DateRange,
  BulletList,
  BuildingIcon,
  LocationIcon,
} from "@/components/shared";

interface NormalSectionProps {
  entries: NormalEntry[] | undefined;
  sectionName: string;
  itemVariants: Variants;
}

/**
 * Renders a rendercv section containing NormalEntry items.
 * Used as the generic renderer for sections like Projects, Awards,
 * Certificates, and References. Uses a two-column grid for simple entries
 * (no highlights) and a single column for complex ones.
 */
export const NormalSection: React.FC<NormalSectionProps> = ({
  entries,
  sectionName,
  itemVariants,
}) => {
  const { colorScheme, displayTitle, icon } = getSectionConfig(sectionName);

  const hasComplexEntries = !!entries?.some(
    (entry) =>
      (entry.highlights && entry.highlights.length > 0) ||
      (entry.keywords && entry.keywords.length > 0) ||
      (entry.roles && entry.roles.length > 0) ||
      (entry.summary && entry.summary.length > 200),
  );

  const layoutClass = hasComplexEntries
    ? "space-y-6"
    : "grid grid-cols-1 lg:grid-cols-2 gap-6";

  return (
    <SectionCard
      colorScheme={colorScheme}
      data={entries}
      icon={icon}
      itemVariants={itemVariants}
      sectionKey={sectionName}
      title={displayTitle}
    >
      <div className={layoutClass}>
        {entries?.map((entry, index) => (
          <ItemCard key={`${sectionName}-${index}-${entry.name || ""}`}>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                <ExternalLink url={entry.url}>{entry.name}</ExternalLink>
              </h3>
              {(entry.start_date || entry.end_date || entry.date) && (
                <DateRange
                  className="mb-2"
                  endDate={entry.date ?? entry.end_date}
                  startDate={entry.start_date}
                />
              )}
            </div>

            {(entry.entity || entry.issuer) && (
              <div className="flex items-center gap-2 mb-3">
                <BuildingIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                  {entry.entity ?? entry.issuer}
                </span>
              </div>
            )}

            {entry.location && (
              <div className="flex items-center gap-2 mb-3">
                <LocationIcon />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {entry.location}
                </span>
              </div>
            )}

            {entry.summary && (
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                {entry.summary}
              </p>
            )}

            {entry.roles && entry.roles.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {entry.roles.map((role, i) => (
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

            {entry.highlights && entry.highlights.length > 0 && (
              <BulletList
                bulletColor="purple-500"
                className="mb-4"
                items={entry.highlights}
                title="Key Highlights:"
              />
            )}

            {entry.keywords && entry.keywords.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex flex-wrap gap-1">
                  {entry.keywords.map((keyword, i) => (
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
