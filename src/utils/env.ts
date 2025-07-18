/**
 * Centralized Environment Variable Management
 *
 * This module provides a unified interface for accessing all VITE_ environment variables
 * with proper validation and default values.
 */

// Environment variables that require values (will throw error if not provided)
const REQUIRED_ENV_VARS = ["VITE_WEBSITE_TITLE"] as const;

// Environment variables with default values
const DEFAULT_VALUES = {
  VITE_PIN_CODE: null,
  VITE_ROOT_PATH: "/",
  VITE_GITHUB_TOKEN: null,
  VITE_RESUME_FILE: null,
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
 * Gets an environment variable value with proper validation
 */
function getEnvVar<T extends keyof ImportMetaEnv>(
  varName: T,
  required: boolean = false,
): string {
  const value = import.meta.env[varName];

  if (required && (!value || value.trim() === "")) {
    throw new Error(`Required environment variable ${varName} is not set`);
  }

  return value || "";
}

/**
 * Gets an environment variable with a default value
 */
function getEnvVarWithDefault(
  varName: keyof typeof DEFAULT_VALUES,
  defaultValue: string | null,
): string | null {
  const value = import.meta.env[varName];

  return value || defaultValue;
}

// Validate required environment variables on module load
validateRequiredEnvVars();

// Exported environment variables with proper validation and defaults
export const env = {
  // Required environment variables (will throw error if not set)
  WEBSITE_TITLE: getEnvVar("VITE_WEBSITE_TITLE", true),

  // Optional environment variables with defaults
  RESUME_FILE: getEnvVarWithDefault(
    "VITE_RESUME_FILE",
    DEFAULT_VALUES.VITE_RESUME_FILE,
  ),
  GITHUB_TOKEN: getEnvVarWithDefault(
    "VITE_GITHUB_TOKEN",
    DEFAULT_VALUES.VITE_GITHUB_TOKEN,
  ),
  PIN_CODE: getEnvVarWithDefault("VITE_PIN_CODE", DEFAULT_VALUES.VITE_PIN_CODE),
  ROOT_PATH: getEnvVarWithDefault(
    "VITE_ROOT_PATH",
    DEFAULT_VALUES.VITE_ROOT_PATH,
  ),
  OPENAI_API_KEY: getEnvVarWithDefault(
    "VITE_OPENAI_API_KEY",
    DEFAULT_VALUES.VITE_OPENAI_API_KEY,
  ),
  OPENAI_MODEL: getEnvVarWithDefault(
    "VITE_OPENAI_MODEL",
    DEFAULT_VALUES.VITE_OPENAI_MODEL,
  ),
} as const;

// Helper functions for specific use cases
export const envHelpers = {
  /**
   * Check if PIN code protection is enabled
   */
  isPinEnabled(): boolean {
    return env.PIN_CODE !== null && env.PIN_CODE.trim() !== "";
  },

  /**
   * Get the root path with fallback to default
   */
  getRootPath(): string {
    return env.ROOT_PATH || "/";
  },

  /**
   * Check if GitHub token is available
   */
  isGitHubTokenAvailable(): boolean {
    return (
      env.GITHUB_TOKEN !== null &&
      env.GITHUB_TOKEN !== "" &&
      env.GITHUB_TOKEN.trim() !== ""
    );
  },

  /**
   * Check if resume file is configured
   */
  isResumeFileAvailable(): boolean {
    return (
      env.RESUME_FILE !== null &&
      env.RESUME_FILE !== "" &&
      env.RESUME_FILE.trim() !== ""
    );
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
   * Get GitHub username asynchronously through API
   * This eliminates the need for VITE_GITHUB_USERNAME environment variable
   */
  async getGitHubUsername(): Promise<string> {
    if (!this.isGitHubTokenAvailable()) {
      throw new Error("GITHUB_TOKEN is required to fetch username");
    }

    // Dynamic import to avoid circular dependency
    const { getAuthenticatedUser } = await import("@/utils/githubApi");
    const user = await getAuthenticatedUser();

    return user.login;
  },

  /**
   * Check if OpenAI chatbot is available
   */
  isOpenAIChatBotAvailable(): boolean {
    return (
      env.OPENAI_API_KEY !== null &&
      env.OPENAI_API_KEY !== "" &&
      env.OPENAI_API_KEY.trim() !== "" &&
      env.OPENAI_MODEL !== null &&
      env.OPENAI_MODEL !== "" &&
      env.OPENAI_MODEL.trim() !== ""
    );
  },
} as const;

// Type exports for better TypeScript support
export type EnvConfig = typeof env;
export type EnvHelpers = typeof envHelpers;
