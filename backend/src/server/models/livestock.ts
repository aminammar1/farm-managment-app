import { Schema, model } from 'mongoose';
import type { LivestockStatus, LivestockType } from '../../shared/contracts';

export interface LivestockDocument {
  _id: string;
  ownerId: string;
  tagId: string;
  type: LivestockType;
  breed: string;
  birthDate?: Date;
  status: LivestockStatus;
  location?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const livestockSchema = new Schema<LivestockDocument>(
  {
    ownerId: { type: String, required: true, index: true },
    tagId: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['cattle', 'sheep', 'goats', 'poultry', 'camels', 'horses', 'rabbits', 'bees'],
      required: true
    },
    breed: { type: String, required: true, trim: true },
    birthDate: { type: Date },
    status: { type: String, enum: ['healthy', 'monitoring', 'sold'], default: 'healthy' },
    location: { type: String, trim: true },
    notes: { type: String, trim: true }
  },
  {
    timestamps: true
  }
);

export const LivestockModel = model<LivestockDocument>('Livestock', livestockSchema);
