
import React from 'react';
import * as LucideIcons from 'lucide-react';

// Define type for icon name to help with TypeScript checking
export type IconName = keyof typeof LucideIcons;

interface IconProps {
  iconName: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
  onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({ 
  iconName, 
  className, 
  size = 24,
  strokeWidth = 2,
  onClick
}) => {
  // Type guard to check if the icon name exists in Lucide icons
  const isLucideIcon = (name: string): name is IconName => {
    return name in LucideIcons;
  };

  // Default to a placeholder if the icon doesn't exist
  if (!isLucideIcon(iconName)) {
    console.warn(`Icon "${iconName}" not found in Lucide icons`);
    return <span className={className}>□</span>;
  }

  const LucideIcon = LucideIcons[iconName];
  
  return (
    <LucideIcon 
      className={className} 
      size={size} 
      strokeWidth={strokeWidth}
      onClick={onClick}
    />
  );
};
