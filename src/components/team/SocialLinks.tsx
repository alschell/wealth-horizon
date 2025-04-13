
import React from "react";
import { Linkedin, Twitter, Github } from "lucide-react";

interface SocialLinksProps {
  links: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    [key: string]: string | undefined;
  };
  size?: number;
  className?: string;
  "aria-label"?: string;
}

/**
 * A component to display social media links for team members
 * Features improved accessibility and hover effects
 */
const SocialLinks: React.FC<SocialLinksProps> = ({ 
  links, 
  size = 18,
  className = "",
  "aria-label": ariaLabel
}) => {
  // Filter out undefined links
  const availableLinks = Object.entries(links).filter(
    ([_, url]) => url && url.trim() !== ""
  );
  
  // If no links are available, don't render anything
  if (availableLinks.length === 0) {
    return null;
  }
  
  return (
    <div 
      className={`flex items-center gap-3 ${className}`}
      role="list"
      aria-label={ariaLabel || "Social media links"}
    >
      {links.linkedin && (
        <a 
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-600 transition-colors"
          aria-label="LinkedIn profile"
          role="listitem"
        >
          <Linkedin size={size} />
          <span className="sr-only">LinkedIn</span>
        </a>
      )}
      
      {links.twitter && (
        <a 
          href={links.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-sky-500 transition-colors"
          aria-label="Twitter profile"
          role="listitem"
        >
          <Twitter size={size} />
          <span className="sr-only">Twitter</span>
        </a>
      )}
      
      {links.github && (
        <a 
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-800 transition-colors"
          aria-label="GitHub profile"
          role="listitem"
        >
          <Github size={size} />
          <span className="sr-only">GitHub</span>
        </a>
      )}
    </div>
  );
};

export default React.memo(SocialLinks);
