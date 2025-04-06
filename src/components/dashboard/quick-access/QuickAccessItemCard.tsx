
import React from "react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickAccessItemCardProps {
  id: string;
  icon: LucideIcon;
  label: string;
  path: string;
  description: string;
  color?: string;
}

const QuickAccessItemCard = ({ 
  id, 
  icon: Icon, 
  label, 
  path, 
  description,
  color = "bg-gray-50"
}: QuickAccessItemCardProps) => {
  return (
    <Link to={path} key={id}>
      <div className="h-full p-4 transition-all duration-200 hover:bg-gray-50 rounded-md">
        <div className="flex items-start gap-3">
          <div className={cn("h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full", color)}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-medium mb-1">{label}</h3>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuickAccessItemCard;
