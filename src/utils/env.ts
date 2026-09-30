/**
 * Centralized Environment Variable Management
 *
 * This module provides a unified interface for accessing all VITE_ environment variables
 * with proper validation and default values.
 */

/**
 * Check if a string is non-empty (not null, not empty, not whitespace)
 */
function isNonEmptyString(value: string | null | undefined): boolean {
  return value !== null && value !== undefined && value.trim() !== "";
}

/**
 * Unified environment variable getter with validation and defaults
 */
function getEnvVar<T extends keyof ImportMetaEnv>(
  varName: T,
  options: { required?: boolean; defaultValue?: string | null } = {},
): string | null {
  const value = import.meta.env[varName];

  if (options.required && !isNonEmptyString(value)) {
    throw new Error(
      `Missing required environment variable: ${varName}\n` +
        "Please check your .env file and ensure all required variables are set.",
    );
  }

  return isNonEmptyString(value) ? value : (options.defaultValue ?? null);
}

// Exported environment variables with proper validation and defaults
export const env = {
  // Required environment variables (will throw error if not set)
  WEBSITE_TITLE: getEnvVar("VITE_WEBSITE_TITLE", { required: true })!,

  // Optional environment variables with defaults
  RESUME_FILE: getEnvVar("VITE_RESUME_FILE"),
  ROOT_PATH: getEnvVar("VITE_ROOT_PATH", { defaultValue: "/" })!,
  RESUME_PDF_PATH: getEnvVar("VITE_RESUME_PDF_PATH", {
    defaultValue: "/resume.pdf",
  })!,
} as const;

// Helper functions for specific use cases
export const envHelpers = {
  /**
   * Get the root path with fallback to default
   */
  getRootPath(): string {
    return env.ROOT_PATH;
  },

  /**
   * Check if resume file is configured
   */
  isResumeFileAvailable(): boolean {
    return isNonEmptyString(env.RESUME_FILE);
  },

  /**
   * Get resume file path with validation
   * Throws error if VITE_RESUME_FILE is not configured
   */
  getResumeFilePath(): string {
    if (!this.isResumeFileAvailable()) {
      throw new Error(
        "VITE_RESUME_FILE is not configured. Please set this environment variable to load resume content.",
      );
    }

    return env.RESUME_FILE!;
  },
} as const;
