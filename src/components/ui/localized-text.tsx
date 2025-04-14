
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
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  
  // Access language context directly with error handling
  try {
    // Get the language and text directly from context
    const { language, getLocalizedText } = useLanguage();
    
    // Set text when component mounts and when language changes
    useEffect(() => {
      console.log(`LocalizedText rendering for key: ${textKey}, language: ${language}`);
      setCurrentLanguage(language);
      const localizedText = getLocalizedText(textKey);
      setDisplayText(localizedText === textKey ? (fallback || textKey) : localizedText);
    }, [textKey, fallback, language, getLocalizedText]);
    
    // Listen for language change events for components not directly using context
    useEffect(() => {
      const handleLanguageChange = (event: Event) => {
        const customEvent = event as CustomEvent;
        console.log(`LocalizedText received languageChange event for ${textKey}:`, customEvent.detail?.language);
        
        // Update text when language changes
        if (customEvent.detail?.language) {
          setCurrentLanguage(customEvent.detail.language);
          const localizedText = getLocalizedText(textKey);
          setDisplayText(localizedText === textKey ? (fallback || textKey) : localizedText);
        }
      };
      
      window.addEventListener('languageChange', handleLanguageChange);
      return () => {
        window.removeEventListener('languageChange', handleLanguageChange);
      };
    }, [textKey, fallback, getLocalizedText]);
  } catch (error) {
    // If we can't access the language context, use fallback
    console.warn(`Language context error in LocalizedText for key: ${textKey}`, error);
  }
  
  // Key the component to force re-render when language changes
  const key = `localized-text-${textKey}-${currentLanguage}`;
  
  if (html) {
    return <span key={key} className={className} dangerouslySetInnerHTML={{ __html: displayText }} />;
  }
  
  return <span key={key} className={className}>{displayText}</span>;
};

// Helper for localized buttons, headings, etc.
export const useLocalizedText = () => {
  const [language, setLanguage] = useState<string>('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  
  try {
    // Get context directly
    const context = useLanguage();
    
    // Update local state when language changes
    useEffect(() => {
      console.log(`useLocalizedText rendered with language: ${context.language}`);
      setLanguage(context.language);
    }, [context.language]);
    
    // Listen for language change events
    useEffect(() => {
      const handleLanguageChange = (event: Event) => {
        const customEvent = event as CustomEvent;
        console.log(`useLocalizedText received language change event:`, customEvent.detail?.language);
        if (customEvent.detail?.language) {
          setLanguage(customEvent.detail.language);
        }
      };
      
      window.addEventListener('languageChange', handleLanguageChange);
      return () => {
        window.removeEventListener('languageChange', handleLanguageChange);
      };
    }, []);
    
    // Memoized translation function
    const t = useCallback((key: string, fallback?: string) => {
      try {
        const localizedText = context.getLocalizedText(key);
        return localizedText === key ? (fallback || key) : localizedText;
      } catch (error) {
        console.warn(`Error getting translation for key: ${key}`, error);
        return fallback || key;
      }
    }, [context, language]); // Add language dependency to force re-evaluation when language changes
    
    return { t, language };
  } catch (error) {
    // Fallback if context is not available
    console.warn('Language context not available in useLocalizedText', error);
    
    // Return a dummy t function that just returns the fallback
    const t = useCallback((key: string, fallback?: string) => fallback || key, []);
    return { t, language: 'en' };
  }
};
