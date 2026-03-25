import { buildServer } from './server/app';
import { loadEnv } from './server/lib/env';
import { connectDatabase, disconnectDatabase } from './server/lib/mongo';

const start = async () => {
  const env = loadEnv();
  await connectDatabase(env);

  const app = await buildServer(env);
  const address = await app.listen({
    host: env.API_HOST,
    port: env.API_PORT
  });

  console.log(`Backend listening on ${address}`);

  const shutdown = async () => {
    await app.close();
    await disconnectDatabase();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

void start().catch((error) => {
  console.error(error);
  process.exit(1);
});
