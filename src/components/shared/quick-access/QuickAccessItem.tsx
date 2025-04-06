
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
      className="flex flex-col p-3 rounded-lg hover:bg-gray-50 transition-colors text-center h-full"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-50 mb-2">
          <div className="text-gray-500">{icon}</div>
        </div>
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <p className="text-xs text-muted-foreground">
        {description}
      </p>
    </Link>
  );
};

export default QuickAccessItem;
