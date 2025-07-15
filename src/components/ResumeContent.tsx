import type { ResumeData } from "../utils/resumeLoader";

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";

import {
  WorkSection,
  VolunteerSection,
  EducationSection,
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
        return renderAwardsSection();
      case "certificates":
        return renderCertificatesSection();
      case "publications":
        return renderPublicationsSection();
      case "skills":
        return renderSkillsSection();
      case "interests":
        return renderInterestsSection();
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

  const renderAwardsSection = () => {
    if (!data.awards || data.awards.length === 0) return null;

    return (
      <motion.div key="awards" variants={itemVariants}>
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Awards & Recognition
              </h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {data.awards.map((award: any, index: number) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {award.url ? (
                          <Link
                            isExternal
                            className="hover:text-yellow-600 dark:hover:text-yellow-400 flex items-center gap-2"
                            href={award.url}
                          >
                            {award.title}
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
                          award.title
                        )}
                      </h3>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-yellow-600 dark:text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              clipRule="evenodd"
                              d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 000 2h8a1 1 0 100-2H6z"
                              fillRule="evenodd"
                            />
                          </svg>
                          <span className="text-yellow-700 dark:text-yellow-300 font-semibold">
                            {award.awarder}
                          </span>
                        </div>
                        {award.date && (
                          <div className="flex items-center gap-2">
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
                            <span className="text-gray-600 dark:text-gray-400 text-sm">
                              {award.date}
                            </span>
                          </div>
                        )}
                      </div>

                      {award.summary && (
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {award.summary}
                        </p>
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

  const renderCertificatesSection = () => {
    if (!data.certificates || data.certificates.length === 0) return null;

    return (
      <motion.div key="certificates" variants={itemVariants}>
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Certificates
              </h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {data.certificates.map((cert: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {cert.url ? (
                          <Link
                            isExternal
                            className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-2"
                            href={cert.url}
                          >
                            {cert.name}
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
                          cert.name
                        )}
                      </h3>

                      {cert.issuer && (
                        <div className="flex items-center gap-2 mb-3">
                          <svg
                            className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              clipRule="evenodd"
                              d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 000 2h8a1 1 0 100-2H6z"
                              fillRule="evenodd"
                            />
                          </svg>
                          <span className="text-emerald-700 dark:text-emerald-300 font-semibold">
                            {cert.issuer}
                          </span>
                        </div>
                      )}

                      {cert.date && (
                        <div className="flex items-center gap-2">
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
                          <span className="text-gray-600 dark:text-gray-400 text-sm">
                            Issued: {cert.date}
                          </span>
                        </div>
                      )}

                      {cert.summary && (
                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-3 leading-relaxed">
                          {cert.summary}
                        </p>
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

  const renderPublicationsSection = () => {
    if (!data.publications || data.publications.length === 0) return null;

    return (
      <motion.div key="publications" variants={itemVariants}>
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Research Publications
              </h2>
            </div>
          </CardHeader>
          <CardBody className="space-y-6">
            {data.publications.map((publication: any, index: number) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
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

                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                      {publication.url ? (
                        <Link
                          isExternal
                          className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2"
                          href={publication.url}
                        >
                          {publication.name}
                          <svg
                            className="w-5 h-5"
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
                        publication.name
                      )}
                    </h3>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-green-600 dark:text-green-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            clipRule="evenodd"
                            d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 000 2h8a1 1 0 100-2H6z"
                            fillRule="evenodd"
                          />
                        </svg>
                        <span className="text-green-700 dark:text-green-300 font-semibold">
                          {publication.publisher}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
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
                        <span className="text-gray-600 dark:text-gray-400">
                          {publication.releaseDate}
                        </span>
                      </div>
                    </div>

                    {publication.summary && (
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {publication.summary}
                      </p>
                    )}
                  </div>
                </div>

                {index < (data.publications?.length ?? 0) - 1 && (
                  <Divider className="mt-6" />
                )}
              </div>
            ))}
          </CardBody>
        </Card>
      </motion.div>
    );
  };

  const renderSkillsSection = () => {
    if (!data.skills || data.skills.length === 0) return null;

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
              {data.skills.map((skill: any, index: number) => (
                <div
                  key={index}
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

  const renderInterestsSection = () => {
    if (!data.interests || data.interests.length === 0) return null;

    return (
      <motion.div key="interests" variants={itemVariants}>
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Research Interests
              </h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {data.interests.map((interest: any, index: number) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
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

                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                        {interest.name}
                      </h3>

                      {interest.keywords && interest.keywords.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm">
                            Research Areas:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {interest.keywords.map(
                              (keyword: string, i: number) => (
                                <Chip
                                  key={i}
                                  className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-200 dark:hover:bg-cyan-800/50 transition-colors"
                                  color="primary"
                                  size="sm"
                                  variant="flat"
                                >
                                  {keyword}
                                </Chip>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                      {interest.summary && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {interest.summary}
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
