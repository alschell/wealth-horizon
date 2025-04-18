
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
  const isMounted = useRef(true);
  const originalText = useRef(children);
  const [translateError, setTranslateError] = useState<Error | null>(null);

  // Set up and clean up
  useEffect(() => {
    isMounted.current = true;
    console.log("TranslatedText mounted for:", children, "current language:", currentLanguage);
    
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Handle translation when language or content changes
  useEffect(() => {
    // If the original text changes, update our reference to it
    if (children !== originalText.current) {
      originalText.current = children;
    }
    
    // Skip translation for empty content
    if (!children || children.trim() === '') {
      setTranslatedContent(children);
      return;
    }

    // Always display original content initially
    setTranslatedContent(children);
    setTranslateError(null);
    
    const translateText = async () => {
      try {
        // Only proceed if we have a language and the component is still mounted
        if (!currentLanguage || !isMounted.current) return;
        
        console.log(`Attempting to translate: "${children}" to ${currentLanguage}`);
        const translated = await translate(children);
        
        if (isMounted.current) {
          console.log(`Translation result for "${children}": "${translated}"`);
          setTranslatedContent(translated || children);
        }
      } catch (error) {
        console.error("Translation error:", error);
        setTranslateError(error as Error);
        // If translation fails, fall back to original text
        if (isMounted.current) {
          setTranslatedContent(children);
        }
      }
    };

    // Only translate if we have a language and it's not English
    if (currentLanguage && currentLanguage !== 'en') {
      translateText();
    }
  }, [children, currentLanguage, translate]);

  // If we're still displaying the fallback content and there's a translation error, log it
  useEffect(() => {
    if (translateError && translatedContent === children && currentLanguage !== 'en') {
      console.warn(`Failed to translate "${children}" to ${currentLanguage}:`, translateError);
    }
  }, [translateError, translatedContent, children, currentLanguage]);

  // Return the current content, falling back to original text if needed
  return (
    <Component className={className} {...rest}>
      {translatedContent || children}
    </Component>
  );
};

export default TranslatedText;
