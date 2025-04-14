
import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface LocalizedTextProps {
  textKey: string;
  fallback?: string;
  className?: string;
}

export const LocalizedText: React.FC<LocalizedTextProps> = ({ 
  textKey, 
  fallback, 
  className 
}) => {
  const { getLocalizedText, language } = useLanguage();
  const localizedText = getLocalizedText(textKey);
  
  // If we don't have a translation, use the fallback or the key itself
  const displayText = localizedText === textKey ? (fallback || textKey) : localizedText;
  
  useEffect(() => {
    // This will cause the component to re-render when language changes
    // We don't need to do anything in the effect itself
  }, [language]);
  
  return <span className={className}>{displayText}</span>;
};

// Helper for localized buttons, headings, etc.
export const useLocalizedText = () => {
  const { getLocalizedText, language } = useLanguage();
  
  return {
    t: (key: string, fallback?: string) => {
      const localizedText = getLocalizedText(key);
      return localizedText === key ? (fallback || key) : localizedText;
    }
  };
};
