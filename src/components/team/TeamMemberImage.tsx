
import React from "react";
import { useImageErrorHandler } from "@/hooks/useImageErrorHandler";

interface TeamMemberImageProps {
  image: string;
  name: string;
  className?: string;
  fallbackImage?: string;
}

/**
 * Reusable component for team member images with fallback handling
 */
const TeamMemberImage: React.FC<TeamMemberImageProps> = ({ 
  image, 
  name, 
  className = "h-full w-full object-cover",
  fallbackImage = '/assets/team/profile-placeholder.jpg'
}) => {
  const handleImageError = useImageErrorHandler({
    fallbackImage
  });

  return (
    <img 
      src={image} 
      alt={name} 
      className={className}
      onError={handleImageError}
    />
  );
};

export default TeamMemberImage;
