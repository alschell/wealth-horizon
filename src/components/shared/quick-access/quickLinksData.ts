
import React from "react";
import {
  FileText,
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
    title: "Analyze Wealth",
    description: "Portfolio analysis tools & benchmarks",
    icon: React.createElement(PieChart, { className: "h-4 w-4 text-gray-500" }),
    link: "/analyze-wealth",
    color: "bg-gray-50"
  },
  {
    id: "market-data",
    title: "Access Market Data & News",
    description: "Real-time market data and information",
    icon: React.createElement(LineChart, { className: "h-4 w-4 text-gray-500" }),
    link: "/market-data",
    color: "bg-gray-50"
  },
  {
    id: "trade",
    title: "Trade",
    description: "Execute investment trades",
    icon: React.createElement(TrendingUp, { className: "h-4 w-4 text-gray-500" }),
    link: "/trading",
    color: "bg-gray-50"
  },
  {
    id: "credit-facilities",
    title: "Manage Credit Facilities",
    description: "Apply for credit facilities & borrow",
    icon: React.createElement(Building2, { className: "h-4 w-4 text-gray-500" }),
    link: "/credit-facilities",
    color: "bg-gray-50"
  },
  {
    id: "advice",
    title: "Get Advice",
    description: "Get personalized advice & request mandates",
    icon: React.createElement(Lightbulb, { className: "h-4 w-4 text-gray-500" }),
    link: "/advice",
    color: "bg-gray-50"
  },
  {
    id: "cashflow",
    title: "Manage Cashflow & Liquidity",
    description: "Optimize liquidity & term deposits",
    icon: React.createElement(DollarSign, { className: "h-4 w-4 text-gray-500" }),
    link: "/cashflow-management",
    color: "bg-gray-50"
  },
  {
    id: "reports",
    title: "Generate Reports",
    description: "Create financial reports & statements",
    icon: React.createElement(FileText, { className: "h-4 w-4 text-gray-500" }),
    link: "/reporting",
    color: "bg-gray-50"
  },
  {
    id: "users",
    title: "Manage Users & Permissions",
    description: "Manage user accounts & access",
    icon: React.createElement(Users, { className: "h-4 w-4 text-gray-500" }),
    link: "/user-management",
    color: "bg-gray-50"
  },
  {
    id: "integrations",
    title: "Manage Integrations",
    description: "Connect to 3rd party services",
    icon: React.createElement(Landmark, { className: "h-4 w-4 text-gray-500" }),
    link: "/integrations",
    color: "bg-gray-50"
  },
  {
    id: "esg",
    title: "Assess ESG Investments",
    description: "Sustainable investment metrics & benchmarks",
    icon: React.createElement(Leaf, { className: "h-4 w-4 text-gray-500" }),
    link: "/esg",
    color: "bg-gray-50"
  },
  {
    id: "compliance",
    title: "Monitor Compliance",
    description: "Regulatory compliance tracking",
    icon: React.createElement(Shield, { className: "h-4 w-4 text-gray-500" }),
    link: "/compliance-monitoring",
    color: "bg-gray-50"
  },
  {
    id: "tax",
    title: "Optimize Tax",
    description: "Tax planning & efficiency",
    icon: React.createElement(Calculator, { className: "h-4 w-4 text-gray-500" }),
    link: "/tax-optimization",
    color: "bg-gray-50"
  },
  {
    id: "entity",
    title: "Manage Legal Entities",
    description: "Manage legal structures & holdings",
    icon: React.createElement(Building2, { className: "h-4 w-4 text-gray-500" }),
    link: "/entity-management",
    color: "bg-gray-50"
  },
  {
    id: "legacy",
    title: "Plan Legacy",
    description: "Succession & estate planning",
    icon: React.createElement(Scroll, { className: "h-4 w-4 text-gray-500" }),
    link: "/legacy-planning",
    color: "bg-gray-50"
  },
  {
    id: "client-access",
    title: "Manage Client Access",
    description: "Control client portal permissions & visibility",
    icon: React.createElement(Users, { className: "h-4 w-4 text-gray-500" }),
    link: "/client-portal",
    color: "bg-gray-50"
  },
  {
    id: "documents",
    title: "Manage Documents",
    description: "Organize and secure financial documentation",
    icon: React.createElement(FileText, { className: "h-4 w-4 text-gray-500" }),
    link: "/documents",
    color: "bg-gray-50"
  }
];

export const defaultQuickLinks = allQuickLinks.slice(0, 8);
