
/**
 * This file re-exports all icons used in the application
 * to ensure proper dependency management and type safety.
 */
import * as LucideIcons from 'lucide-react';

export const {
  // Common icons used throughout the application
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Plus,
  Minus,
  Search,
  Filter,
  Clock,
  Calendar,
  User,
  Bell,
  Settings,
  Home,
  Mail,
  FileText,
  Upload,
  Download,
  Edit,
  Trash,
  MoreHorizontal,
  MoreVertical,
  ExternalLink,
  Link,
  Image,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Star,
  Heart,
  Menu,
  MessageSquare,
  Share,
  Save,
  Bookmark,
  AlertCircle,
  Info,
  HelpCircle,
  LogIn,
  LogOut,
  
  // UI component icons
  CreditCard,
  DollarSign,
  CircleDollarSign,
  Percent,
  TrendingUp,
  TrendingDown,
  BarChart,
  PieChart,
  LineChart,
  LayoutDashboard,
  Building,
  Briefcase,
  ChevronsUpDown,
  
  // Advanced icons
  Lightbulb,
  ShieldCheck,
  CheckCircle2,  // Note: The correct name is CheckCircle2 (not CheckCircle)
  History,
  Globe,
  FileChart,
  Reply,
  ThumbsUp,
  PlusCircle,
  MinusCircle,
  
  // Additional icons needed by the codebase
  Send,
  Brain,
  ArrowUp,
  ArrowDown,
  RefreshCcw,
  Circle,
  BarChart3,
  MapPin,
  Video,
  Target,
  Users,
  Loader2,
  MessageCircle,
  AlertTriangle,
  BarChartHorizontal,
  CalendarIcon,
  Newspaper,
  ArrowUpDown,
  CheckCheck,
  CircleCheck,
  
  // All other icons (available through the LucideIcons object)
  ...LucideIcons
} = LucideIcons;

// Type definitions for icon props
export type LucideIcon = typeof LucideIcons.AlertCircle;
export type { LucideProps } from 'lucide-react';

// Helper function to get any icon by name
export const getIconByName = (name: string): LucideIcon => {
  return (LucideIcons as any)[name] || LucideIcons.HelpCircle;
};

// For compatibility with existing code using CheckCircle
export const CheckCircle = CheckCircle2;
