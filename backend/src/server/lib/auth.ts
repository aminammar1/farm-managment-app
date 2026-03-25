import type { FastifyReply, FastifyRequest } from 'fastify';

export interface JwtUser {
  sub: string;
  email: string;
  locale: string;
}

export const ensureAuthenticated = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  await request.jwtVerify();
  if (!request.user?.sub) {
    reply.code(401);
    throw new Error('Unauthorized');
  }
};

export const getCurrentUserId = (request: FastifyRequest): string => {
  const user = request.user as JwtUser | undefined;
  if (!user?.sub) {
    throw new Error('Missing authenticated user');
  }
  return user.sub;
};
