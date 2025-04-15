
/**
 * Icon utility file
 * 
 * This file provides a workaround for lucide-react import issues by creating 
 * stub implementations of the most commonly used icons.
 */

import React from 'react';

// Common props interface for all icons
interface IconProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
  [key: string]: any;
}

// Create a base SVG component generator
const createIconComponent = (path: JSX.Element) => {
  return React.forwardRef<SVGSVGElement, IconProps>(
    ({ size = 24, color = 'currentColor', strokeWidth = 2, className = '', ...props }, ref) => {
      return (
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`lucide lucide-icon ${className}`}
          {...props}
        >
          {path}
        </svg>
      );
    }
  );
};

// Calendar icon
export const Calendar = createIconComponent(
  <>
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
  </>
);

// Check icon
export const CheckCircle = createIconComponent(
  <>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </>
);

// Bell icon
export const Bell = createIconComponent(
  <>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </>
);

// User icon
export const User = createIconComponent(
  <>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </>
);

// CheckIcon
export const Check = createIconComponent(
  <>
    <path d="M20 6 9 17l-5-5" />
  </>
);

// X icon
export const X = createIconComponent(
  <>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </>
);

// ArrowLeft icon
export const ArrowLeft = createIconComponent(
  <>
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </>
);

// ArrowRight icon
export const ArrowRight = createIconComponent(
  <>
    <path d="m5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </>
);

// Upload icon
export const Upload = createIconComponent(
  <>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </>
);

// FileText icon
export const FileText = createIconComponent(
  <>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
    <line x1="10" x2="8" y1="9" y2="9" />
  </>
);

// File icon
export const File = createIconComponent(
  <>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </>
);

// Image icon
export const Image = createIconComponent(
  <>
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </>
);

// Send icon
export const Send = createIconComponent(
  <>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </>
);

// AlertTriangle icon
export const AlertTriangle = createIconComponent(
  <>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </>
);

// TrendingUp icon
export const TrendingUp = createIconComponent(
  <>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </>
);

// Clock icon
export const Clock = createIconComponent(
  <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </>
);

// History icon
export const History = createIconComponent(
  <>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l4 2" />
  </>
);

// Plus icon
export const Plus = createIconComponent(
  <>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </>
);

// Minus icon
export const Minus = createIconComponent(
  <>
    <path d="M5 12h14" />
  </>
);

// Brain icon
export const Brain = createIconComponent(
  <>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.96-4.03A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.96-4.03A2.5 2.5 0 0 0 14.5 2Z" />
  </>
);

// DollarSign icon
export const DollarSign = createIconComponent(
  <>
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </>
);

// Search icon
export const Search = createIconComponent(
  <>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </>
);

// Settings icon
export const Settings = createIconComponent(
  <>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </>
);

// ChevronDown icon
export const ChevronDown = createIconComponent(
  <>
    <path d="m6 9 6 6 6-6" />
  </>
);

// ChevronRight icon
export const ChevronRight = createIconComponent(
  <>
    <path d="m9 6 6 6-6 6" />
  </>
);

// ChevronLeft icon
export const ChevronLeft = createIconComponent(
  <>
    <path d="m15 18-6-6 6-6" />
  </>
);

// ChevronUp icon
export const ChevronUp = createIconComponent(
  <>
    <path d="m18 15-6-6-6 6" />
  </>
);

// BarChart3 icon
export const BarChart3 = createIconComponent(
  <>
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </>
);

// Lightbulb icon
export const Lightbulb = createIconComponent(
  <>
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </>
);

// CreditCard icon
export const CreditCard = createIconComponent(
  <>
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </>
);

// TrendingDown icon
export const TrendingDown = createIconComponent(
  <>
    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
    <polyline points="16 17 22 17 22 11" />
  </>
);

// Lock icon
export const Lock = createIconComponent(
  <>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </>
);

// FileX icon
export const FileX = createIconComponent(
  <>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9.5" y1="12.5" x2="14.5" y2="17.5" />
    <line x1="14.5" y1="12.5" x2="9.5" y2="17.5" />
  </>
);

// UserPlus icon
export const UserPlus = createIconComponent(
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="22" y1="11" x2="16" y2="11" />
  </>
);

// BadgeCheck icon
export const BadgeCheck = createIconComponent(
  <>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m9 12 2 2 4-4" />
  </>
);

// XCircle icon
export const XCircle = createIconComponent(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </>
);

// Trash2 icon
export const Trash2 = createIconComponent(
  <>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </>
);

// UserCheck icon
export const UserCheck = createIconComponent(
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </>
);

// UserX icon
export const UserX = createIconComponent(
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="17" y1="8" x2="22" y2="13" />
    <line x1="22" y1="8" x2="17" y2="13" />
  </>
);

// UserRound icon 
export const UserRound = createIconComponent(
  <>
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 1 0-16 0" />
  </>
);

// UserRoundCheck icon
export const UserRoundCheck = createIconComponent(
  <>
    <path d="M2 21a8 8 0 0 1 13.292-6" />
    <circle cx="10" cy="8" r="5" />
    <path d="m16 19 2 2 4-4" />
  </>
);

// UserRoundX icon
export const UserRoundX = createIconComponent(
  <>
    <path d="M2 21a8 8 0 0 1 13.292-6" />
    <circle cx="10" cy="8" r="5" />
    <path d="m17 17 5 5" />
    <path d="m22 17-5 5" />
  </>
);

// CircleUser icon
export const CircleUser = createIconComponent(
  <>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
  </>
);

// CircleUserRound icon 
export const CircleUserRound = CircleUser;

// ArrowUpRight icon
export const ArrowUpRight = createIconComponent(
  <>
    <path d="m7 7 10 10" />
    <path d="M17 7v10H7" />
  </>
);

// ArrowRightFromLine icon
export const ArrowRightFromLine = createIconComponent(
  <>
    <path d="M3 5v14" />
    <path d="M21 12H7" />
    <path d="m15 6 6 6-6 6" />
  </>
);

// ArrowUpFromLine icon
export const ArrowUpFromLine = createIconComponent(
  <>
    <path d="m18 9-6-6-6 6" />
    <path d="M12 3v14" />
    <path d="M5 21h14" />
  </>
);

// Export a mock icons object
export const icons = {
  Calendar,
  CheckCircle,
  Bell,
  User,
  Check,
  X,
  ArrowLeft,
  ArrowRight,
  Upload,
  FileText,
  File,
  Image,
  Send,
  AlertTriangle,
  TrendingUp,
  Clock,
  History,
  Plus,
  Minus,
  Brain,
  DollarSign,
  Search,
  Settings,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  BarChart3,
  Lightbulb,
  CreditCard,
  TrendingDown,
  Lock,
  FileX,
  UserPlus,
  BadgeCheck,
  XCircle,
  Trash2,
  UserCheck,
  UserX,
  UserRound,
  UserRoundCheck,
  UserRoundX,
  CircleUser,
  CircleUserRound,
  ArrowUpRight,
  ArrowRightFromLine,
  ArrowUpFromLine
};

// Re-export as default
export default icons;
