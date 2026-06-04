import type { LoadedResumeData } from "@/utils/resume";

import { motion } from "framer-motion";
import { Typography } from "@heroui/react";

import { ResumeHeader } from "./ResumeHeader";
import { findLanguagesSection } from "./ResumeSections/languages";
import { ResumeSectionRenderer } from "./ResumeSections/ResumeSectionRenderer";

import { fadeInStagger } from "@/utils/animations";

interface ResumeContentProps {
  data: LoadedResumeData;
}

function InvalidResumeData() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <Typography.Heading
        className="mb-3 text-3xl font-semibold tracking-normal text-foreground"
        level={3}
      >
        Invalid resume data
      </Typography.Heading>
      <Typography className="text-base leading-6 text-muted" type="body">
        The resume file is missing a <Typography.Code>cv.name</Typography.Code>{" "}
        field. Check <Typography.Code>public/resume.yaml</Typography.Code>.
      </Typography>
    </div>
  );
}

export const ResumeContent = ({ data }: ResumeContentProps) => {
  const { container: containerVariants, item: itemVariants } = fadeInStagger;
  const { cv } = data;

  if (!cv || !cv.name) {
    return <InvalidResumeData />;
  }

  const languages = findLanguagesSection(cv.sections);

  return (
    <motion.div
      animate="visible"
      className="mx-auto max-w-4xl px-6 pb-24 pt-32 sm:pt-40"
      initial="hidden"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <ResumeHeader cv={cv} languages={languages} />
      </motion.div>

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
    </motion.div>
  );
};

ResumeContent.displayName = "ResumeContent";
