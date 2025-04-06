
import React from "react";
import { Link } from "react-router-dom";

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
      className="flex flex-col p-3 rounded-lg hover:bg-gray-50 transition-colors text-center"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-50 mb-2">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default QuickAccessItem;
