
/**
 * Type declaration file for our lucide-react shim
 * This tells TypeScript that we have these components available
 * in our custom implementation
 */

declare module 'lucide-react' {
  import { FunctionComponent, SVGProps, ForwardRefExoticComponent, RefAttributes } from 'react';

  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number;
  }

  type LucideIcon = ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;

  // Export all the icon components we've stubbed
  export const Calendar: LucideIcon;
  export const CheckCircle: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const Bell: LucideIcon;
  export const User: LucideIcon;
  export const Check: LucideIcon;
  export const X: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const Upload: LucideIcon;
  export const FileText: LucideIcon;
  export const File: LucideIcon;
  export const Image: LucideIcon;
  export const Send: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const Clock: LucideIcon;
  export const History: LucideIcon;
  export const Plus: LucideIcon;
  export const Minus: LucideIcon;
  export const Brain: LucideIcon;
  export const DollarSign: LucideIcon;
  export const Search: LucideIcon;
  export const Settings: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const BarChart3: LucideIcon;
  export const Lightbulb: LucideIcon;
  export const CreditCard: LucideIcon;
  export const TrendingDown: LucideIcon;
  export const Lock: LucideIcon;
  export const FileX: LucideIcon;
  export const UserPlus: LucideIcon;
  export const BadgeCheck: LucideIcon;
  export const XCircle: LucideIcon;
  export const Trash2: LucideIcon;
  export const UserCheck: LucideIcon;
  export const UserX: LucideIcon;
  export const UserRound: LucideIcon;
  export const UserRoundCheck: LucideIcon;
  export const UserRoundX: LucideIcon;
  export const CircleUser: LucideIcon;
  export const CircleUserRound: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const ArrowRightFromLine: LucideIcon;
  export const ArrowUpFromLine: LucideIcon;

  // Add missing Lucide icons - these will be stubbed at runtime
  export const icons: Record<string, LucideIcon>;
}
