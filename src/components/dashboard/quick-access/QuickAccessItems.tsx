
import React from "react";
import QuickAccessItemCard from "./QuickAccessItemCard";
import { ActionItem } from "./actionItemsData";

interface QuickAccessItemsProps {
  items: ActionItem[];
}

const QuickAccessItems = ({ items }: QuickAccessItemsProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {items.map((item) => (
        <QuickAccessItemCard 
          key={item.id}
          id={item.id}
          icon={item.icon}
          label={item.label}
          path={item.path}
          description={item.description}
          color={item.color}
        />
      ))}
    </div>
  );
};

export default QuickAccessItems;
