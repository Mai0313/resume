/**
 * Path utility functions
 * For handling custom ROOT PATH functionality, supporting different deployment environments
 */

import { envHelpers } from "@/utils/env";

/**
 * Get normalized root path (without trailing slash unless it's '/')
 */
const getRootPath = (): string => {
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

/**
 * Resolve an asset reference that may be a remote URL or a local path.
 * Remote URLs are returned as-is; local paths are prefixed with
 * VITE_ROOT_PATH so GitHub Pages subpath deploys resolve correctly.
 */
export const resolveAssetPath = (pathOrUrl: string): string => {
  return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : buildPath(pathOrUrl);
};
