import { resolve } from 'node:path';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ path: resolve(process.cwd(), '..', '.env') });
dotenv.config({ path: resolve(process.cwd(), '.env'), override: false });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGO_URL: z.string().min(1, 'MONGO_URL is required'),
  JWT_SECRET: z.string().min(12).default('change-this-secret-before-production'),
  APP_NAME: z.string().default('Ferma-TN'),
  API_HOST: z.string().default('127.0.0.1'),
  API_PORT: z.coerce.number().int().positive().default(4545)
});

export type AppEnv = z.infer<typeof envSchema>;

export const loadEnv = (): AppEnv => envSchema.parse(process.env);
