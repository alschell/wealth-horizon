
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
    color: "bg-blue-50 text-blue-500"
  },
  {
    title: "Access market data & news",
    description: "Access market information",
    icon: <LineChart className="h-4 w-4" />,
    link: "/market-data",
    color: "bg-indigo-50 text-indigo-500"
  },
  {
    title: "Trade",
    description: "Execute investment trades",
    icon: <TrendingUp className="h-4 w-4" />,
    link: "/trading",
    color: "bg-green-50 text-green-500"
  },
  {
    title: "Manage credit facilities",
    description: "Setup and manage financing options",
    icon: <Building2 className="h-4 w-4" />,
    link: "/credit-facilities",
    color: "bg-purple-50 text-purple-500"
  },
  {
    title: "Get advice",
    description: "Get personalized advice",
    icon: <Lightbulb className="h-4 w-4" />,
    link: "/advice",
    color: "bg-amber-50 text-amber-500"
  },
  {
    title: "Manage cashflow & liquidity",
    description: "Manage liquidity and deposits",
    icon: <DollarSign className="h-4 w-4" />,
    link: "/cashflow-management",
    color: "bg-cyan-50 text-cyan-500"
  },
  {
    title: "Generate reports",
    description: "Generate financial reports",
    icon: <FileText className="h-4 w-4" />,
    link: "/reporting",
    color: "bg-red-50 text-red-500"
  },
  {
    title: "Manage users & permissions",
    description: "Manage user accounts",
    icon: <Users className="h-4 w-4" />,
    link: "/user-management",
    color: "bg-pink-50 text-pink-500"
  },
  {
    title: "Manage integrations",
    description: "Manage connected services",
    icon: <Landmark className="h-4 w-4" />,
    link: "/integrations",
    color: "bg-orange-50 text-orange-500"
  },
  {
    title: "ESG Investing",
    description: "Sustainable investing metrics",
    icon: <Leaf className="h-4 w-4" />,
    link: "/esg",
    color: "bg-emerald-50 text-emerald-500"
  },
  {
    title: "Compliance",
    description: "Regulatory compliance tracking",
    icon: <Shield className="h-4 w-4" />,
    link: "/compliance-monitoring",
    color: "bg-sky-50 text-sky-500"
  },
  {
    title: "Tax Optimization",
    description: "Tax planning & efficiency",
    icon: <Calculator className="h-4 w-4" />,
    link: "/tax-optimization",
    color: "bg-yellow-50 text-yellow-500"
  },
  {
    title: "Entity Management",
    description: "Manage legal structures",
    icon: <Building2 className="h-4 w-4" />,
    link: "/entity-management",
    color: "bg-violet-50 text-violet-500"
  },
  {
    title: "Legacy Planning",
    description: "Succession & estate planning",
    icon: <Scroll className="h-4 w-4" />,
    link: "/legacy-planning",
    color: "bg-rose-50 text-rose-500"
  },
  {
    title: "Client Portal",
    description: "Manage client access",
    icon: <Users className="h-4 w-4" />,
    link: "/client-portal",
    color: "bg-gray-50 text-gray-500"
  },
  {
    title: "Documents",
    description: "Document management",
    icon: <FileText className="h-4 w-4" />,
    link: "/documents",
    color: "bg-slate-50 text-slate-500"
  },
];
