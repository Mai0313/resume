import React from "react";
import { motion } from "framer-motion";

interface ErrorDisplayProps {
  title: string;
  message: string;
  details?: string;
  icon?: "error" | "warning" | "info";
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title,
  message,
  details,
  icon = "error",
  actionButton,
}) => {
  const iconColors = {
    error: "from-red-500 to-pink-500",
    warning: "from-orange-500 to-red-500",
    info: "from-blue-500 to-purple-500",
  };

  const borderColors = {
    error: "border-red-200 dark:border-red-800",
    warning: "border-orange-200 dark:border-orange-800",
    info: "border-blue-200 dark:border-blue-800",
  };

  const bgColors = {
    error: "bg-red-50 dark:bg-red-900/20",
    warning: "bg-orange-50 dark:bg-orange-900/20",
    info: "bg-blue-50 dark:bg-blue-900/20",
  };

  const textColors = {
    error: {
      title: "text-red-800 dark:text-red-200",
      message: "text-red-700 dark:text-red-300",
    },
    warning: {
      title: "text-orange-800 dark:text-orange-200",
      message: "text-orange-700 dark:text-orange-300",
    },
    info: {
      title: "text-blue-800 dark:text-blue-200",
      message: "text-blue-700 dark:text-blue-300",
    },
  };

  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg mx-auto p-8"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6">
          <div
            className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${iconColors[icon]} rounded-full flex items-center justify-center`}
          >
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {icon === "error" && (
                <path
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              )}
              {icon === "warning" && (
                <path
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              )}
              {icon === "info" && (
                <path
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              )}
            </svg>
          </div>
          <h3
            className={`text-2xl font-bold mb-3 ${textColors[icon].title} text-gray-900 dark:text-gray-100`}
          >
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {message}
          </p>
        </div>
        {details && (
          <div
            className={`${bgColors[icon]} border ${borderColors[icon]} rounded-lg p-4`}
          >
            <h4
              className={`font-semibold ${textColors[icon].title} mb-2`}
            >
              Details:
            </h4>
            <p
              className={`text-sm ${textColors[icon].message} font-mono bg-opacity-50 p-2 rounded whitespace-pre-wrap break-all`}
            >
              {details}
            </p>
          </div>
        )}
        {actionButton && (
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              onClick={actionButton.onClick}
            >
              {actionButton.label}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ErrorDisplay;
