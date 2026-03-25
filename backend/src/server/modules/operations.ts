import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import type { OperationRecord } from '../../shared/contracts';
import { ensureAuthenticated, getCurrentUserId } from '../lib/auth';
import { OperationModel } from '../models/operation';

const operationSchema = z.object({
  name: z.string().min(1),
  category: z.enum([
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
  ]),
  direction: z.enum(['expense', 'income']).default('expense'),
  date: z.string().min(1),
  amount: z.coerce.number().optional(),
  quantity: z.coerce.number().optional(),
  unit: z.string().optional(),
  counterpart: z.string().optional(),
  notes: z.string().optional()
});

const toOperationRecord = (item: {
  _id: string;
  name: string;
  category: OperationRecord['category'];
  direction: OperationRecord['direction'];
  date: Date;
  amount?: number;
  quantity?: number;
  unit?: string;
  counterpart?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}): OperationRecord => ({
  id: item._id.toString(),
  name: item.name,
  category: item.category,
  direction: item.direction,
  date: item.date.toISOString(),
  amount: item.amount,
  quantity: item.quantity,
  unit: item.unit,
  counterpart: item.counterpart,
  notes: item.notes,
  createdAt: item.createdAt.toISOString(),
  updatedAt: item.updatedAt.toISOString()
});

export const registerOperationRoutes = async (app: FastifyInstance): Promise<void> => {
  app.get<{ Reply: OperationRecord[] }>(
    '/api/operations',
    { preHandler: ensureAuthenticated },
    async (request) => {
      const ownerId = getCurrentUserId(request);
      const operations = await OperationModel.find({ ownerId }).sort({ date: -1 });
      return operations.map((operation) => toOperationRecord(operation));
    }
  );

  app.post<{ Body: z.infer<typeof operationSchema>; Reply: OperationRecord }>(
    '/api/operations',
    { preHandler: ensureAuthenticated },
    async (request) => {
      const ownerId = getCurrentUserId(request);
      const body = operationSchema.parse(request.body);

      const created = await OperationModel.create({
        ...body,
        ownerId,
        date: new Date(body.date)
      });

      return toOperationRecord(created);
    }
  );
};
