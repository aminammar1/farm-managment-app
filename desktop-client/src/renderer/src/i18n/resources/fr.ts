export const fr = {
  app: {
    title: 'Ferma-TN',
    subtitle: 'Pilotage agricole pour la Tunisie'
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
    title: 'Acces Ferma-TN',
    subtitle: 'Espace desktop pour fermes tunisiennes',
    login: 'Connexion',
    register: 'Inscription',
    name: 'Nom complet',
    email: 'Adresse email',
    password: 'Mot de passe',
    phone: 'Telephone',
    farmName: 'Nom de la ferme',
    locale: 'Langue par defaut',
    submitLogin: 'Entrer',
    submitRegister: 'S inscrire'
  },
  dashboard: {
    title: 'Cockpit agricole',
    hero: 'Centre de pilotage vert et blanc pour la ferme tunisienne',
    heroTitle: 'Animaux, taches, couts et ventes dans un seul tableau.',
    heroDescription:
      'Concu pour l elevage, les cultures et les decisions rapides.',
    heroPointRevenue: 'Voir revenus, depenses et resultat net vite.',
    heroPointLivestock: 'Suivre le troupeau et les animaux prioritaires.',
    heroPointPlanning: 'Aligner alimentation, sante, irrigation, main d oeuvre et ventes.',
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
    taskStatusSummary: 'Flux des statuts de taches',
    mapBadge: 'Carte interactive',
    mapTitle: 'Carte agricole 3D',
    mapSubtitle:
      'Reperez irrigation, sante et recolte en un coup d oeil.',
    mapFocus: 'Mode carte',
    mapModes: {
      irrigation: 'Irrigation',
      health: 'Sante',
      harvest: 'Recolte'
    },
    mapStatus: {
      good: 'Stable',
      attention: 'A surveiller',
      urgent: 'Urgent'
    },
    mapSummary: {
      water: 'Eau',
      health: 'Controles',
      ready: 'Pret',
      zones: 'Zones'
    },
    mapZones: {
      olive: 'Oliveraie',
      greenhouse: 'Serre',
      livestock: 'Cour du betail',
      water: 'Bassin',
      packhouse: 'Zone d emballage'
    },
    mapRecommendations: {
      olive: {
        irrigation: 'L oliveraie est a {{metric}}. Gardez la ligne ouest ouverte.',
        health: 'L oliveraie montre {{metric}}. Controlez les feuilles basses.',
        harvest: 'Objectif oliveraie: {{metric}}. Preparez les caisses.'
      },
      greenhouse: {
        irrigation: 'La serre est a {{metric}}. Aerez puis irriguez court.',
        health: 'La serre est {{metric}}. Gardez l air ouvert et verifiez les pieges.',
        harvest: 'La serre est {{metric}}. Planifiez une cueillette du soir.'
      },
      livestock: {
        irrigation: 'La cour du betail est a {{metric}}. Refaire le plein avant le soir.',
        health: 'La cour du betail montre {{metric}}. Priorite aux controles.',
        harvest: 'La cour du betail est en phase {{metric}}. Gardez la route du lait stable.'
      },
      water: {
        irrigation: 'Le bassin est a {{metric}}. Controlez la pompe ensuite.',
        health: 'Le bassin est {{metric}}. Continuez la filtration.',
        harvest: 'Le bassin est {{metric}}. Aucun blocage aujourd hui.'
      },
      packhouse: {
        irrigation: 'La zone d emballage soutient {{metric}}. Gardez l acces libre.',
        health: 'La zone d emballage demande {{metric}}. Verifiez froid et nettoyage.',
        harvest: 'La zone d emballage a {{metric}}. Placez l equipe plus tot.'
      }
    }
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
    directionExpense: 'Flux de depense',
    date: 'Date',
    amount: 'Montant',
    quantity: 'Quantite',
    unit: 'Unite',
    counterpart: 'Acheteur ou fournisseur',
    notes: 'Notes'
  },
  settings: {
    title: 'Preferences',
    languageHelp: 'Choisissez arabe, francais ou anglais. L arabe active le mode RTL.',
    profileSection: 'Profil de ferme',
    appearanceSection: 'Apparence',
    appearanceHelp: 'Passez entre mode blanc et mode vert nuit.',
    themeLight: 'Mode blanc',
    themeDark: 'Mode vert nuit',
    themeSelection: 'Palette active',
    themeCurrent: 'Apercu actif',
    notifications: 'Notifications',
    aboutSection: 'A propos de Ferma-TN',
    version: 'Version',
    platform: 'Plateforme',
    platformValue: 'Desktop (Electron)',
    license: 'Licence',
    licenseValue: 'PRO'
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
