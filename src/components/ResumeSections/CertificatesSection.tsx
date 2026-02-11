import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

import {
  ItemCard,
  ExternalLink,
  BuildingIcon,
} from "@/components/shared";
import { CertificateItem } from "@/utils/resumeLoader";

interface CertificatesSectionProps {
  certificates: CertificateItem[] | undefined;
  itemVariants: Variants;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  certificates,
  itemVariants,
}) => {
  const visibleCertificates = certificates?.filter(item => !item.hidden);
  
  return (
    <SectionCard
      colorScheme="teal"
      data={visibleCertificates}
      icon={SectionIcons.certificates}
      itemVariants={itemVariants}
      sectionKey="certificates"
      title="Certificates"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {visibleCertificates?.map((cert: CertificateItem, index: number) => (
          <ItemCard key={cert.id || `certificate-${index}`}>
            <div className="flex-grow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                {cert.website?.url ? (
                  <ExternalLink
                    className="hover:text-emerald-600 dark:hover:text-emerald-400"
                    url={cert.website.url}
                  >
                    {cert.title}
                  </ExternalLink>
                ) : (
                  cert.title
                )}
              </h3>

              {cert.issuer && (
                <div className="flex items-center gap-2 mb-3">
                  <BuildingIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-300 font-semibold">
                    {cert.issuer}
                  </span>
                </div>
              )}

              {cert.date && (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {cert.date}
                </span>
              )}
            </div>
          </ItemCard>
        ))}
      </div>
    </SectionCard>
  );
};
