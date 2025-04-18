
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from '@/context/TranslationContext';

interface TranslatedTextProps {
  children: string;
  as?: React.ElementType;
  className?: string;
  withLoading?: boolean;
}

export const TranslatedText: React.FC<TranslatedTextProps> = ({
  children,
  as: Component = 'span',
  className = '',
  withLoading = false,
  ...rest
}) => {
  const { translate, currentLanguage, isLoading } = useTranslation();
  const [translatedContent, setTranslatedContent] = useState<string>(children);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const previousLanguage = useRef<string>(currentLanguage);
  const originalText = useRef<string>(children);
  
  // Update original text reference when children prop changes
  useEffect(() => {
    originalText.current = children;
  }, [children]);

  useEffect(() => {
    let isMounted = true;
    
    const translateText = async () => {
      // Skip translation for empty strings
      if (!originalText.current || originalText.current.trim() === '') {
        return;
      }
      
      // No need to show translating state immediately if we're going back to English
      if (currentLanguage !== 'en') {
        setIsTranslating(true);
      }
      
      try {
        const translated = await translate(originalText.current);
        if (isMounted) {
          setTranslatedContent(translated);
        }
      } catch (error) {
        console.error("Translation error:", error);
        // If translation fails, fall back to original text
        if (isMounted) {
          setTranslatedContent(originalText.current);
        }
      } finally {
        if (isMounted) {
          setIsTranslating(false);
        }
      }
    };

    // Language has changed
    if (currentLanguage !== previousLanguage.current) {
      // If switching to English, immediately show original text
      if (currentLanguage === 'en') {
        setTranslatedContent(originalText.current);
        setIsTranslating(false);
      } else {
        // Only start translating if we need to
        translateText();
      }
      
      previousLanguage.current = currentLanguage;
    }
    
    return () => {
      isMounted = false;
    };
  }, [children, currentLanguage, translate]);

  // Only show loading state if explicitly requested AND the global loading state is active
  const showLoading = withLoading && (isLoading || isTranslating);
  
  return (
    <Component 
      className={`${showLoading ? 'opacity-70' : ''} ${className}`} 
      {...rest}
    >
      {translatedContent}
    </Component>
  );
};

export default TranslatedText;
