import { Schema, model } from 'mongoose';
import type { LanguageCode } from '../../shared/contracts';

export interface UserDocument {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  farmName?: string;
  locale: LanguageCode;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    farmName: { type: String, trim: true },
    locale: { type: String, enum: ['ar', 'fr', 'en'], default: 'ar' },
    passwordHash: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export const UserModel = model<UserDocument>('User', userSchema);
