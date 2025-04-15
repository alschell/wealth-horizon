
import React from "react";

export interface TranslatedTextProps {
  children: React.ReactNode;
  className?: string;
}

export const TranslatedText: React.FC<TranslatedTextProps> = ({ 
  children,
  className = ""
}) => {
  return (
    <span className={className}>{children}</span>
  );
};
