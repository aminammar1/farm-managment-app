export const fr = {
  app: {
    title: 'Ferma-TN',
    subtitle: 'Gestion moderne de ferme tunisienne pour le betail, les cultures, les couts et les revenus'
  },
  common: {
    save: 'Enregistrer',
    create: 'Creer',
    loading: 'Chargement',
    logout: 'Se deconnecter',
    empty: 'Aucune donnee pour le moment',
    language: 'Langue',
    today: 'Aujourd hui'
  },
  navigation: {
    dashboard: 'Tableau de bord',
    livestock: 'Betail',
    tasks: 'Taches',
    operations: 'Finances et operations',
    settings: 'Parametres'
  },
  auth: {
    title: 'Bienvenue sur Ferma-TN',
    subtitle: 'Un espace desktop securise pense pour les agriculteurs tunisiens et les bureaux de ferme',
    login: 'Connexion',
    register: 'Creer un compte',
    name: 'Nom complet',
    email: 'Adresse email',
    password: 'Mot de passe',
    phone: 'Telephone',
    farmName: 'Nom de la ferme',
    locale: 'Langue par defaut',
    submitLogin: 'Ouvrir Ferma-TN',
    submitRegister: 'Creer le compte ferme'
  },
  dashboard: {
    title: 'Cockpit agricole',
    hero: 'Un centre de pilotage vert et blanc pour la ferme tunisienne moderne',
    heroTitle: 'Suivez animaux, taches, couts et revenus depuis un seul tableau Ferma-TN.',
    heroDescription:
      'Concu pour les bovins, ovins, caprins, volailles, camelins, lapins, chevaux et l apiculture avec une vision claire de l activite quotidienne.',
    heroPointRevenue: 'Voir revenus, depenses et resultat net du mois en un coup d oeil.',
    heroPointLivestock: 'Suivre la composition du troupeau et les animaux qui demandent de l attention.',
    heroPointPlanning: 'Coordonner alimentation, veterinaire, irrigation, main d oeuvre et ventes.',
    livestockCount: 'Animaux suivis',
    pendingTasks: 'Taches ouvertes',
    completedTasks: 'Taches terminees',
    operationsThisMonth: 'Operations ce mois',
    monthlyRevenue: 'Revenus du mois',
    monthlyExpenses: 'Depenses du mois',
    monthlyNet: 'Resultat net',
    animalsUnderMonitoring: 'Animaux sous surveillance',
    upcomingTasks: 'Taches a venir',
    recentOperations: 'Operations recentes',
    herdBalance: 'Repartition du troupeau',
    financeTrend: 'Revenus contre depenses',
    operationsByCategory: 'Activite par categorie',
    taskStatusSummary: 'Flux des statuts de taches'
  },
  livestock: {
    title: 'Registre du betail',
    add: 'Ajouter un animal',
    tagId: 'Identifiant ou ruche',
    type: 'Type d animal',
    breed: 'Race ou lignee',
    birthDate: 'Date de naissance',
    status: 'Etat',
    location: 'Emplacement',
    notes: 'Notes'
  },
  tasks: {
    title: 'Taches agricoles',
    add: 'Ajouter une tache',
    task: 'Tache',
    category: 'Categorie',
    priority: 'Priorite',
    dueDate: 'Date limite',
    status: 'Statut',
    notes: 'Notes'
  },
  operations: {
    title: 'Finances et operations',
    add: 'Ajouter une operation',
    name: 'Operation',
    category: 'Categorie',
    direction: 'Sens',
    date: 'Date',
    amount: 'Montant',
    quantity: 'Quantite',
    unit: 'Unite',
    counterpart: 'Acheteur ou fournisseur',
    notes: 'Notes'
  },
  settings: {
    title: 'Preferences',
    languageHelp: 'Choisissez arabe, francais ou anglais. L arabe active automatiquement la mise en page RTL.'
  },
  language: {
    ar: 'Arabe',
    fr: 'Francais',
    en: 'Anglais'
  },
  livestockType: {
    cattle: 'Bovins',
    sheep: 'Ovins',
    goats: 'Caprins',
    poultry: 'Volaille',
    camels: 'Camelins',
    horses: 'Chevaux',
    rabbits: 'Lapins',
    bees: 'Ruches'
  },
  livestockStatus: {
    healthy: 'Sain',
    monitoring: 'Surveillance',
    sold: 'Vendu'
  },
  taskStatus: {
    pending: 'En attente',
    inProgress: 'En cours',
    done: 'Termine'
  },
  taskPriority: {
    low: 'Faible',
    medium: 'Moyenne',
    high: 'Haute'
  },
  taskCategory: {
    feeding: 'Alimentation',
    watering: 'Abreuvement',
    cleaning: 'Nettoyage',
    health: 'Sante',
    maintenance: 'Maintenance',
    harvest: 'Recolte'
  },
  operationCategory: {
    feeding: 'Aliment',
    irrigation: 'Irrigation',
    veterinary: 'Veterinaire',
    harvest: 'Recolte',
    maintenance: 'Maintenance',
    sales: 'Ventes',
    labor: 'Main d oeuvre',
    utilities: 'Charges',
    breeding: 'Reproduction',
    storage: 'Stockage'
  },
  financialDirection: {
    expense: 'Depense',
    income: 'Revenu'
  }
} as const;
