
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

  useEffect(() => {
    let isMounted = true;
    
    const translateText = async () => {
      const translated = await translate(children);
      if (isMounted) {
        setTranslatedContent(translated);
      }
    };

    translateText();
    
    return () => {
      isMounted = false;
    };
  }, [children, currentLanguage, translate]);

  if (withLoading && isLoading) {
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
