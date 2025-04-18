
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
  const [translatedContent, setTranslatedContent] = useState(children);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const translateText = async () => {
      try {
        setIsTranslating(true);
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

    // Always run translation when language changes or text changes
    translateText();
    
    return () => {
      isMounted = false;
    };
  }, [children, currentLanguage, translate]);

  if (withLoading && (isLoading || isTranslating)) {
    return (
      <Component className={`animate-pulse ${className}`} {...rest}>
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
