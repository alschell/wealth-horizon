
import React from "react";
import { Building2 } from "lucide-react";

interface FormHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

const FormHeader: React.FC<FormHeaderProps> = ({ 
  title, 
  description, 
  icon = <Building2 className="h-7 w-7 text-black" />
}) => {
  return (
    <>
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h2 className="text-2xl font-bold text-black">{title}</h2>
      </div>
      {description && (
        <p className="text-gray-500">{description}</p>
      )}
    </>
  );
};

export default FormHeader;
