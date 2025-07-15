import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";

interface VolunteerSectionProps {
  volunteer: any[] | undefined;
  itemVariants: any;
}

export const VolunteerSection: React.FC<VolunteerSectionProps> = ({
  volunteer,
  itemVariants,
}) => {
  if (!volunteer || volunteer.length === 0) return null;

  return (
    <motion.div key="volunteer" variants={itemVariants}>
      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Volunteer & Community Engagement
            </h2>
          </div>
        </CardHeader>
        <CardBody className="space-y-6">
          {volunteer.map((volunteerItem: any, index: number) => (
            <div
              key={`volunteer-${volunteerItem.organization || "unknown"}-${index}`}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {volunteerItem.organization}
                      </h3>
                      <p className="text-lg text-pink-600 dark:text-pink-400 font-semibold mb-2">
                        {volunteerItem.position}
                      </p>
                      {volunteerItem.location && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
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
                          {volunteerItem.location}
                        </p>
                      )}
                    </div>
                    <div className="mt-2 lg:mt-0 lg:text-right">
                      {(volunteerItem.startDate || volunteerItem.endDate) && (
                        <span className="inline-flex items-center px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 text-sm font-medium rounded-full">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              clipRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              fillRule="evenodd"
                            />
                          </svg>
                          {volunteerItem.startDate} -{" "}
                          {volunteerItem.endDate || "Present"}
                        </span>
                      )}
                    </div>
                  </div>

                  {volunteerItem.summary && (
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {volunteerItem.summary}
                    </p>
                  )}

                  {volunteerItem.highlights &&
                    volunteerItem.highlights.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                          Key Contributions:
                        </h4>
                        <ul className="space-y-2">
                          {volunteerItem.highlights.map(
                            (highlight: string, i: number) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                              >
                                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-sm leading-relaxed">
                                  {highlight}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}

                  {volunteerItem.url && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Link
                        isExternal
                        className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300 text-sm font-medium"
                        href={volunteerItem.url}
                      >
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
                        Organization Website
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </motion.div>
  );
};
