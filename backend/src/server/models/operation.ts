import { Schema, model } from 'mongoose';
import type { FinancialDirection, OperationCategory } from '../../shared/contracts';

export interface OperationDocument {
  _id: string;
  ownerId: string;
  name: string;
  category: OperationCategory;
  direction: FinancialDirection;
  date: Date;
  amount?: number;
  quantity?: number;
  unit?: string;
  counterpart?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const operationSchema = new Schema<OperationDocument>(
  {
    ownerId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: [
        'feeding',
        'irrigation',
        'veterinary',
        'harvest',
        'maintenance',
        'sales',
        'labor',
        'utilities',
        'breeding',
        'storage'
      ],
      required: true
    },
    direction: { type: String, enum: ['expense', 'income'], default: 'expense' },
    date: { type: Date, required: true },
    amount: { type: Number },
    quantity: { type: Number },
    unit: { type: String, trim: true },
    counterpart: { type: String, trim: true },
    notes: { type: String, trim: true }
  },
  {
    timestamps: true
  }
);

export const OperationModel = model<OperationDocument>('Operation', operationSchema);
