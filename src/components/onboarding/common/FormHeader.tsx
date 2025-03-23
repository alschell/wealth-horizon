
import React from "react";
import { motion } from "framer-motion";

interface FormHeaderProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ icon, title, description }) => {
  return (
    <>
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      {description && (
        <p className="text-gray-500">{description}</p>
      )}
    </>
  );
};

export default FormHeader;
