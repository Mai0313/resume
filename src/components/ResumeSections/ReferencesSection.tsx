import type { JSONResumeReference } from "@/utils/resumeLoader";

import React from "react";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

import {
  ItemCard,
  IconBadge,
  UserIcon,
  BriefcaseIcon,
  BuildingIcon,
  EmailIcon,
} from "@/components/shared";

interface ReferencesSectionProps {
  data:
    | {
        references?: JSONResumeReference[];
      }
    | undefined;
  itemVariants: Variants;
}

export const ReferencesSection: React.FC<ReferencesSectionProps> = ({
  data,
  itemVariants,
}) => {
  return (
    <SectionCard
      colorScheme="red"
      data={data?.references}
      icon={SectionIcons.references}
      itemVariants={itemVariants}
      sectionKey="references"
      title="References"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data?.references?.map((ref, idx) => (
          <ItemCard key={`reference-${idx}-${ref.name || ""}`}>
            <div className="flex items-start gap-4">
              <IconBadge
                gradientFrom="violet-500"
                gradientTo="purple-500"
                icon={<UserIcon className="w-6 h-6 text-white" />}
              />

              <div className="flex-grow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {ref.name}
                </h3>

                {ref.title && (
                  <div className="flex items-center gap-2 mb-3">
                    <BriefcaseIcon className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                    <span className="text-violet-700 dark:text-violet-300 font-semibold text-sm">
                      {ref.title}
                    </span>
                  </div>
                )}

                {ref.company && (
                  <div className="flex items-center gap-2 mb-3">
                    <BuildingIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      {ref.company}
                    </span>
                  </div>
                )}

                {ref.email && (
                  <div className="flex items-center gap-2 mb-4">
                    <EmailIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      {ref.email}
                    </span>
                  </div>
                )}

                {ref.reference && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed italic">
                      &ldquo;{ref.reference}&rdquo;
                    </p>
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
