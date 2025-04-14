
import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

type Language = 'en' | 'zh' | 'es' | 'ar' | 'pt' | 'ru' | 'ja' | 'fr' | 'de' | 'ko';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  getLocalizedText: (key: string) => string;
};

type LanguageProviderProps = {
  children: ReactNode;
};

// Default translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    features: 'Features',
    benefits: 'Benefits',
    testimonials: 'Testimonials',
    contact: 'Contact',
    login: 'Log In',
    contactUs: 'Contact Us',
    contactUsSubtitle: 'Have questions about how <span class="text-indigo-600">Wealth</span>Horizon can transform your wealth management?',
    getInTouch: 'Get in touch with our team.',
    whyWealthHorizon: 'Why WealthHorizon',
    
    // Hero Section
    holisticWealthManagement: 'Holistic wealth management for',
    familyOffices: 'family offices',
    and: 'and',
    institutions: 'institutions',
    actionableWealth: 'All your wealth made actionable on one platform',
    acrossAllBanks: 'across all your banks, brokers and custodians',
    learnMore: 'Learn More',
    aiNativePlatform: 'AI-native platform',
    realTimeAnalytics: 'Real-time analytics',
    soc2Certified: 'SOC 2 certified',
    
    // Languages
    english: 'English',
    chinese: 'Chinese',
    spanish: 'Spanish',
    arabic: 'Arabic',
    portuguese: 'Portuguese',
    russian: 'Russian',
    japanese: 'Japanese',
    french: 'French',
    german: 'German',
    korean: 'Korean',
    
    // Dashboard
    dashboard: 'Dashboard',
    overview: 'Overview',
    performance: 'Performance',
    portfolio: 'Portfolio',
    assets: 'Assets',
    
    // Common actions
    search: 'Search',
    filter: 'Filter',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    create: 'Create',
    view: 'View',
    submit: 'Submit',
    
    // Common sections
    settings: 'Settings',
    notifications: 'Notifications',
    profile: 'Profile',
    security: 'Security',
    help: 'Help',
    
    // Messaging
    welcomeMessage: 'Welcome to WealthHorizon',
    loadingMessage: 'Loading...',
    errorMessage: 'An error occurred',
    
    // Footer
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    copyright: '© 2025 WealthHorizon. All rights reserved.',
    
    // Landing page sections
    readyToOptimize: 'Ready to Optimize Your Wealth Management?',
    joinLeading: 'Join leading family offices and institutions that have transformed their operations with',
    trustedByLeading: 'Trusted by Leading Institutions',
    seeWhatFamilyOffices: 'See what family offices and institutional investors say about',
    
    // Why Section
    comprehensiveSolution: 'Comprehensive Solution',
    comprehensiveSolutionDesc: 'Our platform unifies all your financial data across institutions, providing a single source of truth for your wealth.',
    enterpriseSecurity: 'Enterprise Security',
    enterpriseSecurityDesc: 'Bank-level security and encryption protect your sensitive financial data with rigorous access controls.',
    clientCenteredApproach: 'Client-Centered Approach',
    clientCenteredApproachDesc: 'Built specifically for family offices and institutions with the flexibility to adapt to your unique needs.',
    aiPoweredInsights: 'AI-Powered Insights',
    aiPoweredInsightsDesc: 'Leverage advanced analytics and AI to uncover opportunities and optimize your wealth management strategy.',
    
    // Key Features
    keyFeatures: 'Key Features',
    keyFeaturesSubtitle: 'Our AI-native platform simplifies managing all your wealth with intuitive tools designed for the most sophisticated family offices and institutions',
    complianceManagement: 'Compliance Management',
    complianceManagementDesc: 'Stay ahead of regulatory requirements with automated compliance monitoring.',
    comprehensiveDashboard: 'Comprehensive Dashboard',
    comprehensiveDashboardDesc: 'Get a holistic view of your wealth across all your banks, brokers and custodians.',
    realTimeAnalyticsDesc: 'Monitor your investments with real-time updates and customizable dashboards.',
    riskManagement: 'Risk Management',
    riskManagementDesc: 'Identify and mitigate risks with our sophisticated analysis tools.',
    secureCollaboration: 'Secure Collaboration',
    secureCollaborationDesc: 'Invite team members and stakeholders to the platform.',
    advancedReporting: 'Advanced Reporting',
    advancedReportingDesc: 'Create custom reports with detailed insights and easy-to-understand visualizations.',
    
    // Benefits
    transformYourWealth: 'Transform Your Wealth Management',
    transformYourWealthDesc: 'Experience a new level of efficiency, insight, and control with',
    centralizedAssetManagement: 'Centralized Asset Management',
    centralizedAssetManagementDesc: 'Eliminate data silos and manage all assets, investments, and operations in one unified platform.',
    dataDrivenDecisionMaking: 'Data-Driven Decision Making',
    dataDrivenDecisionMakingDesc: 'Leverage advanced analytics and AI-powered insights to make more informed investment decisions.',
    enterpriseGradeSecurity: 'Enterprise-Grade Security',
    enterpriseGradeSecurityDesc: 'Safeguard sensitive financial data with bank-level security, encryption, and access controls.',
    operationalEfficiency: 'Operational Efficiency',
    operationalEfficiencyDesc: 'Streamline workflows, automate routine tasks, and reduce manual work to focus on high-value activities.',
    
    // Testimonials
    testimonial1: "WealthHorizon has transformed how our family office operates. We've eliminated multiple tools and streamlined the way we facilitate our business.",
    testimonial1Name: "Alexandra Chen",
    testimonial1Position: "CEO, Chen Family Office",
    testimonial2: "The analytics capabilities are exceptional. We're able to see portfolio insights we never had access to before, which has directly improved our returns.",
    testimonial2Name: "Michael Thompson",
    testimonial2Position: "CIO, Granite Investments",
    testimonial3: "We were not aware that this degree of automation and efficiency is possible using artificial intelligence.",
    testimonial3Name: "Sarah Rodriguez",
    testimonial3Position: "Head of Compliance, Legacy Capital",
    
    // Contact
    contactInformation: 'Contact Information',
    ourAddress: 'Our Address',
    companyAddress: '123 Financial District, Suite 1500, New York, NY 10005',
    phoneNumber: 'Phone Number',
    contactPhone: '+1 (555) 123-4567',
    emailAddress: 'Email Address',
    contactEmail: 'contact@wealthhorizon.com',
    officeHours: 'Office Hours',
    weekdayHours: 'Monday-Friday: 9:00 AM - 6:00 PM EST',
    weekendClosed: 'Saturday-Sunday: Closed',
    sendUsAMessage: 'Send us a message',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    message: 'Message',
    sendMessage: 'Send Message',
    submitting: 'Submitting...',
    
    // Solutions section
    solutions: 'Solutions',
    portfolioManagement: 'Portfolio Management',
    trading: 'Trading',
    wealthAnalysis: 'Wealth Analysis',
    reporting: 'Reporting',
    compliance: 'Compliance',
    
    // Company section
    company: 'Company',
    aboutUs: 'About Us',
    careers: 'Careers',
    blog: 'Blog',
    press: 'Press',
    
    // Resources section
    resources: 'Resources',
    documentation: 'Documentation',
    helpCenter: 'Help Center'
  },
  zh: {
    // Navigation
    features: '功能',
    benefits: '优势',
    testimonials: '推荐',
    contact: '联系我们',
    login: '登录',
    contactUs: '联系我们',
    contactUsSubtitle: '对<span class="text-indigo-600">财富</span>视界如何改变您的财富管理有疑问吗？',
    getInTouch: '与我们的团队联系。',
    whyWealthHorizon: '为何选择财富视界',
    
    // Hero Section
    holisticWealthManagement: '为以下对象提供全面的财富管理',
    familyOffices: '家族办公室',
    and: '和',
    institutions: '机构',
    actionableWealth: '让您的所有财富在一个平台上实现可行动性',
    acrossAllBanks: '跨越您所有的银行、经纪商和托管人',
    learnMore: '了解更多',
    aiNativePlatform: 'AI原生平台',
    realTimeAnalytics: '实时分析',
    soc2Certified: 'SOC 2认证',
    
    // Languages
    english: '英语',
    chinese: '中文',
    spanish: '西班牙语',
    arabic: '阿拉伯语',
    portuguese: '葡萄牙语',
    russian: '俄语',
    japanese: '日语',
    french: '法语',
    german: '德语',
    korean: '韩语',
    
    // Dashboard
    dashboard: '仪表板',
    overview: '总览',
    performance: '表现',
    portfolio: '投资组合',
    assets: '资产',
    
    // Common actions
    search: '搜索',
    filter: '筛选',
    save: '保存',
    cancel: '取消',
    edit: '编辑',
    delete: '删除',
    create: '创建',
    view: '查看',
    submit: '提交',
    
    // Common sections
    settings: '设置',
    notifications: '通知',
    profile: '个人资料',
    security: '安全',
    help: '帮助',
    
    // Messaging
    welcomeMessage: '欢迎使用财富视界',
    loadingMessage: '加载中...',
    errorMessage: '发生错误',
    
    // Footer
    termsOfService: '服务条款',
    privacyPolicy: '隐私政策',
    copyright: '© 2025 财富视界。保留所有权利。',
    
    // Landing page sections
    readyToOptimize: '准备优化您的财富管理？',
    joinLeading: '加入已使用我们的平台转变运营方式的领先家族办公室和机构',
    trustedByLeading: '受到领先机构的信任',
    seeWhatFamilyOffices: '看看家族办公室和机构投资者对以下方面的评价',
    
    // Why Section
    comprehensiveSolution: '全面解决方案',
    comprehensiveSolutionDesc: '我们的平台统一了您在各机构的所有财务数据，为您的财富提供单一真实来源。',
    enterpriseSecurity: '企业级安全',
    enterpriseSecurityDesc: '银行级别的安全性和加密保护您的敏感财务数据，并有严格的访问控制。',
    clientCenteredApproach: '以客户为中心的方法',
    clientCenteredApproachDesc: '专为家族办公室和机构打造，具有适应您独特需求的灵活性。',
    aiPoweredInsights: 'AI驱动的见解',
    aiPoweredInsightsDesc: '利用高级分析和AI发现机会并优化您的财富管理策略。',
    
    // Key Features
    keyFeatures: '主要功能',
    keyFeaturesSubtitle: '我们的AI原生平台简化了所有财富的管理，为最复杂的家族办公室和机构设计了直观的工具',
    complianceManagement: '合规管理',
    complianceManagementDesc: '通过自动化合规监控，走在监管要求的前面。',
    comprehensiveDashboard: '综合仪表板',
    comprehensiveDashboardDesc: '全面了解您在所有银行、经纪商和托管人的财富。',
    realTimeAnalytics: '实时分析',
    realTimeAnalyticsDesc: '通过实时更新和可自定义的仪表板监控您的投资。',
    riskManagement: '风险管理',
    riskManagementDesc: '使用我们复杂的分析工具识别并减轻风险。',
    secureCollaboration: '安全协作',
    secureCollaborationDesc: '邀请团队成员和利益相关者参与平台。',
    advancedReporting: '高级报告',
    advancedReportingDesc: '创建具有详细见解和易于理解的可视化的自定义报告。',
    
    // Benefits
    transformYourWealth: '改变您的财富管理',
    transformYourWealthDesc: '体验全新水平的效率、洞察力和控制力',
    centralizedAssetManagement: '集中资产管理',
    centralizedAssetManagementDesc: '消除数据孤岛，在统一平台上管理所有资产、投资和运营。',
    dataDrivenDecisionMaking: '数据驱动决策',
    dataDrivenDecisionMakingDesc: '利用高级分析和AI驱动的见解做出更明智的投资决策。',
    enterpriseGradeSecurity: '企业级安全',
    enterpriseGradeSecurityDesc: '通过银行级安全性、加密和访问控制保护敏感的财务数据。',
    operationalEfficiency: '运营效率',
    operationalEfficiencyDesc: '简化工作流程，自动化常规任务，减少手动工作，专注于高价值活动。',
    
    // Contact
    contactInformation: '联系信息',
    ourAddress: '我们的地址',
    companyAddress: '纽约金融区123号，1500室，纽约州10005',
    phoneNumber: '电话号码',
    contactPhone: '+1 (555) 123-4567',
    emailAddress: '电子邮件地址',
    contactEmail: 'contact@wealthhorizon.com',
    officeHours: '办公时间',
    weekdayHours: '周一至周五：上午9:00 - 下午6:00 东部标准时间',
    weekendClosed: '周六日：休息',
    sendUsAMessage: '给我们发消息',
    firstName: '名字',
    lastName: '姓氏',
    email: '电子邮件',
    message: '消息',
    sendMessage: '发送消息',
    submitting: '提交中...',
    
    // Solutions section
    solutions: '解决方案',
    portfolioManagement: '投资组合管理',
    trading: '交易',
    wealthAnalysis: '财富分析',
    reporting: '报告',
    compliance: '合规',
    
    // Company section
    company: '公司',
    aboutUs: '关于我们',
    careers: '职业机会',
    blog: '博客',
    press: '新闻',
    
    // Resources section
    resources: '资源',
    documentation: '文档',
    helpCenter: '帮助中心'
  },
  es: {
    // Navigation
    features: 'Características',
    benefits: 'Beneficios',
    testimonials: 'Testimonios',
    contact: 'Contacto',
    login: 'Iniciar Sesión',
    contactUs: 'Contáctenos',
    contactUsSubtitle: '¿Tiene preguntas sobre cómo <span class="text-indigo-600">Wealth</span>Horizon puede transformar su gestión de patrimonio?',
    getInTouch: 'Póngase en contacto con nuestro equipo.',
    whyWealthHorizon: '¿Por qué WH?',
    
    // Hero Section
    holisticWealthManagement: 'Gestión integral de patrimonio para',
    familyOffices: 'family offices',
    and: 'y',
    institutions: 'instituciones',
    actionableWealth: 'Toda su riqueza accionable en una sola plataforma',
    acrossAllBanks: 'a través de todos sus bancos, corredores y custodios',
    learnMore: 'Más información',
    aiNativePlatform: 'Plataforma nativa de IA',
    realTimeAnalytics: 'Análisis en tiempo real',
    soc2Certified: 'Certificado SOC 2',
    
    // Languages
    english: 'Inglés',
    chinese: 'Chino',
    spanish: 'Español',
    arabic: 'Árabe',
    portuguese: 'Portugués',
    russian: 'Ruso',
    japanese: 'Japonés',
    french: 'Francés',
    german: 'Alemán',
    korean: 'Coreano',
    
    // Dashboard
    dashboard: 'Panel de Control',
    overview: 'Resumen',
    performance: 'Rendimiento',
    portfolio: 'Portafolio',
    assets: 'Activos',
    
    // Common actions
    search: 'Buscar',
    filter: 'Filtrar',
    save: 'Guardar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Eliminar',
    create: 'Crear',
    view: 'Ver',
    submit: 'Enviar',
    
    // Common sections
    settings: 'Configuración',
    notifications: 'Notificaciones',
    profile: 'Perfil',
    security: 'Seguridad',
    help: 'Ayuda',
    
    // Messaging
    welcomeMessage: 'Bienvenido a WealthHorizon',
    loadingMessage: 'Cargando...',
    errorMessage: 'Ocurrió un error',
    
    // Footer
    termsOfService: 'Términos de Servicio',
    privacyPolicy: 'Política de Privacidad',
    copyright: '© 2025 WealthHorizon. Todos los derechos reservados.',
    
    // Landing page sections
    readyToOptimize: '¿Listo para optimizar su gestión de patrimonio?',
    joinLeading: 'Únase a las principales family offices e instituciones que han transformado sus operaciones con',
    trustedByLeading: 'Con la confianza de las instituciones líderes',
    seeWhatFamilyOffices: 'Vea lo que dicen las family offices y los inversores institucionales sobre',
    
    // Why Section
    comprehensiveSolution: 'Solución Integral',
    comprehensiveSolutionDesc: 'Nuestra plataforma unifica todos sus datos financieros en todas las instituciones, proporcionando una única fuente de verdad para su riqueza.',
    enterpriseSecurity: 'Seguridad Empresarial',
    enterpriseSecurityDesc: 'La seguridad y cifrado a nivel bancario protegen sus datos financieros sensibles con rigurosos controles de acceso.',
    clientCenteredApproach: 'Enfoque Centrado en el Cliente',
    clientCenteredApproachDesc: 'Construido específicamente para family offices e instituciones con la flexibilidad de adaptarse a sus necesidades únicas.',
    aiPoweredInsights: 'Insights Impulsados por IA',
    aiPoweredInsightsDesc: 'Aproveche el análisis avanzado y la IA para descubrir oportunidades y optimizar su estrategia de gestión de patrimonio.',
    
    // Key Features
    keyFeatures: 'Características Clave',
    keyFeaturesSubtitle: 'Nuestra plataforma nativa de IA simplifica la gestión de todo su patrimonio con herramientas intuitivas diseñadas para los family offices e instituciones más sofisticados',
    complianceManagement: 'Gestión de Cumplimiento',
    complianceManagementDesc: 'Manténgase al día con los requisitos reglamentarios con monitoreo automatizado de cumplimiento.',
    comprehensiveDashboard: 'Panel de Control Integral',
    comprehensiveDashboardDesc: 'Obtenga una visión holística de su riqueza en todos sus bancos, corredores y custodios.',
    realTimeAnalytics: 'Análisis en Tiempo Real',
    realTimeAnalyticsDesc: 'Monitoree sus inversiones con actualizaciones en tiempo real y paneles personalizables.',
    riskManagement: 'Gestión de Riesgos',
    riskManagementDesc: 'Identifique y mitigue riesgos con nuestras sofisticadas herramientas de análisis.',
    secureCollaboration: 'Colaboración Segura',
    secureCollaborationDesc: 'Invite a miembros del equipo y partes interesadas a la plataforma.',
    advancedReporting: 'Informes Avanzados',
    advancedReportingDesc: 'Cree informes personalizados con insights detallados y visualizaciones fáciles de entender.',
    
    // Benefits
    transformYourWealth: 'Transforme su Gestión Patrimonial',
    transformYourWealthDesc: 'Experimente un nuevo nivel de eficiencia, conocimiento y control con',
    centralizedAssetManagement: 'Gestión Centralizada de Activos',
    centralizedAssetManagementDesc: 'Elimine los silos de datos y gestione todos los activos, inversiones y operaciones en una plataforma unificada.',
    dataDrivenDecisionMaking: 'Toma de Decisiones Basada en Datos',
    dataDrivenDecisionMakingDesc: 'Aproveche el análisis avanzado y los conocimientos impulsados por la IA para tomar decisiones de inversión más informadas.',
    enterpriseGradeSecurity: 'Seguridad de Nivel Empresarial',
    enterpriseGradeSecurityDesc: 'Proteja los datos financieros confidenciales con seguridad, cifrado y controles de acceso de nivel bancario.',
    operationalEfficiency: 'Eficiencia Operacional',
    operationalEfficiencyDesc: 'Agilice los flujos de trabajo, automatice las tareas rutinarias y reduzca el trabajo manual para centrarse en actividades de alto valor.',
    
    // Contact
    contactInformation: 'Información de Contacto',
    ourAddress: 'Nuestra Dirección',
    companyAddress: '123 Distrito Financiero, Suite 1500, Nueva York, NY 10005',
    phoneNumber: 'Número de Teléfono',
    contactPhone: '+1 (555) 123-4567',
    emailAddress: 'Dirección de Correo Electrónico',
    contactEmail: 'contact@wealthhorizon.com',
    officeHours: 'Horario de Oficina',
    weekdayHours: 'Lunes-Viernes: 9:00 AM - 6:00 PM EST',
    weekendClosed: 'Sábado-Domingo: Cerrado',
    sendUsAMessage: 'Envíenos un mensaje',
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'Correo electrónico',
    message: 'Mensaje',
    sendMessage: 'Enviar Mensaje',
    submitting: 'Enviando...',
    
    // Solutions section
    solutions: 'Soluciones',
    portfolioManagement: 'Gestión de Cartera',
    trading: 'Trading',
    wealthAnalysis: 'Análisis de Patrimonio',
    reporting: 'Informes',
    compliance: 'Cumplimiento',
    
    // Company section
    company: 'Empresa',
    aboutUs: 'Sobre Nosotros',
    careers: 'Carreras',
    blog: 'Blog',
    press: 'Prensa',
    
    // Resources section
    resources: 'Recursos',
    documentation: 'Documentación',
    helpCenter: 'Centro de Ayuda'
  },
  ar: {
    // Navigation
    features: 'المميزات',
    benefits: 'الفوائد',
    testimonials: 'الشهادات',
    contact: 'اتصل بنا',
    login: 'تسجيل الدخول',
    contactUs: 'اتصل بنا',
    contactUsSubtitle: 'هل لديك أسئلة حول كيفية تحويل <span class="text-indigo-600">ويلث</span>هورايزن لإدارة ثروتك؟',
    getInTouch: 'تواصل مع فريقنا.',
    whyWealthHorizon: 'لماذا WH',
    
    // Hero Section
    holisticWealthManagement: 'إدارة شاملة للثروات لـ',
    familyOffices: 'مكاتب العائلة',
    and: 'و',
    institutions: 'المؤسسات',
    actionableWealth: 'كل ثروتك قابلة للتنفيذ على منصة واحدة',
    acrossAllBanks: 'عبر جميع البنوك والوسطاء وأمناء الحفظ',
    learnMore: 'اعرف المزيد',
    aiNativePlatform: 'منصة أصلية للذكاء الاصطناعي',
    realTimeAnalytics: 'تحليلات في الوقت الفعلي',
    soc2Certified: 'معتمدة من SOC 2',
    
    // Languages
    english: 'الإنجليزية',
    chinese: 'الصينية',
    spanish: 'الإسبانية',
    arabic: 'العربية',
    portuguese: 'البرتغالية',
    russian: 'الروسية',
    japanese: 'اليابانية',
    french: 'الفرنسية',
    german: 'الألمانية',
    korean: 'الكورية',
    
    // Dashboard
    dashboard: 'لوحة التحكم',
    overview: 'نظرة عامة',
    performance: 'الأداء',
    portfolio: 'المحفظة',
    assets: 'الأصول',
    
    // Common actions
    search: 'بحث',
    filter: 'تصفية',
    save: 'حفظ',
    cancel: 'إلغاء',
    edit: 'تعديل',
    delete: 'حذف',
    create: 'إنشاء',
    view: 'عرض',
    submit: 'تقديم',
    
    // Common sections
    settings: 'الإعدادات',
    notifications: 'الإشعارات',
    profile: 'الملف الشخصي',
    security: 'الأمان',
    help: 'المساعدة',
    
    // Messaging
    welcomeMessage: 'مرحبًا بك في آفاق الثروة',
    loadingMessage: 'جاري التحميل...',
    errorMessage: 'حدث خطأ',
    
    // Footer
    termsOfService: 'شروط الخدمة',
    privacyPolicy: 'سياسة الخصوصية',
    copyright: '© 2025 آفاق الثروة. جميع الحقوق محفوظة.',
    
    // Contact
    contactInformation: 'معلومات الاتصال',
    ourAddress: 'عنواننا',
    companyAddress: '123 الحي المالي ، جناح 1500 ، نيويورك ، نيويورك 10005',
    phoneNumber: 'رقم الهاتف',
    contactPhone: '+1 (555) 123-4567',
    emailAddress: 'عنوان البريد الإلكتروني',
    contactEmail: 'contact@wealthhorizon.com',
    officeHours: 'ساعات العمل',
    weekdayHours: 'من الاثنين إلى الجمعة: 9:00 صباحًا - 6:00 مساءً بالتوقيت الشرقي',
    weekendClosed: 'السبت والأحد: مغلق',
    sendUsAMessage: 'أرسل لنا رسالة',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    email: 'بريد إلكتروني',
    message: 'رسالة',
    sendMessage: 'أرسل رسالة',
    submitting: 'جاري الإرسال...',
    
    // Solutions section
    solutions: 'حلول',
    portfolioManagement: 'إدارة المحافظ',
    trading: 'تداول',
    wealthAnalysis: 'تحليل الثروة',
    reporting: 'إعداد التقارير',
    compliance: 'الامتثال',
    
    // Company section
    company: 'شركة',
    aboutUs: 'معلومات عنا',
    careers: 'وظائف',
    blog: 'مدونة',
    press: 'صحافة',
    
    // Resources section
    resources: 'الموارد',
    documentation: 'توثيق',
    helpCenter: 'مركز المساعدة'
  },
  pt: {
    // Navigation
    features: 'Recursos',
    benefits: 'Benefícios',
    testimonials: 'Depoimentos',
    contact: 'Contato',
    login: 'Entrar',
    contactUs: 'Entre em contato',
    contactUsSubtitle: 'Tem perguntas sobre como o <span class="text-indigo-600">Wealth</span>Horizon pode transformar sua gestão de patrimônio?',
    getInTouch: 'Entre em contato com nossa equipe.',
    whyWealthHorizon: 'Por que WH',
    
    // Hero Section
    holisticWealthManagement: 'Gestão holística de patrimônio para',
    familyOffices: 'family offices',
    and: 'e',
    institutions: 'instituições',
    actionableWealth: 'Todo o seu patrimônio acionável em uma plataforma',
    acrossAllBanks: 'em todos os seus bancos, corretoras e custodiantes',
    learnMore: 'Saiba mais',
    aiNativePlatform: 'Plataforma nativa de IA',
    realTimeAnalytics: 'Análises em tempo real',
    soc2Certified: 'Certificado SOC 2',
    
    // Languages
    english: 'Inglês',
    chinese: 'Chinês',
    spanish: 'Espanhol',
    arabic: 'Árabe',
    portuguese: 'Português',
    russian: 'Russo',
    japanese: 'Japonês',
    french: 'Francês',
    german: 'Alemão',
    korean: 'Coreano',
    
    // Dashboard
    dashboard: 'Painel',
    overview: 'Visão Geral',
    performance: 'Desempenho',
    portfolio: 'Portfólio',
    assets: 'Ativos',
    
    // Common actions
    search: 'Pesquisar',
    filter: 'Filtrar',
    save: 'Salvar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Excluir',
    create: 'Criar',
    view: 'Visualizar',
    submit: 'Enviar',
    
    // Common sections
    settings: 'Configurações',
    notifications: 'Notificações',
    profile: 'Perfil',
    security: 'Segurança',
    help: 'Ajuda',
    
    // Messaging
    welcomeMessage: 'Bem-vindo ao WealthHorizon',
    loadingMessage: 'Carregando...',
    errorMessage: 'Ocorreu um erro',
    
    // Footer
    termsOfService: 'Termos de Serviço',
    privacyPolicy: 'Política de Privacidade',
    copyright: '© 2025 WealthHorizon. Todos os direitos reservados.',
    
    // Contact
    contactInformation: 'Informações de Contato',
    ourAddress: 'Nosso Endereço',
    companyAddress: '123 Distrito Financeiro, Suite 1500, Nova York, NY 10005',
    phoneNumber: 'Número de Telefone',
    contactPhone: '+1 (555) 123-4567',
    emailAddress: 'Endereço de E-mail',
    contactEmail: 'contact@wealthhorizon.com',
    officeHours: 'Horário de Atendimento',
    weekdayHours: 'Segunda a Sexta: 9h00 - 18h00 EST',
    weekendClosed: 'Sábado e Domingo: Fechado',
    sendUsAMessage: 'Envie-nos uma mensagem',
    firstName: 'Primeiro Nome',
    lastName: 'Sobrenome',
    email: 'E-mail',
    message: 'Mensagem',
    sendMessage: 'Enviar Mensagem',
    submitting: 'Enviando...',
    
    // Solutions section
    solutions: 'Soluções',
    portfolioManagement: 'Gestão de Portfólio',
    trading: 'Trading',
    wealthAnalysis: 'Análise de Riqueza',
    reporting: 'Relatórios',
    compliance: 'Conformidade',
    
    // Company section
    company: 'Empresa',
    aboutUs: 'Sobre Nós',
    careers: 'Carreiras',
    blog: 'Blog',
    press: 'Imprensa',
    
    // Resources section
    resources: 'Recursos',
    documentation: 'Documentação',
    helpCenter: 'Central de Ajuda'
  },
  ru: {
    // Navigation
    features: 'Функции',
    benefits: 'Преимущества',
    testimonials: 'Отзывы',
    contact: 'Контакты',
    login: 'Войти',
    contactUs: 'Связаться с нами',
    contactUsSubtitle: 'У вас есть вопросы о том, как <span class="text-indigo-600">Wealth</span>Horizon может преобразить управление вашим капиталом?',
    getInTouch: 'Свяжитесь с нашей командой.',
    whyWealthHorizon: 'Почему WH',
    
    // Hero Section
    holisticWealthManagement: 'Комплексное управление благосостоянием для',
    familyOffices: 'семейных офисов',
    and: 'и',
    institutions: 'учреждений',
    actionableWealth: 'Все ваше благосостояние действует на одной платформе',
    acrossAllBanks: 'по всем вашим банкам, брокерам и хранителям',
    learnMore: 'Узнать больше',
    aiNativePlatform: 'Нативная платформа ИИ',
    realTimeAnalytics: 'Аналитика в реальном времени',
    soc2Certified: 'Сертификат SOC 2',
    
    // Languages
    english: 'Английский',
    chinese: 'Китайский',
    spanish: 'Испанский',
    arabic: 'Арабский',
    portuguese: 'Португальский',
    russian: 'Русский',
    japanese: 'Японский',
    french: 'Французский',
    german: 'Немецкий',
    korean: 'Корейский',
    
    // Dashboard
    dashboard: 'Панель управления',
    overview: 'Обзор',
    performance: 'Производительность',
    portfolio: 'Портфолио',
    assets: 'Активы',
    
    // Common actions
    search: 'Поиск',
    filter: 'Фильтр',
    save: 'Сохранить',
    cancel: 'Отмена',
    edit: 'Редактировать',
    delete: 'Удалить',
    create: 'Создать',
    view: 'Просмотр',
    submit: 'Отправить',
    
    // Common sections
    settings: 'Настройки',
    notifications: 'Уведомления',
    profile: 'Профиль',
    security: 'Безопасность',
    help: 'Помощь',
    
    // Messaging
    welcomeMessage: 'Добро пожаловать в WealthHorizon',
    loadingMessage: 'Загрузка...',
    errorMessage: 'Произошла ошибка',
    
    // Footer
    termsOfService: 'Условия использования',
    privacyPolicy: 'Политика конфиденциальности',
    copyright: '© 2025 WealthHorizon. Все права защищены.',
    
    // Contact
    contactInformation: 'Контактная информация',
    ourAddress: 'Наш адрес',
    companyAddress: '123 Financial District, Suite 1500, New York, NY 10005',
    phoneNumber: 'Номер телефона',
    contactPhone: '+1 (555) 123-4567',
    emailAddress: 'Адрес электронной почты',
    contactEmail: 'contact@wealthhorizon.com',
    officeHours: 'Часы работы',
    weekdayHours: 'Понедельник-пятница: 9:00 - 18:00 EST',
    weekendClosed: 'Суббота-воскресенье: Закрыто',
    sendUsAMessage: 'Отправьте нам сообщение',
    firstName: 'Имя',
    lastName: 'Фамилия',
    email: 'Электронная почта',
    message: 'Сообщение',
    sendMessage: 'Отправить сообщение',
    submitting: 'Отправка...',
    
    // Solutions section
    solutions: 'Решения',
    portfolioManagement: 'Управление портфелем',
    trading: 'Торговля',
    wealthAnalysis: 'Анализ благосостояния',
    reporting: 'Отчетность',
    compliance: 'Соответствие нормативным требованиям',
    
    // Company section
    company: 'Компания',
    aboutUs: 'О нас',
    careers: 'Карьера',
    blog: 'Блог',
    press: 'Пресса',
    
    // Resources section
    resources: 'Ресурсы',
    documentation: 'Документация',
    helpCenter: 'Центр помощи'
  },
  ja: {
    // Navigation
    features: '機能',
    benefits: 'メリット',
    testimonials: 'お客様の声',
    contact: 'お問い合わせ',
    login: 'ログイン',
    contactUs: 'お問い合わせ',
    contactUsSubtitle: '<span class="text-indigo-600">ウェルス</span>ホライズンがあなたの資産管理をどのように変革できるかについて質問がありますか？',
    getInTouch: '私たちのチームにお問い合わせください。',
    whyWealthHorizon: 'なぜWHか',
    
    // Hero Section
    holisticWealthManagement: '総合的な資産管理',
    familyOffices: 'ファミリーオフィス',
    and: 'および',
    institutions: '機関投資家',
    actionableWealth: 'すべての資産を一つのプラットフォームで活用可能に',
    acrossAllBanks: 'あらゆる銀行、ブローカー、カストディアンを横断して',
    learnMore: '詳細を見る',
    aiNativePlatform: 'AIネイティブプラットフォーム',
    realTimeAnalytics: 'リアルタイム分析',
    soc2Certified: 'SOC 2認証済み',
    
    // Languages
    english: '英語',
    chinese: '中国語',
    spanish: 'スペイン語',
    arabic: 'アラビア語',
    portuguese: 'ポルトガル語',
    russian: 'ロシア語',
    japanese: '日本語',
    french: 'フランス語',
    german: 'ドイツ語',
    korean: '韓国語',
    
    // Dashboard
    dashboard: 'ダッシュボード',
    overview: '概要',
    performance: 'パフォーマンス',
    portfolio: 'ポートフォリオ',
    assets: '資産',
    
    // Common actions
    search: '検索',
    filter: 'フィルター',
    save: '保存',
    cancel: 'キャンセル',
    edit: '編集',
    delete: '削除',
    create: '作成',
    view: '表示',
    submit: '送信',
    
    // Common sections
    settings: '設定',
    notifications: '通知',
    profile: 'プロフィール',
    security: 'セキュリティ',
    help: 'ヘルプ',
    
    // Messaging
    welcomeMessage: 'WealthHorizonへようこそ',
    loadingMessage: '読み込み中...',
    errorMessage: 'エラーが発生しました',
    
    // Footer
    termsOfService: '利用規約',
    privacyPolicy: 'プライバシーポリシー',
    copyright: '© 2025 WealthHorizon. All rights reserved.',
    
    // Contact
    contactInformation: '連絡先情報',
    ourAddress: '住所',
    companyAddress: 'ニューヨーク金融街123番地、スイート1500、ニューヨーク州10005',
    phoneNumber: '電話番号',
    contactPhone: '+1 (555) 123-4567',
    emailAddress: 'メールアドレス',
    contactEmail: 'contact@wealthhorizon.com',
    officeHours: '営業時間',
    weekdayHours: '月曜〜金曜：午前9時〜午後6時（東部標準時）',
    weekendClosed: '土日：休業',
    sendUsAMessage: 'メッセージを送る',
    firstName: '名',
    lastName: '姓',
    email: 'メール',
    message: 'メッセージ',
    sendMessage: '送信',
    submitting: '送信中...',
    
    // Solutions section
    solutions: 'ソリューション',
    portfolioManagement: 'ポートフォリオ管理',
    trading: '取引',
    wealthAnalysis: '資産分析',
    reporting: 'レポーティング',
    compliance: 'コンプライアンス',
    
    // Company section
    company: '会社情報',
    aboutUs: '会社概要',
    careers: '採用情報',
    blog: 'ブログ',
    press: 'プレス',
    
    // Resources section
    resources: 'リソース',
    documentation: 'ドキュメント',
    helpCenter: 'ヘルプセンター'
  },
  fr: {
    // Navigation
    features: 'Fonctionnalités',
    benefits: 'Avantages',
    testimonials: 'Témoignages',
    contact: 'Contact',
    login: 'Connexion',
    contactUs: 'Contactez-nous',
    contactUsSubtitle: 'Vous avez des questions sur la façon dont <span class="text-indigo-600">Wealth</span>Horizon peut transformer votre gestion de patrimoine ?',
    getInTouch: 'Entrez en contact avec notre équipe.',
    whyWealthHorizon: 'Pourquoi WH',
    
    // Hero Section
    holisticWealthManagement: 'Gestion de patrimoine holistique pour',
    familyOffices: 'family offices',
    and: 'et',
    institutions: 'institutions',
    actionableWealth: 'Toute votre richesse rendue exploitable sur une seule plateforme',
    acrossAllBanks: 'à travers toutes vos banques, courtiers et dépositaires',
    learnMore: 'En savoir plus',
    aiNativePlatform: 'Plateforme native IA',
    realTimeAnalytics: 'Analytique en temps réel',
    soc2Certified: 'Certifié SOC 2',
    
    // Languages
    english: 'Anglais',
    chinese: 'Chinois',
    spanish: 'Espagnol',
    arabic: 'Arabe',
    portuguese: 'Portugais',
    russian: 'Russe',
    japanese: 'Japonais',
    french: 'Français',
    german: 'Allemand',
    korean: 'Coréen',
    
    // Dashboard
    dashboard: 'Tableau de bord',
    overview: 'Aperçu',
    performance: 'Performance',
    portfolio: 'Portefeuille',
    assets: 'Actifs',
    
    // Common actions
    search: 'Rechercher',
    filter: 'Filtrer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    edit: 'Modifier',
    delete: 'Supprimer',
    create: 'Créer',
    view: 'Voir',
    submit: 'Soumettre',
    
    // Common sections
    settings: 'Paramètres',
    notifications: 'Notifications',
    profile: 'Profil',
    security: 'Sécurité',
    help: 'Aide',
    
    // Messaging
    welcomeMessage: 'Bienvenue sur WealthHorizon',
    loadingMessage: 'Chargement...',
    errorMessage: 'Une erreur est survenue',
    
    // Footer
    termsOfService: 'Conditions d\'utilisation',
    privacyPolicy: 'Politique de confidentialité',
    copyright: '© 2025 WealthHorizon. Tous droits réservés.',
    
    // Contact
    contactInformation: 'Informations de contact',
    ourAddress: 'Notre adresse',
    companyAddress: '123 Financial District, Suite 1500, New York, NY 10005',
    phoneNumber: 'Numéro de téléphone',
    contactPhone: '+1 (555) 123-4567',
    emailAddress: 'Adresse e-mail',
    contactEmail: 'contact@wealthhorizon.com',
    officeHours: 'Heures d\'ouverture',
    weekdayHours: 'Lundi-Vendredi : 9h00 - 18h00 EST',
    weekendClosed: 'Samedi-Dimanche : Fermé',
    sendUsAMessage: 'Envoyez-nous un message',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'E-mail',
    message: 'Message',
    sendMessage: 'Envoyer le message',
    submitting: 'Envoi en cours...',
    
    // Solutions section
    solutions: 'Solutions',
    portfolioManagement: 'Gestion de portefeuille',
    trading: 'Trading',
    wealthAnalysis: 'Analyse de patrimoine',
    reporting: 'Rapports',
    compliance: 'Conformité',
    
    // Company section
    company: 'Entreprise',
    aboutUs: 'À propos de nous',
    careers: 'Carrières',
    blog: 'Blog',
    press: 'Presse',
    
    // Resources section
    resources: 'Ressources',
    documentation: 'Documentation',
    helpCenter: 'Centre d\'aide'
  },
  de: {
    // Navigation
    features: 'Funktionen',
    benefits: 'Vorteile',
    testimonials: 'Erfahrungen',
    contact: 'Kontakt',
    login: 'Anmelden',
    contactUs: 'Kontaktieren Sie uns',
    contactUsSubtitle: 'Haben Sie Fragen dazu, wie <span class="text-indigo-600">Wealth</span>Horizon Ihre Vermögensverwaltung transformieren kann?',
    getInTouch: 'Nehmen Sie Kontakt mit unserem Team auf.',
    whyWealthHorizon: 'Warum WH',
    
    // Hero Section
    holisticWealthManagement: 'Ganzheitliche Vermögensverwaltung für',
    familyOffices: 'Family Offices',
    and: 'und',
    institutions: 'Institutionen',
    actionableWealth: 'Ihr gesamtes Vermögen auf einer Plattform handlungsfähig gemacht',
    acrossAllBanks: 'über all Ihre Banken, Broker und Depotbanken hinweg',
    learnMore: 'Mehr erfahren',
    aiNativePlatform: 'KI-native Plattform',
    realTimeAnalytics: 'Echtzeit-Analysen',
    soc2Certified: 'SOC 2 zertifiziert',
    
    // Languages
    english: 'Englisch',
    chinese: 'Chinesisch',
    spanish: 'Spanisch',
    arabic: 'Arabisch',
    portuguese: 'Portugiesisch',
    russian: 'Russisch',
    japanese: 'Japanisch',
    french: 'Französisch',
    german: 'Deutsch',
    korean: 'Koreanisch',
    
    // Dashboard
    dashboard: 'Dashboard',
    overview: 'Überblick',
    performance: 'Leistung',
    portfolio: 'Portfolio',
    assets: 'Vermögenswerte',
    
    // Common actions
    search: 'Suchen',
    filter: 'Filtern',
    save: 'Speichern',
    cancel: 'Abbrechen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    create: 'Erstellen',
    view: 'Ansehen',
    submit: 'Absenden',
    
    // Common sections
    settings: 'Einstellungen',
    notifications: 'Benachrichtigungen',
    profile: 'Profil',
    security: 'Sicherheit',
    help: 'Hilfe',
    
    // Messaging
    welcomeMessage: 'Willkommen bei WealthHorizon',
    loadingMessage: 'Wird geladen...',
    errorMessage: 'Ein Fehler ist aufgetreten',
    
    // Footer
    termsOfService: 'Nutzungsbedingungen',
    privacyPolicy: 'Datenschutzrichtlinie',
    copyright: '© 2025 WealthHorizon. Alle Rechte vorbehalten.',
    
    // Contact
    contactInformation: 'Kontaktinformationen',
    ourAddress: 'Unsere Adresse',
    companyAddress: '123 Financial District, Suite 1500, New York, NY 10005',
    phoneNumber: 'Telefonnummer',
    contactPhone: '+1 (555) 123-4567',
    emailAddress: 'E-Mail-Adresse',
    contactEmail: 'contact@wealthhorizon.com',
    officeHours: 'Öffnungszeiten',
    weekdayHours: 'Montag-Freitag: 9:00 - 18:00 Uhr EST',
    weekendClosed: 'Samstag-Sonntag: Geschlossen',
    sendUsAMessage: 'Senden Sie uns eine Nachricht',
    firstName: 'Vorname',
    lastName: 'Nachname',
    email: 'E-Mail',
    message: 'Nachricht',
    sendMessage: 'Nachricht senden',
    submitting: 'Wird gesendet...',
    
    // Solutions section
    solutions: 'Lösungen',
    portfolioManagement: 'Portfoliomanagement',
    trading: 'Trading',
    wealthAnalysis: 'Vermögensanalyse',
    reporting: 'Berichterstattung',
    compliance: 'Compliance',
    
    // Company section
    company: 'Unternehmen',
    aboutUs: 'Über uns',
    careers: 'Karriere',
    blog: 'Blog',
    press: 'Presse',
    
    // Resources section
    resources: 'Ressourcen',
    documentation: 'Dokumentation',
    helpCenter: 'Hilfezentrum'
  },
  ko: {
    // Navigation
    features: '기능',
    benefits: '혜택',
    testimonials: '고객 후기',
    contact: '연락처',
    login: '로그인',
    contactUs: '문의하기',
    contactUsSubtitle: '<span class="text-indigo-600">웰스</span>호라이즌이 어떻게 귀하의 자산 관리를 변화시킬 수 있는지에 대한 질문이 있으신가요?',
    getInTouch: '저희 팀에 연락하세요.',
    whyWealthHorizon: 'WH를 선택하는 이유',
    
    // Hero Section
    holisticWealthManagement: '다음을 위한 종합적인 자산 관리',
    familyOffices: '패밀리 오피스',
    and: '및',
    institutions: '기관 투자자',
    actionableWealth: '모든 자산을 하나의 플랫폼에서 활용 가능하게',
    acrossAllBanks: '모든 은행, 브로커 및 커스터디안을 통합',
    learnMore: '자세히 알아보기',
    aiNativePlatform: 'AI 네이티브 플랫폼',
    realTimeAnalytics: '실시간 분석',
    soc2Certified: 'SOC 2 인증',
    
    // Languages
    english: '영어',
    chinese: '중국어',
    spanish: '스페인어',
    arabic: '아랍어',
    portuguese: '포르투갈어',
    russian: '러시아어',
    japanese: '일본어',
    french: '프랑스어',
    german: '독일어',
    korean: '한국어',
    
    // Dashboard
    dashboard: '대시보드',
    overview: '개요',
    performance: '성과',
    portfolio: '포트폴리오',
    assets: '자산',
    
    // Common actions
    search: '검색',
    filter: '필터',
    save: '저장',
    cancel: '취소',
    edit: '편집',
    delete: '삭제',
    create: '생성',
    view: '보기',
    submit: '제출',
    
    // Common sections
    settings: '설정',
    notifications: '알림',
    profile: '프로필',
    security: '보안',
    help: '도움말',
    
    // Messaging
    welcomeMessage: 'WealthHorizon에 오신 것을 환영합니다',
    loadingMessage: '로딩 중...',
    errorMessage: '오류가 발생했습니다',
    
    // Footer
    termsOfService: '서비스 약관',
    privacyPolicy: '개인정보 처리방침',
    copyright: '© 2025 WealthHorizon. 모든 권리 보유.',
    
    // Contact
    contactInformation: '연락처 정보',
    ourAddress: '주소',
    companyAddress: '123 금융 지구, 스위트 1500, 뉴욕, NY 10005',
    phoneNumber: '전화번호',
    contactPhone: '+1 (555) 123-4567',
    emailAddress: '이메일 주소',
    contactEmail: 'contact@wealthhorizon.com',
    officeHours: '영업 시간',
    weekdayHours: '월요일-금요일: 오전 9시 - 오후 6시 (동부 표준시)',
    weekendClosed: '토요일-일요일: 휴무',
    sendUsAMessage: '메시지 보내기',
    firstName: '이름',
    lastName: '성',
    email: '이메일',
    message: '메시지',
    sendMessage: '메시지 보내기',
    submitting: '전송 중...',
    
    // Solutions section
    solutions: '솔루션',
    portfolioManagement: '포트폴리오 관리',
    trading: '거래',
    wealthAnalysis: '자산 분석',
    reporting: '보고서',
    compliance: '규정 준수',
    
    // Company section
    company: '회사',
    aboutUs: '회사 소개',
    careers: '채용',
    blog: '블로그',
    press: '언론 보도',
    
    // Resources section
    resources: '리소스',
    documentation: '문서',
    helpCenter: '고객 센터'
  }
};

// Create context with default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create Provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get initial language from localStorage or default to English
  const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
        return savedLanguage as Language;
      }
    }
    return 'en';
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  // Set language and save to localStorage
  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', newLanguage);
    }
  }, []);

  // Get localized text from translations
  const getLocalizedText = useCallback(
    (key: string): string => {
      if (translations[language] && translations[language][key]) {
        return translations[language][key];
      }
      // Fallback to English if translation is missing
      if (translations.en && translations.en[key]) {
        return translations.en[key];
      }
      // Final fallback to key if nothing found
      return key;
    },
    [language]
  );

  // Set HTML dir attribute based on language (for RTL languages)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [language]);

  const value = {
    language,
    setLanguage,
    getLocalizedText,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// Create hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

