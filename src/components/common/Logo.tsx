
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  linkClassName?: string;
  variant?: 'default' | 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ 
  className,
  linkClassName,
  variant = 'default'
}) => {
  const getTextColors = () => {
    switch (variant) {
      case 'light':
        return ['text-indigo-300', 'text-white'];
      case 'dark':
        return ['text-indigo-600', 'text-gray-900'];
      default:
        return ['text-indigo-500', 'text-inherit'];
    }
  };

  const [primaryColor, secondaryColor] = getTextColors();

  return (
    <div className={cn("font-bold text-xl flex items-center", className)}>
      <Link to="/" className={cn("flex items-center", linkClassName)} aria-label="WealthHorizon Home">
        <span className={primaryColor}>Wealth</span>
        <span className={secondaryColor}>Horizon</span>
      </Link>
    </div>
  );
};

export default Logo;
