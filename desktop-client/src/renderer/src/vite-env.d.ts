/// <reference types="vite/client" />

import type { RuntimeConfig } from '../../shared/contracts';

declare global {
  interface Window {
    farmDesk?: {
      getRuntimeConfig: () => Promise<RuntimeConfig>;
    };
  }
}

export {};
