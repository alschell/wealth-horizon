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
    whyWealthHorizon: 'Why WH',
    
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
    
    // Languages
    english: 'Inglés',
    chinese: 'Chinês',
    spanish: 'Espanhol',
    arabic: 'Árabe',
    portuguese: 'Portugués',
    russian: 'Russo',
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
  },
  ja: {
    // Navigation
    features: '機能',
    benefits: 'メリット',
    testimonials: '推薦文',
    contact: 'お問い合わせ',
    login: 'ログイン',
    contactUs: 'お問い合わせ',
    contactUsSubtitle: '<span class="text-indigo-600">ウェルス</span>ホライズンがあなたの資産管理をどのように変革できるかについてご質問がありますか？',
    getInTouch: '私たちのチームにお問い合わせください。',
    whyWealthHorizon: 'なぜWH',
    
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
    getInTouch: 'Contactez notre équipe.',
    whyWealthHorizon: 'Pourquoi WH',
    
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
  },
  de: {
    // Navigation
    features: 'Funktionen',
    benefits: 'Vorteile',
    testimonials: 'Referenzen',
    contact: 'Kontakt',
    login: 'Anmelden',
    contactUs: 'Kontaktieren Sie uns',
    contactUsSubtitle: 'Haben Sie Fragen dazu, wie <span class="text-indigo-600">Wealth</span>Horizon Ihre Vermögensverwaltung verändern kann?',
    getInTouch: 'Kontaktieren Sie unser Team.',
    whyWealthHorizon: 'Warum WH',
    
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
    overview: 'Übersicht',
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
  },
  ko: {
    // Navigation
    features: '기능',
    benefits: '이점',
    testimonials: '추천사',
    contact: '연락처',
    login: '로그인',
    contactUs: '문의하기',
    contactUsSubtitle: '<span class="text-indigo-600">웰스</span>호라이즌이 귀하의 자산 관리를 어떻게 변화시킬 수 있는지에 대한 질문이 있으신가요?',
    getInTouch: '저희 팀에게 연락하세요.',
    whyWealthHorizon: 'WH를 선택하는 이유',
    
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
    privacyPolicy: '개인정보 보호정책',
    copyright: '© 2025 WealthHorizon. 모든 권리 보유.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [, forceUpdate] = useState({});

  // Force a complete re-render when language changes
  useEffect(() => {
    console.log(`Language changed to: ${language}`);
    // Force update to trigger re-renders of components using the context
    forceUpdate({});
    
    // Apply language change to document for accessibility
    document.documentElement.lang = language;
    
    // Force a more aggressive re-render by updating the DOM directly
    document.body.style.opacity = '0.99';
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 50);
    
    // Dispatch a custom event that components can listen for
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language } }));
  }, [language]);

  // Create a wrapper for setLanguage that also logs
  const handleSetLanguage = useCallback((newLanguage: Language) => {
    console.log(`Setting language from ${language} to ${newLanguage}`);
    setLanguage(newLanguage);
    
    // Store language preference in localStorage
    localStorage.setItem('preferredLanguage', newLanguage);
  }, [language]);

  // Use useCallback to ensure getLocalizedText doesn't change identity on rerenders
  const getLocalizedText = useCallback((key: string): string => {
    if (!translations[language]) {
      console.warn(`Language ${language} not supported, falling back to English`);
      return translations.en[key] || key;
    }
    return translations[language][key] || key;
  }, [language]);

  // Load saved language preference on initial load
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language | null;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      console.log(`Loading saved language preference: ${savedLanguage}`);
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: handleSetLanguage,
      getLocalizedText
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
