
import React, { useState, useEffect, memo, useCallback } from 'react';
import { User } from 'lucide-react';
import { announceToScreenReader } from '@/utils/a11y';
import { useToast } from '@/hooks/use-toast';
import { useOptimizedImageLoading } from './hooks/useOptimizedImageLoading';
import { TeamImageError } from './errors/TeamErrors';
import { trackImagePerformance } from './utils/performanceTracking';

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
  /** Optional flag to enable lazy loading */
  lazy?: boolean;
  /** Optional custom placeholder component */
  placeholder?: React.ReactNode;
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
  priority = 3,
  lazy = true,
  placeholder
}) => {
  const { toast } = useToast();
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;
  const canRetry = retryCount < maxRetries;
  
  // Use our optimized image loading hook
  const { 
    isLoading, 
    hasError, 
    imageProps,
    loadImage,
    errorDetails
  } = useOptimizedImageLoading(image, `${name} profile photo`, {
    lazy,
    priority,
    onSuccess: () => {
      // Track successful load performance
      trackImagePerformance('team-member-image-success', image, priority);
      
      // Reset retry count on success
      if (retryCount > 0) {
        setRetryCount(0);
      }
      
      // Call external handler if provided
      if (externalOnLoad) {
        externalOnLoad();
      }
    },
    onError: (error) => {
      // Announce to screen reader
      announceToScreenReader(`Image for ${name} failed to load, showing placeholder instead`);
      
      // Transform error
      const enhancedError = new TeamImageError(
        `Failed to load team member image for ${name}`,
        { name, url: image, cause: error }
      );
      
      // Only show toast for high priority images
      if (priority <= 2) {
        toast({
          title: "Image loading issue",
          description: `Unable to load image for ${name}. Using placeholder.`,
          variant: "destructive",
        });
      }
      
      // Call external handler if provided
      if (externalOnError) {
        externalOnError();
      }
      
      // Log detailed error for debugging
      console.error(enhancedError.message, enhancedError);
    }
  });
  
  // Handle retry logic
  const handleRetry = useCallback(() => {
    if (canRetry) {
      setRetryCount(prev => prev + 1);
      loadImage();
      
      // Announce retry to screen reader
      announceToScreenReader(`Retrying to load image for ${name}`);
    }
  }, [canRetry, loadImage, name]);
  
  // Render accessible error state when retries are exhausted
  const renderError = () => (
    <div 
      className="w-full h-full flex flex-col items-center justify-center bg-gray-100"
      role="img"
      aria-label={`Placeholder for ${name}`}
    >
      <User 
        size={fallbackIconSize} 
        className="text-gray-400" 
        aria-hidden="true"
      />
      
      {canRetry && (
        <button
          onClick={handleRetry}
          className="mt-2 text-xs text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded px-2 py-1"
          aria-label={`Retry loading image for ${name}`}
        >
          Retry
        </button>
      )}
    </div>
  );
  
  // Render custom or default loading state
  const renderLoading = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
      {placeholder || (
        <div className="animate-pulse w-3/4 h-3/4 rounded-full bg-gray-200" />
      )}
      <span className="sr-only">Loading image for {name}</span>
    </div>
  );
  
  return (
    <div 
      className={`w-full h-full flex items-center justify-center overflow-hidden relative ${className}`}
      aria-busy={isLoading}
      data-testid="team-member-image"
      data-error={hasError ? "true" : "false"}
      data-priority={priority}
    >
      {!hasError ? (
        <img
          src={image}
          alt={`${name} profile photo`}
          {...imageProps}
          onError={(e) => {
            imageProps.onError();
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : renderError()}
      
      {isLoading && !hasError && renderLoading()}
    </div>
  );
};

/**
 * Memoized version of TeamMemberImage component to prevent unnecessary re-renders
 */
export default memo(TeamMemberImage);
