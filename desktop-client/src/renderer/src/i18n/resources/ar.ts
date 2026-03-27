export const ar = {
  app: {
    title: 'Ferma-TN',
    subtitle: 'إدارة تونسية حديثة للمزرعة والماشية والمحاصيل والتكاليف والإيرادات'
  },
  common: {
    save: 'حفظ',
    create: 'إنشاء',
    loading: 'جار التحميل',
    logout: 'تسجيل الخروج',
    empty: 'لا توجد بيانات بعد',
    language: 'اللغة',
    today: 'اليوم'
  },
  navigation: {
    dashboard: 'لوحة القيادة',
    livestock: 'الماشية',
    tasks: 'المهام',
    operations: 'العمليات المالية',
    settings: 'الإعدادات'
  },
  auth: {
    title: 'دخول المزرعة',
    subtitle: 'مساحة مكتبية للمزارع التونسية',
    login: 'دخول',
    register: 'تسجيل',
    name: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    phone: 'رقم الهاتف',
    farmName: 'اسم المزرعة',
    locale: 'اللغة الافتراضية',
    submitLogin: 'دخول',
    submitRegister: 'تسجيل'
  },
  dashboard: {
    title: 'مركز المزرعة',
    hero: 'لوحة خضراء وبيضاء لإدارة المزرعة التونسية المختلطة',
    heroTitle: 'تابع الحيوانات والمهام والتكاليف والإيرادات من لوحة Ferma-TN الحديثة.',
    heroDescription:
      'مصمم للأبقار والأغنام والماعز والدواجن والإبل والأرانب والخيول وتربية النحل مع رؤية يومية سريعة وواضحة.',
    heroPointRevenue: 'اعرف الإيرادات والمصاريف وصافي النتيجة الشهرية بسرعة.',
    heroPointLivestock: 'راقب توزيع القطيع والحيوانات التي تحتاج متابعة.',
    heroPointPlanning: 'نسّق العلف والبيطرة والري والعمالة والمبيعات في نفس المكان.',
    livestockCount: 'عدد الحيوانات',
    pendingTasks: 'المهام المفتوحة',
    completedTasks: 'المهام المنجزة',
    operationsThisMonth: 'عمليات هذا الشهر',
    monthlyRevenue: 'إيراد الشهر',
    monthlyExpenses: 'مصروف الشهر',
    monthlyNet: 'الصافي الشهري',
    animalsUnderMonitoring: 'حيوانات تحت المراقبة',
    upcomingTasks: 'المهام القادمة',
    recentOperations: 'أحدث العمليات',
    herdBalance: 'توزيع القطيع',
    financeTrend: 'الإيرادات مقابل المصاريف',
    operationsByCategory: 'الأنشطة حسب الفئة',
    taskStatusSummary: 'تدفق حالات المهام',
    mapBadge: 'خريطة تفاعلية',
    mapTitle: 'محاكاة خريطة المزرعة',
    mapSubtitle:
      'تحرّك داخل المزرعة مثل مسؤول ميداني تونسي واعرف بسرعة أين توجد أولوية الري أو الصحة أو الحصاد.',
    mapFocus: 'محور المحاكاة',
    mapModes: {
      irrigation: 'الري',
      health: 'الصحة',
      harvest: 'الحصاد'
    },
    mapStatus: {
      good: 'مستقر',
      attention: 'يحتاج متابعة',
      urgent: 'عاجل'
    },
    mapSummary: {
      water: 'مخزون الماء',
      health: 'فحوصات نشطة',
      ready: 'جاهز الآن',
      zones: 'مناطق المتابعة'
    },
    mapZones: {
      olive: 'حقل الزيتون',
      greenhouse: 'البيت المحمي',
      livestock: 'ساحة الماشية',
      water: 'حوض الماء',
      packhouse: 'منطقة التعبئة'
    },
    mapRecommendations: {
      olive: {
        irrigation: 'نافذة ري حقل الزيتون عند {{metric}}. افتح الخط الغربي قبل اشتداد هواء بعد الظهر.',
        health: 'حقل الزيتون فيه {{metric}}. افحص الأوراق السفلية بحثاً عن الغبار وبداية الفطريات.',
        harvest: 'هدف حقل الزيتون هو {{metric}}. جهّز الصناديق ودوريات العمال للصفوف الشمالية.'
      },
      greenhouse: {
        irrigation: 'رطوبة البيت المحمي عند {{metric}}. هوّ الهواء وقت الظهر ثم نفّذ ريّاً قصيراً لحماية الطماطم والفلفل.',
        health: 'وضع البيت المحمي {{metric}}. اترك الستائر الجانبية مفتوحة وراجع مصائد الذبابة البيضاء.',
        harvest: 'البيت المحمي {{metric}}. خطط لجولة جني مسائية خفيفة للحفاظ على الجودة.'
      },
      livestock: {
        irrigation: 'دورة الماء في ساحة الماشية هي {{metric}}. أعد التعبئة قبل وجبة آخر النهار.',
        health: 'ساحة الماشية فيها {{metric}}. أعط الأولوية للتلقيح وقياس الحرارة للمجموعة تحت المراقبة.',
        harvest: 'ساحة الماشية في مرحلة {{metric}}. حافظ على انسجام مسار الحليب وتوقيت العلف.'
      },
      water: {
        irrigation: 'مستوى حوض الماء عند {{metric}}. يكفي لليوم لكن جدولة فحص المضخة قبل الفجر أفضل.',
        health: 'وضع حوض الماء {{metric}}. واصل مراقبة الفلترة وسجّل مؤشرات الطحالب.',
        harvest: 'حوض الماء {{metric}}. لا توجد عوائق أمام الشاحنات أو نقطة الغسيل اليوم.'
      },
      packhouse: {
        irrigation: 'منطقة التعبئة تدعم اللوجستيك بمستوى {{metric}}. جهّز الأكياس والملصقات ومسار التحميل.',
        health: 'منطقة التعبئة تحتاج {{metric}}. تأكد من التبريد والتنظيف قبل وصول المنتوج.',
        harvest: 'منطقة التعبئة لديها {{metric}} جاهزة. وزّع الفريق مبكراً حتى لا يحصل اختناق في التسليم.'
      }
    }
  },
  livestock: {
    title: 'سجل الماشية',
    add: 'إضافة حيوان',
    tagId: 'رقم الوسم أو الخلية',
    type: 'نوع الحيوان',
    breed: 'السلالة',
    birthDate: 'تاريخ الميلاد',
    status: 'الحالة',
    location: 'الموقع',
    notes: 'ملاحظات'
  },
  tasks: {
    title: 'مهام المزرعة',
    add: 'إضافة مهمة',
    task: 'المهمة',
    category: 'الفئة',
    priority: 'الأولوية',
    dueDate: 'تاريخ الاستحقاق',
    status: 'الحالة',
    notes: 'ملاحظات'
  },
  operations: {
    title: 'العمليات المالية',
    add: 'إضافة عملية',
    name: 'العملية',
    category: 'الفئة',
    direction: 'الاتجاه',
    directionExpense: 'مسار المصروف',
    date: 'التاريخ',
    amount: 'المبلغ',
    quantity: 'الكمية',
    unit: 'الوحدة',
    counterpart: 'المشتري أو المورد',
    notes: 'ملاحظات'
  },
  settings: {
    title: 'الإعدادات',
    languageHelp: 'يمكنك تغيير اللغة من قائمة أوضح بين العربية والفرنسية والإنجليزية. تتحول الواجهة إلى RTL عند اختيار العربية.',
    profileSection: 'ملف المزرعة',
    appearanceSection: 'المظهر',
    appearanceHelp: 'بدّل بين النمط الليلي الأخضر ووضع أبيض مريح للعمل المكتبي والقراءة النهارية.',
    themeLight: 'الوضع الأبيض',
    themeDark: 'الوضع الليلي',
    themeSelection: 'نمط الألوان',
    themeCurrent: 'المعاينة المباشرة مفعلة',
    notifications: 'الإشعارات',
    aboutSection: 'حول Ferma-TN',
    version: 'الإصدار',
    platform: 'المنصة',
    platformValue: 'سطح المكتب (Electron)',
    license: 'الرخصة',
    licenseValue: 'PRO'
  },
  language: {
    ar: 'العربية',
    fr: 'الفرنسية',
    en: 'الإنجليزية'
  },
  livestockType: {
    cattle: 'أبقار',
    sheep: 'أغنام',
    goats: 'ماعز',
    poultry: 'دواجن',
    camels: 'إبل',
    horses: 'خيول',
    rabbits: 'أرانب',
    bees: 'خلايا نحل'
  },
  livestockStatus: {
    healthy: 'سليم',
    monitoring: 'تحت المراقبة',
    sold: 'تم البيع'
  },
  taskStatus: {
    pending: 'قيد الانتظار',
    inProgress: 'قيد التنفيذ',
    done: 'منجز'
  },
  taskPriority: {
    low: 'منخفضة',
    medium: 'متوسطة',
    high: 'مرتفعة'
  },
  taskCategory: {
    feeding: 'تغذية',
    watering: 'سقي',
    cleaning: 'تنظيف',
    health: 'صحة',
    maintenance: 'صيانة',
    harvest: 'حصاد'
  },
  operationCategory: {
    feeding: 'علف',
    irrigation: 'ري',
    veterinary: 'بيطرة',
    harvest: 'حصاد',
    maintenance: 'صيانة',
    sales: 'مبيعات',
    labor: 'يد عاملة',
    utilities: 'مصاريف تشغيل',
    breeding: 'تربية',
    storage: 'تخزين'
  },
  financialDirection: {
    expense: 'مصروف',
    income: 'إيراد'
  }
} as const;
