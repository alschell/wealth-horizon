
import React from 'react';
import { cn } from "@/lib/utils";
import { Image } from "@/components/ui/image";
import { User } from "lucide-react";

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
  return (
    <div className={cn("relative overflow-hidden rounded-md", className)}>
      <Image
        src={image}
        alt={`${name} profile photo`}
        width={300}
        height={300}
        className="object-cover w-full h-full"
        priority={priority < 4} // Only prioritize the first few images
        onError={() => {
          console.warn(`Failed to load image for ${name}`);
        }}
      />
    </div>
  );
};

export default TeamMemberImage;
