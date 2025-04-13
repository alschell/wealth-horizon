
import React, { useState, useEffect, memo, useCallback } from 'react';
import { User } from 'lucide-react';
import { announceToScreenReader } from '@/utils/a11y';
import { useToast } from '@/hooks/use-toast';
import { useOptimizedImageLoading } from './hooks/useOptimizedImageLoading';

interface TeamMemberImageProps {
  /** Image path or URL */
  image: string;
  /** Name of the team member for alt text */
  name: string;
  /** Optional CSS class name for additional styling */
  className?: string;
  /** Optional size for fallback icon */
  fallbackIconSize?: number;
  /** Optional handler for image load success */
  onLoad?: () => void;
  /** Optional handler for image load error */
  onError?: () => void;
  /** Optional priority level for loading (1 highest, 5 lowest) */
  priority?: 1 | 2 | 3 | 4 | 5;
}

/**
 * Component for displaying team member profile images with fallback
 * Enhanced with optimized image loading, error handling and accessibility
 * 
 * @example
 * ```tsx
 * <TeamMemberImage 
 *   image="/path/to/profile.jpg" 
 *   name="John Doe" 
 *   className="rounded-full"
 *   priority={2}
 * />
 * ```
 */
const TeamMemberImage: React.FC<TeamMemberImageProps> = ({ 
  image, 
  name, 
  className = "",
  fallbackIconSize = 40,
  onLoad: externalOnLoad,
  onError: externalOnError,
  priority = 3
}) => {
  // Use our optimized image loading hook
  const { 
    isLoading, 
    hasError, 
    imageProps 
  } = useOptimizedImageLoading(image, `${name} profile photo`, {
    lazy: true,
    priority,
    onSuccess: externalOnLoad,
    onError: () => {
      // Announce to screen reader
      announceToScreenReader(`Image for ${name} failed to load, showing placeholder instead`);
      
      // Call external handler if provided
      if (externalOnError) {
        externalOnError();
      }
      
      // Log error
      console.error(`Failed to load image for ${name}: ${image}`);
    }
  });
  
  return (
    <div 
      className={`w-full h-full flex items-center justify-center overflow-hidden ${className}`}
      aria-busy={isLoading}
      data-testid="team-member-image"
    >
      {!hasError ? (
        <img
          src={image}
          alt={`${name} profile photo`}
          {...imageProps}
        />
      ) : (
        <div 
          className="w-full h-full flex items-center justify-center bg-gray-100"
          role="img"
          aria-label={`Placeholder for ${name}`}
        >
          <User 
            size={fallbackIconSize} 
            className="text-gray-400" 
            aria-hidden="true"
          />
        </div>
      )}
      
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="animate-pulse w-3/4 h-3/4 rounded-full bg-gray-200" />
          <span className="sr-only">Loading image for {name}</span>
        </div>
      )}
    </div>
  );
};

/**
 * Memoized version of TeamMemberImage component to prevent unnecessary re-renders
 */
export default memo(TeamMemberImage);
