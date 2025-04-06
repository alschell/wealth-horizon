
import React from "react";
import QuickAccessItem from "./QuickAccessItem";
import { QuickAccessGridProps } from "./types";

const QuickAccessGrid = ({ items }: QuickAccessGridProps) => {
  // Ensure we have items to display
  const displayItems = items || [];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {displayItems.map((item, index) => (
        <QuickAccessItem
          key={item.id || index}
          title={item.title}
          description={item.description}
          icon={item.icon}
          link={item.link}
          color={item.color}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};

export default QuickAccessGrid;
