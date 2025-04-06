
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
  Sliders,
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
    icon: <PieChart className="h-4 w-4 text-gray-500" />,
    link: "/analyze-wealth",
    color: "bg-gray-50"
  },
  {
    title: "Access market data & news",
    description: "Access market information",
    icon: <LineChart className="h-4 w-4 text-gray-500" />,
    link: "/market-data",
    color: "bg-gray-50"
  },
  {
    title: "Trade",
    description: "Execute investment trades",
    icon: <TrendingUp className="h-4 w-4 text-gray-500" />,
    link: "/trading",
    color: "bg-gray-50"
  },
  {
    title: "Manage credit facilities",
    description: "Manage credit facilities",
    icon: <Building2 className="h-4 w-4 text-gray-500" />,
    link: "/credit-facilities",
    color: "bg-gray-50"
  },
  {
    title: "Get advice",
    description: "Get personalized advice",
    icon: <Lightbulb className="h-4 w-4 text-gray-500" />,
    link: "/advice",
    color: "bg-gray-50"
  },
  {
    title: "Manage cashflow & liquidity",
    description: "Manage liquidity and deposits",
    icon: <DollarSign className="h-4 w-4 text-gray-500" />,
    link: "/cashflow-management",
    color: "bg-gray-50"
  },
  {
    title: "Generate reports",
    description: "Generate financial reports",
    icon: <FileText className="h-4 w-4 text-gray-500" />,
    link: "/reporting",
    color: "bg-gray-50"
  },
  {
    title: "Manage users & permissions",
    description: "Manage user accounts",
    icon: <Users className="h-4 w-4 text-gray-500" />,
    link: "/user-management",
    color: "bg-gray-50"
  },
  {
    title: "Manage integrations",
    description: "Manage connected services",
    icon: <Landmark className="h-4 w-4 text-gray-500" />,
    link: "/integrations",
    color: "bg-gray-50"
  },
  {
    title: "ESG Investing",
    description: "Sustainable investing metrics",
    icon: <Leaf className="h-4 w-4 text-gray-500" />,
    link: "/esg",
    color: "bg-gray-50"
  },
  {
    title: "Compliance",
    description: "Regulatory compliance tracking",
    icon: <Shield className="h-4 w-4 text-gray-500" />,
    link: "/compliance-monitoring",
    color: "bg-gray-50"
  },
  {
    title: "Tax Optimization",
    description: "Tax planning & efficiency",
    icon: <Calculator className="h-4 w-4 text-gray-500" />,
    link: "/tax-optimization",
    color: "bg-gray-50"
  },
  {
    title: "Entity Management",
    description: "Manage legal structures",
    icon: <Building2 className="h-4 w-4 text-gray-500" />,
    link: "/entity-management",
    color: "bg-gray-50"
  },
  {
    title: "Legacy Planning",
    description: "Succession & estate planning",
    icon: <Scroll className="h-4 w-4 text-gray-500" />,
    link: "/legacy-planning",
    color: "bg-gray-50"
  },
  {
    title: "Client Portal",
    description: "Manage client access",
    icon: <Users className="h-4 w-4 text-gray-500" />,
    link: "/client-portal",
    color: "bg-gray-50"
  },
  {
    title: "Documents",
    description: "Document management",
    icon: <FileText className="h-4 w-4 text-gray-500" />,
    link: "/documents",
    color: "bg-gray-50"
  },
];
