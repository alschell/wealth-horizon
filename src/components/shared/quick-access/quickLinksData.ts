
import React from "react";
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
  Scroll
} from "lucide-react";
import { QuickAccessItem } from "./types";

export const allQuickLinks: QuickAccessItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Main overview of your wealth",
    icon: React.createElement(BarChart3, { className: "h-5 w-5" }),
    link: "/dashboard",
    color: "bg-gray-50"
  },
  {
    id: "market-data",
    title: "Market Data",
    description: "Access market information",
    icon: React.createElement(LineChart, { className: "h-5 w-5" }),
    link: "/market-data",
    color: "bg-gray-50"
  },
  {
    id: "analyze",
    title: "Analyze Wealth",
    description: "Portfolio analysis tools",
    icon: React.createElement(PieChart, { className: "h-5 w-5" }),
    link: "/analyze-wealth",
    color: "bg-gray-50"
  },
  {
    id: "trade",
    title: "Trading",
    description: "Execute investment trades",
    icon: React.createElement(TrendingUp, { className: "h-5 w-5" }),
    link: "/trading",
    color: "bg-gray-50"
  },
  {
    id: "reports",
    title: "Reports",
    description: "Generate financial reports",
    icon: React.createElement(FileText, { className: "h-5 w-5" }),
    link: "/reporting",
    color: "bg-gray-50"
  },
  {
    id: "advice",
    title: "Advice",
    description: "Get personalized advice",
    icon: React.createElement(Lightbulb, { className: "h-5 w-5" }),
    link: "/advice",
    color: "bg-gray-50"
  },
  {
    id: "cashflow",
    title: "Cashflow",
    description: "Manage liquidity and deposits",
    icon: React.createElement(DollarSign, { className: "h-5 w-5" }),
    link: "/cashflow-management",
    color: "bg-gray-50"
  },
  {
    id: "users",
    title: "Users",
    description: "Manage user accounts",
    icon: React.createElement(Users, { className: "h-5 w-5" }),
    link: "/user-management",
    color: "bg-gray-50"
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "Manage connected services",
    icon: React.createElement(Landmark, { className: "h-5 w-5" }),
    link: "/integrations",
    color: "bg-gray-50"
  },
  {
    id: "esg",
    title: "ESG",
    description: "Sustainable investing metrics",
    icon: React.createElement(Leaf, { className: "h-5 w-5" }),
    link: "/esg",
    color: "bg-gray-50"
  },
  {
    id: "compliance",
    title: "Compliance",
    description: "Regulatory compliance tracking",
    icon: React.createElement(Shield, { className: "h-5 w-5" }),
    link: "/compliance-monitoring",
    color: "bg-gray-50"
  },
  {
    id: "tax",
    title: "Tax",
    description: "Tax planning & optimization",
    icon: React.createElement(Calculator, { className: "h-5 w-5" }),
    link: "/tax-optimization",
    color: "bg-gray-50"
  },
  {
    id: "entity",
    title: "Entity",
    description: "Manage legal structures",
    icon: React.createElement(Building2, { className: "h-5 w-5" }),
    link: "/entity-management",
    color: "bg-gray-50"
  },
  {
    id: "legacy",
    title: "Legacy",
    description: "Succession & estate planning",
    icon: React.createElement(Scroll, { className: "h-5 w-5" }),
    link: "/legacy-planning",
    color: "bg-gray-50"
  },
  {
    id: "settings",
    title: "Settings",
    description: "Configure application settings",
    icon: React.createElement(Settings, { className: "h-5 w-5" }),
    link: "/settings",
    color: "bg-gray-50"
  }
];

export const defaultQuickLinks = allQuickLinks.slice(0, 8);
