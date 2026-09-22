import type { LoadedResumeData } from "@/utils/resume";

import { ResumeHeader } from "./ResumeHeader";
import { findLanguagesSection } from "./ResumeSections/languages";
import { ResumeSectionRenderer } from "./ResumeSections/ResumeSectionRenderer";

interface ResumeContentProps {
  data: LoadedResumeData;
}

export const ResumeContent = ({ data }: ResumeContentProps) => {
  const { cv } = data;
  const languages = findLanguagesSection(cv.sections);

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32 sm:pt-40">
      <div className="reveal-on-load">
        <ResumeHeader cv={cv} languages={languages} />
      </div>

      <div className="reveal-stagger space-y-6 md:space-y-8">
        {data.sectionOrder.map((sectionName) => {
          if (languages && sectionName === languages.key) {
            return null;
          }

          return (
            <div key={sectionName}>
              <ResumeSectionRenderer
                entries={cv.sections[sectionName]}
                sectionName={sectionName}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
