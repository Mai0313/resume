import fs from "node:fs/promises";
import path from "node:path";

import { defineConfig, type ResolvedConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

const createSpa404Plugin = () => {
  let outDir = "dist";
  let rootDir = process.cwd();

  return {
    name: "vite-plugin-generate-404",
    configResolved(config: ResolvedConfig) {
      outDir = config.build?.outDir ?? "dist";
      rootDir = config.root ?? process.cwd();
    },
    async closeBundle() {
      const indexPath = path.resolve(rootDir, outDir, "index.html");
      const notFoundPath = path.resolve(rootDir, outDir, "404.html");

      try {
        await fs.copyFile(indexPath, notFoundPath);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : String(error ?? "");
        // Swallow errors (e.g., index.html missing) but keep a readable hint for debugging
        console.warn(
          "[vite-plugin-generate-404] Failed to copy index.html to 404.html:",
          message,
        );
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), createSpa404Plugin()],
  assetsInclude: ["**/*.yaml", "**/*.yml"],
  // 支援自定義 ROOT PATH，從環境變數 VITE_ROOT_PATH 讀取
  base: process.env.VITE_ROOT_PATH || "/",
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
