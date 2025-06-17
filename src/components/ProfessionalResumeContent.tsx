import type { ResumeData } from "../utils/resumeLoader";

import React from "react";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";

interface ProfessionalResumeContentProps {
  data: ResumeData & { sectionOrder: string[] };
}

export const ProfessionalResumeContent: React.FC<
  ProfessionalResumeContentProps
> = ({ data }) => {
  // Defensive check: ensure data structure is complete
  if (!data || !data.basics || !data.basics.name) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-8">
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
        return renderWorkSection();
      case "volunteer":
        return renderVolunteerSection();
      case "education":
        return renderEducationSection();
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
        // languages now displayed as a section, not in header
        return renderLanguagesSection();
      case "references":
        return renderReferencesSection();
      case "projects":
        return renderProjectsSection();
      default:
        return null;
    }
  };

  const renderWorkSection = () => {
    if (!data.work || data.work.length === 0) return null;

    return (
      <motion.section key="work" className="mb-8" variants={itemVariants}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
          Experience
        </h2>
        <div className="space-y-6">
          {data.work.map((work: any, index: number) => (
            <div key={index} className="relative">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {work.position}
                  </h3>
                  <p className="text-base text-gray-700 dark:text-gray-300 font-medium">
                    {work.name}
                  </p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-0 sm:text-right">
                  <span className="whitespace-nowrap">
                    {work.startDate} — {work.endDate || "Present"}
                  </span>
                </div>
              </div>

              {work.summary && (
                <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                  {work.summary}
                </p>
              )}

              {work.highlights && work.highlights.length > 0 && (
                <ul className="space-y-1">
                  {work.highlights.map((highlight: string, i: number) => (
                    <li
                      key={i}
                      className="text-gray-700 dark:text-gray-300 flex items-start"
                    >
                      <span className="text-gray-400 mr-2 mt-1.5">•</span>
                      <span className="flex-1">{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </motion.section>
    );
  };

  const renderProjectsSection = () => {
    if (!data.projects || data.projects.length === 0) return null;

    return (
      <motion.section key="projects" className="mb-8" variants={itemVariants}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
          Projects
        </h2>
        <div className="space-y-6">
          {data.projects.map((proj: any, idx: number) => (
            <div key={idx}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {proj.url ? (
                      <Link
                        isExternal
                        className="hover:text-blue-600 dark:hover:text-blue-400"
                        href={proj.url}
                      >
                        {proj.name}
                      </Link>
                    ) : (
                      proj.name
                    )}
                  </h3>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-0">
                  <span className="whitespace-nowrap">
                    {proj.startDate}
                    {proj.endDate && ` — ${proj.endDate}`}
                  </span>
                </div>
              </div>

              {proj.description && (
                <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                  {proj.description}
                </p>
              )}

              {proj.highlights && proj.highlights.length > 0 && (
                <ul className="space-y-1">
                  {proj.highlights.map((h: string, i: number) => (
                    <li
                      key={i}
                      className="text-gray-700 dark:text-gray-300 flex items-start"
                    >
                      <span className="text-gray-400 mr-2 mt-1.5">•</span>
                      <span className="flex-1">{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </motion.section>
    );
  };

  const renderEducationSection = () => {
    if (!data.education || data.education.length === 0) return null;

    return (
      <motion.section key="education" className="mb-8" variants={itemVariants}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
          Education
        </h2>
        <div className="space-y-4">
          {data.education.map((edu: any, index: number) => (
            <div key={index}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {edu.institution}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {edu.studyType} in {edu.area}
                    {edu.gpa && ` (GPA: ${edu.gpa})`}
                  </p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-0">
                  {edu.startDate && edu.endDate ? (
                    <span className="whitespace-nowrap">
                      {edu.startDate} — {edu.endDate}
                    </span>
                  ) : (
                    edu.endDate && <span>{edu.endDate}</span>
                  )}
                </div>
              </div>

              {edu.courses && edu.courses.length > 0 && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="mb-1">Relevant Coursework:</p>
                  <p>{edu.courses.join(", ")}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.section>
    );
  };

  const renderAwardsSection = () => {
    if (!data.awards || data.awards.length === 0) return null;

    return (
      <motion.section key="awards" className="mb-8" variants={itemVariants}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
          Awards
        </h2>
        <div className="space-y-4">
          {data.awards.map((award: any, index: number) => (
            <div key={index}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {award.url ? (
                    <Link
                      isExternal
                      className="hover:text-blue-600 dark:hover:text-blue-400"
                      href={award.url}
                    >
                      {award.title}
                    </Link>
                  ) : (
                    award.title
                  )}
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-0">
                  {award.date}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {award.awarder}
              </p>
              {award.summary && (
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {award.summary}
                </p>
              )}
            </div>
          ))}
        </div>
      </motion.section>
    );
  };

  const renderSkillsSection = () => {
    if (!data.skills || data.skills.length === 0) return null;

    return (
      <motion.section key="skills" className="mb-8" variants={itemVariants}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
          Skills
        </h2>
        <div className="space-y-4">
          {data.skills.map((skill: any, index: number) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {skill.name}
                {skill.level && (
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-normal ml-2">
                    ({skill.level})
                  </span>
                )}
              </h3>
              {skill.keywords && skill.keywords.length > 0 && (
                <p className="text-gray-700 dark:text-gray-300">
                  {skill.keywords.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      </motion.section>
    );
  };

  const renderLanguagesSection = () => {
    if (!data.languages || data.languages.length === 0) return null;

    return (
      <motion.section key="languages" className="mb-8" variants={itemVariants}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
          Languages
        </h2>
        <div className="space-y-2">
          {data.languages.map((lang: any, index: number) => (
            <p key={index} className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">{lang.language}:</span>{" "}
              {lang.fluency}
            </p>
          ))}
        </div>
      </motion.section>
    );
  };

  const renderInterestsSection = () => {
    if (!data.interests || data.interests.length === 0) return null;

    return (
      <motion.section key="interests" className="mb-8" variants={itemVariants}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
          Interests
        </h2>
        <div className="space-y-3">
          {data.interests.map((interest: any, index: number) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {interest.name}
              </h3>
              {interest.keywords && interest.keywords.length > 0 && (
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {interest.keywords.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      </motion.section>
    );
  };

  const renderVolunteerSection = () => {
    if (!data.volunteer || data.volunteer.length === 0) return null;

    return (
      <motion.section key="volunteer" className="mb-8" variants={itemVariants}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
          Volunteer Experience
        </h2>
        <div className="space-y-4">
          {data.volunteer.map((volunteer: any, index: number) => (
            <div key={index}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {volunteer.position}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {volunteer.organization}
                  </p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-0">
                  {volunteer.startDate} — {volunteer.endDate || "Present"}
                </div>
              </div>

              {volunteer.summary && (
                <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm">
                  {volunteer.summary}
                </p>
              )}

              {volunteer.highlights && volunteer.highlights.length > 0 && (
                <ul className="space-y-1">
                  {volunteer.highlights.map((highlight: string, i: number) => (
                    <li
                      key={i}
                      className="text-gray-700 dark:text-gray-300 text-sm flex items-start"
                    >
                      <span className="text-gray-400 mr-2 mt-1.5">•</span>
                      <span className="flex-1">{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </motion.section>
    );
  };

  const renderCertificatesSection = () => {
    if (!data.certificates || data.certificates.length === 0) return null;

    return (
      <motion.section
        key="certificates"
        className="mb-8"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
          Certificates
        </h2>
        <div className="space-y-3">
          {data.certificates.map((cert: any, idx: number) => (
            <div key={idx}>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {cert.url ? (
                  <Link
                    isExternal
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                    href={cert.url}
                  >
                    {cert.name}
                  </Link>
                ) : (
                  cert.name
                )}
                {cert.date && (
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-normal ml-2">
                    ({cert.date})
                  </span>
                )}
              </h3>
              {cert.issuer && (
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Issuer: {cert.issuer}
                </p>
              )}
            </div>
          ))}
        </div>
      </motion.section>
    );
  };

  const renderPublicationsSection = () => {
    if (!data.publications || data.publications.length === 0) return null;

    return (
      <motion.section
        key="publications"
        className="mb-8"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
          Publications
        </h2>
        <div className="space-y-4">
          {data.publications.map((publication: any, index: number) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {publication.url ? (
                  <Link
                    isExternal
                    className="hover:text-blue-600 dark:hover:text-blue-400"
                    href={publication.url}
                  >
                    {publication.name}
                  </Link>
                ) : (
                  publication.name
                )}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                {publication.publisher} ({publication.releaseDate})
              </p>
              {publication.summary && (
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {publication.summary}
                </p>
              )}
            </div>
          ))}
        </div>
      </motion.section>
    );
  };

  const renderReferencesSection = () => {
    if (!data.references || data.references.length === 0) return null;

    return (
      <motion.section key="references" className="mb-8" variants={itemVariants}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
          References
        </h2>
        <div className="space-y-6">
          {data.references.map((ref: any, idx: number) => (
            <div key={idx}>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                {ref.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                {ref.reference}
              </p>
            </div>
          ))}
        </div>
      </motion.section>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 print:bg-white">
      <motion.div
        animate="visible"
        className="max-w-4xl mx-auto"
        initial="hidden"
        variants={containerVariants}
      >
        {/* Header Section - Professional Layout */}
        <motion.header
          className="bg-white dark:bg-gray-900 print:bg-white"
          variants={itemVariants}
        >
          <div className="p-8 lg:p-12 text-center">
            {/* Name */}
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {data.basics.name}
            </h1>

            {/* Contact Information Row */}
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              {data.basics.location && (
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                    <path
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <span>
                    {data.basics.location.city}
                    {data.basics.location.region &&
                      `, ${data.basics.location.region}`}
                  </span>
                </div>
              )}

              {data.basics.email && (
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <Link
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    href={`mailto:${data.basics.email}`}
                  >
                    {data.basics.email}
                  </Link>
                </div>
              )}

              {data.basics.phone && (
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <span>{data.basics.phone}</span>
                </div>
              )}

              {data.basics.url && (
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                  <Link
                    isExternal
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    href={data.basics.url}
                  >
                    {data.basics.url.replace(/^https?:\/\//, "")}
                  </Link>
                </div>
              )}

              {/* Social Profiles in the same row */}
              {data.basics.profiles &&
                data.basics.profiles.map((profile: any, index: number) => (
                  <div key={index} className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <Link
                      isExternal
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      href={profile.url}
                    >
                      {profile.username}
                    </Link>
                  </div>
                ))}
            </div>

            {/* Summary */}
            {data.basics.summary && (
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base max-w-4xl mx-auto">
                {data.basics.summary}
              </p>
            )}
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="px-8 lg:px-12 pb-12">
          {/* Dynamically render sections according to YAML file order */}
          {data.sectionOrder.map((sectionName: string) =>
            renderSection(sectionName),
          )}

          {/* Always render languages section if it wasn't in the section order */}
          {!data.sectionOrder.includes("languages") && renderLanguagesSection()}
        </div>
      </motion.div>
    </div>
  );
};
