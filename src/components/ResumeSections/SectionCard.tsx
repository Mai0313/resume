import React, { ReactNode } from "react";
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

  const { text } = colorSchemes[colorScheme];

  return (
    <motion.div key={sectionKey} variants={itemVariants} >
      <div className="group">
        <div className="flex items-center gap-4 mb-6">
          <h2 className={`text-2xl font-bold ${text}`}>{title}</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-default-200 to-transparent" />
        </div>
        <div className="pl-2 md:pl-4 border-l-2 border-default-100 ml-5 space-y-6">
          {children}
        </div>
      </div>
    </motion.div >
  );
};

/**
 * Reusable icon components for sections
 */
export const SectionIcons = {
  work: (
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  ),
  education: (
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 14l9-5-9-5-9 5 9 5z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  ),
  skills: (
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M13 10V3L4 14h7v7l9-11h-7z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  ),
  projects: (
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  ),
  awards: (
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  ),
  volunteer: (
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  ),
  publications: (
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  ),
  certificates: (
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  ),
  interests: (
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  ),
  references: (
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
        strokeWidth={1.5}
      />
    </svg>
  ),
};
