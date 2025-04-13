
import React, { useState, useEffect, memo } from 'react';
import { User } from 'lucide-react';
import { announceToScreenReader } from '@/utils/a11y';

interface TeamMemberImageProps {
  /** Image path or URL */
  image: string;
  /** Name of the team member for alt text */
  name: string;
  /** Optional CSS class name for additional styling */
  className?: string;
  /** Optional size for fallback icon */
  fallbackIconSize?: number;
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
  fallbackIconSize = 40
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Handle image loading errors
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    announceToScreenReader(`Image for ${name} failed to load, showing placeholder instead`);
  };
  
  // Handle image load success
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Effect to reset loading state when image URL changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [image]);
  
  return (
    <div 
      className={`w-full h-full flex items-center justify-center overflow-hidden ${className}`}
      aria-busy={isLoading}
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
