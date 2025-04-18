
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
  const { translate, currentLanguage } = useTranslation();
  const [translatedContent, setTranslatedContent] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  useEffect(() => {
    // Skip the effect entirely if required data is missing
    if (!translate || typeof translate !== 'function') {
      console.warn("TranslatedText: translate function is not available");
      setTranslatedContent(String(children || ''));
      return;
    }

    let isMounted = true;
    const textToTranslate = typeof children === 'string' ? children : String(children || '');
    
    const translateText = async () => {
      // Don't attempt translation if we have no content
      if (!textToTranslate) {
        if (isMounted) {
          setTranslatedContent('');
        }
        return;
      }
      
      setIsTranslating(true);
      
      try {
        const translated = await translate(textToTranslate);
        if (isMounted && translated) {
          setTranslatedContent(translated);
        } else if (isMounted) {
          // Fallback to original text if translation fails
          setTranslatedContent(textToTranslate);
        }
      } catch (error) {
        console.error("Translation error:", error);
        // If translation fails, fall back to original text
        if (isMounted) {
          setTranslatedContent(textToTranslate);
        }
      } finally {
        if (isMounted) {
          setIsTranslating(false);
        }
      }
    };

    // Run translation
    translateText();
    
    return () => {
      isMounted = false;
    };
  }, [children, currentLanguage, translate]);

  // Ensure we always return something valid
  const displayContent = translatedContent || (typeof children === 'string' ? children : String(children || ''));
  
  return (
    <Component className={className} {...rest}>
      {displayContent}
    </Component>
  );
};

export default TranslatedText;
