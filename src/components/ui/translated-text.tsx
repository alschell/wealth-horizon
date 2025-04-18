
import React from 'react';
import { useTranslation } from '@/context/TranslationContext';

interface TranslatedTextProps {
  textKey: string;
  params?: Record<string, string>;
  as?: React.ElementType;
  className?: string;
}

export const TranslatedText: React.FC<TranslatedTextProps> = ({
  textKey,
  params,
  as: Component = 'span',
  className,
  ...rest
}) => {
  const { t } = useTranslation();
  
  return (
    <Component className={className} {...rest}>
      {t(textKey, params)}
    </Component>
  );
};

export const T = TranslatedText;
