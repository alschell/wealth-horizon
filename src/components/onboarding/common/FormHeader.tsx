
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormHeaderProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ 
  icon, 
  title, 
  description,
  className 
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-3 mb-2">
        {icon && (
          <div className="text-black">
            {icon}
          </div>
        )}
        <h2 className="text-2xl font-bold text-black">{title}</h2>
      </div>
      {description && (
        <p className="text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default FormHeader;
