export const en = {
  app: {
    title: 'Ferma-TN',
    subtitle: 'Farm control for Tunisian growers'
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
    title: 'Farm access',
    subtitle: 'Desktop workspace for Tunisian farms',
    login: 'Log in',
    register: 'Sign up',
    name: 'Full name',
    email: 'Email address',
    password: 'Password',
    phone: 'Phone number',
    farmName: 'Farm name',
    locale: 'Default language',
    submitLogin: 'Log in',
    submitRegister: 'Sign up'
  },
  dashboard: {
    title: 'Farm cockpit',
    hero: 'Green-and-white control center for Tunisian farming',
    heroTitle: 'Animals, tasks, costs, and sales in one dashboard.',
    heroDescription:
      'Built for livestock, crops, and fast daily decisions.',
    heroPointRevenue: 'See revenue, costs, and net result fast.',
    heroPointLivestock: 'Track the herd and priority animals.',
    heroPointPlanning: 'Keep feed, health, irrigation, labor, and sales aligned.',
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
    taskStatusSummary: 'Task status flow',
    mapBadge: 'Interactive map',
    mapTitle: '3D farm map',
    mapSubtitle:
      'Scan irrigation, health, and harvest zones at a glance.',
    mapFocus: 'Map mode',
    mapModes: {
      irrigation: 'Irrigation',
      health: 'Health',
      harvest: 'Harvest'
    },
    mapStatus: {
      good: 'On track',
      attention: 'Watch',
      urgent: 'Urgent'
    },
    mapSummary: {
      water: 'Water',
      health: 'Checks',
      ready: 'Ready',
      zones: 'Zones'
    },
    mapZones: {
      olive: 'Olive grove',
      greenhouse: 'Greenhouse',
      livestock: 'Livestock yard',
      water: 'Water basin',
      packhouse: 'Packing point'
    },
    mapRecommendations: {
      olive: {
        irrigation: 'Olive grove is at {{metric}}. Keep the west line open.',
        health: 'Olive grove shows {{metric}}. Inspect the lower leaves.',
        harvest: 'Olive grove target is {{metric}}. Prepare crates early.'
      },
      greenhouse: {
        irrigation: 'Greenhouse is at {{metric}}. Vent at noon, then pulse irrigation.',
        health: 'Greenhouse is {{metric}}. Keep airflow open and check traps.',
        harvest: 'Greenhouse is {{metric}}. Plan a short evening pick.'
      },
      livestock: {
        irrigation: 'Livestock yard is at {{metric}}. Refill before evening feed.',
        health: 'Livestock yard shows {{metric}}. Prioritize checks first.',
        harvest: 'Livestock yard is in {{metric}}. Keep the milk route aligned.'
      },
      water: {
        irrigation: 'Water basin is at {{metric}}. Schedule the next pump check.',
        health: 'Water basin is {{metric}}. Keep filtration checks active.',
        harvest: 'Water basin is {{metric}}. No harvest block today.'
      },
      packhouse: {
        irrigation: 'Packing point supports {{metric}}. Keep loading access clear.',
        health: 'Packing point needs {{metric}}. Verify cooling and cleaning.',
        harvest: 'Packing point has {{metric}} lined up. Stage labor early.'
      }
    }
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
    directionExpense: 'Expense flow',
    date: 'Date',
    amount: 'Amount',
    quantity: 'Quantity',
    unit: 'Unit',
    counterpart: 'Buyer or supplier',
    notes: 'Notes'
  },
  settings: {
    title: 'Preferences',
    languageHelp: 'Choose Arabic, French, or English. Arabic switches to RTL.',
    profileSection: 'Farm profile',
    appearanceSection: 'Appearance',
    appearanceHelp: 'Switch between white mode and green night mode.',
    themeLight: 'White mode',
    themeDark: 'Green night',
    themeSelection: 'Color scheme',
    themeCurrent: 'Preview on',
    notifications: 'Notifications',
    aboutSection: 'About Ferma-TN',
    version: 'Version',
    platform: 'Platform',
    platformValue: 'Desktop (Electron)',
    license: 'License',
    licenseValue: 'PRO'
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
