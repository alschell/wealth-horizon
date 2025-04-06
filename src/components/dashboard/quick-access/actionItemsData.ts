
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
}

export const allActionItems: ActionItem[] = [
  {
    id: "wealth-analysis",
    icon: BarChart3,
    label: "Analyze wealth",
    path: "/analyze-wealth",
    description: "Wealth analytics and insights"
  },
  {
    id: "market-data",
    icon: LineChart,
    label: "Access market data & news",
    path: "/market-data",
    description: "Real-time market data & news"
  },
  {
    id: "trading",
    icon: TrendingUp,
    label: "Trade",
    path: "/trading",
    description: "Execute trades across portfolios"
  },
  {
    id: "credit",
    icon: Banknote,
    label: "Manage credit facilities",
    path: "/credit-facilities",
    description: "Setup and manage credit lines"
  },
  {
    id: "advice",
    icon: Briefcase,
    label: "Get advice",
    path: "/advice",
    description: "Investment advisory mandates"
  },
  {
    id: "cashflow",
    icon: ArrowRightLeft,
    label: "Manage cashflow & liquidity",
    path: "/cashflow-management",
    description: "Cash and liquidity management"
  },
  {
    id: "reports",
    icon: FileText,
    label: "Generate reports",
    path: "/reporting",
    description: "Custom financial reports"
  },
  {
    id: "users",
    icon: Users,
    label: "Manage users & permissions",
    path: "/dashboard/users",
    description: "User access and permissions"
  },
  {
    id: "integrations",
    icon: Building,
    label: "Manage integrations",
    path: "/integrations",
    description: "Connect to external services"
  },
  {
    id: "client-portal",
    icon: Users,
    label: "Client Portal",
    path: "/client-portal",
    description: "Manage client access"
  },
  {
    id: "esg",
    icon: Leaf,
    label: "ESG Investing",
    path: "/esg",
    description: "Sustainable investing metrics"
  },
  {
    id: "tax-optimization",
    icon: Calculator,
    label: "Tax Optimization",
    path: "/tax-optimization",
    description: "Tax planning & efficiency"
  },
  {
    id: "legacy-planning",
    icon: Scroll,
    label: "Legacy Planning",
    path: "/legacy-planning",
    description: "Succession & estate planning"
  },
  {
    id: "entity-management",
    icon: Building2,
    label: "Entity Management",
    path: "/entity-management",
    description: "Manage legal structures"
  },
  {
    id: "compliance",
    icon: Shield,
    label: "Compliance Monitoring",
    path: "/compliance-monitoring",
    description: "Regulatory compliance tracking"
  },
  {
    id: "documents",
    icon: FileText,
    label: "Documents",
    path: "/documents",
    description: "Document management"
  }
];
