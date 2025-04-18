
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/utils/supabaseClient';

// Define available languages
export type LanguageCode = 
  | 'en' // English
  | 'zh' // Chinese
  | 'es' // Spanish
  | 'ar' // Arabic
  | 'pt' // Portuguese
  | 'ru' // Russian
  | 'ja' // Japanese
  | 'fr' // French
  | 'de' // German
  | 'ko'; // Korean

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

// Ensure we have a default language array that always exists
export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
];

// Terms that should not be translated
export const NON_TRANSLATABLE_TERMS = [
  'WealthHorizon',
  'GDPR',
  'SOC',
  'API',
  'SQL',
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Supabase',
];

interface TranslationContextType {
  currentLanguage: LanguageCode;
  setLanguage: (language: LanguageCode) => Promise<void>;
  translate: (text: string) => Promise<string>;
  translationCache: Record<string, Record<string, string>>;
  isLoading: boolean;
}

const defaultContext: TranslationContextType = {
  currentLanguage: 'en',
  setLanguage: async () => {},
  translate: async (text) => text,
  translationCache: {},
  isLoading: false,
};

const TranslationContext = createContext<TranslationContextType>(defaultContext);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [translationCache, setTranslationCache] = useState<Record<string, Record<string, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(0); // Force component tree re-render with key
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Load language preference from local storage on initial load
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('preferredLanguage') as LanguageCode;
      
      if (savedLanguage && Array.isArray(LANGUAGES) && LANGUAGES.some(lang => lang.code === savedLanguage)) {
        setCurrentLanguage(savedLanguage);
      } else {
        // Fallback to browser language or default to English
        const browserLang = navigator.language.split('-')[0] as LanguageCode;
        if (Array.isArray(LANGUAGES) && LANGUAGES.some(lang => lang.code === browserLang)) {
          setCurrentLanguage(browserLang);
        }
      }
      
      setIsInitialized(true);
    } catch (error) {
      console.error("Error initializing language:", error);
      // Ensure we still mark as initialized even if there's an error
      setIsInitialized(true);
    }
  }, []);

  // Save user language preference to database if logged in
  useEffect(() => {
    if (!isInitialized) return;
    
    const saveLanguagePreference = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { error } = await supabase
            .from('user_language_preferences')
            .upsert({ 
              user_id: user.id, 
              language_code: currentLanguage 
            }, { 
              onConflict: 'user_id' 
            });
              
          if (error) {
            console.error('Failed to save language preference:', error);
          }
        }
        
        localStorage.setItem('preferredLanguage', currentLanguage);
        
        // Update HTML lang attribute and direction
        document.documentElement.lang = currentLanguage;
        document.documentElement.dir = ['ar', 'he', 'fa'].includes(currentLanguage) ? 'rtl' : 'ltr';
        
        // Force re-render by updating key
        setKey(prevKey => prevKey + 1);
      } catch (error) {
        console.error("Error saving language preference:", error);
      }
    };
    
    if (currentLanguage) {
      saveLanguagePreference();
    }
  }, [currentLanguage, isInitialized]);

  // Function to set the language with more robust update mechanism
  const setLanguage = useCallback(async (language: LanguageCode) => {
    if (!language) {
      console.error("Invalid language code provided to setLanguage");
      return;
    }
    
    console.log(`Changing language to: ${language}`);
    
    // Clear existing translation cache completely to force re-translation
    setTranslationCache({});
    
    // Update the current language
    setCurrentLanguage(language);
    
    // This will trigger the effect above that updates document lang/dir and forces re-render
  }, []);

  // Process text before translation to protect non-translatable terms
  const protectSpecialTerms = (text: string): { processedText: string, placeholders: Record<string, string> } => {
    if (!text || typeof text !== 'string') {
      console.warn("Invalid text passed to protectSpecialTerms:", text);
      return { processedText: text || '', placeholders: {} };
    }
    
    let processedText = text;
    const placeholders: Record<string, string> = {};
    
    if (Array.isArray(NON_TRANSLATABLE_TERMS)) {
      NON_TRANSLATABLE_TERMS.forEach((term, index) => {
        if (!term) return;
        
        const placeholder = `___PLACEHOLDER_${index}___`;
        const regex = new RegExp(term, 'g');
        
        if (processedText.match(regex)) {
          processedText = processedText.replace(regex, placeholder);
          placeholders[placeholder] = term;
        }
      });
    }
    
    return { processedText, placeholders };
  };

  // Restore protected terms after translation
  const restoreSpecialTerms = (translatedText: string, placeholders: Record<string, string>): string => {
    if (!translatedText || typeof translatedText !== 'string') {
      return translatedText || '';
    }
    
    let result = translatedText;
    
    Object.entries(placeholders).forEach(([placeholder, originalTerm]) => {
      if (!placeholder || !originalTerm) return;
      
      const regex = new RegExp(placeholder, 'g');
      result = result.replace(regex, originalTerm);
    });
    
    return result;
  };

  // Function to translate text
  const translate = async (text: string): Promise<string> => {
    // If text is not a valid string, return it as is
    if (!text || typeof text !== 'string') {
      console.warn("Invalid text passed to translate:", text);
      return text || '';
    }
    
    // If the language is English or text is empty, return the original text
    if (currentLanguage === 'en' || !text || text.trim() === '') {
      return text;
    }
    
    // Check if translation is already in cache
    if (translationCache[currentLanguage]?.[text]) {
      return translationCache[currentLanguage][text];
    }
    
    try {
      setIsLoading(true);
      
      // Process text to protect special terms
      const { processedText, placeholders } = protectSpecialTerms(text);
      
      // Call translation edge function
      const { data, error } = await supabase.functions.invoke('translate', {
        body: { 
          text: processedText, 
          targetLanguage: currentLanguage 
        }
      });
      
      if (error) {
        console.error('Translation error:', error);
        return text;
      }
      
      if (!data || !data.translatedText) {
        console.error('Missing translation data:', data);
        return text;
      }
      
      // Restore protected terms in the translated text
      const finalTranslation = restoreSpecialTerms(data.translatedText, placeholders);
      
      // Cache the translation
      setTranslationCache(prevCache => ({
        ...prevCache,
        [currentLanguage]: {
          ...(prevCache[currentLanguage] || {}),
          [text]: finalTranslation
        }
      }));
      
      return finalTranslation;
    } catch (error) {
      console.error('Translation failed:', error);
      return text;
    } finally {
      setIsLoading(false);
    }
  };

  // Provide a default value if children is not provided
  return (
    <TranslationContext.Provider
      key={key} // Key to force re-render of all children when language changes
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

// Safe version of useTranslation hook with error handling
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  
  if (!context) {
    console.error("useTranslation must be used within a TranslationProvider");
    // Return default values instead of crashing
    return defaultContext;
  }
  
  return context;
};
