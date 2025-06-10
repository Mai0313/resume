import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  assetsInclude: ["**/*.yaml", "**/*.yml"],
  // 支援自定義 ROOT PATH，從環境變數 VITE_ROOT_PATH 讀取
  base: process.env.VITE_ROOT_PATH || "/",
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
