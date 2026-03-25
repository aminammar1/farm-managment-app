import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import sensible from '@fastify/sensible';
import Fastify from 'fastify';
import type { AppEnv } from './lib/env';
import { registerAuthRoutes } from './modules/auth';
import { registerDashboardRoutes } from './modules/dashboard';
import { registerLivestockRoutes } from './modules/livestock';
import { registerOperationRoutes } from './modules/operations';
import { registerTaskRoutes } from './modules/tasks';

export const buildServer = async (env: AppEnv) => {
  const app = Fastify({
    logger: env.NODE_ENV === 'development'
  });

  await app.register(sensible);
  await app.register(cors, { origin: true });
  await app.register(jwt, {
    secret: env.JWT_SECRET
  });

  app.setErrorHandler((error, request, reply) => {
    request.log.error(error);
    const message = error instanceof Error ? error.message : 'Unexpected server error';

    reply.code(reply.statusCode >= 400 ? reply.statusCode : 500).send({
      message
    });
  });

  app.get('/api/health', async () => ({
    status: 'ok'
  }));

  await registerAuthRoutes(app);
  await registerDashboardRoutes(app);
  await registerLivestockRoutes(app);
  await registerTaskRoutes(app);
  await registerOperationRoutes(app);

  return app;
};
