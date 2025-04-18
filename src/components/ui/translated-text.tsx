
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
  const [isTranslating, setIsTranslating] = useState(false);
  const [hasError, setHasError] = useState(false);
  const isMounted = useRef(true);
  const originalText = useRef(children);
  const previousLanguage = useRef(currentLanguage);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Reset error state on new translation attempt
    setHasError(false);
    
    // If the original text changes, update our reference to it
    if (children !== originalText.current) {
      originalText.current = children;
    }
    
    // Check if we should proceed with translation
    if (!children || children.trim() === '') {
      setTranslatedContent(children);
      return;
    }

    // Don't re-translate if language hasn't changed and we already have content
    if (currentLanguage === previousLanguage.current && translatedContent && translatedContent !== children) {
      return;
    }

    // Update previous language reference
    previousLanguage.current = currentLanguage;
    
    const translateText = async () => {
      if (!currentLanguage) return;
      
      setIsTranslating(true);
      try {
        const translated = await translate(children);
        
        if (isMounted.current) {
          setTranslatedContent(translated);
        }
      } catch (error) {
        console.error("Translation error:", error);
        // If translation fails, fall back to original text
        if (isMounted.current) {
          setTranslatedContent(children);
          setHasError(true);
        }
      } finally {
        if (isMounted.current) {
          setIsTranslating(false);
        }
      }
    };

    // Small delay to avoid overwhelming translation requests
    const timeoutId = setTimeout(() => {
      translateText();
    }, 10);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [children, currentLanguage, translate]);

  // If loading is requested and translation is in progress, show loading state
  if (withLoading && (isLoading || isTranslating)) {
    return (
      <Component className={`animate-pulse ${className}`} {...rest}>
        {translatedContent || children}
      </Component>
    );
  }

  // On error or default case, return the content
  return (
    <Component className={className} {...rest}>
      {translatedContent || children}
    </Component>
  );
};

export default TranslatedText;
