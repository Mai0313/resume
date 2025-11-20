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
      <div className="group">
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg shadow-${colorScheme}-500/20 group-hover:scale-110 transition-transform duration-300`}
          >
            {icon}
          </div>
          <h2 className={`text-2xl font-bold ${text}`}>{title}</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-default-200 to-transparent" />
        </div>
        <div className="pl-2 md:pl-4 border-l-2 border-default-100 ml-5 space-y-6">
          {children}
        </div>
      </div>
    </motion.div>
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
        d="M20 7h-3a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
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
        d="M22 10v6M2 10l10-5 10 5-10 5z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M6 12v5c3 3 9 3 12 0v-5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
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
        d="m18 16 4-4-4-4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="m6 8-4 4 4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="m14.5 4-5 16"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
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
        d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M9 9 5 5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M15 15l4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
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
        d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M4 22h16"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M18 2H6v7a6 6 0 0 0 12 0V2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
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
        d="M19 14c1.49-1.28 3.6-1.28 5.14 0 .34.29.34.75 0 1.05-1.54 1.28-3.65 1.28-5.14 0a.74.74 0 0 0-1.05 0c-1.54 1.28-3.65 1.28-5.14 0-.34-.29-.34-.75 0-1.05 1.54-1.28 3.65-1.28 5.14 0a.74.74 0 0 0 1.05 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M12 11.5 12 4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="m7 15-1.8-1.8a2.5 2.5 0 0 0-3.5 0l-.4.4a2.5 2.5 0 0 0 0 3.5l7.1 7.1a2.5 2.5 0 0 0 3.5 0l.4-.4a2.5 2.5 0 0 0 0-3.5L10.5 18.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="m17 15 1.8-1.8a2.5 2.5 0 0 1 3.5 0l.4.4a2.5 2.5 0 0 1 0 3.5l-7.1 7.1a2.5 2.5 0 0 1-3.5 0l-.4-.4a2.5 2.5 0 0 1 0-3.5L13.5 18.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
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
        d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
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
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.78 4.78 4 4 0 0 1-6.74 0 4 4 0 0 1-4.78-4.78 4 4 0 0 1 0-6.74Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="m9 12 2 2 4-4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
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
        d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
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
        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M22 21v-2a4 4 0 0 0-3-3.87"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M16 3.13a4 4 0 0 1 0 7.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  ),
};
