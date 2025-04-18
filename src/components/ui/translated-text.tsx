
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
  const [translatedContent, setTranslatedContent] = useState<string>(children || '');

  useEffect(() => {
    let isMounted = true;
    
    const translateText = async () => {
      // Safety check - if children is not a valid string, don't attempt translation
      if (!children || typeof children !== 'string') {
        if (isMounted) {
          setTranslatedContent(String(children || ''));
        }
        return;
      }
      
      try {
        // Only call translate if it's a function and we have text to translate
        if (typeof translate === 'function') {
          const translated = await translate(children);
          if (isMounted && translated) {
            setTranslatedContent(translated);
          }
        }
      } catch (error) {
        console.error("Translation error:", error);
        // If translation fails, fall back to original text
        if (isMounted) {
          setTranslatedContent(children || '');
        }
      }
    };

    // Always run translation when language changes or text changes
    translateText();
    
    return () => {
      isMounted = false;
    };
  }, [children, currentLanguage, translate]);

  return (
    <Component className={className} {...rest}>
      {translatedContent || children || ''}
    </Component>
  );
};

export default TranslatedText;
