
import React from 'react';
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TeamMemberImageProps {
  image: string;
  name: string;
  priority?: number;
  className?: string;
}

/**
 * Renders a team member's profile image with optimized loading and fallback
 */
const TeamMemberImage: React.FC<TeamMemberImageProps> = ({
  image,
  name,
  priority = 0,
  className
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
        loading={priority < 4 ? "eager" : "lazy"}
      />
    </div>
  );
};

export default TeamMemberImage;
