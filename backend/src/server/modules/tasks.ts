import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import type { TaskRecord } from '../../shared/contracts';
import { ensureAuthenticated, getCurrentUserId } from '../lib/auth';
import { TaskModel } from '../models/task';

const createTaskSchema = z.object({
  title: z.string().min(1),
  category: z.enum(['feeding', 'watering', 'cleaning', 'health', 'maintenance', 'harvest']),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  dueDate: z.string().optional(),
  notes: z.string().optional()
});

const updateTaskSchema = z.object({
  status: z.enum(['pending', 'inProgress', 'done'])
});

const toTaskRecord = (item: {
  _id: string;
  title: string;
  category: TaskRecord['category'];
  priority: TaskRecord['priority'];
  status: TaskRecord['status'];
  dueDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}): TaskRecord => ({
  id: item._id.toString(),
  title: item.title,
  category: item.category,
  priority: item.priority,
  status: item.status,
  dueDate: item.dueDate?.toISOString(),
  notes: item.notes,
  createdAt: item.createdAt.toISOString(),
  updatedAt: item.updatedAt.toISOString()
});

export const registerTaskRoutes = async (app: FastifyInstance): Promise<void> => {
  app.get<{ Reply: TaskRecord[] }>(
    '/api/tasks',
    { preHandler: ensureAuthenticated },
    async (request) => {
      const ownerId = getCurrentUserId(request);
      const tasks = await TaskModel.find({ ownerId }).sort({ dueDate: 1, createdAt: -1 });
      return tasks.map((task) => toTaskRecord(task));
    }
  );

  app.post<{ Body: z.infer<typeof createTaskSchema>; Reply: TaskRecord }>(
    '/api/tasks',
    { preHandler: ensureAuthenticated },
    async (request) => {
      const ownerId = getCurrentUserId(request);
      const body = createTaskSchema.parse(request.body);

      const created = await TaskModel.create({
        ...body,
        ownerId,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined
      });

      return toTaskRecord(created);
    }
  );

  app.patch<{ Params: { id: string }; Body: z.infer<typeof updateTaskSchema>; Reply: TaskRecord }>(
    '/api/tasks/:id',
    { preHandler: ensureAuthenticated },
    async (request, reply) => {
      const ownerId = getCurrentUserId(request);
      const body = updateTaskSchema.parse(request.body);

      const updated = await TaskModel.findOneAndUpdate(
        { _id: request.params.id, ownerId },
        { status: body.status },
        { new: true }
      );

      if (!updated) {
        reply.code(404);
        throw new Error('Task not found');
      }

      return toTaskRecord(updated);
    }
  );
};
