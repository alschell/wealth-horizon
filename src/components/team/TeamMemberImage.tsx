
import React, { useState, useEffect, memo, useCallback } from 'react';
import { User } from 'lucide-react';
import { announceToScreenReader } from '@/utils/a11y';
import { useToast } from '@/hooks/use-toast';

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
}

/**
 * Component for displaying team member profile images with fallback
 * Handles image loading errors gracefully by showing a placeholder
 * Includes accessibility features for screen readers
 * 
 * @example
 * ```tsx
 * <TeamMemberImage 
 *   image="/path/to/profile.jpg" 
 *   name="John Doe" 
 *   className="rounded-full"
 * />
 * ```
 */
const TeamMemberImage: React.FC<TeamMemberImageProps> = ({ 
  image, 
  name, 
  className = "",
  fallbackIconSize = 40,
  onLoad: externalOnLoad,
  onError: externalOnError
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Handle image loading errors
  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
    
    // Announce to screen reader
    announceToScreenReader(`Image for ${name} failed to load, showing placeholder instead`);
    
    // Call external handler if provided
    if (externalOnError) {
      externalOnError();
    }
    
    // Log error
    console.error(`Failed to load image for ${name}: ${image}`);
  }, [name, image, externalOnError]);
  
  // Handle image load success
  const handleLoad = useCallback(() => {
    setIsLoading(false);
    
    // Call external handler if provided
    if (externalOnLoad) {
      externalOnLoad();
    }
  }, [externalOnLoad]);

  // Effect to reset loading state when image URL changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    
    // Preload image
    const img = new Image();
    img.src = image;
    
    img.onload = handleLoad;
    img.onerror = handleError;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [image, handleLoad, handleError]);
  
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
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onError={handleError}
          onLoad={handleLoad}
          loading="lazy"
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
