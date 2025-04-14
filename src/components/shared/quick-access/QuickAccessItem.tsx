
import React from "react";
import { QuickLinkItem } from "./types";
import { cn } from "@/lib/utils";

/**
 * QuickAccessItem Component
 * 
 * Renders a single quick access item link with responsive design and accessibility features
 * 
 * @param {Object} props - Component props
 * @param {QuickLinkItem} props.item - The quick access item to display
 * @param {string} [props.className] - Optional additional CSS classes
 */
interface QuickAccessItemProps {
  item: QuickLinkItem;
  className?: string;
}

const QuickAccessItem: React.FC<QuickAccessItemProps> = ({ 
  item,
  className
}) => {
  // Handle keyboard navigation for better accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.location.href = item.href;
    }
  };

  return (
    <a
      href={item.href}
      className={cn(
        "flex flex-col items-center p-3 rounded-lg bg-card hover:bg-accent focus:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors text-center",
        className
      )}
      aria-label={`${item.title}: ${item.description}`}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
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
