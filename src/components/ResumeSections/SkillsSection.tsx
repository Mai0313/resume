import type { JSONResumeSkill } from "@/utils/resumeLoader";

import React from "react";
import { Chip } from "@heroui/chip";
import { Variants } from "framer-motion";

import { SectionCard, SectionIcons } from "./SectionCard";

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
      title="Skills & Expertise"
      icon={SectionIcons.skills}
      colorScheme="orange"
      itemVariants={itemVariants}
      sectionKey="skills"
      data={skills}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {skills?.map((skill, index) => (
          <div
            key={`skill-${skill.name || "unknown"}-${index}`}
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
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
                {skill.keywords.map((keyword: string, i: number) => (
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
          </div>
        ))}
      </div>
    </SectionCard>
  );
};
