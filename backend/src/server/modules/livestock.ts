import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import type { LivestockRecord } from '../../shared/contracts';
import { ensureAuthenticated, getCurrentUserId } from '../lib/auth';
import { LivestockModel } from '../models/livestock';

const livestockSchema = z.object({
  tagId: z.string().min(1),
  type: z.enum(['cattle', 'sheep', 'goats', 'poultry', 'camels', 'horses', 'rabbits', 'bees']),
  breed: z.string().min(1),
  birthDate: z.string().optional(),
  status: z.enum(['healthy', 'monitoring', 'sold']).default('healthy'),
  location: z.string().optional(),
  notes: z.string().optional()
});

const toLivestockRecord = (item: {
  _id: string;
  tagId: string;
  type: LivestockRecord['type'];
  breed: string;
  birthDate?: Date;
  status: LivestockRecord['status'];
  location?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}): LivestockRecord => ({
  id: item._id.toString(),
  tagId: item.tagId,
  type: item.type,
  breed: item.breed,
  birthDate: item.birthDate?.toISOString(),
  status: item.status,
  location: item.location,
  notes: item.notes,
  createdAt: item.createdAt.toISOString(),
  updatedAt: item.updatedAt.toISOString()
});

export const registerLivestockRoutes = async (app: FastifyInstance): Promise<void> => {
  app.get<{ Reply: LivestockRecord[] }>(
    '/api/livestock',
    { preHandler: ensureAuthenticated },
    async (request) => {
      const ownerId = getCurrentUserId(request);
      const items = await LivestockModel.find({ ownerId }).sort({ createdAt: -1 });
      return items.map((item) => toLivestockRecord(item));
    }
  );

  app.post<{ Body: z.infer<typeof livestockSchema>; Reply: LivestockRecord }>(
    '/api/livestock',
    { preHandler: ensureAuthenticated },
    async (request) => {
      const ownerId = getCurrentUserId(request);
      const body = livestockSchema.parse(request.body);

      const created = await LivestockModel.create({
        ...body,
        ownerId,
        birthDate: body.birthDate ? new Date(body.birthDate) : undefined
      });

      return toLivestockRecord(created);
    }
  );
};
