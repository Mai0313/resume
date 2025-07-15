import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { motion } from "framer-motion";

interface SkillsSectionProps {
  skills: any[] | undefined;
  itemVariants: any;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  itemVariants,
}) => {
  if (!skills || skills.length === 0) return null;

  return (
    <motion.div key="skills" variants={itemVariants}>
      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Skills & Expertise
            </h2>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {skills.map((skill: any, index: number) => (
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
        </CardBody>
      </Card>
    </motion.div>
  );
};
