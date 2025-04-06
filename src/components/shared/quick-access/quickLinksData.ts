
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
    description: "Comprehensive portfolio analysis and insights",
    icon: React.createElement(PieChart, { className: "h-5 w-5" }),
    link: "/analyze-wealth",
    color: "bg-gray-50"
  },
  {
    id: "access-market-data",
    title: "Access market data & news",
    description: "Real-time market information and financial news",
    icon: React.createElement(LineChart, { className: "h-5 w-5" }),
    link: "/market-data",
    color: "bg-gray-50"
  },
  {
    id: "trade",
    title: "Trade",
    description: "Execute and manage investment transactions",
    icon: React.createElement(TrendingUp, { className: "h-5 w-5" }),
    link: "/trading",
    color: "bg-gray-50"
  },
  {
    id: "manage-credit-facilities",
    title: "Manage credit facilities",
    description: "Oversee lending arrangements and credit lines",
    icon: React.createElement(Building2, { className: "h-5 w-5" }),
    link: "/credit-facilities",
    color: "bg-gray-50"
  },
  {
    id: "get-advice",
    title: "Get advice",
    description: "Access personalized financial recommendations",
    icon: React.createElement(Lightbulb, { className: "h-5 w-5" }),
    link: "/advice",
    color: "bg-gray-50"
  },
  {
    id: "manage-cashflow",
    title: "Manage cashflow & liquidity",
    description: "Monitor and optimize cash positions across accounts",
    icon: React.createElement(DollarSign, { className: "h-5 w-5" }),
    link: "/cashflow-management",
    color: "bg-gray-50"
  },
  {
    id: "generate-reports",
    title: "Generate reports",
    description: "Create customized financial performance reports",
    icon: React.createElement(FileText, { className: "h-5 w-5" }),
    link: "/reporting",
    color: "bg-gray-50"
  },
  {
    id: "manage-users-permissions",
    title: "Manage users & permissions",
    description: "Control access rights and user authorization",
    icon: React.createElement(Users, { className: "h-5 w-5" }),
    link: "/user-management",
    color: "bg-gray-50"
  },
  {
    id: "manage-user-accounts",
    title: "Manage user accounts",
    description: "Administer user profiles and account settings",
    icon: React.createElement(Users, { className: "h-5 w-5" }),
    link: "/user-management/accounts",
    color: "bg-gray-50"
  },
  {
    id: "manage-integrations",
    title: "Manage integrations",
    description: "Configure and monitor third-party service connections",
    icon: React.createElement(Landmark, { className: "h-5 w-5" }),
    link: "/integrations",
    color: "bg-gray-50"
  },
  {
    id: "assess-esg-investments",
    title: "Assess ESG investments",
    description: "Evaluate environmental, social, and governance factors",
    icon: React.createElement(Leaf, { className: "h-5 w-5" }),
    link: "/esg",
    color: "bg-gray-50"
  },
  {
    id: "monitor-compliance",
    title: "Monitor compliance",
    description: "Track regulatory requirements and compliance status",
    icon: React.createElement(Shield, { className: "h-5 w-5" }),
    link: "/compliance-monitoring",
    color: "bg-gray-50"
  },
  {
    id: "optimize-tax",
    title: "Optimize tax",
    description: "Implement tax-efficient investment strategies",
    icon: React.createElement(Calculator, { className: "h-5 w-5" }),
    link: "/tax-optimization",
    color: "bg-gray-50"
  },
  {
    id: "manage-entities",
    title: "Manage entities",
    description: "Administer legal structures and organization hierarchy",
    icon: React.createElement(Building2, { className: "h-5 w-5" }),
    link: "/entity-management",
    color: "bg-gray-50"
  },
  {
    id: "plan-legacy",
    title: "Plan legacy",
    description: "Develop succession and inheritance strategies",
    icon: React.createElement(Scroll, { className: "h-5 w-5" }),
    link: "/legacy-planning",
    color: "bg-gray-50"
  },
  {
    id: "manage-client-access",
    title: "Manage client access",
    description: "Control client portal permissions and visibility",
    icon: React.createElement(Users, { className: "h-5 w-5" }),
    link: "/client-portal",
    color: "bg-gray-50"
  },
  {
    id: "manage-documents",
    title: "Manage documents",
    description: "Organize and secure financial documentation",
    icon: React.createElement(FileText, { className: "h-5 w-5" }),
    link: "/documents",
    color: "bg-gray-50"
  },
];

export const defaultQuickLinks = allQuickLinks.slice(0, 8);
