
import React from "react";
import QuickAccessItem from "./QuickAccessItem";
import { QuickLinkItem } from "./types";

interface QuickAccessGridProps {
  links: QuickLinkItem[];
}

const QuickAccessGrid = ({ links }: QuickAccessGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {links.map((item, index) => (
        <QuickAccessItem
          key={index}
          title={item.title}
          description={item.description}
          icon={item.icon}
          link={item.link}
        />
      ))}
    </div>
  );
};

export default QuickAccessGrid;
