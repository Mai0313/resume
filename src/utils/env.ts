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

// Environment variables that require values (will throw error if not provided)
const REQUIRED_ENV_VARS = ["VITE_WEBSITE_TITLE"] as const;

// Environment variables with default values
const DEFAULT_VALUES = {
  VITE_PIN_CODE: null,
  VITE_ROOT_PATH: "/",
  VITE_RESUME_FILE: null,
  VITE_RESUME_PDF_PATH: "/example.pdf",
  VITE_OPENAI_BASE_URL: null,
  VITE_OPENAI_API_KEY: null,
  VITE_OPENAI_MODEL: null,
} as const;

/**
 * Validates that all required environment variables are set
 */
function validateRequiredEnvVars(): void {
  const missingVars: string[] = [];

  for (const varName of REQUIRED_ENV_VARS) {
    const value = import.meta.env[varName];

    if (!value || value.trim() === "") {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}\n` +
        "Please check your .env file and ensure all required variables are set.",
    );
  }
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
    throw new Error(`Required environment variable ${varName} is not set`);
  }

  return isNonEmptyString(value) ? value : (options.defaultValue ?? null);
}

// Validate required environment variables on module load
validateRequiredEnvVars();

// Exported environment variables with proper validation and defaults
export const env = {
  // Required environment variables (will throw error if not set)
  WEBSITE_TITLE: getEnvVar("VITE_WEBSITE_TITLE", { required: true })!,

  // Optional environment variables with defaults
  RESUME_FILE: getEnvVar("VITE_RESUME_FILE", {
    defaultValue: DEFAULT_VALUES.VITE_RESUME_FILE,
  }),
  PIN_CODE: getEnvVar("VITE_PIN_CODE", {
    defaultValue: DEFAULT_VALUES.VITE_PIN_CODE,
  }),
  ROOT_PATH: getEnvVar("VITE_ROOT_PATH", {
    defaultValue: DEFAULT_VALUES.VITE_ROOT_PATH,
  }),
  OPENAI_BASE_URL: getEnvVar("VITE_OPENAI_BASE_URL", {
    defaultValue: DEFAULT_VALUES.VITE_OPENAI_BASE_URL,
  }),
  OPENAI_API_KEY: getEnvVar("VITE_OPENAI_API_KEY", {
    defaultValue: DEFAULT_VALUES.VITE_OPENAI_API_KEY,
  }),
  OPENAI_MODEL: getEnvVar("VITE_OPENAI_MODEL", {
    defaultValue: DEFAULT_VALUES.VITE_OPENAI_MODEL,
  }),
  RESUME_PDF_PATH: getEnvVar("VITE_RESUME_PDF_PATH", {
    defaultValue: DEFAULT_VALUES.VITE_RESUME_PDF_PATH,
  }),
} as const;

// Helper functions for specific use cases
export const envHelpers = {
  /**
   * Check if PIN code protection is enabled
   */
  isPinEnabled(): boolean {
    return isNonEmptyString(env.PIN_CODE);
  },

  /**
   * Get the root path with fallback to default
   */
  getRootPath(): string {
    return env.ROOT_PATH || "/";
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

  /**
   * Check if OpenAI chatbot is available
   */
  isOpenAIChatBotAvailable(): boolean {
    return (
      isNonEmptyString(env.OPENAI_BASE_URL) &&
      isNonEmptyString(env.OPENAI_API_KEY) &&
      isNonEmptyString(env.OPENAI_MODEL)
    );
  },
} as const;

// Type exports for better TypeScript support
export type EnvConfig = typeof env;
export type EnvHelpers = typeof envHelpers;
