
import React, { memo } from 'react';
import { Twitter, Github, Linkedin } from 'lucide-react';
import { SocialLinks as SocialLinksType } from './teamData';

interface SocialLinksProps {
  /** Social media links object containing URLs */
  links: SocialLinksType;
  /** Optional CSS class name for additional styling */
  className?: string;
  /** Optional size for the social media icons (in pixels) */
  iconSize?: number;
  /** Optional color for the icons in hover state */
  hoverColor?: string;
}

/**
 * A reusable component for rendering social media links with consistent styling
 * Provides accessible links to social media profiles with appropriate ARIA labels
 * Memoized to prevent unnecessary re-renders
 * 
 * @example
 * ```tsx
 * <SocialLinks 
 *   links={{
 *     twitter: "https://twitter.com/username",
 *     linkedin: "https://linkedin.com/in/username",
 *     github: "https://github.com/username"
 *   }}
 *   iconSize={18}
 *   className="mt-2"
 * />
 * ```
 */
const SocialLinks: React.FC<SocialLinksProps> = ({ 
  links, 
  className = "", 
  iconSize = 16,
  hoverColor = "text-indigo-600" 
}) => {
  if (!links.twitter && !links.github && !links.linkedin) {
    return null;
  }
  
  return (
    <div className={`flex space-x-3 ${className}`} aria-label="Social media links">
      {links.twitter && (
        <a 
          href={links.twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={`Twitter profile`}
          className={`text-gray-500 hover:${hoverColor} transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full p-1`}
        >
          <Twitter size={iconSize} aria-hidden="true" />
        </a>
      )}
      
      {links.github && (
        <a 
          href={links.github} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={`GitHub profile`}
          className={`text-gray-500 hover:${hoverColor} transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full p-1`}
        >
          <Github size={iconSize} aria-hidden="true" />
        </a>
      )}
      
      {links.linkedin && (
        <a 
          href={links.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label={`LinkedIn profile`}
          className={`text-gray-500 hover:${hoverColor} transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full p-1`}
        >
          <Linkedin size={iconSize} aria-hidden="true" />
        </a>
      )}
    </div>
  );
};

/**
 * Memoized version of SocialLinks component to prevent unnecessary re-renders
 * Only re-renders when props change
 */
export default memo(SocialLinks);
