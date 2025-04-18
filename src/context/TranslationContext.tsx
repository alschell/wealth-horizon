
import React, { createContext, useContext, useState, useEffect } from 'react';

// Available languages
export type Language = 'en' | 'fr' | 'es' | 'de' | 'zh';

// Translation context state
interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
  isRTL: boolean;
  languageName: string;
  // Add these missing properties
  currentLanguage: Language;
  translate: (key: string, params?: Record<string, string>) => Promise<string>;
}

// Default language
const DEFAULT_LANGUAGE: Language = 'en';

// RTL languages
const RTL_LANGUAGES: Language[] = [];

// Language display names
const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
  zh: '中文',
};

// Export language list for UI
export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
];

// Create the context
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Translations storage
const translations: Record<Language, Record<string, string>> = {
  en: {},
  fr: {},
  es: {},
  de: {},
  zh: {},
};

// Translation provider component
export const TranslationProvider: React.FC<{
  children: React.ReactNode;
  initialLanguage?: Language;
}> = ({ children, initialLanguage }) => {
  // Detect browser language or use provided initial language
  const detectLanguage = (): Language => {
    if (initialLanguage) return initialLanguage;
    
    // Check localStorage first for returning users
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Detect from browser
    const browserLang = navigator.language.split('-')[0] as Language;
    return Object.keys(translations).includes(browserLang) 
      ? browserLang 
      : DEFAULT_LANGUAGE;
  };

  const [language, setLanguageState] = useState<Language>(detectLanguage());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Set language with side effects
  const setLanguage = (lang: Language) => {
    if (lang === language) return;
    
    setIsLoading(true);
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);
    
    // Update document direction for RTL support
    document.documentElement.dir = RTL_LANGUAGES.includes(lang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  // Translate function
  const t = (key: string, params?: Record<string, string>): string => {
    // Get translation or fallback to key
    let translated = translations[language][key] || translations[DEFAULT_LANGUAGE][key] || key;
    
    // Replace parameters if provided
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        translated = translated.replace(`{{${paramKey}}}`, value);
      });
    }
    
    return translated;
  };

  // Async translate function for UI components
  const translate = async (key: string, params?: Record<string, string>): Promise<string> => {
    // In a real app, this might do API calls or load from files
    // We'll simulate async behavior but return the same as t()
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(t(key, params));
      }, 10);
    });
  };

  // Load translations for current language
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // In a real app, you would load translations from JSON files or API
        // For simplicity, we're just simulating the loading for now
        await new Promise(resolve => setTimeout(resolve, 100));
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load translations:', error);
        setIsLoading(false);
      }
    };
    
    loadTranslations();
    
    // Set document direction on initial load
    document.documentElement.dir = RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <TranslationContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        t, 
        isRTL: RTL_LANGUAGES.includes(language),
        languageName: LANGUAGE_NAMES[language],
        // Add the new properties
        currentLanguage: language,
        translate
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

// Hook for consuming the translation context
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
