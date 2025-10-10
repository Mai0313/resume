import React, { ReactNode } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { motion, Variants } from "framer-motion";

export type ColorScheme =
  | "blue"
  | "indigo"
  | "orange"
  | "green"
  | "purple"
  | "pink"
  | "teal"
  | "red"
  | "yellow"
  | "cyan";

const colorSchemes: Record<ColorScheme, { gradient: string; text: string }> = {
  blue: {
    gradient: "from-blue-500 to-blue-600",
    text: "text-blue-600 dark:text-blue-400",
  },
  indigo: {
    gradient: "from-indigo-500 to-indigo-600",
    text: "text-indigo-600 dark:text-indigo-400",
  },
  orange: {
    gradient: "from-orange-500 to-orange-600",
    text: "text-orange-600 dark:text-orange-400",
  },
  green: {
    gradient: "from-green-500 to-green-600",
    text: "text-green-600 dark:text-green-400",
  },
  purple: {
    gradient: "from-purple-500 to-purple-600",
    text: "text-purple-600 dark:text-purple-400",
  },
  pink: {
    gradient: "from-pink-500 to-pink-600",
    text: "text-pink-600 dark:text-pink-400",
  },
  teal: {
    gradient: "from-teal-500 to-teal-600",
    text: "text-teal-600 dark:text-teal-400",
  },
  red: {
    gradient: "from-red-500 to-red-600",
    text: "text-red-600 dark:text-red-400",
  },
  yellow: {
    gradient: "from-yellow-500 to-yellow-600",
    text: "text-yellow-600 dark:text-yellow-400",
  },
  cyan: {
    gradient: "from-cyan-500 to-cyan-600",
    text: "text-cyan-600 dark:text-cyan-400",
  },
};

interface SectionCardProps {
  title: string;
  icon: ReactNode;
  colorScheme: ColorScheme;
  itemVariants: Variants;
  sectionKey: string;
  children: ReactNode;
  data?: unknown[];
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  icon,
  colorScheme,
  itemVariants,
  sectionKey,
  children,
  data,
}) => {
  // Don't render if data is provided and empty
  if (data !== undefined && (!data || data.length === 0)) {
    return null;
  }

  const { gradient, text } = colorSchemes[colorScheme];

  return (
    <motion.div key={sectionKey} variants={itemVariants}>
      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center`}
            >
              {icon}
            </div>
            <h2 className={`text-2xl font-bold ${text}`}>{title}</h2>
          </div>
        </CardHeader>
        <CardBody>{children}</CardBody>
      </Card>
    </motion.div>
  );
};

/**
 * Reusable icon components for sections
 */
export const SectionIcons = {
  work: (
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  ),
  education: (
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 14l9-5-9-5-9 5 9 5z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  ),
  skills: (
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
  ),
  projects: (
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  ),
  awards: (
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 15l3.4 3.4a1 1 0 001.6-.8V6a2 2 0 00-2-2H9a2 2 0 00-2 2v11.6a1 1 0 001.6.8L12 15zm0 0l3-3m-3 3l-3-3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  ),
  volunteer: (
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
  ),
  publications: (
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  ),
  certificates: (
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  ),
  interests: (
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  ),
  references: (
    <svg
      className="w-5 h-5 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  ),
};
