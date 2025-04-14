
import React, { useEffect, useState } from 'react';
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
  const [, forceUpdate] = useState({});
  
  try {
    const { getLocalizedText, language } = useLanguage();
    
    // Make sure component re-renders when language changes
    useEffect(() => {
      console.log(`LocalizedText updating for key: ${textKey}, language: ${language}`);
      const localizedText = getLocalizedText(textKey);
      // If we don't have a translation, use the fallback or the key itself
      setDisplayText(localizedText === textKey ? (fallback || textKey) : localizedText);
      // Force component to re-render
      forceUpdate({});
    }, [textKey, fallback, language, getLocalizedText]);
  } catch (error) {
    // If language context is not available, use fallback or key
    console.warn('Language context not available, using fallback text');
  }
  
  if (html) {
    return <span className={className} dangerouslySetInnerHTML={{ __html: displayText }} />;
  }
  
  return <span className={className}>{displayText}</span>;
};

// Helper for localized buttons, headings, etc.
export const useLocalizedText = () => {
  const [language, setLanguage] = useState<string>('');
  
  try {
    const context = useLanguage();
    
    // Update local state when language changes to force re-renders
    useEffect(() => {
      setLanguage(context.language);
    }, [context.language]);
    
    const t = React.useCallback((key: string, fallback?: string) => {
      const localizedText = context.getLocalizedText(key);
      return localizedText === key ? (fallback || key) : localizedText;
    }, [context.language, context.getLocalizedText]);
    
    return { t, language: context.language };
  } catch (error) {
    // If language context is not available, provide a fallback function
    console.warn('Language context not available in useLocalizedText');
    return {
      t: (key: string, fallback?: string) => fallback || key,
      language: 'en'
    };
  }
};
