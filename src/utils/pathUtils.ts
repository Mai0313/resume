/**
 * Path utility functions
 * For handling custom ROOT PATH functionality, supporting different deployment environments
 */

import { envHelpers } from "@/utils/env";

/**
 * Get normalized root path (without trailing slash unless it's '/')
 */
export const getRootPath = (): string => {
  const rootPath = envHelpers.getRootPath();

  return rootPath === "/" ? "/" : rootPath.replace(/\/$/, "");
};

/**
 * Construct complete path including root path prefix
 * @param path - Relative path (e.g., '/resume')
 * @returns Complete path (e.g., '/my-app/resume')
 */
export const buildPath = (path: string): string => {
  const root = getRootPath();
  const cleanPath = path.replace(/^\//, "");

  return root === "/" ? `/${cleanPath}` : `${root}/${cleanPath}`;
};

/**
 * Get Router's basename (for React Router)
 * @returns basename string for BrowserRouter
 */
export const getBasename = (): string => {
  return getRootPath() === "/" ? "" : getRootPath();
};
