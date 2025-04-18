
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLanguageManager } from './translation/useLanguageManager';
import { useTranslationService } from './translation/useTranslationService';
import { TranslationContextType, LanguageCode } from './translation/types';
import { LANGUAGES } from './translation/constants';

// Export types and constants for external use
export type { LanguageCode } from './translation/types';
export type { Language } from './translation/types';
export { LANGUAGES } from './translation/constants';
export { NON_TRANSLATABLE_TERMS } from './translation/constants';

const defaultContext: TranslationContextType = {
  currentLanguage: 'en',
  setLanguage: async () => {},
  translate: async (text) => text,
  translationCache: {},
  isLoading: false,
};

const TranslationContext = createContext<TranslationContextType>(defaultContext);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  // Get translation service functionality
  const { 
    translate: translateService, 
    clearCache, 
    translationCache,
    isLoading: translationLoading,
  } = useTranslationService();

  // Get language management functionality
  const {
    currentLanguage,
    setLanguage,
    isLoading: languageLoading,
    isInitialized,
    key
  } = useLanguageManager(clearCache);

  // Combined loading state
  const isLoading = translationLoading || languageLoading;

  // Create the translate function that uses the current language
  const translate = async (text: string): Promise<string> => {
    if (!text) return '';
    
    try {
      return await translateService(text, currentLanguage);
    } catch (error) {
      console.error("Translation error in context:", error);
      return text || '';
    }
  };

  // Ensure everything is initialized before rendering children
  useEffect(() => {
    if (isInitialized) {
      setIsReady(true);
    }
  }, [isInitialized]);

  // Provide a simplified initial loading state
  if (!isReady) {
    return (
      <TranslationContext.Provider value={defaultContext}>
        {children}
      </TranslationContext.Provider>
    );
  }

  return (
    <TranslationContext.Provider
      key={key}
      value={{
        currentLanguage,
        setLanguage,
        translate,
        translationCache,
        isLoading
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
