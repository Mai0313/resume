import type { ResumeData } from "../utils/resumeLoader";

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";

interface ResumeContentProps {
  data: ResumeData & { sectionOrder: string[] };
  onDownloadPDF?: () => void;
  isGeneratingPDF?: boolean;
}

export const ResumeContent: React.FC<ResumeContentProps> = ({
  data,
  onDownloadPDF,
  isGeneratingPDF,
}) => {
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

  const renderWorkSection = () => {
    if (!data.work || data.work.length === 0) return null;

    return (
      <motion.div key="work" variants={itemVariants}>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Work Experience
            </h2>
          </CardHeader>
          <CardBody>
            {data.work.map((work: any, index: number) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{work.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      {work.position}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {work.startDate} - {work.endDate || "Present"}
                  </span>
                </div>
                {work.summary && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {work.summary}
                  </p>
                )}
                {work.highlights && work.highlights.length > 0 && (
                  <ul className="space-y-1 ml-4">
                    {work.highlights.map((highlight: string, i: number) => (
                      <li
                        key={i}
                        className="text-sm text-gray-600 dark:text-gray-300 list-disc"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </CardBody>
        </Card>
      </motion.div>
    );
  };

  const renderVolunteerSection = () => {
    if (!data.volunteer || data.volunteer.length === 0) return null;

    return (
      <motion.div key="volunteer" variants={itemVariants}>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Volunteer & Community Engagement
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            {data.volunteer.map((volunteer: any, index: number) => (
              <div key={index}>
                <h3 className="font-semibold mb-2">
                  {volunteer.position} at {volunteer.organization}
                </h3>
                {volunteer.summary && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {volunteer.summary}
                  </p>
                )}
                {volunteer.highlights && volunteer.highlights.length > 0 && (
                  <ul className="space-y-1 ml-4">
                    {volunteer.highlights.map(
                      (highlight: string, i: number) => (
                        <li
                          key={i}
                          className="text-sm text-gray-600 dark:text-gray-300 list-disc"
                        >
                          {highlight}
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </div>
            ))}
          </CardBody>
        </Card>
      </motion.div>
    );
  };

  const renderEducationSection = () => {
    if (!data.education || data.education.length === 0) return null;

    return (
      <motion.div key="education" variants={itemVariants}>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Education
            </h2>
          </CardHeader>
          <CardBody>
            {data.education.map((edu: any, index: number) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{edu.institution}</h3>
                  <span className="text-sm text-gray-500">{edu.endDate}</span>
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {edu.studyType} in {edu.area}
                </p>
                {edu.courses && edu.courses.length > 0 && (
                  <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                    {edu.courses.map((course: string, i: number) => (
                      <li key={i} className="text-sm">
                        {course}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </CardBody>
        </Card>
      </motion.div>
    );
  };

  const renderAwardsSection = () => {
    if (!data.awards || data.awards.length === 0) return null;

    return (
      <motion.div key="awards" variants={itemVariants}>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Awards & Recognition
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            {data.awards.map((award: any, index: number) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  {award.url ? (
                    <Link
                      isExternal
                      className="hover:text-blue-600"
                      href={award.url}
                    >
                      {award.title}
                    </Link>
                  ) : (
                    award.title
                  )}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {award.awarder} {award.date && `(${award.date})`}
                </p>
                {award.summary && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {award.summary}
                  </p>
                )}
              </div>
            ))}
          </CardBody>
        </Card>
      </motion.div>
    );
  };

  const renderCertificatesSection = () => {
    if (!data.certificates || data.certificates.length === 0) return null;

    return (
      <motion.div key="certificates" variants={itemVariants}>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Certificates
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            {data.certificates.map((cert: any, idx: number) => (
              <div key={idx}>
                <h3 className="font-semibold">
                  {cert.url ? (
                    <Link
                      isExternal
                      className="hover:text-blue-600"
                      href={cert.url}
                    >
                      {cert.name}
                    </Link>
                  ) : (
                    cert.name
                  )}
                  {cert.date && (
                    <span className="text-sm text-gray-500 ml-2">
                      ({cert.date})
                    </span>
                  )}
                </h3>
                {cert.issuer && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Issuer: {cert.issuer}
                  </p>
                )}
              </div>
            ))}
          </CardBody>
        </Card>
      </motion.div>
    );
  };

  const renderPublicationsSection = () => {
    if (!data.publications || data.publications.length === 0) return null;

    return (
      <motion.div key="publications" variants={itemVariants}>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Research Publications
            </h2>
          </CardHeader>
          <CardBody className="space-y-6">
            {data.publications.map((publication: any, index: number) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-2">
                  {publication.url ? (
                    <Link
                      isExternal
                      className="hover:text-blue-600"
                      href={publication.url}
                    >
                      {publication.name}
                    </Link>
                  ) : (
                    publication.name
                  )}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {publication.publisher} ({publication.releaseDate})
                </p>
                {publication.summary && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {publication.summary}
                  </p>
                )}
                {index < (data.publications?.length ?? 0) - 1 && (
                  <Divider className="mt-4" />
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
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Skills
            </h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.skills.map((skill: any, index: number) => (
                <div key={index}>
                  <h3 className="font-semibold mb-2">
                    {skill.name}
                    {skill.level && (
                      <span className="text-sm text-gray-500 ml-2">
                        ({skill.level})
                      </span>
                    )}
                  </h3>
                  {skill.keywords && skill.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {skill.keywords.map((keyword: string, i: number) => (
                        <Chip
                          key={i}
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
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Research Interests
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            {data.interests.map((interest: any, index: number) => (
              <div key={index}>
                <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {interest.name}
                </h3>
                {interest.keywords && interest.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {interest.keywords.map((keyword: string, i: number) => (
                      <Chip key={i} color="primary" size="sm" variant="flat">
                        {keyword}
                      </Chip>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardBody>
        </Card>
      </motion.div>
    );
  };

  const renderReferencesSection = () => {
    if (!data.references || data.references.length === 0) return null;

    return (
      <motion.div key="references" variants={itemVariants}>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              References
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            {data.references.map((ref: any, idx: number) => (
              <div key={idx}>
                <h3 className="font-semibold">{ref.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {ref.reference}
                </p>
              </div>
            ))}
          </CardBody>
        </Card>
      </motion.div>
    );
  };

  const renderProjectsSection = () => {
    if (!data.projects || data.projects.length === 0) return null;

    return (
      <motion.div key="projects" variants={itemVariants}>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Projects
            </h2>
          </CardHeader>
          <CardBody className="space-y-6">
            {data.projects.map((proj: any, idx: number) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    {proj.url ? (
                      <Link
                        isExternal
                        className="hover:text-blue-600"
                        href={proj.url}
                      >
                        {proj.name}
                      </Link>
                    ) : (
                      proj.name
                    )}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {proj.startDate}
                    {proj.endDate && ` - ${proj.endDate}`}
                  </span>
                </div>
                {proj.description && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {proj.description}
                  </p>
                )}
                {proj.highlights && proj.highlights.length > 0 && (
                  <ul className="space-y-1 ml-4 list-disc text-sm text-gray-600 dark:text-gray-300">
                    {proj.highlights.map((h: string, i: number) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
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
      {/* Header Section - Always at the front */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950">
          <CardBody className="p-8 relative">
            {/* PDF Download Button - Floating top right */}
            {onDownloadPDF && (
              <div className="absolute top-4 right-4">
                <Button
                  className="shadow-md hover:shadow-lg transition-all duration-200"
                  color="primary"
                  isLoading={isGeneratingPDF}
                  size="sm"
                  startContent={
                    !isGeneratingPDF && (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                        />
                      </svg>
                    )
                  }
                  title="Download PDF Resume"
                  variant="solid"
                  onClick={onDownloadPDF}
                >
                  {isGeneratingPDF ? "Generating..." : "PDF"}
                </Button>
              </div>
            )}

            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {data.basics.name}
              </h1>
              {data.basics.label && (
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  {data.basics.label}
                </p>
              )}
              {data.basics.summary && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 max-w-4xl mx-auto">
                  {data.basics.summary}
                </p>
              )}
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                {data.basics.email && <span>{data.basics.email}</span>}
                {data.basics.location && (
                  <span>
                    {data.basics.location.city}, {data.basics.location.region}
                  </span>
                )}
              </div>
              {data.basics.profiles && (
                <div className="mt-4 flex flex-wrap justify-center gap-4">
                  {data.basics.profiles.map((profile: any, index: number) => (
                    <Link
                      key={index}
                      isExternal
                      className="text-blue-600 hover:text-blue-800"
                      href={profile.url}
                    >
                      {profile.network}: {profile.username}
                    </Link>
                  ))}
                </div>
              )}
              {data.languages && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {data.languages.map((lang: any, index: number) => (
                    <Chip key={index} color="primary" size="sm" variant="flat">
                      {lang.language}: {lang.fluency}
                    </Chip>
                  ))}
                </div>
              )}
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
