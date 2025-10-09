import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

import {
  ItemCard,
  IconBadge,
  ExternalLink,
  DateRange,
  PublicationIcon,
  BuildingIcon,
} from "@/components/shared";
import { JSONResumePublication } from "@/utils/resumeLoader";

interface PublicationsSectionProps {
  publications: JSONResumePublication[] | undefined;
  itemVariants: Variants;
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({
  publications,
  itemVariants,
}) => {
  return (
    <SectionCard
      colorScheme="purple"
      data={publications}
      icon={SectionIcons.publications}
      itemVariants={itemVariants}
      sectionKey="publications"
      title="Research Publications"
    >
      <div className="space-y-6">
        {publications?.map(
          (publication: JSONResumePublication, index: number) => (
            <ItemCard
              key={`publication-${publication.name || "unknown"}-${index}`}
            >
              <div className="flex items-start gap-4">
                <IconBadge
                  gradientFrom="green-500"
                  gradientTo="green-600"
                  icon={<PublicationIcon />}
                />

                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                    <ExternalLink
                      className="hover:text-blue-600 dark:hover:text-blue-400"
                      url={publication.url}
                    >
                      {publication.name}
                    </ExternalLink>
                  </h3>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <BuildingIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-green-700 dark:text-green-300 font-semibold">
                        {publication.publisher}
                      </span>
                    </div>
                    <DateRange startDate={publication.releaseDate} />
                  </div>

                  {publication.summary && (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {publication.summary}
                    </p>
                  )}
                </div>
              </div>
            </ItemCard>
          ),
        )}
      </div>
    </SectionCard>
  );
};
