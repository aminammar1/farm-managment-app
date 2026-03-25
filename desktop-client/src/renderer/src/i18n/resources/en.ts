export const en = {
  app: {
    title: 'Ferma-TN',
    subtitle: 'Modern Tunisian farm management for herd, crops, costs, and revenue'
  },
  common: {
    save: 'Save',
    create: 'Create',
    loading: 'Loading',
    logout: 'Log out',
    empty: 'No records yet',
    language: 'Language',
    today: 'Today'
  },
  navigation: {
    dashboard: 'Dashboard',
    livestock: 'Livestock',
    tasks: 'Tasks',
    operations: 'Finance & Operations',
    settings: 'Settings'
  },
  auth: {
    title: 'Welcome to Ferma-TN',
    subtitle: 'A secure desktop workspace built for Tunisian farmers and farm offices',
    login: 'Login',
    register: 'Create account',
    name: 'Full name',
    email: 'Email address',
    password: 'Password',
    phone: 'Phone number',
    farmName: 'Farm name',
    locale: 'Default language',
    submitLogin: 'Open Ferma-TN',
    submitRegister: 'Create farm account'
  },
  dashboard: {
    title: 'Farm cockpit',
    hero: 'A complete green-and-white command center for Tunisian mixed farming',
    heroTitle: 'Track animals, tasks, costs, and revenue from one modern Ferma-TN dashboard.',
    heroDescription:
      'Built for cattle, sheep, goats, poultry, camels, rabbits, horses, and beekeeping operations with fast daily planning and financial visibility.',
    heroPointRevenue: 'See monthly revenue, expenses, and net result at a glance.',
    heroPointLivestock: 'Follow herd composition and animals that need attention.',
    heroPointPlanning: 'Keep feed, veterinary, irrigation, labor, and sales workflows aligned.',
    livestockCount: 'Animals tracked',
    pendingTasks: 'Open tasks',
    completedTasks: 'Completed tasks',
    operationsThisMonth: 'Operations this month',
    monthlyRevenue: 'Monthly revenue',
    monthlyExpenses: 'Monthly expenses',
    monthlyNet: 'Net result',
    animalsUnderMonitoring: 'Animals under monitoring',
    upcomingTasks: 'Upcoming tasks',
    recentOperations: 'Recent operations',
    herdBalance: 'Herd distribution',
    financeTrend: 'Revenue vs expenses',
    operationsByCategory: 'Activity by category',
    taskStatusSummary: 'Task status flow'
  },
  livestock: {
    title: 'Livestock registry',
    add: 'Add livestock',
    tagId: 'Tag or hive ID',
    type: 'Animal type',
    breed: 'Breed or line',
    birthDate: 'Birth date',
    status: 'Status',
    location: 'Location',
    notes: 'Notes'
  },
  tasks: {
    title: 'Farm tasks',
    add: 'Add task',
    task: 'Task',
    category: 'Category',
    priority: 'Priority',
    dueDate: 'Due date',
    status: 'Status',
    notes: 'Notes'
  },
  operations: {
    title: 'Finance and operations',
    add: 'Add operation',
    name: 'Operation',
    category: 'Category',
    direction: 'Direction',
    date: 'Date',
    amount: 'Amount',
    quantity: 'Quantity',
    unit: 'Unit',
    counterpart: 'Buyer or supplier',
    notes: 'Notes'
  },
  settings: {
    title: 'Preferences',
    languageHelp: 'Choose Arabic, French, or English. Arabic automatically switches the layout to RTL.'
  },
  language: {
    ar: 'Arabic',
    fr: 'French',
    en: 'English'
  },
  livestockType: {
    cattle: 'Cattle',
    sheep: 'Sheep',
    goats: 'Goats',
    poultry: 'Poultry',
    camels: 'Camels',
    horses: 'Horses',
    rabbits: 'Rabbits',
    bees: 'Bee hives'
  },
  livestockStatus: {
    healthy: 'Healthy',
    monitoring: 'Monitoring',
    sold: 'Sold'
  },
  taskStatus: {
    pending: 'Pending',
    inProgress: 'In progress',
    done: 'Done'
  },
  taskPriority: {
    low: 'Low',
    medium: 'Medium',
    high: 'High'
  },
  taskCategory: {
    feeding: 'Feeding',
    watering: 'Watering',
    cleaning: 'Cleaning',
    health: 'Health',
    maintenance: 'Maintenance',
    harvest: 'Harvest'
  },
  operationCategory: {
    feeding: 'Feed',
    irrigation: 'Irrigation',
    veterinary: 'Veterinary',
    harvest: 'Harvest',
    maintenance: 'Maintenance',
    sales: 'Sales',
    labor: 'Labor',
    utilities: 'Utilities',
    breeding: 'Breeding',
    storage: 'Storage'
  },
  financialDirection: {
    expense: 'Expense',
    income: 'Income'
  }
} as const;
