
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
  const isMounted = useRef(true);
  const originalText = useRef(children);
  const previousLanguage = useRef(currentLanguage);

  // Set up and clean up
  useEffect(() => {
    isMounted.current = true;
    console.log(`TranslatedText mounted: "${children}" (${currentLanguage})`);
    
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Handle translation on language change
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

    // Always translate if language changed
    const shouldTranslate = currentLanguage !== previousLanguage.current;
    
    // Update previous language reference
    previousLanguage.current = currentLanguage;
    
    if (!shouldTranslate && translatedContent) {
      return;
    }
    
    const translateText = async () => {
      if (!currentLanguage) return;
      
      setIsTranslating(true);
      console.log(`Starting translation of "${children}" to ${currentLanguage}`);
      
      try {
        // For English, just use the original text
        if (currentLanguage === 'en') {
          setTranslatedContent(children);
          return;
        }
        
        const translated = await translate(children);
        console.log(`Translation result: "${translated}"`);
        
        if (isMounted.current) {
          setTranslatedContent(translated);
        }
      } catch (error) {
        console.error("Translation error:", error);
        // If translation fails, fall back to original text
        if (isMounted.current) {
          setTranslatedContent(children);
        }
      } finally {
        if (isMounted.current) {
          setIsTranslating(false);
        }
      }
    };

    // Translate immediately, don't use timeout which can cause race conditions
    translateText();
  }, [children, currentLanguage, translate]);

  // Return the content, possibly with loading state
  return (
    <Component className={className} {...rest}>
      {translatedContent || children}
    </Component>
  );
};

export default TranslatedText;
