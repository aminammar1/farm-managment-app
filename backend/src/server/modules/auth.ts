import bcrypt from 'bcryptjs';
import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import type { AuthResponse, AuthUser } from '../../shared/contracts';
import { ensureAuthenticated } from '../lib/auth';
import { UserModel } from '../models/user';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  farmName: z.string().optional(),
  locale: z.enum(['ar', 'fr', 'en']).default('ar'),
  password: z.string().min(8)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const toAuthUser = (user: {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  farmName?: string;
  locale: 'ar' | 'fr' | 'en';
}): AuthUser => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  phone: user.phone,
  farmName: user.farmName,
  locale: user.locale
});

const signToken = (app: FastifyInstance, user: AuthUser): string =>
  app.jwt.sign({
    sub: user.id,
    email: user.email,
    locale: user.locale
  });

export const registerAuthRoutes = async (app: FastifyInstance): Promise<void> => {
  app.post<{ Body: z.infer<typeof registerSchema>; Reply: AuthResponse }>(
    '/api/auth/register',
    async (request, reply) => {
      const body = registerSchema.parse(request.body);

      const existingUser = await UserModel.findOne({ email: body.email.toLowerCase() });
      if (existingUser) {
        reply.code(409);
        throw new Error('An account already exists with this email');
      }

      const passwordHash = await bcrypt.hash(body.password, 10);
      const createdUser = await UserModel.create({
        ...body,
        email: body.email.toLowerCase(),
        passwordHash
      });

      const safeUser = toAuthUser({
        _id: createdUser._id.toString(),
        name: createdUser.name,
        email: createdUser.email,
        phone: createdUser.phone,
        farmName: createdUser.farmName,
        locale: createdUser.locale
      });

      return {
        token: signToken(app, safeUser),
        user: safeUser
      };
    }
  );

  app.post<{ Body: z.infer<typeof loginSchema>; Reply: AuthResponse }>(
    '/api/auth/login',
    async (request, reply) => {
      const body = loginSchema.parse(request.body);
      const user = await UserModel.findOne({ email: body.email.toLowerCase() });

      if (!user) {
        reply.code(401);
        throw new Error('Invalid email or password');
      }

      const isPasswordValid = await bcrypt.compare(body.password, user.passwordHash);
      if (!isPasswordValid) {
        reply.code(401);
        throw new Error('Invalid email or password');
      }

      const safeUser = toAuthUser({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        farmName: user.farmName,
        locale: user.locale
      });

      return {
        token: signToken(app, safeUser),
        user: safeUser
      };
    }
  );

  app.get<{ Reply: AuthUser }>(
    '/api/auth/me',
    { preHandler: ensureAuthenticated },
    async (request) => {
      const user = await UserModel.findById(request.user.sub);
      if (!user) {
        throw new Error('User not found');
      }

      return toAuthUser({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        farmName: user.farmName,
        locale: user.locale
      });
    }
  );
};
