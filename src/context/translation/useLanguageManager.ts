import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { LanguageCode } from './types';
import { LANGUAGES } from './constants';
import { updateHtmlLangAttributes } from './utils';
import { DEFAULT_LOADING_DELAY } from './constants';

export function useLanguageManager(clearTranslationCache: () => void) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [languageChangeInProgress, setLanguageChangeInProgress] = useState(false);
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
      
      // Add a delay to ensure initialization is smooth
      setTimeout(() => {
        setIsInitialized(true);
        setIsLoading(false);
        console.log("LanguageManager: Language initialized successfully");
      }, DEFAULT_LOADING_DELAY);
    } catch (error) {
      console.error("LanguageManager: Error initializing language:", error);
      setIsInitialized(true); // Still mark as initialized to prevent hanging
      setIsLoading(false);
    }
  }, []);

  // Save user language preference to database if logged in
  useEffect(() => {
    if (!currentLanguage || languageChangeInProgress) return;
    
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
      updateHtmlLangAttributes(currentLanguage);
      
      // Force re-render by updating key
      setKey(prevKey => prevKey + 1);
      
      // Keep loading state for a moment to avoid flickering
      setTimeout(() => {
        setIsLoading(false);
        setLanguageChangeInProgress(false);
      }, DEFAULT_LOADING_DELAY);
    };
    
    saveLanguagePreference();
  }, [currentLanguage, languageChangeInProgress]);

  // Function to set the language with more robust update mechanism
  const setLanguage = useCallback(async (language: LanguageCode) => {
    console.log(`Changing language to: ${language}`);
    
    try {
      // Start language change process
      setLanguageChangeInProgress(true);
      
      // Show loading state immediately
      setIsLoading(true);
      
      // Clear existing translation cache completely to force re-translation
      clearTranslationCache();
      
      // Update the current language after a small delay
      setTimeout(() => {
        setCurrentLanguage(language);
      }, 100);
      
      // This will trigger the effect above that updates document lang/dir and forces re-render
      return Promise.resolve();
    } catch (error) {
      console.error("Failed to set language:", error);
      setIsLoading(false);
      setLanguageChangeInProgress(false);
      return Promise.reject(error);
    }
  }, [clearTranslationCache]);

  return {
    currentLanguage,
    setLanguage,
    isLoading,
    setIsLoading,
    isInitialized,
    key
  };
}
