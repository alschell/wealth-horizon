
declare module 'lucide-react' {
  import { ComponentType, SVGAttributes } from 'react'

  export interface LucideProps extends SVGAttributes<SVGElement> {
    color?: string
    size?: string | number
    strokeWidth?: string | number
    absoluteStrokeWidth?: boolean
  }

  export type LucideIcon = ComponentType<LucideProps>

  // Re-export all the icons
  export const Activity: LucideIcon
  export const AlertTriangle: LucideIcon
  export const ArrowLeft: LucideIcon
  export const ArrowRight: LucideIcon
  export const ArrowUpDown: LucideIcon
  export const ArrowUpRight: LucideIcon
  export const BadgePlus: LucideIcon
  export const BarChart: LucideIcon
  export const BarChart3: LucideIcon
  export const Bell: LucideIcon
  export const BookOpen: LucideIcon
  export const Brain: LucideIcon
  export const Briefcase: LucideIcon
  export const Building: LucideIcon
  export const Calendar: LucideIcon
  export const CalendarIcon: LucideIcon
  export const Camera: LucideIcon
  export const ChartBar: LucideIcon
  export const ChartLine: LucideIcon
  export const ChartPie: LucideIcon
  export const Check: LucideIcon
  export const CheckCircle: LucideIcon
  export const CheckCircle2: LucideIcon
  export const CheckIcon: LucideIcon
  export const ChevronDown: LucideIcon
  export const ChevronLeft: LucideIcon
  export const ChevronRight: LucideIcon
  export const ChevronUp: LucideIcon
  export const Clock: LucideIcon
  export const Copy: LucideIcon
  export const CreditCard: LucideIcon
  export const Database: LucideIcon
  export const DollarSign: LucideIcon
  export const Download: LucideIcon
  export const ExternalLink: LucideIcon
  export const File: LucideIcon
  export const FileText: LucideIcon
  export const FileImage: LucideIcon
  export const FileArchive: LucideIcon
  export const FileCode: LucideIcon
  export const FileBarChart: LucideIcon
  export const FileAudio: LucideIcon
  export const FileVideo: LucideIcon
  export const Filter: LucideIcon
  export const Globe: LucideIcon
  export const Heart: LucideIcon
  export const History: LucideIcon
  export const LayoutDashboard: LucideIcon
  export const Layers: LucideIcon
  export const Lightbulb: LucideIcon
  export const LineChart: LucideIcon
  export const Link2: LucideIcon
  export const Lock: LucideIcon
  export const MapPin: LucideIcon
  export const MessageCircle: LucideIcon
  export const MinusCircle: LucideIcon
  export const PieChart: LucideIcon
  export const Plus: LucideIcon
  export const PlusCircle: LucideIcon
  export const Puzzle: LucideIcon
  export const Reply: LucideIcon
  export const Search: LucideIcon
  export const Send: LucideIcon
  export const Shield: LucideIcon
  export const ShieldCheck: LucideIcon
  export const Sliders: LucideIcon
  export const Target: LucideIcon
  export const Terminal: LucideIcon
  export const ThumbsUp: LucideIcon
  export const TrendingUp: LucideIcon
  export const User: LucideIcon
  export const Users: LucideIcon
  export const Video: LucideIcon
  export const Wallet: LucideIcon
  export const X: LucideIcon

  // Include any other icons your app uses
  
  export const icons: Record<string, LucideIcon>
  export const dynamicIconImports: Record<string, () => Promise<{ default: LucideIcon }>>
  
  export const Icon: ComponentType<{
    name?: string
    color?: string
    size?: string | number
    strokeWidth?: string | number
    absoluteStrokeWidth?: boolean
    iconNode?: any
  }>
}
