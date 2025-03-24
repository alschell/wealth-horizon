
import React from "react";
import { Wallet } from "lucide-react";

interface FormHeaderProps {
  title?: string;
  subtitle?: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ 
  title = "Add a new financial account",
  subtitle
}) => {
  return (
    <div className="space-y-1">
      <h3 className="font-medium flex items-center gap-2 text-black">
        <Wallet className="h-5 w-5 text-black" />
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm text-gray-500">{subtitle}</p>
      )}
    </div>
  );
};

export default FormHeader;
