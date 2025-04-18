
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { LanguageCode } from './types';
import { LANGUAGES } from './constants';
import { updateHtmlLangAttributes } from './utils';

export function useLanguageManager(clearTranslationCache: () => void) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [key, setKey] = useState(0); // Force component tree re-render with key

  // Load language preference from local storage on initial load
  useEffect(() => {
    try {
      console.log("LanguageManager: Initializing language preferences");
      const savedLanguage = localStorage.getItem('preferredLanguage') as LanguageCode;
      if (savedLanguage && LANGUAGES.some(lang => lang.code === savedLanguage)) {
        setCurrentLanguage(savedLanguage);
      } else {
        const browserLang = navigator.language.split('-')[0] as LanguageCode;
        if (LANGUAGES.some(lang => lang.code === browserLang)) {
          setCurrentLanguage(browserLang);
        }
      }
      
      setIsInitialized(true);
    } catch (error) {
      console.error("LanguageManager: Error initializing language:", error);
      setIsInitialized(true); // Still mark as initialized to prevent hanging
    }
  }, []);

  // Save user language preference to database if logged in
  useEffect(() => {
    if (!currentLanguage || !isInitialized) return;
    
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
        updateHtmlLangAttributes(currentLanguage);
        
        // Force re-render by updating key
        setKey(prevKey => prevKey + 1);
      } catch (error) {
        console.error("Error saving language preference:", error);
      }
    };
    
    saveLanguagePreference();
  }, [currentLanguage, isInitialized]);

  // Function to set the language with more robust update mechanism
  const setLanguage = useCallback(async (language: LanguageCode) => {
    console.log(`Changing language to: ${language}`);
    
    if (language === currentLanguage) {
      console.log("Language is already set to:", language);
      return Promise.resolve();
    }
    
    try {
      // Start language change process
      setIsLoading(true);
      
      // Clear existing translation cache completely to force re-translation
      clearTranslationCache();
      
      // Update the current language
      setCurrentLanguage(language);
      
      return Promise.resolve();
    } catch (error) {
      console.error("Failed to set language:", error);
      setIsLoading(false);
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  }, [clearTranslationCache, currentLanguage]);

  return {
    currentLanguage,
    setLanguage,
    isLoading,
    setIsLoading,
    isInitialized,
    key
  };
}
