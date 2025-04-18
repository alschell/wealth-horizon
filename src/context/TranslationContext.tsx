
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { toast } from 'sonner';

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
  
  // Load language preference from local storage on initial load
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        console.log("Loading language preferences...");
        const savedLanguage = localStorage.getItem('preferredLanguage') as LanguageCode;
        if (savedLanguage && LANGUAGES.some(lang => lang.code === savedLanguage)) {
          console.log(`Loading saved language preference: ${savedLanguage}`);
          // For non-English saved preferences, verify it's a valid language before setting
          if (savedLanguage !== 'en') {
            const isValidLanguage = LANGUAGES.some(lang => lang.code === savedLanguage);
            if (isValidLanguage) {
              setCurrentLanguage(savedLanguage);
              return;
            }
          } else {
            setCurrentLanguage(savedLanguage);
            return;
          }
        }
      } catch (error) {
        console.error("Error loading language from localStorage:", error);
      }
      
      // Always default to English if no valid saved preference
      setCurrentLanguage('en');
    };
    
    loadLanguage();
  }, []);

  // Apply language changes to document
  useEffect(() => {
    if (currentLanguage) {
      console.log(`Applying language changes to document: ${currentLanguage}`);
      
      // Update HTML lang attribute and direction
      document.documentElement.lang = currentLanguage;
      document.documentElement.dir = ['ar', 'he', 'fa'].includes(currentLanguage) ? 'rtl' : 'ltr';
    }
  }, [currentLanguage]);

  // Save user language preference to database if logged in and to localStorage
  useEffect(() => {
    const saveLanguagePreference = async () => {
      if (!currentLanguage) return;
      
      try {
        // Save to localStorage first (more reliable)
        localStorage.setItem('preferredLanguage', currentLanguage);
        console.log(`Saved language preference to localStorage: ${currentLanguage}`);
        
        // Try to save to database if user is logged in
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
              console.error('Failed to save language preference to database:', error);
            } else {
              console.log(`Saved language preference to database for user ${user.id}: ${currentLanguage}`);
            }
          }
        } catch (dbError) {
          console.error('Database error when saving language preference:', dbError);
          // Continue execution even if database save fails
        }
      } catch (error) {
        console.error("Error saving language preference:", error);
      }
    };
    
    if (currentLanguage) {
      saveLanguagePreference();
    }
  }, [currentLanguage]);

  // Function to set the language with more robust update mechanism
  const setLanguage = useCallback(async (language: LanguageCode) => {
    console.log(`Changing language to: ${language}`);
    
    try {
      if (language === currentLanguage) {
        console.log("Language already set to", language);
        return Promise.resolve();
      }
      
      setIsLoading(true);
      
      // Clear existing translation cache for the new language
      setTranslationCache(prevCache => {
        const newCache = { ...prevCache };
        // Only clear the target language cache to force fresh translations
        delete newCache[language];
        return newCache;
      });
      
      // Update the current language
      setCurrentLanguage(language);
      
      // Force re-render of all components using the context
      setTimeout(() => {
        setKey(prevKey => prevKey + 1);
        setIsLoading(false);
      }, 50);
      
      return Promise.resolve();
    } catch (error) {
      console.error(`Error setting language to ${language}:`, error);
      setIsLoading(false);
      return Promise.reject(error);
    }
  }, [currentLanguage]);

  // Process text before translation to protect non-translatable terms
  const protectSpecialTerms = (text: string): { processedText: string, placeholders: Record<string, string> } => {
    let processedText = text;
    const placeholders: Record<string, string> = {};
    
    NON_TRANSLATABLE_TERMS.forEach((term, index) => {
      const placeholder = `___PLACEHOLDER_${index}___`;
      const regex = new RegExp(term, 'g');
      
      if (processedText.match(regex)) {
        processedText = processedText.replace(regex, placeholder);
        placeholders[placeholder] = term;
      }
    });
    
    return { processedText, placeholders };
  };

  // Restore protected terms after translation
  const restoreSpecialTerms = (translatedText: string, placeholders: Record<string, string>): string => {
    let result = translatedText;
    
    Object.entries(placeholders).forEach(([placeholder, originalTerm]) => {
      const regex = new RegExp(placeholder, 'g');
      result = result.replace(regex, originalTerm);
    });
    
    return result;
  };

  // Function to translate text
  const translate = async (text: string): Promise<string> => {
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
        setIsLoading(false);
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
      
      setIsLoading(false);
      return finalTranslation;
    } catch (error) {
      console.error('Translation failed:', error);
      setIsLoading(false);
      return text;
    }
  };

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

export const useTranslation = () => useContext(TranslationContext);
