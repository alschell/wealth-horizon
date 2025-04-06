
import {
  BarChart3, 
  LineChart, 
  TrendingUp, 
  Banknote, 
  Briefcase, 
  ArrowRightLeft,
  FileText, 
  Building,
  Users,
  Leaf,
  Scroll,
  Calculator,
  Shield,
  Building2,
  Sliders,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface ActionItem {
  id: string;
  icon: LucideIcon;
  label: string;
  path: string;
  description: string;
  color?: string;
}

export const allActionItems: ActionItem[] = [
  {
    id: "wealth-analysis",
    icon: BarChart3,
    label: "Analyze wealth",
    path: "/analyze-wealth",
    description: "Wealth analytics and insights",
    color: "bg-blue-50 text-blue-500"
  },
  {
    id: "market-data",
    icon: LineChart,
    label: "Access market data & news",
    path: "/market-data",
    description: "Real-time market data & news",
    color: "bg-indigo-50 text-indigo-500"
  },
  {
    id: "trading",
    icon: TrendingUp,
    label: "Trade",
    path: "/trading",
    description: "Execute trades across portfolios",
    color: "bg-green-50 text-green-500"
  },
  {
    id: "credit",
    icon: Banknote,
    label: "Manage credit facilities",
    path: "/credit-facilities",
    description: "Setup and manage credit lines",
    color: "bg-purple-50 text-purple-500"
  },
  {
    id: "advice",
    icon: Briefcase,
    label: "Get advice",
    path: "/advice",
    description: "Investment advisory mandates",
    color: "bg-amber-50 text-amber-500"
  },
  {
    id: "cashflow",
    icon: ArrowRightLeft,
    label: "Manage cashflow & liquidity",
    path: "/cashflow-management",
    description: "Cash and liquidity management",
    color: "bg-cyan-50 text-cyan-500"
  },
  {
    id: "reports",
    icon: FileText,
    label: "Generate reports",
    path: "/reporting",
    description: "Custom financial reports",
    color: "bg-red-50 text-red-500"
  },
  {
    id: "users",
    icon: Users,
    label: "Manage users & permissions",
    path: "/dashboard/users",
    description: "User access and permissions",
    color: "bg-pink-50 text-pink-500"
  },
  {
    id: "integrations",
    icon: Building,
    label: "Manage integrations",
    path: "/integrations",
    description: "Connect to external services",
    color: "bg-orange-50 text-orange-500"
  },
  {
    id: "client-portal",
    icon: Users,
    label: "Client Portal",
    path: "/client-portal",
    description: "Manage client access",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "esg",
    icon: Leaf,
    label: "ESG Investing",
    path: "/esg",
    description: "Sustainable investing metrics",
    color: "bg-emerald-50 text-emerald-500"
  },
  {
    id: "tax-optimization",
    icon: Calculator,
    label: "Tax Optimization",
    path: "/tax-optimization",
    description: "Tax planning & efficiency",
    color: "bg-yellow-50 text-yellow-500"
  },
  {
    id: "legacy-planning",
    icon: Scroll,
    label: "Legacy Planning",
    path: "/legacy-planning",
    description: "Succession & estate planning",
    color: "bg-rose-50 text-rose-500"
  },
  {
    id: "entity-management",
    icon: Building2,
    label: "Entity Management",
    path: "/entity-management",
    description: "Manage legal structures",
    color: "bg-violet-50 text-violet-500"
  },
  {
    id: "compliance",
    icon: Shield,
    label: "Compliance Monitoring",
    path: "/compliance-monitoring",
    description: "Regulatory compliance tracking",
    color: "bg-sky-50 text-sky-500"
  },
  {
    id: "documents",
    icon: FileText,
    label: "Documents",
    path: "/documents",
    description: "Document management",
    color: "bg-slate-50 text-slate-500"
  }
];
