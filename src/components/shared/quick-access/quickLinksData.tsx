
import React from "react";
import {
  FileText,
  BarChart3,
  Landmark,
  Leaf,
  Shield,
  Calculator,
  Building2,
  Scroll,
  Users,
  TrendingUp,
  PieChart,
  LineChart,
  DollarSign,
  Lightbulb,
  Briefcase,
  Gift,
  LucideIcon
} from "lucide-react";
import { QuickLinkItem } from "./types";

/**
 * Creates a standardized icon element with proper sizing
 * 
 * @param Icon - Lucide icon component to render
 * @returns React node with consistent styling
 */
const createIcon = (Icon: LucideIcon): React.ReactNode => {
  return <Icon className="h-4 w-4" />;
};

/**
 * Complete collection of all available quick links for the application
 */
export const allQuickLinks: QuickLinkItem[] = [
  {
    id: "analyze-wealth",
    title: "Analyze wealth",
    description: "Portfolio analysis tools",
    icon: createIcon(PieChart),
    href: "/analyze-wealth"
  },
  {
    id: "market-data",
    title: "Access market data & news",
    description: "Access market information",
    icon: createIcon(LineChart),
    href: "/market-data"
  },
  {
    id: "trade",
    title: "Trade",
    description: "Execute investment trades",
    icon: createIcon(TrendingUp),
    href: "/trading"
  },
  {
    id: "credit-facilities",
    title: "Manage credit facilities",
    description: "Manage credit facilities",
    icon: createIcon(Briefcase),
    href: "/credit-facilities"
  },
  {
    id: "advice",
    title: "Get advice",
    description: "Get personalized advice",
    icon: createIcon(Lightbulb),
    href: "/advice"
  },
  {
    id: "cashflow",
    title: "Manage cashflow & liquidity",
    description: "Manage liquidity and deposits",
    icon: createIcon(DollarSign),
    href: "/cashflow-management"
  },
  {
    id: "reports",
    title: "Generate reports",
    description: "Generate financial reports",
    icon: createIcon(BarChart3),
    href: "/reporting"
  },
  {
    id: "users",
    title: "Manage users & permissions",
    description: "Manage user accounts",
    icon: createIcon(Users),
    href: "/user-management"
  },
  {
    id: "integrations",
    title: "Manage integrations",
    description: "Manage connected services",
    icon: createIcon(Landmark),
    href: "/integrations"
  },
  {
    id: "esg",
    title: "ESG Investing",
    description: "Sustainable investing metrics",
    icon: createIcon(Leaf),
    href: "/esg"
  },
  {
    id: "compliance",
    title: "Monitor Compliance",
    description: "Track regulatory activities",
    icon: createIcon(Shield),
    href: "/compliance-monitoring"
  },
  {
    id: "tax",
    title: "Tax Optimization",
    description: "Tax planning & efficiency",
    icon: createIcon(Calculator),
    href: "/tax-optimization"
  },
  {
    id: "entity",
    title: "Entity Management",
    description: "Manage legal structures",
    icon: createIcon(Building2),
    href: "/entity-management"
  },
  {
    id: "legacy",
    title: "Legacy Planning",
    description: "Succession & estate planning",
    icon: createIcon(Scroll),
    href: "/legacy-planning"
  },
  {
    id: "client-portal",
    title: "Client Portal",
    description: "Manage client access",
    icon: createIcon(Gift),
    href: "/client-portal"
  },
  {
    id: "documents",
    title: "Documents",
    description: "Document management",
    icon: createIcon(FileText),
    href: "/documents"
  }
];

/**
 * Default subset of quick links to show initially
 * Can be customized by the user via the CustomizeDialog
 */
export const defaultQuickLinks = allQuickLinks.slice(0, 8);
