
import React, { memo } from 'react';
import { cn } from "@/lib/utils";
import { Image } from "@/components/ui/image";
import { User } from "lucide-react";
import { trackImagePerformance } from './utils/performanceTracking';

export interface TeamMemberImageProps {
  image: string;
  name: string;
  priority?: number;
  className?: string;
  fallbackIconSize?: number;
}

/**
 * Renders a team member's profile image with optimized loading and fallback
 */
const TeamMemberImage: React.FC<TeamMemberImageProps> = ({
  image,
  name,
  priority = 0,
  className,
  fallbackIconSize = 40
}) => {
  // Track loading performance for high-priority images
  const handleLoad = () => {
    if (priority <= 2) {
      trackImagePerformance('teamMemberImage', image, priority);
    }
  };

  const handleError = () => {
    console.warn(`Failed to load image for ${name}`);
  };

  return (
    <div 
      className={cn("relative overflow-hidden rounded-md", className)} 
      aria-label={`${name} profile image`}
    >
      <Image
        src={image}
        alt={`${name} profile photo`}
        width={300}
        height={300}
        className="object-cover w-full h-full"
        priority={priority < 4} // Only prioritize the first few images
        onLoadingComplete={handleLoad}
        onError={handleError}
        fallbackSrc="/assets/dashboard-fallback.png"
      />
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(TeamMemberImage);
