
import React from "react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface QuickAccessItemCardProps {
  id: string;
  icon: LucideIcon;
  label: string;
  path: string;
  description: string;
}

const QuickAccessItemCard = ({ id, icon: Icon, label, path, description }: QuickAccessItemCardProps) => {
  return (
    <Link to={path} key={id}>
      <div className="h-full flex flex-col items-center justify-start p-4 text-center transition-all duration-200 hover:bg-gray-50 rounded-md">
        <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center mb-3 mt-2">
          <Icon className="h-5 w-5 text-gray-500" />
        </div>
        <h3 className="font-medium text-sm mb-1">{label}</h3>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </Link>
  );
};

export default QuickAccessItemCard;
