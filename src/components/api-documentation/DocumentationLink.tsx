
import React from "react";
import { Link } from "react-router-dom";
import { TranslatedText } from "@/components/ui/translated-text";

interface DocumentationLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

export const DocumentationLink: React.FC<DocumentationLinkProps> = ({ 
  to, 
  active, 
  children 
}) => {
  return (
    <Link
      to={to}
      className={`
        flex items-center px-3 py-2 text-sm rounded-md
        ${active ? 'bg-indigo-50 text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'}
        transition-colors
      `}
    >
      {typeof children === 'string' ? <TranslatedText>{children}</TranslatedText> : children}
    </Link>
  );
};

export default DocumentationLink;
