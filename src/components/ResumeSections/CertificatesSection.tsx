import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

import {
  ItemCard,
  IconBadge,
  ExternalLink,
  DateRange,
  CertificateIcon,
  BuildingIcon,
} from "@/components/shared";
import { JSONResumeCertificate } from "@/utils/resumeLoader";

interface CertificatesSectionProps {
  certificates: JSONResumeCertificate[] | undefined;
  itemVariants: Variants;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  certificates,
  itemVariants,
}) => {
  return (
    <SectionCard
      colorScheme="teal"
      data={certificates}
      icon={SectionIcons.certificates}
      itemVariants={itemVariants}
      sectionKey="certificates"
      title="Certificates"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {certificates?.map((cert: JSONResumeCertificate, index: number) => (
          <ItemCard key={`certificate-${cert.name || "unknown"}-${index}`}>
            <div className="flex items-start gap-4">
              <IconBadge
                gradientFrom="purple-500"
                gradientTo="purple-600"
                icon={<CertificateIcon />}
              />

              <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  <ExternalLink
                    className="hover:text-emerald-600 dark:hover:text-emerald-400"
                    url={cert.url}
                  >
                    {cert.name}
                  </ExternalLink>
                </h3>

                {cert.issuer && (
                  <div className="flex items-center gap-2 mb-3">
                    <BuildingIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-700 dark:text-emerald-300 font-semibold">
                      {cert.issuer}
                    </span>
                  </div>
                )}

                <DateRange startDate={cert.date} />
              </div>
            </div>
          </ItemCard>
        ))}
      </div>
    </SectionCard>
  );
};
