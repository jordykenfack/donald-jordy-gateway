/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GATEWAY_URL?: string;
  readonly VITE_AI_PORTFOLIO_URL?: string;
  readonly VITE_DATA_PORTFOLIO_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
