
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
interface TranslationContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  translate: (key: string, context?: string) => string;
  isRTL: boolean;
}

// Create the context with default values
const TranslationContext = createContext<TranslationContextType>({
  currentLanguage: 'en',
  setLanguage: () => {},
  translate: (key) => key,
  isRTL: false,
});

// Hook for using the translation context
export const useTranslation = () => useContext(TranslationContext);

interface TranslationProviderProps {
  children: ReactNode;
  initialLanguage?: string;
}

// Provider component
export const TranslationProvider: React.FC<TranslationProviderProps> = ({ 
  children, 
  initialLanguage = 'en' 
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage);
  
  // RTL languages
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  const isRTL = rtlLanguages.includes(currentLanguage);
  
  // Function to change the language
  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
  };
  
  // Simple translation function (in a real app, this would use a translation library)
  const translate = (key: string, context?: string): string => {
    // In a production app, you'd implement proper translation logic here
    // For now, we just return the key itself
    return key;
  };
  
  const value = {
    currentLanguage,
    setLanguage,
    translate,
    isRTL
  };
  
  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
