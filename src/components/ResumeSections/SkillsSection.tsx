import type { JSONResumeSkill } from "@/utils/resumeLoader";

import React from "react";
import { Chip } from "@heroui/chip";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

import { ItemCard } from "@/components/shared";

interface SkillsSectionProps {
  skills: JSONResumeSkill[] | undefined;
  itemVariants: Variants;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  itemVariants,
}) => {
  return (
    <SectionCard
      colorScheme="orange"
      data={skills}
      icon={SectionIcons.skills}
      itemVariants={itemVariants}
      sectionKey="skills"
      title="Skills & Expertise"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {skills?.map((skill, index) => (
          <ItemCard key={`skill-${skill.name || "unknown"}-${index}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {skill.name}
              </h3>
              {skill.level && (
                <span className="px-3 py-1 bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-sm font-medium rounded-full">
                  {skill.level}
                </span>
              )}
            </div>
            {skill.keywords && skill.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skill.keywords.map((keyword, i) => (
                  <Chip
                    key={i}
                    className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-colors"
                    color="secondary"
                    size="sm"
                    variant="flat"
                  >
                    {keyword}
                  </Chip>
                ))}
              </div>
            )}
          </ItemCard>
        ))}
      </div>
    </SectionCard>
  );
};
