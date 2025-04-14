
import React from "react";

/**
 * QuickAccessGrid Component
 * 
 * Renders a grid of quick access items for the user to navigate to
 * common areas of the application.
 * 
 * @param {Object} props - Component props
 * @param {QuickLinkItem[]} props.items - Array of quick access items to display
 */
interface QuickAccessGridProps {
  items: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
  }[];
}

const QuickAccessGrid: React.FC<QuickAccessGridProps> = ({ items = [] }) => {
  // If no items, return an empty grid
  if (!items || items.length === 0) {
    return <ul role="list" className="grid grid-cols-2 md:grid-cols-4 gap-3" aria-label="Quick access links (empty)" />;
  }

  return (
    <ul 
      role="list" 
      className="grid grid-cols-2 md:grid-cols-4 gap-3"
      aria-label="Quick access links"
    >
      {items.map((item) => (
        <li key={item.id}>
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
        </li>
      ))}
    </ul>
  );
};

export default React.memo(QuickAccessGrid);
