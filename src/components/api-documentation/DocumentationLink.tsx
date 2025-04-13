
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface DocumentationLinkProps {
  children: React.ReactNode;
  to: string;
  active: boolean;
}

export const DocumentationLink: React.FC<DocumentationLinkProps> = ({ 
  children, 
  to, 
  active
}) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 text-sm rounded-md ${
        active 
          ? "bg-indigo-50 text-indigo-600 font-medium" 
          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </Link>
  );
};
