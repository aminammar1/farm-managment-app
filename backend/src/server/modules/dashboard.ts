import type { FastifyInstance } from 'fastify';
import type {
  DashboardSummary,
  OperationRecord,
  OperationCategory,
  TaskRecord,
  TaskStatus
} from '../../shared/contracts';
import { ensureAuthenticated, getCurrentUserId } from '../lib/auth';
import { LivestockModel } from '../models/livestock';
import { OperationModel } from '../models/operation';
import { TaskModel } from '../models/task';

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

const getMonthKey = (date: Date) => `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;

export const registerDashboardRoutes = async (app: FastifyInstance): Promise<void> => {
  app.get<{ Reply: DashboardSummary }>(
    '/api/dashboard/summary',
    { preHandler: ensureAuthenticated },
    async (request) => {
      const ownerId = getCurrentUserId(request);
      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);

      const lastSixMonthsStart = new Date(Date.UTC(monthStart.getUTCFullYear(), monthStart.getUTCMonth() - 5, 1));

      const [
        livestockCount,
        animalsUnderMonitoring,
        pendingTasks,
        completedTasks,
        operationsThisMonth,
        livestockByType,
        upcomingTasks,
        recentOperations,
        taskStatusSummary,
        operationsByCategory,
        monthlyOperations
      ] = await Promise.all([
          LivestockModel.countDocuments({ ownerId }),
          LivestockModel.countDocuments({ ownerId, status: 'monitoring' }),
          TaskModel.countDocuments({ ownerId, status: { $ne: 'done' } }),
          TaskModel.countDocuments({ ownerId, status: 'done' }),
          OperationModel.countDocuments({ ownerId, date: { $gte: monthStart } }),
          LivestockModel.aggregate<{ _id: string; count: number }>([
            { $match: { ownerId } },
            { $group: { _id: '$type', count: { $sum: 1 } } }
          ]),
          TaskModel.find({ ownerId, status: { $ne: 'done' } })
            .sort({ dueDate: 1, createdAt: -1 })
            .limit(5),
          OperationModel.find({ ownerId }).sort({ date: -1 }).limit(5)
          ,
          TaskModel.aggregate<{ _id: TaskStatus; count: number }>([
            { $match: { ownerId } },
            { $group: { _id: '$status', count: { $sum: 1 } } }
          ]),
          OperationModel.aggregate<{ _id: OperationCategory; total: number }>([
            { $match: { ownerId } },
            { $group: { _id: '$category', total: { $sum: 1 } } },
            { $sort: { total: -1 } }
          ]),
          OperationModel.find({ ownerId, date: { $gte: lastSixMonthsStart } }).sort({ date: 1 })
        ]);

      const monthBuckets = new Map<string, { revenue: number; expenses: number }>();
      for (let offset = 5; offset >= 0; offset -= 1) {
        const monthDate = new Date(Date.UTC(monthStart.getUTCFullYear(), monthStart.getUTCMonth() - offset, 1));
        monthBuckets.set(getMonthKey(monthDate), { revenue: 0, expenses: 0 });
      }

      let monthlyRevenue = 0;
      let monthlyExpenses = 0;

      monthlyOperations.forEach((operation) => {
        const amount = operation.amount ?? 0;
        const monthKey = getMonthKey(operation.date);
        const bucket = monthBuckets.get(monthKey);

        if (bucket) {
          if (operation.direction === 'income') {
            bucket.revenue += amount;
          } else {
            bucket.expenses += amount;
          }
        }

        if (operation.date >= monthStart) {
          if (operation.direction === 'income') {
            monthlyRevenue += amount;
          } else {
            monthlyExpenses += amount;
          }
        }
      });

      return {
        livestockCount,
        animalsUnderMonitoring,
        pendingTasks,
        completedTasks,
        operationsThisMonth,
        monthlyRevenue,
        monthlyExpenses,
        monthlyNet: monthlyRevenue - monthlyExpenses,
        livestockByType: livestockByType.map((entry) => ({
          type: entry._id as DashboardSummary['livestockByType'][number]['type'],
          count: entry.count
        })),
        financeTimeline: Array.from(monthBuckets.entries()).map(([month, values]) => ({
          month,
          revenue: values.revenue,
          expenses: values.expenses
        })),
        operationsByCategory: operationsByCategory.map((entry) => ({
          category: entry._id,
          total: entry.total
        })),
        taskStatusSummary: taskStatusSummary.map((entry) => ({
          status: entry._id,
          count: entry.count
        })),
        upcomingTasks: upcomingTasks.map((task) => toTaskRecord(task)),
        recentOperations: recentOperations.map((operation) => toOperationRecord(operation))
      };
    }
  );
};

