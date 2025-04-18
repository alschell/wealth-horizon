
import React from 'react';
import { useTranslation } from '@/context/TranslationContext';

interface TranslatedTextProps {
  textKey?: string;
  params?: Record<string, string>;
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

export const TranslatedText: React.FC<TranslatedTextProps> = ({
  textKey,
  params,
  as: Component = 'span',
  className,
  children,
  ...rest
}) => {
  const { t } = useTranslation();
  
  // Support both textKey and children props
  const content = textKey ? t(textKey, params) : children;
  
  return (
    <Component className={className} {...rest}>
      {content}
    </Component>
  );
};

// This allows import TranslatedText from ... to also work for backward compatibility
const TranslatedTextComponent = TranslatedText;
export default TranslatedTextComponent;
