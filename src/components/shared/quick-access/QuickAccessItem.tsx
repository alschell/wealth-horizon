
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { QuickAccessItemProps } from "./types";

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
      className="flex flex-col p-4 rounded-lg transition-all duration-200 h-full hover:bg-gray-50"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className={cn("h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full", color)}>
          {icon}
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-medium mb-1">{title}</h3>
          <p className="text-xs text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default QuickAccessItem;
