
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    let isMounted = true;
    
    const translateText = async () => {
      // Skip translation for empty strings
      if (!children || children.trim() === '') {
        return;
      }
      
      setIsTranslating(true);
      
      try {
        const translated = await translate(children);
        if (isMounted) {
          setTranslatedContent(translated);
        }
      } catch (error) {
        console.error("Translation error:", error);
        // If translation fails, fall back to original text
        if (isMounted) {
          setTranslatedContent(children);
        }
      } finally {
        if (isMounted) {
          setIsTranslating(false);
        }
      }
    };

    // Reset to original text when language changes before translating
    setTranslatedContent(children);
    
    // Only translate when needed
    if (currentLanguage !== 'en') {
      translateText();
    }
    
    return () => {
      isMounted = false;
    };
  }, [children, currentLanguage, translate]);

  // Show loading state if requested
  if ((withLoading && isLoading) || isTranslating) {
    return (
      <Component 
        className={`animate-pulse ${className}`} 
        {...rest}
      >
        {translatedContent}
      </Component>
    );
  }

  return (
    <Component className={className} {...rest}>
      {translatedContent}
    </Component>
  );
};

export default TranslatedText;
