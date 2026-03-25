import type { RuntimeConfig } from '../../../shared/contracts';

let runtimeConfig: RuntimeConfig | null = null;

export const setRuntimeConfig = (nextConfig: RuntimeConfig): void => {
  runtimeConfig = nextConfig;
};

export const getRuntimeConfig = (): RuntimeConfig => {
  if (!runtimeConfig) {
    throw new Error('Runtime config has not been initialized');
  }

  return runtimeConfig;
};
