
import React from "react";
import { Link } from "react-router-dom";
import { QuickLinkItem } from "./types";

interface QuickAccessGridProps {
  items: QuickLinkItem[];
}

const QuickAccessGrid = ({ items }: QuickAccessGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          className="flex flex-col p-3 rounded-lg hover:bg-gray-50 transition-colors text-center"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-50 mb-2">
              {item.icon}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium">{item.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {item.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuickAccessGrid;
