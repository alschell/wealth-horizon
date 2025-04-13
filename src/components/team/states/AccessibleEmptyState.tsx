
import React from "react";
import { motion } from "framer-motion";
import { SearchX, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateAccessibilityProps } from "../utils/accessibilityUtils";

interface AccessibleEmptyStateProps {
  /** The search term that produced no results */
  searchTerm: string;
  /** The name of the entity being searched (e.g., "team members", "advisors") */
  entityName: string;
  /** Function to reset the search filter */
  onResetFilter: () => void;
  /** Optional title for the empty state */
  title?: string;
  /** Optional description for the empty state */
  description?: string;
  /** Optional aria label for the component */
  ariaLabel?: string;
}

/**
 * Enhanced empty state component with improved accessibility
 * Displayed when search returns no results
 */
const AccessibleEmptyState: React.FC<AccessibleEmptyStateProps> = ({
  searchTerm,
  entityName,
  onResetFilter,
  title,
  description,
  ariaLabel
}) => {
  // Default title and description if not provided
  const defaultTitle = `No ${entityName} found`;
  const defaultDescription = searchTerm 
    ? `Your search for "${searchTerm}" did not match any ${entityName}.` 
    : `No ${entityName} are available at this time.`;
  
  // Get accessibility props
  const emptyStateProps = generateAccessibilityProps('section', {
    label: ariaLabel || `No ${entityName} found for search ${searchTerm}`
  });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };
  
  return (
    <motion.div
      role="alert"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-12 px-4 text-center max-w-md mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      {...emptyStateProps}
    >
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <SearchX className="h-10 w-10 text-gray-400" aria-hidden="true" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {title || defaultTitle}
      </h3>
      
      <p className="text-gray-600 mb-6">
        {description || defaultDescription}
      </p>
      
      {searchTerm && (
        <Button
          onClick={onResetFilter}
          className="flex items-center space-x-2"
          aria-label={`Clear search and show all ${entityName}`}
        >
          <RefreshCw className="h-4 w-4" />
          <span>Clear Search</span>
        </Button>
      )}
    </motion.div>
  );
};

export default AccessibleEmptyState;
