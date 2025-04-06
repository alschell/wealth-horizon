
import React from "react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface QuickAccessItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const QuickAccessItem = ({ title, description, icon, link }: QuickAccessItemProps) => {
  return (
    <Link
      to={link}
      className="flex flex-col p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
    >
      <div className="flex items-center space-x-3 mb-2">
        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-50">
          <div className="text-gray-500">{icon}</div>
        </div>
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <div>
        <p className="text-xs text-muted-foreground pl-11">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default QuickAccessItem;
