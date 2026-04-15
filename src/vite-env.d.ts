/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEBSITE_TITLE?: string;
  readonly VITE_PIN_CODE?: string;
  readonly VITE_ROOT_PATH?: string;
  readonly VITE_RESUME_FILE?: string;
  readonly VITE_RESUME_PDF_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
