import mongoose from 'mongoose';
import type { AppEnv } from './env';

export const connectDatabase = async (env: AppEnv): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(env.MONGO_URL, {
    dbName: 'farming_tunisia'
  });
};

export const disconnectDatabase = async (): Promise<void> => {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  await mongoose.disconnect();
};
