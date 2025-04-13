
import React, { useState, memo } from 'react';
import { User } from 'lucide-react';

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
  
  // Handle image loading errors
  const handleError = () => {
    setHasError(true);
  };
  
  return (
    <div className={`w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
      {!hasError ? (
        <img
          src={image}
          alt={`${name} profile`}
          className="w-full h-full object-cover"
          onError={handleError}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <User 
            size={fallbackIconSize} 
            className="text-gray-400" 
            aria-hidden="true"
          />
          <span className="sr-only">{name}</span>
        </div>
      )}
    </div>
  );
};

/**
 * Memoized version of TeamMemberImage component to prevent unnecessary re-renders
 * Only re-renders when props change
 */
export default memo(TeamMemberImage);
