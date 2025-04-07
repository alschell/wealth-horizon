
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
  LucideIcon
} from "lucide-react";
import { QuickLinkItem } from "./types";

// Function to create consistent icon elements with proper sizing
const createIcon = (Icon: LucideIcon) => {
  return <Icon className="h-4 w-4" />;
};

export const allQuickLinks: QuickLinkItem[] = [
  {
    id: "analyze-wealth",
    title: "Analyze wealth",
    description: "Portfolio analysis tools",
    icon: createIcon(PieChart),
    link: "/analyze-wealth"
  },
  {
    id: "market-data",
    title: "Access market data & news",
    description: "Access market information",
    icon: createIcon(LineChart),
    link: "/market-data"
  },
  {
    id: "trade",
    title: "Trade",
    description: "Execute investment trades",
    icon: createIcon(TrendingUp),
    link: "/trading"
  },
  {
    id: "credit-facilities",
    title: "Manage credit facilities",
    description: "Manage credit facilities",
    icon: createIcon(Building2),
    link: "/credit-facilities"
  },
  {
    id: "advice",
    title: "Get advice",
    description: "Get personalized advice",
    icon: createIcon(Lightbulb),
    link: "/advice"
  },
  {
    id: "cashflow",
    title: "Manage cashflow & liquidity",
    description: "Manage liquidity and deposits",
    icon: createIcon(DollarSign),
    link: "/cashflow-management"
  },
  {
    id: "reports",
    title: "Generate reports",
    description: "Generate financial reports",
    icon: createIcon(FileText),
    link: "/reporting"
  },
  {
    id: "users",
    title: "Manage users & permissions",
    description: "Manage user accounts",
    icon: createIcon(Users),
    link: "/user-management"
  },
  {
    id: "integrations",
    title: "Manage integrations",
    description: "Manage connected services",
    icon: createIcon(Landmark),
    link: "/integrations"
  },
  {
    id: "esg",
    title: "ESG Investing",
    description: "Sustainable investing metrics",
    icon: createIcon(Leaf),
    link: "/esg"
  },
  {
    id: "compliance",
    title: "Compliance",
    description: "Regulatory compliance tracking",
    icon: createIcon(Shield),
    link: "/compliance-monitoring"
  },
  {
    id: "tax",
    title: "Tax Optimization",
    description: "Tax planning & efficiency",
    icon: createIcon(Calculator),
    link: "/tax-optimization"
  },
  {
    id: "entity",
    title: "Entity Management",
    description: "Manage legal structures",
    icon: createIcon(Building2),
    link: "/entity-management"
  },
  {
    id: "legacy",
    title: "Legacy Planning",
    description: "Succession & estate planning",
    icon: createIcon(Scroll),
    link: "/legacy-planning"
  },
  {
    id: "client-portal",
    title: "Client Portal",
    description: "Manage client access",
    icon: createIcon(Users),
    link: "/client-portal"
  },
  {
    id: "documents",
    title: "Documents",
    description: "Document management",
    icon: createIcon(FileText),
    link: "/documents"
  },
];

export const defaultQuickLinks = allQuickLinks.slice(0, 8);
