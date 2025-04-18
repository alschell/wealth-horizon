import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/utils/supabaseClient';
import EnhancedLoadingSpinner from '@/components/common/EnhancedLoadingSpinner';

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
  const [isLoading, setIsLoading] = useState(true); // Start with loading state
  const [key, setKey] = useState(0); // Force component tree re-render with key
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Load language preference from local storage on initial load
  useEffect(() => {
    try {
      console.log("TranslationProvider: Initializing language preferences");
      const savedLanguage = localStorage.getItem('preferredLanguage') as LanguageCode;
      if (savedLanguage && LANGUAGES.some(lang => lang.code === savedLanguage)) {
        setCurrentLanguage(savedLanguage);
      } else {
        const browserLang = navigator.language.split('-')[0] as LanguageCode;
        if (LANGUAGES.some(lang => lang.code === browserLang)) {
          setCurrentLanguage(browserLang);
        }
      }
      // Add a delay to ensure initialization is smooth
      setTimeout(() => {
        setIsInitialized(true);
        setIsLoading(false);
        console.log("TranslationProvider: Language initialized successfully");
      }, 200);
    } catch (error) {
      console.error("TranslationProvider: Error initializing language:", error);
      setIsInitialized(true); // Still mark as initialized to prevent hanging
      setIsLoading(false);
    }
  }, []);

  // Save user language preference to database if logged in
  useEffect(() => {
    if (!currentLanguage) return;
    
    const saveLanguagePreference = async () => {
      // Set loading state at the beginning of language change
      setIsLoading(true);
      
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
      
      // Keep loading state for a moment to avoid flickering
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    };
    
    saveLanguagePreference();
  }, [currentLanguage]);

  // Function to set the language with more robust update mechanism
  const setLanguage = useCallback(async (language: LanguageCode) => {
    console.log(`Changing language to: ${language}`);
    
    try {
      // Show loading state immediately
      setIsLoading(true);
      
      // Clear existing translation cache completely to force re-translation
      setTranslationCache({});
      
      // Update the current language
      setCurrentLanguage(language);
      
      // This will trigger the effect above that updates document lang/dir and forces re-render
      return Promise.resolve();
    } catch (error) {
      console.error("Failed to set language:", error);
      setIsLoading(false);
      return Promise.reject(error);
    }
  }, []);

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

  // Function to translate text with enhanced error handling
  const translate = async (text: string): Promise<string> => {
    // If text is null, undefined, or not a string, return empty string to avoid crashes
    if (!text || typeof text !== 'string') {
      console.warn("TranslationContext: Invalid text passed to translate function", text);
      return String(text || "");
    }
    
    // If the language is English or text is empty, return the original text
    if (currentLanguage === 'en' || text.trim() === '') {
      return text;
    }
    
    // Check if translation is already in cache
    if (translationCache[currentLanguage]?.[text]) {
      return translationCache[currentLanguage][text];
    }
    
    try {
      setIsLoading(true);
      
      // Return original text immediately if translation service is unavailable
      if (!supabase) {
        console.error("Translation service unavailable: Supabase client not initialized");
        setTimeout(() => setIsLoading(false), 200);
        return text;
      }
      
      // Process text to protect special terms
      const { processedText, placeholders } = protectSpecialTerms(text);
      
      // Call translation edge function with timeout
      const translationPromise = supabase.functions.invoke('translate', {
        body: { 
          text: processedText, 
          targetLanguage: currentLanguage 
        }
      });
      
      // Set a timeout to prevent hanging if the API doesn't respond
      const timeoutPromise = new Promise<{data: null, error: Error}>((resolve) => {
        setTimeout(() => {
          resolve({
            data: null,
            error: new Error('Translation request timed out')
          });
        }, 3000); // 3 seconds timeout
      });
      
      // Race the translation request against the timeout
      const { data, error } = await Promise.race([translationPromise, timeoutPromise]);
      
      if (error) {
        console.error('Translation error:', error);
        setTimeout(() => setIsLoading(false), 200);
        return text; // Return original text on error
      }
      
      if (!data || !data.translatedText) {
        console.error('Invalid translation response:', data);
        setTimeout(() => setIsLoading(false), 200);
        return text; // Return original text if response is invalid
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
      
      // Delay turning off loading slightly to avoid flickering
      setTimeout(() => setIsLoading(false), 200);
      
      return finalTranslation;
    } catch (error) {
      console.error('Translation failed:', error);
      setTimeout(() => setIsLoading(false), 200);
      return text; // Return original text on any error
    }
  };

  // Clear translation cache when language changes
  useEffect(() => {
    setTranslationCache({});
  }, [currentLanguage]);

  // Don't render children until we've initialized language settings
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EnhancedLoadingSpinner 
          size="md" 
          color="text-indigo-500" 
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
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
