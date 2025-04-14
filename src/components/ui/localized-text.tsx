
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
  const { getLocalizedText, language } = useLanguage();
  const [displayText, setDisplayText] = useState<string>('');
  
  // Make sure component re-renders when language changes
  useEffect(() => {
    const localizedText = getLocalizedText(textKey);
    // If we don't have a translation, use the fallback or the key itself
    setDisplayText(localizedText === textKey ? (fallback || textKey) : localizedText);
  }, [textKey, fallback, language, getLocalizedText]);
  
  if (html) {
    return <span className={className} dangerouslySetInnerHTML={{ __html: displayText }} />;
  }
  
  return <span className={className}>{displayText}</span>;
};

// Helper for localized buttons, headings, etc.
export const useLocalizedText = () => {
  const { getLocalizedText, language } = useLanguage();
  
  const t = React.useCallback((key: string, fallback?: string) => {
    const localizedText = getLocalizedText(key);
    return localizedText === key ? (fallback || key) : localizedText;
  }, [language, getLocalizedText]);
  
  return { t };
};
