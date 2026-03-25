import { Schema, model } from 'mongoose';
import type { TaskCategory, TaskPriority, TaskStatus } from '../../shared/contracts';

export interface TaskDocument {
  _id: string;
  ownerId: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<TaskDocument>(
  {
    ownerId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['feeding', 'watering', 'cleaning', 'health', 'maintenance', 'harvest'],
      required: true
    },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    status: { type: String, enum: ['pending', 'inProgress', 'done'], default: 'pending' },
    dueDate: { type: Date },
    notes: { type: String, trim: true }
  },
  {
    timestamps: true
  }
);

export const TaskModel = model<TaskDocument>('Task', taskSchema);
