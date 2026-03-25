import type { RuntimeConfig } from '../shared/contracts';
import { buildServer } from './app';
import { loadEnv } from './lib/env';
import { connectDatabase, disconnectDatabase } from './lib/mongo';

export interface RunningServer {
  runtimeConfig: RuntimeConfig;
  stop: () => Promise<void>;
}

export const startServer = async (): Promise<RunningServer> => {
  const env = loadEnv();
  await connectDatabase(env);

  const app = await buildServer(env);
  const address = await app.listen({
    host: env.API_HOST,
    port: env.API_PORT ?? 0
  });

  return {
    runtimeConfig: {
      apiBaseUrl: address,
      appName: env.APP_NAME
    },
    stop: async () => {
      await app.close();
      await disconnectDatabase();
    }
  };
};
