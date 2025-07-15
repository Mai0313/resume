import type { ResumeData } from "../utils/resumeLoader";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";

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

interface ResumeContentProps {
  data: ResumeData & { sectionOrder: string[] };
}

export const ResumeContent: React.FC<ResumeContentProps> = ({ data }) => {
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
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Dynamic section rendering function
  const renderSection = (sectionName: string) => {
    switch (sectionName) {
      case "work":
        return (
          <WorkSection
            key="work"
            itemVariants={itemVariants}
            work={data.work}
          />
        );
      case "volunteer":
        return (
          <VolunteerSection
            key="volunteer"
            itemVariants={itemVariants}
            volunteer={data.volunteer}
          />
        );
      case "education":
        return (
          <EducationSection
            key="education"
            education={data.education}
            itemVariants={itemVariants}
          />
        );
      case "awards":
        return (
          <AwardsSection
            key="awards"
            awards={data.awards}
            itemVariants={itemVariants}
          />
        );
      case "certificates":
        return (
          <CertificatesSection
            key="certificates"
            certificates={data.certificates}
            itemVariants={itemVariants}
          />
        );
      case "publications":
        return (
          <PublicationsSection
            key="publications"
            itemVariants={itemVariants}
            publications={data.publications}
          />
        );
      case "skills":
        return (
          <SkillsSection
            key="skills"
            itemVariants={itemVariants}
            skills={data.skills}
          />
        );
      case "interests":
        return (
          <InterestsSection
            key="interests"
            interests={data.interests}
            itemVariants={itemVariants}
          />
        );
      case "languages":
        // languages already displayed in header section, skip here
        return null;
      case "references":
        return (
          <ReferencesSection
            key="references"
            data={data}
            itemVariants={itemVariants}
          />
        );
      case "projects":
        return (
          <ProjectsSection
            key="projects"
            data={data}
            itemVariants={itemVariants}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      animate="visible"
      className="max-w-6xl mx-auto p-6 space-y-8"
      initial="hidden"
      variants={containerVariants}
    >
      {/* Header Section with Photo - Always at the front */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 hover:shadow-lg transition-all duration-300">
          <CardBody className="p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Profile Image */}
              {data.basics.image && (
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      alt={`${data.basics.name} profile`}
                      className="w-48 h-48 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-xl"
                      src={data.basics.image}
                      onError={(e) => {
                        // Fallback to a default avatar if image fails to load
                        const target = e.target as HTMLImageElement;

                        target.style.display = "none";
                        target.nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                    {/* Fallback avatar */}
                    <div className="hidden w-48 h-48 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center border-4 border-white dark:border-gray-700 shadow-xl">
                      <span className="text-white text-4xl font-bold">
                        {data.basics.name?.charAt(0) || "U"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Personal Information */}
              <div className="flex-grow text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {data.basics.name}
                </h1>
                {data.basics.label && (
                  <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-6 font-medium">
                    {data.basics.label}
                  </p>
                )}
                {data.basics.summary && (
                  <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {data.basics.summary}
                  </p>
                )}

                {/* Contact Information */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {data.basics.email && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span>{data.basics.email}</span>
                    </div>
                  )}
                  {data.basics.location && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          clipRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          fillRule="evenodd"
                        />
                      </svg>
                      <span>
                        {data.basics.location.city},{" "}
                        {data.basics.location.region}
                      </span>
                    </div>
                  )}
                </div>

                {/* Social Profiles */}
                {data.basics.profiles && (
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-4">
                    {data.basics.profiles.map((profile: any, index: number) => (
                      <Link
                        key={index}
                        isExternal
                        className="inline-flex items-center gap-2 px-3 py-2 bg-white/70 dark:bg-gray-700/70 rounded-lg text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 transition-colors border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                        href={profile.url}
                      >
                        {profile.network === "GitHub" && (
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              clipRule="evenodd"
                              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                              fillRule="evenodd"
                            />
                          </svg>
                        )}
                        {profile.network === "LinkedIn" && (
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              clipRule="evenodd"
                              d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                              fillRule="evenodd"
                            />
                          </svg>
                        )}
                        <span className="text-sm font-medium">
                          {profile.username}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Languages */}
                {data.languages && (
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                    {data.languages.map((lang: any, index: number) => (
                      <Chip
                        key={index}
                        className="bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200"
                        color="primary"
                        size="sm"
                        variant="flat"
                      >
                        {lang.language}: {lang.fluency}
                      </Chip>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Dynamically render other sections according to YAML file order */}
      {data.sectionOrder.map((sectionName: string) =>
        renderSection(sectionName),
      )}
    </motion.div>
  );
};
