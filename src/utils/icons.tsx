
import React from 'react';
import * as LucideIcons from 'lucide-react';

// Type for icon names
export type IconName = keyof typeof LucideIcons;

interface IconProps {
  name: IconName;
  size?: number | string;
  color?: string;
  className?: string;
  [key: string]: any;  // Allow other props to be passed
}

/**
 * Icon component that safely renders Lucide icons with fallback
 */
export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color, 
  className = '', 
  ...props 
}) => {
  // Check if the icon exists in the Lucide library
  const IconComponent = LucideIcons[name] as React.FC<any>;
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    
    // Fallback to a placeholder
    return (
      <div 
        className={`flex items-center justify-center w-${size} h-${size} bg-gray-200 rounded ${className}`}
        {...props}
      >
        <span className="text-xs text-gray-500">?</span>
      </div>
    );
  }
  
  // Render the actual icon if found
  return <IconComponent size={size} color={color} className={className} {...props} />;
};

/**
 * Utility function to safely get an icon component
 * Returns undefined if icon doesn't exist
 */
export const getIcon = (name: string): React.FC<any> | undefined => {
  return (LucideIcons as any)[name];
};

/**
 * Maps commonly misnamed icons to their correct names
 */
export const iconNameMap: Record<string, IconName> = {
  // Add mappings for commonly misnamed icons
  "User": "Users", // User → Users
  "Filter": "FilterX", // Filter → FilterX
  "BarChart": "BarChart3", // BarChart → BarChart3
};

/**
 * Gets the correct icon name from the map or returns the original
 */
export const getCorrectIconName = (name: string): IconName => {
  return (iconNameMap[name] as IconName) || (name as IconName);
};

// Re-export all Lucide icons for convenience
export const {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  Bell,
  Brain,
  Briefcase,
  Calendar,
  Check,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Copy,
  CreditCard,
  Edit,
  FileSpreadsheet,
  FileText,
  Lightbulb,
  LineChart,
  Lock,
  Maximize2,
  MessageCircle,
  MinusCircle,
  PieChart,
  Plus,
  PlusCircle,
  Send,
  ShieldCheck,
  Terminal,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
  History
} = LucideIcons;
