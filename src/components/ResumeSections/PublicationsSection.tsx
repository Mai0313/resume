import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

import {
  ItemCard,
  ExternalLink,
  BuildingIcon,
} from "@/components/shared";
import { PublicationItem } from "@/utils/resumeLoader";

interface PublicationsSectionProps {
  publications: PublicationItem[] | undefined;
  itemVariants: Variants;
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({
  publications,
  itemVariants,
}) => {
  const visiblePublications = publications?.filter(item => !item.hidden);
  
  return (
    <SectionCard
      colorScheme="purple"
      data={visiblePublications}
      icon={SectionIcons.publications}
      itemVariants={itemVariants}
      sectionKey="publications"
      title="Research Publications"
    >
      <div className="space-y-6">
        {visiblePublications?.map(
          (publication: PublicationItem, index: number) => (
            <ItemCard
              key={publication.id || `publication-${index}`}
            >
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                  {publication.website?.url ? (
                    <ExternalLink
                      className="hover:text-blue-600 dark:hover:text-blue-400"
                      url={publication.website.url}
                    >
                      {publication.title}
                    </ExternalLink>
                  ) : (
                    publication.title
                  )}
                </h3>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <BuildingIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-green-700 dark:text-green-300 font-semibold">
                      {publication.publisher}
                    </span>
                  </div>
                  {publication.date && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {publication.date}
                    </span>
                  )}
                </div>

                {publication.description && (
                  <div 
                    className="text-gray-700 dark:text-gray-300 leading-relaxed prose prose-sm dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: publication.description }}
                  />
                )}
              </div>
            </ItemCard>
          ),
        )}
      </div>
    </SectionCard>
  );
};
