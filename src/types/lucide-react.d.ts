
// Type definitions for lucide-react icons

import React from 'react';

declare module 'lucide-react' {
  export interface LucideProps extends React.SVGAttributes<SVGElement> {
    color?: string;
    size?: string | number;
    strokeWidth?: string | number;
    absoluteStrokeWidth?: boolean;
  }

  export type LucideIcon = React.FC<LucideProps>;

  // Individually exported icons
  export const Activity: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const ArrowDown: LucideIcon;
  export const ArrowDownCircle: LucideIcon;
  export const ArrowDownLeft: LucideIcon;
  export const ArrowDownRight: LucideIcon;
  export const ArrowDownToLine: LucideIcon;
  export const ArrowDownUp: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const ArrowUp: LucideIcon;
  export const ArrowUpCircle: LucideIcon;
  export const ArrowUpDown: LucideIcon;
  export const ArrowUpFromLine: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const BarChart: LucideIcon;
  export const BarChart3: LucideIcon;
  export const BarChartHorizontal: LucideIcon;
  export const Bell: LucideIcon;
  export const BellRing: LucideIcon;
  export const Brain: LucideIcon;
  export const Briefcase: LucideIcon;
  export const Building: LucideIcon;
  export const Calendar: LucideIcon;
  export const CalendarClock: LucideIcon;
  export const CalendarDays: LucideIcon;
  export const Check: LucideIcon;
  export const CheckCircle: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const CircleDollarSign: LucideIcon;
  export const Clock: LucideIcon;
  export const Cloud: LucideIcon;
  export const Copy: LucideIcon;
  export const CreditCard: LucideIcon;
  export const DollarSign: LucideIcon;
  export const Edit: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const Eye: LucideIcon;
  export const EyeOff: LucideIcon;
  export const File: LucideIcon;
  export const FileSpreadsheet: LucideIcon;
  export const FileText: LucideIcon;
  export const Filter: LucideIcon;
  export const Globe: LucideIcon;
  export const GripVertical: LucideIcon;
  export const Heart: LucideIcon;
  export const HelpCircle: LucideIcon;
  export const History: LucideIcon;
  export const Home: LucideIcon;
  export const Info: LucideIcon;
  export const Layers: LucideIcon;
  export const LayoutDashboard: LucideIcon;
  export const Lightbulb: LucideIcon;
  export const LineChart: LucideIcon;
  export const Lock: LucideIcon;
  export const Loader2: LucideIcon;
  export const Maximize: LucideIcon;
  export const Maximize2: LucideIcon;
  export const MessageCircle: LucideIcon;
  export const MinusCircle: LucideIcon;
  export const Moon: LucideIcon;
  export const PieChart: LucideIcon;
  export const Plus: LucideIcon;
  export const PlusCircle: LucideIcon;
  export const RefreshCw: LucideIcon;
  export const Reply: LucideIcon;
  export const Search: LucideIcon;
  export const Send: LucideIcon;
  export const Settings: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Sun: LucideIcon;
  export const Target: LucideIcon;
  export const Terminal: LucideIcon;
  export const ThumbsUp: LucideIcon;
  export const TrendingDown: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const User: LucideIcon;
  export const Users: LucideIcon;
  export const Wallet: LucideIcon;
  export const X: LucideIcon;
  export const XCircle: LucideIcon;

  // Icon object for dynamic imports
  export const icons: Record<string, LucideIcon>;
}
