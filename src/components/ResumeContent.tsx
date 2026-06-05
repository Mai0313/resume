import type { LoadedResumeData } from "@/utils/resume";

import { m } from "framer-motion";

import { ResumeHeader } from "./ResumeHeader";
import { findLanguagesSection } from "./ResumeSections/languages";
import { ResumeSectionRenderer } from "./ResumeSections/ResumeSectionRenderer";

import { fadeInStagger } from "@/utils/animations";

interface ResumeContentProps {
  data: LoadedResumeData;
}

export const ResumeContent = ({ data }: ResumeContentProps) => {
  const { container: containerVariants, item: itemVariants } = fadeInStagger;
  const { cv } = data;
  const languages = findLanguagesSection(cv.sections);

  return (
    <m.div
      animate="visible"
      className="mx-auto max-w-4xl px-6 pb-24 pt-32 sm:pt-40"
      initial="hidden"
      variants={containerVariants}
    >
      <m.div variants={itemVariants}>
        <ResumeHeader cv={cv} languages={languages} />
      </m.div>

      <div className="space-y-20 md:space-y-24">
        {data.sectionOrder.map((sectionName) => {
          if (languages && sectionName === languages.key) {
            return null;
          }

          return (
            <ResumeSectionRenderer
              key={sectionName}
              entries={cv.sections[sectionName]}
              itemVariants={itemVariants}
              sectionName={sectionName}
            />
          );
        })}
      </div>
    </m.div>
  );
};
