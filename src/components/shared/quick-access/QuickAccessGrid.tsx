
import React from "react";
import { QuickLinkItem } from "./types";
import QuickAccessItemComponent from "./QuickAccessItem";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FolderX } from "lucide-react";

/**
 * QuickAccessGrid Component
 * 
 * Renders a grid of quick access items for the user to navigate to
 * common areas of the application.
 * 
 * @param {Object} props - Component props
 * @param {QuickLinkItem[]} props.items - Array of quick access items to display
 * @param {string} [props.className] - Optional additional CSS classes
 * @param {boolean} [props.loading] - Whether the items are loading
 */
interface QuickAccessGridProps {
  items: QuickLinkItem[];
  className?: string;
  loading?: boolean;
}

const QuickAccessGrid: React.FC<QuickAccessGridProps> = ({ 
  items = [], 
  className,
  loading = false
}) => {
  // If loading, show skeleton UI
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3" aria-label="Loading quick access links">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse flex flex-col items-center p-3 rounded-lg bg-accent/50">
            <div className="mb-2 p-2 rounded-full bg-primary/5 w-8 h-8"></div>
            <div className="h-4 bg-primary/5 rounded w-20 mb-2"></div>
            <div className="h-3 bg-primary/5 rounded w-24"></div>
          </div>
        ))}
      </div>
    );
  }

  // If no items, show empty state
  if (!items || items.length === 0) {
    return (
      <Alert variant="default" className="bg-accent/50 border-accent">
        <FolderX className="h-4 w-4" />
        <AlertDescription>
          No quick access items selected. Click the customize button to add items.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ul 
      role="list" 
      className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${className || ''}`}
      aria-label="Quick access links"
    >
      {items.map((item) => (
        <li key={item.id}>
          <QuickAccessItemComponent item={item} />
        </li>
      ))}
    </ul>
  );
};

export default React.memo(QuickAccessGrid);
