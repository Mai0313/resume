/**
 * Centralized Environment Variable Management
 *
 * This module provides a unified interface for accessing all VITE_ environment variables
 * with proper validation and default values.
 */

// Environment variables that require values (will throw error if not provided)
const REQUIRED_ENV_VARS = ["VITE_WEBSITE_TITLE", "VITE_RESUME_FILE"] as const;

// Environment variables with default values
const DEFAULT_VALUES = {
  VITE_PIN_CODE: null,
  VITE_ROOT_PATH: "/",
  VITE_GITHUB_TOKEN: null,
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
  RESUME_FILE: getEnvVar("VITE_RESUME_FILE", true),

  // Optional environment variables with defaults
  GITHUB_TOKEN: getEnvVarWithDefault(
    "VITE_GITHUB_TOKEN",
    DEFAULT_VALUES.VITE_GITHUB_TOKEN,
  ),
  PIN_CODE: getEnvVarWithDefault("VITE_PIN_CODE", DEFAULT_VALUES.VITE_PIN_CODE),
  ROOT_PATH: getEnvVarWithDefault(
    "VITE_ROOT_PATH",
    DEFAULT_VALUES.VITE_ROOT_PATH,
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
   * Get resume file path with validation
   */
  getResumeFilePath(): string {
    return env.RESUME_FILE;
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
} as const;

// Type exports for better TypeScript support
export type EnvConfig = typeof env;
export type EnvHelpers = typeof envHelpers;
