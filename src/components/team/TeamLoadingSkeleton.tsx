
import React from 'react';
import { motion } from 'framer-motion';

interface TeamLoadingSkeletonProps {
  /**
   * Number of skeleton items to display
   */
  count?: number;
  /**
   * Whether this is for the leadership section (larger cards)
   */
  isLeadership?: boolean;
}

/**
 * Loading skeleton component for team sections
 * Uses motion animations for a smoother loading experience
 */
const TeamLoadingSkeleton: React.FC<TeamLoadingSkeletonProps> = ({
  count = 3,
  isLeadership = false
}) => {
  return (
    <div 
      className={`grid gap-6 ${
        isLeadership 
          ? 'grid-cols-1 md:grid-cols-2' 
          : 'grid-cols-1 md:grid-cols-3'
      }`}
      aria-busy="true"
      aria-label={`Loading ${isLeadership ? 'leadership' : 'advisory'} team data`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={`skeleton-${index}`}
          className={`bg-white p-6 rounded-lg border border-gray-100 ${
            isLeadership ? 'flex flex-col md:flex-row' : 'flex flex-col'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          {/* Profile image skeleton */}
          <div className={`${isLeadership ? 'md:w-1/3 mb-4 md:mb-0 md:mr-6' : 'flex justify-center mb-4'}`}>
            <div className={`${
              isLeadership 
                ? 'h-48 w-48 mx-auto md:mx-0' 
                : 'w-32 h-32'
              } rounded-full bg-gray-200 animate-pulse`} 
            />
          </div>
          
          {/* Content skeleton */}
          <div className={isLeadership ? 'md:w-2/3' : 'flex flex-col items-center'}>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3 animate-pulse" />
            {isLeadership && <div className="h-4 bg-gray-200 rounded w-1/3 mb-3 animate-pulse" />}
            <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default React.memo(TeamLoadingSkeleton);
