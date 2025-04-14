
import React, { useEffect, useState, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface LocalizedTextProps {
  textKey: string;
  fallback?: string;
  className?: string;
  html?: boolean;
}

export const LocalizedText: React.FC<LocalizedTextProps> = ({ 
  textKey, 
  fallback, 
  className,
  html = false
}) => {
  const [displayText, setDisplayText] = useState<string>(fallback || textKey);
  const [languageContextAvailable, setLanguageContextAvailable] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  
  // Safely try to access the language context
  useEffect(() => {
    try {
      const { language, getLocalizedText } = useLanguage();
      setLanguageContextAvailable(true);
      setCurrentLanguage(language);
      
      console.log(`LocalizedText context available for key: ${textKey}, language: ${language}`);
      const localizedText = getLocalizedText(textKey);
      // If we don't have a translation, use the fallback or the key itself
      setDisplayText(localizedText === textKey ? (fallback || textKey) : localizedText);
    } catch (error) {
      // If language context is not available, use fallback or key
      console.warn(`Language context not available in LocalizedText for key: ${textKey}`, error);
      setLanguageContextAvailable(false);
      setDisplayText(fallback || textKey);
    }
  }, [textKey, fallback]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      const newLanguage = customEvent.detail?.language;
      
      if (newLanguage && newLanguage !== currentLanguage) {
        console.log(`LocalizedText received language change event: ${newLanguage} for key: ${textKey}`);
        setCurrentLanguage(newLanguage);
        
        try {
          const { getLocalizedText } = useLanguage();
          const localizedText = getLocalizedText(textKey);
          setDisplayText(localizedText === textKey ? (fallback || textKey) : localizedText);
        } catch (error) {
          console.warn(`Could not update text after language change for key: ${textKey}`, error);
        }
      }
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, [textKey, fallback, currentLanguage]);
  
  // Update the text when language changes, but only if context is available
  useEffect(() => {
    if (!languageContextAvailable) return;
    
    try {
      // Direct dependency on language to force re-renders
      const { getLocalizedText, language } = useLanguage();
      
      if (language !== currentLanguage) {
        console.log(`LocalizedText detected language change from ${currentLanguage} to ${language} for key: ${textKey}`);
        setCurrentLanguage(language);
      }
      
      // Make sure component re-renders when language changes
      const localizedText = getLocalizedText(textKey);
      // If we don't have a translation, use the fallback or the key itself
      setDisplayText(localizedText === textKey ? (fallback || textKey) : localizedText);
    } catch (error) {
      // If language context is lost, use fallback or key
      console.warn(`Language context lost in LocalizedText for key: ${textKey}`, error);
      setLanguageContextAvailable(false);
    }
  }, [textKey, fallback, languageContextAvailable, currentLanguage]);
  
  if (html) {
    return <span className={className} dangerouslySetInnerHTML={{ __html: displayText }} />;
  }
  
  return <span className={className}>{displayText}</span>;
};

// Helper for localized buttons, headings, etc.
export const useLocalizedText = () => {
  const [language, setLanguage] = useState<string>('en');
  const [languageContextAvailable, setLanguageContextAvailable] = useState<boolean>(false);
  
  // Safely try to access the language context
  useEffect(() => {
    try {
      const context = useLanguage();
      setLanguageContextAvailable(true);
      setLanguage(context.language);
      console.log(`useLocalizedText has access to language context, language: ${context.language}`);
    } catch (error) {
      console.warn('Language context not available in useLocalizedText', error);
      setLanguageContextAvailable(false);
    }
  }, []);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      const newLanguage = customEvent.detail?.language;
      
      if (newLanguage && newLanguage !== language) {
        console.log(`useLocalizedText received language change event: ${newLanguage}`);
        setLanguage(newLanguage);
      }
    };
    
    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, [language]);
  
  // Update local state when language changes to force re-renders
  useEffect(() => {
    if (!languageContextAvailable) return;
    
    try {
      const context = useLanguage();
      if (language !== context.language) {
        console.log(`useLocalizedText detected language change from ${language} to ${context.language}`);
        setLanguage(context.language);
      }
    } catch (error) {
      console.warn('Language context lost in useLocalizedText', error);
      setLanguageContextAvailable(false);
    }
  }, [languageContextAvailable, language]);
  
  // Always provide a t function, even if language context is not available
  const t = useCallback((key: string, fallback?: string) => {
    if (!languageContextAvailable) {
      return fallback || key;
    }
    
    try {
      const context = useLanguage();
      const localizedText = context.getLocalizedText(key);
      return localizedText === key ? (fallback || key) : localizedText;
    } catch (error) {
      console.warn(`Error getting translation for key: ${key}`, error);
      return fallback || key;
    }
  }, [languageContextAvailable, language]);
  
  return {
    t,
    language: languageContextAvailable ? language : 'en'
  };
};
