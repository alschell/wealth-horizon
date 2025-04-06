
import React from "react";
import QuickAccessItem from "./QuickAccessItem";
import { QuickAccessGridProps, QuickLinkItem, QuickAccessItem as QuickAccessItemType } from "./types";

const QuickAccessGrid = ({ links, items }: QuickAccessGridProps) => {
  // Use either links or items based on what's provided
  const displayItems = links || items || [];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {displayItems.map((item, index) => (
        <QuickAccessItem
          key={index}
          title={item.title}
          description={item.description}
          icon={item.icon}
          link={item.link}
          color={item.color}
        />
      ))}
    </div>
  );
};

export default QuickAccessGrid;
