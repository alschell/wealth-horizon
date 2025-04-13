
import React, { memo } from 'react';
import { Twitter, Github, Linkedin } from 'lucide-react';
import { SocialLinks as SocialLinksType } from './teamData';

interface SocialLinksProps {
  links: SocialLinksType;
  className?: string;
}

/**
 * A reusable component for rendering social media links
 * Memoized to prevent unnecessary re-renders
 */
const SocialLinks: React.FC<SocialLinksProps> = ({ links, className = "" }) => {
  const iconSize = 16;
  
  return (
    <div className={`flex space-x-3 ${className}`}>
      {links.twitter && (
        <a 
          href={links.twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Twitter Profile"
          className="text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <Twitter size={iconSize} />
        </a>
      )}
      
      {links.github && (
        <a 
          href={links.github} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <Github size={iconSize} />
        </a>
      )}
      
      {links.linkedin && (
        <a 
          href={links.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          className="text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <Linkedin size={iconSize} />
        </a>
      )}
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(SocialLinks);
