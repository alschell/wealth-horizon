
import React from 'react';
import * as LucideIcons from 'lucide-react';

// Define type for icon name to help with TypeScript checking
export type IconName = keyof typeof LucideIcons;

interface IconProps {
  iconName: IconName;
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
  // Get the icon from Lucide icons
  const LucideIcon = LucideIcons[iconName];
  
  if (!LucideIcon) {
    console.warn(`Icon "${iconName}" not found in Lucide icons`);
    return <span className={className}>□</span>;
  }
  
  return (
    <LucideIcon 
      className={className} 
      size={size} 
      strokeWidth={strokeWidth}
      onClick={onClick}
    />
  );
};

// Re-export all Lucide icons for direct use
export const { 
  // Common icons used in the application
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpDown,
  ArrowUpRight,
  BarChart,
  BarChart3,
  Bell,
  Brain,
  Calendar,
  Check,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  CreditCard,
  DollarSign,
  FileSpreadsheet,
  FileText,
  Filter,
  Heart,
  History,
  Info,
  Layers,
  LayoutDashboard, 
  Lightbulb,
  LineChart,
  Lock,
  Menu,
  MinusCircle,
  PieChart,
  Plus,
  PlusCircle,
  Reply,
  Search,
  Send,
  ShieldCheck,
  Target,
  Terminal,
  ThumbsUp,
  TrendingUp,
  User,
  Users,
  Wallet,
  X
} = LucideIcons;
