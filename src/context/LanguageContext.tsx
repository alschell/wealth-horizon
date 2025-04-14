
import React, { createContext, useContext, useState, ReactNode } from 'react';

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
    features: 'Features',
    benefits: 'Benefits',
    testimonials: 'Testimonials',
    contact: 'Contact',
    login: 'Log In',
    contactUs: 'Contact Us',
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
  },
  zh: {
    features: '功能',
    benefits: '优势',
    testimonials: '推荐',
    contact: '联系我们',
    login: '登录',
    contactUs: '联系我们',
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
  },
  es: {
    features: 'Características',
    benefits: 'Beneficios',
    testimonials: 'Testimonios',
    contact: 'Contacto',
    login: 'Iniciar Sesión',
    contactUs: 'Contáctenos',
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
  },
  ar: {
    features: 'المميزات',
    benefits: 'الفوائد',
    testimonials: 'الشهادات',
    contact: 'اتصل بنا',
    login: 'تسجيل الدخول',
    contactUs: 'اتصل بنا',
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
  },
  pt: {
    features: 'Recursos',
    benefits: 'Benefícios',
    testimonials: 'Depoimentos',
    contact: 'Contato',
    login: 'Entrar',
    contactUs: 'Entre em contato',
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
  },
  ru: {
    features: 'Функции',
    benefits: 'Преимущества',
    testimonials: 'Отзывы',
    contact: 'Контакты',
    login: 'Войти',
    contactUs: 'Связаться с нами',
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
  },
  ja: {
    features: '機能',
    benefits: 'メリット',
    testimonials: '推薦文',
    contact: 'お問い合わせ',
    login: 'ログイン',
    contactUs: 'お問い合わせ',
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
  },
  fr: {
    features: 'Fonctionnalités',
    benefits: 'Avantages',
    testimonials: 'Témoignages',
    contact: 'Contact',
    login: 'Connexion',
    contactUs: 'Contactez-nous',
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
  },
  de: {
    features: 'Funktionen',
    benefits: 'Vorteile',
    testimonials: 'Referenzen',
    contact: 'Kontakt',
    login: 'Anmelden',
    contactUs: 'Kontaktieren Sie uns',
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
  },
  ko: {
    features: '기능',
    benefits: '이점',
    testimonials: '추천사',
    contact: '연락처',
    login: '로그인',
    contactUs: '문의하기',
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
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const getLocalizedText = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getLocalizedText }}>
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
