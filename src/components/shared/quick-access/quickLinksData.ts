
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
import { QuickAccessItem } from "./types";

export const allQuickLinks: QuickAccessItem[] = [
  {
    id: "analyze-wealth",
    title: "Analyze wealth",
    description: "Portfolio analysis tools",
    icon: React.createElement(PieChart, { className: "h-5 w-5" }),
    link: "/analyze-wealth",
    color: "bg-gray-50"
  },
  {
    id: "access-market-data",
    title: "Access market data & news",
    description: "Access market information",
    icon: React.createElement(LineChart, { className: "h-5 w-5" }),
    link: "/market-data",
    color: "bg-gray-50"
  },
  {
    id: "trade",
    title: "Trade",
    description: "Execute investment trades",
    icon: React.createElement(TrendingUp, { className: "h-5 w-5" }),
    link: "/trading",
    color: "bg-gray-50"
  },
  {
    id: "manage-credit-facilities",
    title: "Manage credit facilities",
    description: "Manage credit facilities",
    icon: React.createElement(Building2, { className: "h-5 w-5" }),
    link: "/credit-facilities",
    color: "bg-gray-50"
  },
  {
    id: "get-advice",
    title: "Get advice",
    description: "Get personalized advice",
    icon: React.createElement(Lightbulb, { className: "h-5 w-5" }),
    link: "/advice",
    color: "bg-gray-50"
  },
  {
    id: "manage-cashflow",
    title: "Manage cashflow & liquidity",
    description: "Manage liquidity and deposits",
    icon: React.createElement(DollarSign, { className: "h-5 w-5" }),
    link: "/cashflow-management",
    color: "bg-gray-50"
  },
  {
    id: "generate-reports",
    title: "Generate reports",
    description: "Generate financial reports",
    icon: React.createElement(FileText, { className: "h-5 w-5" }),
    link: "/reporting",
    color: "bg-gray-50"
  },
  {
    id: "manage-users-permissions",
    title: "Manage users & permissions",
    description: "Manage user permissions",
    icon: React.createElement(Users, { className: "h-5 w-5" }),
    link: "/user-management",
    color: "bg-gray-50"
  },
  {
    id: "manage-user-accounts",
    title: "Manage user accounts",
    description: "Manage user accounts",
    icon: React.createElement(Users, { className: "h-5 w-5" }),
    link: "/user-management/accounts",
    color: "bg-gray-50"
  },
  {
    id: "manage-integrations",
    title: "Manage integrations",
    description: "Manage connected services",
    icon: React.createElement(Landmark, { className: "h-5 w-5" }),
    link: "/integrations",
    color: "bg-gray-50"
  },
  {
    id: "assess-esg-investments",
    title: "Assess ESG investments",
    description: "Sustainable investing metrics",
    icon: React.createElement(Leaf, { className: "h-5 w-5" }),
    link: "/esg",
    color: "bg-gray-50"
  },
  {
    id: "monitor-compliance",
    title: "Monitor compliance",
    description: "Regulatory compliance tracking",
    icon: React.createElement(Shield, { className: "h-5 w-5" }),
    link: "/compliance-monitoring",
    color: "bg-gray-50"
  },
  {
    id: "optimize-tax",
    title: "Optimize tax",
    description: "Tax planning & optimization",
    icon: React.createElement(Calculator, { className: "h-5 w-5" }),
    link: "/tax-optimization",
    color: "bg-gray-50"
  },
  {
    id: "manage-entities",
    title: "Manage entities",
    description: "Manage legal structures",
    icon: React.createElement(Building2, { className: "h-5 w-5" }),
    link: "/entity-management",
    color: "bg-gray-50"
  },
  {
    id: "plan-legacy",
    title: "Plan legacy",
    description: "Succession & estate planning",
    icon: React.createElement(Scroll, { className: "h-5 w-5" }),
    link: "/legacy-planning",
    color: "bg-gray-50"
  },
  {
    id: "manage-client-access",
    title: "Manage client access",
    description: "Manage client access",
    icon: React.createElement(Users, { className: "h-5 w-5" }),
    link: "/client-portal",
    color: "bg-gray-50"
  },
  {
    id: "manage-documents",
    title: "Manage documents",
    description: "Document management",
    icon: React.createElement(FileText, { className: "h-5 w-5" }),
    link: "/documents",
    color: "bg-gray-50"
  },
];

export const defaultQuickLinks = allQuickLinks.slice(0, 8);
