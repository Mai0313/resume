import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";

interface CertificatesSectionProps {
  certificates: any[] | undefined;
  itemVariants: any;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ certificates, itemVariants }) => {
  if (!certificates || certificates.length === 0) return null;

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
            {certificates.map((cert: any, index: number) => (
              <div
                key={`certificate-${cert.name || 'unknown'}-${index}`}
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
