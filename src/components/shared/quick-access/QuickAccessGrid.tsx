
import React from "react";
import { QuickLinkItem } from "./types";
import { cn } from "@/lib/utils";

interface QuickAccessGridProps {
  items: QuickLinkItem[];
}

/**
 * Grid layout for quick access items
 * Displays quick access items in a responsive grid
 */
const QuickAccessGrid: React.FC<QuickAccessGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className={cn(
            "flex flex-col items-center justify-center p-3 rounded-lg",
            "bg-card hover:bg-accent/50 transition-colors duration-200",
            "border border-border hover:border-border/80",
            "text-center"
          )}
        >
          <div className="h-8 w-8 mb-2 text-primary flex items-center justify-center">
            {item.icon}
          </div>
          <span className="text-sm font-medium">{item.title}</span>
        </a>
      ))}
    </div>
  );
};

export default QuickAccessGrid;
