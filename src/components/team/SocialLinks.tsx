
import React, { memo } from 'react';
import { Linkedin, Twitter, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SocialLink {
  url: string;
  icon: React.ElementType;
  label: string;
}

interface SocialLinksProps {
  links: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    [key: string]: string | undefined;
  };
  className?: string;
  iconSize?: number;
  'aria-label'?: string;
}

/**
 * Component to render social media links with proper accessibility
 */
const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
  className,
  iconSize = 18,
  'aria-label': ariaLabel = 'Social media profiles'
}) => {
  // Filter out undefined links and create the link objects
  const socialLinks: SocialLink[] = [
    links.linkedin && { url: links.linkedin, icon: Linkedin, label: 'LinkedIn profile' },
    links.twitter && { url: links.twitter, icon: Twitter, label: 'Twitter profile' },
    links.github && { url: links.github, icon: Github, label: 'GitHub profile' }
  ].filter(Boolean) as SocialLink[];

  // If no links, don't render anything
  if (socialLinks.length === 0) return null;

  return (
    <div 
      className={cn('flex space-x-3', className)}
      aria-label={ariaLabel}
    >
      {socialLinks.map((link) => (
        <a 
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full"
          aria-label={link.label}
        >
          <link.icon size={iconSize} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(SocialLinks);
