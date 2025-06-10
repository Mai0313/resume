/**
 * 路徑工具函數
 * 用於處理自定義 ROOT PATH 功能，支援不同的部署環境
 */

import { envHelpers } from "@/utils/env";

/**
 * 從環境變數獲取根路徑，預設為 '/'
 * 支援 VITE_ROOT_PATH 環境變數
 */
export const getRootPath = (): string => {
  const rootPath = envHelpers.getRootPath();

  // 確保路徑以 '/' 開頭和結尾（除非是根路徑 '/'）
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
 * 建構完整的路徑，包含根路徑前綴
 * @param path - 相對路徑（例如：'/resume', '/portfolio'）
 * @returns 完整路徑（例如：'/my-app/resume', '/my-app/portfolio'）
 */
export const buildPath = (path: string): string => {
  const rootPath = getRootPath();

  // 如果是根路徑，直接返回輸入路徑
  if (rootPath === "/") {
    return path;
  }

  // 移除路徑開頭的 '/' 以避免雙重斜線
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // 如果是空路徑或根路徑，返回根路徑（移除末尾的 '/'）
  if (!cleanPath || cleanPath === "/") {
    return rootPath.slice(0, -1) || "/";
  }

  return rootPath + cleanPath;
};

/**
 * 獲取 Router 的 basename（用於 React Router）
 * @returns basename 字串，用於 BrowserRouter
 */
export const getBasename = (): string => {
  const rootPath = getRootPath();

  // 如果是根路徑，返回 undefined（React Router 預設行為）
  if (rootPath === "/") {
    return "";
  }

  // 移除末尾的 '/' 作為 basename
  return rootPath.slice(0, -1);
};
