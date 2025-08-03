/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEBSITE_TITLE?: string;
  readonly VITE_GITHUB_TOKEN?: string;
  readonly VITE_PIN_CODE?: string;
  readonly VITE_ROOT_PATH?: string;
  readonly VITE_RESUME_FILE?: string;
  readonly VITE_OPENAI_BASE_URL?: string;
  readonly VITE_OPENAI_API_KEY?: string;
  readonly VITE_OPENAI_MODEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
