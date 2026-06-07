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
  const visibleSections = data.sectionOrder.filter(
    (sectionName) => !(languages && sectionName === languages.key),
  );

  return (
    <m.div
      animate="visible"
      className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 pb-24 pt-28 sm:px-6 sm:pt-36 lg:grid-cols-[minmax(270px,340px)_minmax(0,1fr)] lg:gap-12 lg:pt-36"
      initial="hidden"
      variants={containerVariants}
    >
      <m.div
        className="lg:sticky lg:top-28 lg:self-start"
        variants={itemVariants}
      >
        <ResumeHeader cv={cv} languages={languages} />
      </m.div>

      <div className="space-y-12 lg:space-y-14">
        {visibleSections.map((sectionName, index) => {
          return (
            <ResumeSectionRenderer
              key={sectionName}
              entries={cv.sections[sectionName]}
              itemVariants={itemVariants}
              sectionIndex={index + 1}
              sectionName={sectionName}
            />
          );
        })}
      </div>
    </m.div>
  );
};
