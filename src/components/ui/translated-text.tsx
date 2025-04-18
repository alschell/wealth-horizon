
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

    let timeoutId: NodeJS.Timeout;
    
    const translateText = async () => {
      if (!currentLanguage) return;
      
      setIsTranslating(true);
      try {
        console.log(`Translating: "${children}" to ${currentLanguage}`);
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

    // Small delay to avoid too many translation requests at once
    timeoutId = setTimeout(() => {
      translateText();
    }, 10);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [children, currentLanguage, translate]);

  // Show loading state if requested and translation is in progress
  if (withLoading && (isLoading || isTranslating)) {
    return (
      <Component className={`animate-pulse ${className}`} {...rest}>
        {translatedContent || children}
      </Component>
    );
  }

  // If there was an error in translation, use original text
  if (hasError) {
    return (
      <Component className={className} {...rest}>
        {children}
      </Component>
    );
  }

  return (
    <Component className={className} {...rest}>
      {translatedContent || children}
    </Component>
  );
};

export default TranslatedText;
