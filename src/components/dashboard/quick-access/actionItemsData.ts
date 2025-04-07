
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
    description: "Portfolio analysis tools and benchmarks",
    path: "/analyze-wealth",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "market-data",
    icon: LineChart,
    label: "Access Market Data & News",
    description: "Real-time market data and information",
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
    label: "Manage Credit Facilities",
    description: "Apply for credit facilities and borrow",
    path: "/credit-facilities",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "advice",
    icon: Lightbulb,
    label: "Get Advice",
    description: "Get personalized advice and request mandates",
    path: "/advice",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "cashflow",
    icon: DollarSign,
    label: "Manage Cashflow & Liquidity",
    description: "Optimize liquidity and place term deposits",
    path: "/cashflow-management",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "reports",
    icon: FileText,
    label: "Generate Reports",
    description: "Create financial reports and statements",
    path: "/reporting",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "users",
    icon: Users,
    label: "Manage Users & Permissions",
    description: "Manage user accounts and access",
    path: "/user-management",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "integrations",
    icon: Landmark,
    label: "Manage Integrations",
    description: "Connect to 3rd party services",
    path: "/integrations",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "esg",
    icon: Leaf,
    label: "Assess ESG Performance",
    description: "Sustainable investment metrics and benchmarks",
    path: "/esg",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "compliance",
    icon: Shield,
    label: "Monitor Compliance",
    description: "Regulatory compliance tracking",
    path: "/compliance-monitoring",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "tax",
    icon: Calculator,
    label: "Optimize Tax",
    description: "Tax planning and efficiency",
    path: "/tax-optimization",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "entity",
    icon: Building2,
    label: "Manage Legal Entities",
    description: "Manage legal structures and holdings",
    path: "/entity-management",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "legacy",
    icon: Scroll,
    label: "Plan Legacy",
    description: "Succession and estate planning",
    path: "/legacy-planning",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "client-access",
    icon: Users,
    label: "Manage Client Access",
    description: "Control client portal permissions and visibility",
    path: "/client-portal",
    color: "bg-gray-50 text-gray-500"
  },
  {
    id: "documents",
    icon: FileText,
    label: "Manage Documents",
    description: "Organize and secure financial documentation",
    path: "/documents",
    color: "bg-gray-50 text-gray-500"
  }
];

export const defaultActionItems = allActionItems.slice(0, 8);
