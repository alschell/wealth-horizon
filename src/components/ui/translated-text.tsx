
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
  const [translatedContent, setTranslatedContent] = useState<string>(children || '');

  useEffect(() => {
    // Safety check - if children is not a valid string, don't try to translate
    if (!children || typeof children !== 'string') {
      console.warn('TranslatedText received invalid children:', children);
      return;
    }

    let isMounted = true;
    
    const translateText = async () => {
      try {
        if (typeof translate !== 'function') {
          console.error("Translate function is not available");
          if (isMounted) {
            setTranslatedContent(children);
          }
          return;
        }
        
        const translated = await translate(children);
        if (isMounted && translated) {
          setTranslatedContent(translated);
        }
      } catch (error) {
        console.error("Translation error:", error);
        // If translation fails, fall back to original text
        if (isMounted) {
          setTranslatedContent(children);
        }
      }
    };

    // Always run translation when language changes or text changes
    translateText();
    
    return () => {
      isMounted = false;
    };
  }, [children, currentLanguage, translate]);

  if (withLoading && isLoading) {
    return (
      <Component className={`animate-pulse ${className}`} {...rest}>
        {translatedContent || children || ''}
      </Component>
    );
  }

  return (
    <Component className={className} {...rest}>
      {translatedContent || children || ''}
    </Component>
  );
};

export default TranslatedText;
