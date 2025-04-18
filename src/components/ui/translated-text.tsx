
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

  // Set up and clean up
  useEffect(() => {
    isMounted.current = true;
    
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

    // For English, just use the original text without an API call
    if (currentLanguage === 'en') {
      setTranslatedContent(children);
      return;
    }
    
    const translateText = async () => {
      if (!currentLanguage) return;
      
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
        }
      }
    };

    // Translate immediately
    translateText();
  }, [children, currentLanguage, translate]);

  // Return the current content, falling back to original text if needed
  return (
    <Component className={className} {...rest}>
      {translatedContent || children}
    </Component>
  );
};

export default TranslatedText;
