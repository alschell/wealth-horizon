
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
    title: "Analyze wealth",
    description: "Portfolio analysis tools",
    icon: <PieChart className="h-4 w-4" />,
    link: "/analyze-wealth",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Access market data & news",
    description: "Access market information",
    icon: <LineChart className="h-4 w-4" />,
    link: "/market-data",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Trade",
    description: "Execute investment trades",
    icon: <TrendingUp className="h-4 w-4" />,
    link: "/trading",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Manage credit facilities",
    description: "Manage credit facilities",
    icon: <Building2 className="h-4 w-4" />,
    link: "/credit-facilities",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Get advice",
    description: "Get personalized advice",
    icon: <Lightbulb className="h-4 w-4" />,
    link: "/advice",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Manage cashflow & liquidity",
    description: "Manage liquidity and deposits",
    icon: <DollarSign className="h-4 w-4" />,
    link: "/cashflow-management",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Generate reports",
    description: "Generate financial reports",
    icon: <FileText className="h-4 w-4" />,
    link: "/reporting",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Manage users & permissions",
    description: "Manage user accounts",
    icon: <Users className="h-4 w-4" />,
    link: "/user-management",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Manage integrations",
    description: "Manage connected services",
    icon: <Landmark className="h-4 w-4" />,
    link: "/integrations",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "ESG Investing",
    description: "Sustainable investing metrics",
    icon: <Leaf className="h-4 w-4" />,
    link: "/esg",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Compliance",
    description: "Regulatory compliance tracking",
    icon: <Shield className="h-4 w-4" />,
    link: "/compliance-monitoring",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Tax Optimization",
    description: "Tax planning & efficiency",
    icon: <Calculator className="h-4 w-4" />,
    link: "/tax-optimization",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Entity Management",
    description: "Manage legal structures",
    icon: <Building2 className="h-4 w-4" />,
    link: "/entity-management",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Legacy Planning",
    description: "Succession & estate planning",
    icon: <Scroll className="h-4 w-4" />,
    link: "/legacy-planning",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Client Portal",
    description: "Manage client access",
    icon: <Users className="h-4 w-4" />,
    link: "/client-portal",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Documents",
    description: "Document management",
    icon: <FileText className="h-4 w-4" />,
    link: "/documents",
    color: "text-gray-500 bg-gray-50"
  },
];
