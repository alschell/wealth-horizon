
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface QuickAccessItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color?: string;
  onClick?: () => void;
}

const QuickAccessItem = ({ 
  title, 
  description, 
  icon, 
  link, 
  color = "bg-gray-50 text-gray-500",
  onClick
}: QuickAccessItemProps) => {
  return (
    <Link
      to={link}
      className="flex flex-col p-4 rounded-lg transition-all duration-200 text-center h-full hover:bg-gray-50"
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center">
        <div className={cn("h-10 w-10 flex items-center justify-center rounded-full mb-3", color)}>
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-1">{title}</h3>
        <p className="text-xs text-gray-500">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default QuickAccessItem;
