
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentationLinkProps {
  children: React.ReactNode;
  to: string;
  active: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const DocumentationLink: React.FC<DocumentationLinkProps> = ({ 
  children, 
  to, 
  active,
  icon,
  className
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
        active 
          ? "bg-indigo-50 text-indigo-600 font-medium" 
          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </Link>
  );
};
