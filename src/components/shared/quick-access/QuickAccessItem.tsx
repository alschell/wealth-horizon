
import React from "react";
import { QuickLinkItem } from "./types";

/**
 * QuickAccessItem Component
 * 
 * Renders a single quick access item link
 * 
 * @param {Object} props - Component props
 * @param {QuickLinkItem} props.item - The quick access item to display
 */
interface QuickAccessItemProps {
  item: QuickLinkItem;
}

const QuickAccessItem: React.FC<QuickAccessItemProps> = ({ item }) => {
  return (
    <a
      href={item.href}
      className="flex flex-col items-center p-3 rounded-lg bg-card hover:bg-accent transition-colors text-center"
      aria-label={`${item.title}: ${item.description}`}
    >
      <div className="mb-2 p-2 rounded-full bg-primary/10 text-primary">
        {item.icon}
      </div>
      <span className="text-sm font-medium">{item.title}</span>
      <span className="text-xs text-muted-foreground mt-1 line-clamp-2">
        {item.description}
      </span>
    </a>
  );
};

export default React.memo(QuickAccessItem);
