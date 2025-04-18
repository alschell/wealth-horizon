
import React, { createContext, useContext } from 'react';
import EnhancedLoadingSpinner from '@/components/common/EnhancedLoadingSpinner';
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
  // Get translation service functionality
  const { 
    translate: translateService, 
    clearCache, 
    translationCache,
    isLoading: translationLoading,
    setIsLoading: setTranslationLoading 
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
    return translateService(text, currentLanguage);
  };

  // Don't render children until we've initialized language settings
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EnhancedLoadingSpinner 
          size="md" 
          color="text-[#4E46DC]" 
          centered={true} 
          text="Initializing..." 
          showDelay={0}
        />
      </div>
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
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <EnhancedLoadingSpinner 
            size="md" 
            color="text-[#4E46DC]" 
            centered={true}
            showDelay={0}
            text="Loading content..."
            textPosition="bottom"
          />
        </div>
      ) : (
        children
      )}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
