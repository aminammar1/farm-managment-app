export const supportedLanguages = ['ar', 'fr', 'en'] as const;
export type LanguageCode = (typeof supportedLanguages)[number];

export const livestockTypes = [
  'cattle',
  'sheep',
  'goats',
  'poultry',
  'camels',
  'horses',
  'rabbits',
  'bees'
] as const;
export type LivestockType = (typeof livestockTypes)[number];

export const livestockStatuses = ['healthy', 'monitoring', 'sold'] as const;
export type LivestockStatus = (typeof livestockStatuses)[number];

export const taskStatuses = ['pending', 'inProgress', 'done'] as const;
export type TaskStatus = (typeof taskStatuses)[number];

export const taskPriorities = ['low', 'medium', 'high'] as const;
export type TaskPriority = (typeof taskPriorities)[number];

export const taskCategories = [
  'feeding',
  'watering',
  'cleaning',
  'health',
  'maintenance',
  'harvest'
] as const;
export type TaskCategory = (typeof taskCategories)[number];

export const operationCategories = [
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
] as const;
export type OperationCategory = (typeof operationCategories)[number];

export const financialDirections = ['expense', 'income'] as const;
export type FinancialDirection = (typeof financialDirections)[number];

export interface RuntimeConfig {
  apiBaseUrl: string;
  appName: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  farmName?: string;
  locale: LanguageCode;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface LivestockRecord {
  id: string;
  tagId: string;
  type: LivestockType;
  breed: string;
  birthDate?: string;
  status: LivestockStatus;
  location?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskRecord {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OperationRecord {
  id: string;
  name: string;
  category: OperationCategory;
  direction: FinancialDirection;
  date: string;
  amount?: number;
  quantity?: number;
  unit?: string;
  counterpart?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardFinancePoint {
  month: string;
  revenue: number;
  expenses: number;
}

export interface DashboardCategoryPoint {
  category: OperationCategory;
  total: number;
}

export interface DashboardTaskPoint {
  status: TaskStatus;
  count: number;
}

export interface DashboardSummary {
  livestockCount: number;
  animalsUnderMonitoring: number;
  pendingTasks: number;
  completedTasks: number;
  operationsThisMonth: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  monthlyNet: number;
  livestockByType: Array<{
    type: LivestockType;
    count: number;
  }>;
  financeTimeline: DashboardFinancePoint[];
  operationsByCategory: DashboardCategoryPoint[];
  taskStatusSummary: DashboardTaskPoint[];
  upcomingTasks: TaskRecord[];
  recentOperations: OperationRecord[];
}
