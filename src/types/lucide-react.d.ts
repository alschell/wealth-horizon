
// This declaration file ensures TypeScript recognizes all Lucide icons
declare module 'lucide-react' {
  import React from 'react';
  
  export interface LucideProps extends React.SVGAttributes<SVGElement> {
    color?: string;
    size?: string | number;
    strokeWidth?: string | number;
    absoluteStrokeWidth?: boolean;
  }

  export type LucideIcon = React.FC<LucideProps>;

  // Re-export all icons from the module
  export const Check: LucideIcon;
  export const CheckIcon: LucideIcon;
  export const Map: LucideIcon;
  export const MapPin: LucideIcon;
  export const Video: LucideIcon;
  export const Users: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const Calendar: LucideIcon;
  export const CalendarIcon: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const Briefcase: LucideIcon;
  export const Search: LucideIcon;
  export const File: LucideIcon;
  export const Upload: LucideIcon;
  export const X: LucideIcon;
  export const Eye: LucideIcon;
  export const EyeOff: LucideIcon;
  export const Edit: LucideIcon;
  export const Edit2: LucideIcon;
  export const GripVertical: LucideIcon;
  export const BarChart3: LucideIcon;
  export const LineChart: LucideIcon;
  export const PieChart: LucideIcon;
  export const ChartPie: LucideIcon;
  export const ChartLine: LucideIcon;
  export const ChartBar: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const DollarSign: LucideIcon;
  export const Lightbulb: LucideIcon;
  export const LightbulbIcon: LucideIcon;
  export const Building: LucideIcon;
  export const Building2: LucideIcon;
  export const Leaf: LucideIcon;
  export const Shield: LucideIcon;
  export const Calculator: LucideIcon;
  export const Scroll: LucideIcon;
  export const Briefcase: LucideIcon;
  export const Gift: LucideIcon;
  export const FileText: LucideIcon;
  export const Sliders: LucideIcon;
  export const RefreshCw: LucideIcon;
  export const Coins: LucideIcon;
  export const Globe: LucideIcon;
  export const ReceiptText: LucideIcon;
  export const Cloud: LucideIcon;
  export const Database: LucideIcon;
  export const HardDrive: LucideIcon;
  export const FileLock2: LucideIcon;
  export const Scale: LucideIcon;
  export const Landmark: LucideIcon;
  export const FileSearch: LucideIcon;
  export const ArrowUpFromLine: LucideIcon;
  export const ArrowDownToLine: LucideIcon;
  export const ArrowDownCircle: LucideIcon;
  export const ArrowUpCircle: LucideIcon;
  export const ArrowDown: LucideIcon;
  export const ArrowUp: LucideIcon;
  export const ArrowDownRight: LucideIcon;
  export const ArrowDownUp: LucideIcon;
  export const CalendarDays: LucideIcon;
  export const CircleDollarSign: LucideIcon;
  export const TrendingDown: LucideIcon;
  export const BadgePercent: LucideIcon;
  export const Maximize2: LucideIcon;
  export const BarChartHorizontal: LucideIcon;
  export const XCircle: LucideIcon;
  export const Trash2: LucideIcon;
  export const Settings: LucideIcon;
  export const FileSpreadsheet: LucideIcon;
  export const BellRing: LucideIcon;
  export const Save: LucideIcon;
  export const UserPlus: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const FileCheck: LucideIcon;
  export const RefreshCcw: LucideIcon;
  export const Sun: LucideIcon;
  export const Moon: LucideIcon;
  export const Cloud: LucideIcon;
  export const Code: LucideIcon;
  export const Github: LucideIcon;
  export const Youtube: LucideIcon;
  export const Star: LucideIcon;
  export const Image: LucideIcon;
  export const FilePenLine: LucideIcon;
  export const Loader2: LucideIcon;
  export const HelpCircle: LucideIcon;
  export const Info: LucideIcon;
  export const InfoIcon: LucideIcon;
  export const ClipboardCheck: LucideIcon;
  export const UsersIcon: LucideIcon;
  export const HandshakeIcon: LucideIcon;
  export const BriefcaseIcon: LucideIcon;
  export const NewspaperIcon: LucideIcon;
  
  // Add icons object for dynamic imports
  export const icons: Record<string, LucideIcon>;
}
