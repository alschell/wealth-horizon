
import React from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface TeamEmptyStateProps {
  searchTerm: string;
  entityName: string;
  onResetFilter: () => void;
  className?: string;
}

/**
 * Displays an empty state when no team members or advisors match the search criteria
 */
const TeamEmptyState: React.FC<TeamEmptyStateProps> = ({
  searchTerm,
  entityName,
  onResetFilter,
  className = ''
}) => {
  const showReset = searchTerm.trim().length > 0;
  
  return (
    <motion.div 
      className={`py-8 text-center ${className}`} 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      aria-live="polite"
      role="status"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <Search className="h-8 w-8 text-gray-400" aria-hidden="true" />
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No {entityName} found
      </h3>
      
      {showReset ? (
        <div className="space-y-3">
          <p className="text-gray-500 max-w-md mx-auto">
            We couldn't find any {entityName} matching "{searchTerm}".
            Try adjusting your search terms or clear the filter.
          </p>
          
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={onResetFilter}
            size="sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear search
          </Button>
        </div>
      ) : (
        <p className="text-gray-500 max-w-md mx-auto">
          There are no {entityName} to display at this time.
        </p>
      )}
    </motion.div>
  );
};

export default TeamEmptyState;
