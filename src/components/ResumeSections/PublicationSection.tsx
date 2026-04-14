import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, getSectionConfig } from "./SectionCard";

import {
  ItemCard,
  ExternalLink,
  DateRange,
  BuildingIcon,
} from "@/components/shared";
import { PublicationEntry } from "@/utils/resumeLoader";

interface PublicationSectionProps {
  entries: PublicationEntry[] | undefined;
  sectionName: string;
  itemVariants: Variants;
}

/**
 * Renders a rendercv section containing PublicationEntry items.
 */
export const PublicationSection: React.FC<PublicationSectionProps> = ({
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
      <div className="space-y-6">
        {entries?.map((publication, index) => (
          <ItemCard
            key={`${sectionName}-${publication.title || "unknown"}-${index}`}
          >
            <div className="flex-grow">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                <ExternalLink
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                  url={
                    publication.url ??
                    (publication.doi
                      ? `https://doi.org/${publication.doi}`
                      : undefined)
                  }
                >
                  {publication.title}
                </ExternalLink>
              </h3>

              {(publication.journal || publication.date) && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                  {publication.journal && (
                    <div className="flex items-center gap-2">
                      <BuildingIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-green-700 dark:text-green-300 font-semibold">
                        {publication.journal}
                      </span>
                    </div>
                  )}
                  {publication.date && (
                    <DateRange startDate={publication.date} />
                  )}
                </div>
              )}

              {publication.authors && publication.authors.length > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {publication.authors.map((author, i) => {
                    const boldMatch = author.match(/^\*\*(.+)\*\*$/);
                    const node = boldMatch ? (
                      <strong className="font-semibold text-gray-800 dark:text-gray-200">
                        {boldMatch[1]}
                      </strong>
                    ) : (
                      author
                    );

                    return (
                      <React.Fragment key={i}>
                        {i > 0 && ", "}
                        {node}
                      </React.Fragment>
                    );
                  })}
                </p>
              )}

              {publication.summary && (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {publication.summary}
                </p>
              )}
            </div>
          </ItemCard>
        ))}
      </div>
    </SectionCard>
  );
};
