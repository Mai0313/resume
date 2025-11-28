import type { ResumeData } from "../utils/resumeLoader";

import React from "react";
import { Chip } from "@heroui/chip";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/button";

import {
  WorkSection,
  VolunteerSection,
  EducationSection,
  AwardsSection,
  CertificatesSection,
  PublicationsSection,
  SkillsSection,
  InterestsSection,
  ReferencesSection,
  ProjectsSection,
} from "./ResumeSections";

import { fadeInStagger } from "@/utils/animations";
import { envHelpers } from "@/utils/env";

interface ResumeContentProps {
  data: ResumeData & { sectionOrder: string[] };
}

export const ResumeContent: React.FC<ResumeContentProps> = ({ data }) => {
  // fadeInStagger is a static constant, no need to memoize
  const { container: containerVariants, item: itemVariants } = fadeInStagger;

  // Simplified section component map with generic factory
  const sectionComponentMap = React.useMemo(() => {
    // Generic component factory to reduce repetition
    const createSectionComponent = <T,>(
      Component: React.ComponentType<any>,
      propName: string,
      propValue: T,
    ) => {
      if (!propValue) return null;

      const WrapperComponent = (props: any) => (
        <Component {...props} {...{ [propName]: propValue }} />
      );

      WrapperComponent.displayName = `${Component.displayName || Component.name || "Component"}Wrapper`;

      return WrapperComponent;
    };

    return {
      work: createSectionComponent(WorkSection, "work", data.work),
      volunteer: createSectionComponent(
        VolunteerSection,
        "volunteer",
        data.volunteer,
      ),
      education: createSectionComponent(
        EducationSection,
        "education",
        data.education,
      ),
      awards: createSectionComponent(AwardsSection, "awards", data.awards),
      certificates: createSectionComponent(
        CertificatesSection,
        "certificates",
        data.certificates,
      ),
      publications: createSectionComponent(
        PublicationsSection,
        "publications",
        data.publications,
      ),
      skills: createSectionComponent(SkillsSection, "skills", data.skills),
      interests: createSectionComponent(
        InterestsSection,
        "interests",
        data.interests,
      ),
      languages: null,
      references: data.references
        ? (props: any) => <ReferencesSection {...props} data={data} />
        : null,
      projects: data.projects
        ? (props: any) => <ProjectsSection {...props} data={data} />
        : null,
    };
  }, [data]);

  // Dynamic section rendering function
  const renderSection = React.useCallback(
    (sectionName: string) => {
      const Component =
        sectionComponentMap[sectionName as keyof typeof sectionComponentMap];

      if (!Component) return null;

      return <Component key={sectionName} itemVariants={itemVariants} />;
    },
    [sectionComponentMap, itemVariants],
  );

  // Defensive check: ensure data structure is complete
  if (!data || !data.basics || !data.basics.name) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg mx-auto p-8"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Invalid Resume Data
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              The resume data appears to be incomplete or corrupted. Essential
              information like basic details are missing.
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
            <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
              Expected Structure:
            </h4>
            <pre className="text-xs text-left text-orange-700 dark:text-orange-300 font-mono bg-orange-100 dark:bg-orange-800/30 p-2 rounded">
              {`basics:
  name: "Your Name"
  email: "your@email.com"
  # ... other fields`}
            </pre>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      animate="visible"
      className="max-w-6xl mx-auto p-4 md:p-8 space-y-12"
      initial="hidden"
      variants={containerVariants}
    >
      {/* Header Section with Glassmorphism Card */}
      <motion.div variants={itemVariants}>
        <div className="relative overflow-hidden rounded-3xl bg-white/50 dark:bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl p-8 md:p-12">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-gradient-to-tr from-pink-500/20 to-orange-500/20 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center md:items-start">
            {/* Profile Image with Glow */}
            {data.basics.image && (
              <div className="relative group shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <img
                  alt={`${data.basics.name} profile`}
                  className="relative w-48 h-48 rounded-full object-cover ring-4 ring-white/50 dark:ring-white/10 shadow-2xl"
                  src={data.basics.image}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;

                    target.style.display = "none";
                    target.nextElementSibling?.classList.remove("hidden");
                  }}
                />
                <div className="hidden relative w-48 h-48 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center ring-4 ring-white/50 dark:ring-white/10 shadow-2xl">
                  <span className="text-5xl font-bold text-gray-400">
                    {data.basics.name?.charAt(0) || "U"}
                  </span>
                </div>
              </div>
            )}

            {/* Info */}
            <div className="flex-1 text-center md:text-left space-y-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 pb-2">
                  {data.basics.name}
                </h1>
                {data.basics.label && (
                  <p className="text-2xl text-blue-600 dark:text-blue-400 font-medium mt-2">
                    {data.basics.label}
                  </p>
                )}
              </div>

              {data.basics.summary && (
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
                  {data.basics.summary}
                </p>
              )}

              {/* Contact & Social */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                {data.basics.email && (
                  <Button
                    isIconOnly
                    as={Link}
                    className="bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 shadow-sm backdrop-blur-md"
                    href={`mailto:${data.basics.email}`}
                    size="md"
                    variant="flat"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                      />
                    </svg>
                  </Button>
                )}
                {data.basics.profiles?.map((profile, index) => (
                  <Button
                    key={index}
                    isExternal
                    isIconOnly
                    as={Link}
                    className="bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 shadow-sm backdrop-blur-md"
                    href={profile.url}
                    size="md"
                    variant="flat"
                  >
                    {profile.network === "GitHub" && (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    )}
                    {profile.network === "LinkedIn" && (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    )}
                    {!["GitHub", "LinkedIn"].includes(profile.network) && (
                      <span className="text-sm font-bold">
                        {profile.network[0]}
                      </span>
                    )}
                  </Button>
                ))}

                <Button
                  isIconOnly
                  className="bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 shadow-sm backdrop-blur-md"
                  size="md"
                  variant="flat"
                  onClick={() => {
                    const link = document.createElement("a");

                    link.href = envHelpers.getResumePdfPath();
                    link.download = "resume.pdf";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                    />
                  </svg>
                </Button>
              </div>

              {/* Languages */}
              {data.languages && (
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                  {data.languages.map((lang, index) => (
                    <Chip
                      key={index}
                      className="border-gray-200 dark:border-white/20 bg-white/50 dark:bg-white/5 backdrop-blur-sm"
                      size="sm"
                      variant="bordered"
                    >
                      <span className="font-medium text-gray-700 dark:text-gray-200">
                        {lang.language}
                      </span>
                      <span className="text-gray-400 mx-1">•</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {lang.fluency}
                      </span>
                    </Chip>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dynamically render other sections according to YAML file order */}
      <div className="grid grid-cols-1 gap-12">
        {data.sectionOrder.map((sectionName) => renderSection(sectionName))}
      </div>
    </motion.div>
  );
};

ResumeContent.displayName = "ResumeContent";
