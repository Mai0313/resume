/**
 * Path utility functions
 * For handling custom ROOT PATH functionality, supporting different deployment environments
 */

import { envHelpers } from "@/utils/env";

/**
 * Get root path from environment variable, default to '/'
 * Supports VITE_ROOT_PATH environment variable
 */
export const getRootPath = (): string => {
  const rootPath = envHelpers.getRootPath();

  // Ensure path starts and ends with '/' (unless it's root path '/')
  if (rootPath === "/") {
    return "/";
  }

  let normalizedPath = rootPath;

  if (!normalizedPath.startsWith("/")) {
    normalizedPath = "/" + normalizedPath;
  }
  if (!normalizedPath.endsWith("/")) {
    normalizedPath = normalizedPath + "/";
  }

  return normalizedPath;
};

/**
 * Construct complete path including root path prefix
 * @param path - Relative path (e.g., '/resume', '/portfolio')
 * @returns Complete path (e.g., '/my-app/resume', '/my-app/portfolio')
 */
export const buildPath = (path: string): string => {
  const rootPath = getRootPath();

  // If it's root path, return input path directly
  if (rootPath === "/") {
    return path;
  }

  // Remove leading '/' from path to avoid double slashes
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // If it's empty path or root path, return root path (remove trailing '/')
  if (!cleanPath || cleanPath === "/") {
    return rootPath.slice(0, -1) || "/";
  }

  return rootPath + cleanPath;
};

/**
 * Get Router's basename (for React Router)
 * @returns basename string for BrowserRouter
 */
export const getBasename = (): string => {
  const rootPath = getRootPath();

  // If it's root path, return undefined (React Router default behavior)
  if (rootPath === "/") {
    return "";
  }

  // Remove trailing '/' as basename
  return rootPath.slice(0, -1);
};
