import { motion } from "framer-motion";

interface ResumeErrorDisplayProps {
  error: string;
}

export function ResumeErrorDisplay({ error }: ResumeErrorDisplayProps) {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto p-8"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Resume Loading Failed
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {error}
          </p>
        </div>
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-300">
            Check if{" "}
            <code className="bg-red-100 dark:bg-red-800 px-1 py-0.5 rounded text-xs font-mono">
              VITE_RESUME_FILE
            </code>{" "}
            environment variable points to a valid YAML file.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
