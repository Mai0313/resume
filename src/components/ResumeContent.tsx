import type { ResumeData } from "../utils/resumeLoader";

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
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
} from "./ResumeSections/";

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
            publications={data.publications}
            itemVariants={itemVariants}
          />
        );
      case "skills":
        return (
          <SkillsSection
            key="skills"
            skills={data.skills}
            itemVariants={itemVariants}
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
        return renderReferencesSection();
      case "projects":
        return renderProjectsSection();
      default:
        return null;
    }
  };

  const renderReferencesSection = () => {
    if (!data.references || data.references.length === 0) return null;

    return (
      <motion.div key="references" variants={itemVariants}>
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                References
              </h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {data.references.map((ref: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {ref.name}
                      </h3>

                      {ref.title && (
                        <div className="flex items-center gap-2 mb-3">
                          <svg
                            className="w-4 h-4 text-violet-600 dark:text-violet-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              clipRule="evenodd"
                              d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                              fillRule="evenodd"
                            />
                            <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                          </svg>
                          <span className="text-violet-700 dark:text-violet-300 font-semibold text-sm">
                            {ref.title}
                          </span>
                        </div>
                      )}

                      {ref.company && (
                        <div className="flex items-center gap-2 mb-3">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              clipRule="evenodd"
                              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                              fillRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-600 dark:text-gray-400 text-sm">
                            {ref.company}
                          </span>
                        </div>
                      )}

                      {ref.email && (
                        <div className="flex items-center gap-2 mb-4">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
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
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </motion.div>
    );
  };

  const renderProjectsSection = () => {
    if (!data.projects || data.projects.length === 0) return null;

    return (
      <motion.div key="projects" variants={itemVariants}>
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Projects
              </h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              {data.projects.map((proj: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {proj.url ? (
                        <Link
                          isExternal
                          className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2"
                          href={proj.url}
                        >
                          {proj.name}
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                            />
                          </svg>
                        </Link>
                      ) : (
                        proj.name
                      )}
                    </h3>
                    {(proj.startDate || proj.endDate) && (
                      <div className="flex items-center gap-2 mb-2">
                        <svg
                          className="w-4 h-4 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            clipRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            fillRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {proj.startDate}
                          {proj.endDate && ` - ${proj.endDate}`}
                        </span>
                      </div>
                    )}
                  </div>

                  {proj.entity && (
                    <div className="flex items-center gap-2 mb-3">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          clipRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                          fillRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                        {proj.entity}
                      </span>
                    </div>
                  )}

                  {proj.description && (
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                      {proj.description}
                    </p>
                  )}

                  {proj.roles && proj.roles.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {proj.roles.map((role: string, i: number) => (
                          <Chip
                            key={i}
                            className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200"
                            color="secondary"
                            size="sm"
                            variant="flat"
                          >
                            {role}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}

                  {proj.highlights && proj.highlights.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm">
                        Key Highlights:
                      </h4>
                      <ul className="space-y-1">
                        {proj.highlights.map((h: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400"
                          >
                            <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {proj.keywords && proj.keywords.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex flex-wrap gap-1">
                        {proj.keywords.map((keyword: string, i: number) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
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
