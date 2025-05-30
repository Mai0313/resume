import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";

import { ResumeData } from "../utils/resumeLoader";

interface ResumeContentProps {
  data: ResumeData;
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

  return (
    <motion.div
      animate="visible"
      className="max-w-6xl mx-auto p-6 space-y-8"
      initial="hidden"
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950">
          <CardBody className="p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {data.personal.name}
              </h1>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <span>{data.personal.email}</span>
                <Link
                  isExternal
                  className="text-blue-600 hover:text-blue-800"
                  href={data.personal.linkedin.url}
                >
                  {data.personal.linkedin.text}
                </Link>
                <Link
                  isExternal
                  className="text-blue-600 hover:text-blue-800"
                  href={data.personal.github.url}
                >
                  {data.personal.github.text}
                </Link>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {data.personal.languages.map((lang, index) => (
                  <Chip key={index} color="primary" size="sm" variant="flat">
                    {lang.name}: {lang.level}
                  </Chip>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Education Section */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Education
            </h2>
          </CardHeader>
          <CardBody>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{edu.institution}</h3>
                  <span className="text-sm text-gray-500">{edu.date}</span>
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {edu.degree}
                </p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                  {edu.description.map((desc, i) => (
                    <li key={i} className="text-sm">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardBody>
        </Card>
      </motion.div>

      {/* Research Experience */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Research Experience
            </h2>
          </CardHeader>
          <CardBody className="space-y-6">
            {data.research.map((research, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold mb-2">{research.title}</h3>
                <p className="text-blue-600 dark:text-blue-400 italic mb-1">
                  {research.subtitle}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  {research.url ? (
                    <Link
                      isExternal
                      className="hover:text-blue-600"
                      href={research.url}
                    >
                      {research.conference}
                    </Link>
                  ) : (
                    research.conference
                  )}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {research.description}
                </p>
                {index < data.research.length - 1 && (
                  <Divider className="mt-4" />
                )}
              </div>
            ))}
          </CardBody>
        </Card>
      </motion.div>

      {/* Work Experience */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Work Experience
            </h2>
          </CardHeader>
          <CardBody>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.company}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      {exp.position}
                    </p>
                    <p className="text-sm text-gray-500">{exp.location}</p>
                  </div>
                  <span className="text-sm text-gray-500">{exp.period}</span>
                </div>
                <div className="space-y-4">
                  {exp.achievements.map((achievement, i) => (
                    <div key={i}>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {achievement.category}
                      </h4>
                      <ul className="space-y-1 ml-4">
                        {achievement.items.map((item, j) => (
                          <li
                            key={j}
                            className="text-sm text-gray-600 dark:text-gray-300 list-disc"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </motion.div>

      {/* Skills */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Skills
            </h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.skills.map((skillGroup, index) => (
                <div key={index}>
                  <h3 className="font-semibold mb-2">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, i) => (
                      <Chip key={i} color="secondary" size="sm" variant="flat">
                        {skill}
                      </Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Awards & Publications */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Awards & Publications
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            {data.awards.map((award, index) => (
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
                  {award.venue} ({award.role})
                </p>
              </div>
            ))}
          </CardBody>
        </Card>
      </motion.div>

      {/* Community Engagement */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Open-Source & Community Engagement
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            {data.community.map((community, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-2">{community.category}</h3>
                <ul className="space-y-1 ml-4">
                  {community.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-600 dark:text-gray-300 list-disc"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardBody>
        </Card>
      </motion.div>

      {/* Research Interests */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Research Interests
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            {data.interests.map((interest, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  {interest.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {interest.description}
                </p>
              </div>
            ))}
          </CardBody>
        </Card>
      </motion.div>
    </motion.div>
  );
};
