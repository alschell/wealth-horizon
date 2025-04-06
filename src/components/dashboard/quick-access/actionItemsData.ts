
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  FileText,
  DollarSign,
  Building2,
  Lightbulb,
  Users,
  Settings,
  Shield,
  Landmark,
  Leaf,
  Calculator,
  Scroll,
  LucideIcon
} from "lucide-react";

export interface ActionItem {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
  path: string;
  color?: string;
}

export const allActionItems: ActionItem[] = [
  {
    id: "analyze-wealth",
    icon: PieChart,
    label: "Analyze Wealth",
    description: "Portfolio analysis tools",
    path: "/analyze-wealth",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "market-data",
    icon: LineChart,
    label: "Market Data",
    description: "Access market information",
    path: "/market-data",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "trade",
    icon: TrendingUp,
    label: "Trade",
    description: "Execute investment trades",
    path: "/trading",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "credit-facilities",
    icon: Building2,
    label: "Credit Facilities",
    description: "Manage credit facilities",
    path: "/credit-facilities",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "advice",
    icon: Lightbulb,
    label: "Get Advice",
    description: "Get personalized advice",
    path: "/advice",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "cashflow",
    icon: DollarSign,
    label: "Cashflow Management",
    description: "Manage liquidity and deposits",
    path: "/cashflow-management",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "reports",
    icon: FileText,
    label: "Reports",
    description: "Generate financial reports",
    path: "/reporting",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "users",
    icon: Users,
    label: "User Management",
    description: "Manage user accounts",
    path: "/user-management",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "integrations",
    icon: Landmark,
    label: "Integrations",
    description: "Manage connected services",
    path: "/integrations",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "esg",
    icon: Leaf,
    label: "ESG Investing",
    description: "Sustainable investing metrics",
    path: "/esg",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "compliance",
    icon: Shield,
    label: "Compliance",
    description: "Regulatory compliance tracking",
    path: "/compliance-monitoring",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "tax",
    icon: Calculator,
    label: "Tax Optimization",
    description: "Tax planning & efficiency",
    path: "/tax-optimization",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "entity",
    icon: Building2,
    label: "Entity Management",
    description: "Manage legal structures",
    path: "/entity-management",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "legacy",
    icon: Scroll,
    label: "Legacy Planning",
    description: "Succession & estate planning",
    path: "/legacy-planning",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "settings",
    icon: Settings,
    label: "Settings",
    description: "Configure application settings",
    path: "/settings",
    color: "bg-gray-50 text-gray-500"
  }
];

export const defaultActionItems = allActionItems.slice(0, 8);
