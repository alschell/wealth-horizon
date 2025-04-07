
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
} from "lucide-react";
import { QuickLinkItem } from "./types";

export const allQuickLinks: QuickLinkItem[] = [
  {
    id: "analyze-wealth",
    title: "Analyze wealth",
    description: "Portfolio analysis tools",
    icon: <PieChart className="h-4 w-4" />,
    link: "/analyze-wealth"
  },
  {
    id: "market-data",
    title: "Access market data & news",
    description: "Access market information",
    icon: <LineChart className="h-4 w-4" />,
    link: "/market-data"
  },
  {
    id: "trade",
    title: "Trade",
    description: "Execute investment trades",
    icon: <TrendingUp className="h-4 w-4" />,
    link: "/trading"
  },
  {
    id: "credit-facilities",
    title: "Manage credit facilities",
    description: "Manage credit facilities",
    icon: <Building2 className="h-4 w-4" />,
    link: "/credit-facilities"
  },
  {
    id: "advice",
    title: "Get advice",
    description: "Get personalized advice",
    icon: <Lightbulb className="h-4 w-4" />,
    link: "/advice"
  },
  {
    id: "cashflow",
    title: "Manage cashflow & liquidity",
    description: "Manage liquidity and deposits",
    icon: <DollarSign className="h-4 w-4" />,
    link: "/cashflow-management"
  },
  {
    id: "reports",
    title: "Generate reports",
    description: "Generate financial reports",
    icon: <FileText className="h-4 w-4" />,
    link: "/reporting"
  },
  {
    id: "users",
    title: "Manage users & permissions",
    description: "Manage user accounts",
    icon: <Users className="h-4 w-4" />,
    link: "/user-management"
  },
  {
    id: "integrations",
    title: "Manage integrations",
    description: "Manage connected services",
    icon: <Landmark className="h-4 w-4" />,
    link: "/integrations"
  },
  {
    id: "esg",
    title: "ESG Investing",
    description: "Sustainable investing metrics",
    icon: <Leaf className="h-4 w-4" />,
    link: "/esg"
  },
  {
    id: "compliance",
    title: "Compliance",
    description: "Regulatory compliance tracking",
    icon: <Shield className="h-4 w-4" />,
    link: "/compliance-monitoring"
  },
  {
    id: "tax",
    title: "Tax Optimization",
    description: "Tax planning & efficiency",
    icon: <Calculator className="h-4 w-4" />,
    link: "/tax-optimization"
  },
  {
    id: "entity",
    title: "Entity Management",
    description: "Manage legal structures",
    icon: <Building2 className="h-4 w-4" />,
    link: "/entity-management"
  },
  {
    id: "legacy",
    title: "Legacy Planning",
    description: "Succession & estate planning",
    icon: <Scroll className="h-4 w-4" />,
    link: "/legacy-planning"
  },
  {
    id: "client-portal",
    title: "Client Portal",
    description: "Manage client access",
    icon: <Users className="h-4 w-4" />,
    link: "/client-portal"
  },
  {
    id: "documents",
    title: "Documents",
    description: "Document management",
    icon: <FileText className="h-4 w-4" />,
    link: "/documents"
  },
];
