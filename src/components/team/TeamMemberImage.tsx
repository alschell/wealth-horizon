
import React, { memo } from "react";
import { useImageErrorHandler } from "@/hooks/useImageErrorHandler";

interface TeamMemberImageProps {
  image: string;
  name: string;
  className?: string;
  fallbackImage?: string;
}

/**
 * Reusable component for team member images with fallback handling
 * Memoized to prevent unnecessary re-renders
 */
const TeamMemberImage: React.FC<TeamMemberImageProps> = ({ 
  image, 
  name, 
  className = "h-full w-full object-cover",
  fallbackImage = '/assets/team/profile-placeholder.jpg'
}) => {
  const handleImageError = useImageErrorHandler({
    fallbackImage,
    logErrors: true
  });

  return (
    <img 
      src={image} 
      alt={`${name} - Team Member`}
      className={className}
      onError={handleImageError}
      loading="lazy"
    />
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(TeamMemberImage);
