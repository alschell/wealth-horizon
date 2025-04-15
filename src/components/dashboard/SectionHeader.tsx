
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  link?: string;
  linkText?: string;
  className?: string;
}

const SectionHeader = ({
  title,
  description,
  action,
  link,
  linkText = "View all",
  className,
}: SectionHeaderProps) => {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center justify-between mb-4", className)}>
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      
      <div className="flex items-center mt-2 sm:mt-0">
        {action}
        
        {link && (
          <Link to={link}>
            <Button variant="ghost" size="sm" className="text-sm text-gray-600">
              {linkText}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
