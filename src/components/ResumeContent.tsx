import type { ResumeData } from "../utils/resumeLoader";

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";

interface ResumeContentProps {
  data: ResumeData & { sectionOrder: string[] };
}

export const ResumeContent: React.FC<ResumeContentProps> = ({ data }) => {
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

  // 動態渲染區域的函數
  const renderSection = (sectionName: string) => {
    switch (sectionName) {
      case 'work':
        return renderWorkSection();
      case 'volunteer':
        return renderVolunteerSection();
      case 'education':
        return renderEducationSection();
      case 'awards':
        return renderAwardsSection();
      case 'publications':
        return renderPublicationsSection();
      case 'skills':
        return renderSkillsSection();
      case 'interests':
        return renderInterestsSection();
      case 'languages':
        // languages 已經在 header section 中顯示，這裡跳過
        return null;
      default:
        return null;
    }
  };

  const renderWorkSection = () => {
    if (!data.work || data.work.length === 0) return null;
    
    return (
      <motion.div variants={itemVariants} key="work">
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
      <motion.div variants={itemVariants} key="volunteer">
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
      <motion.div variants={itemVariants} key="education">
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
      <motion.div variants={itemVariants} key="awards">
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

  const renderPublicationsSection = () => {
    if (!data.publications || data.publications.length === 0) return null;
    
    return (
      <motion.div variants={itemVariants} key="publications">
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
      <motion.div variants={itemVariants} key="skills">
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
      <motion.div variants={itemVariants} key="interests">
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

  return (
    <motion.div
      animate="visible"
      className="max-w-6xl mx-auto p-6 space-y-8"
      initial="hidden"
      variants={containerVariants}
    >
      {/* Header Section - 總是在最前面 */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950">
          <CardBody className="p-8">
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

      {/* 動態渲染其他區域，根據 YAML 文件中的順序 */}
      {data.sectionOrder.map((sectionName: string) => renderSection(sectionName))}
    </motion.div>
  );
};
