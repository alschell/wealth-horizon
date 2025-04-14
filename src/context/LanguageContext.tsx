
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh' | 'es' | 'ar';

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
