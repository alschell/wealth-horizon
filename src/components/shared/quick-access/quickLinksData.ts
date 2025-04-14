
import React from "react";
import {
  Home,
  FileText,
  Users,
  BarChart3,
  Settings,
  Calendar,
  Wallet,
  PieChart,
  Globe,
  Book,
  MessageSquare,
  Download,
  Upload,
  Lock,
  CreditCard,
  ShieldCheck,
  HelpCircle,
  Activity
} from "lucide-react";
import { QuickLinkItem } from "./types";

/**
 * All available quick link items
 */
export const allQuickLinks: QuickLinkItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home size={20} />,
    category: "main"
  },
  {
    id: "portfolio",
    title: "Portfolio",
    href: "/portfolio",
    icon: <PieChart size={20} />,
    category: "main"
  },
  {
    id: "reporting",
    title: "Reports",
    href: "/reports",
    icon: <BarChart3 size={20} />,
    category: "main"
  },
  {
    id: "documents",
    title: "Documents",
    href: "/documents",
    icon: <FileText size={20} />,
    category: "main"
  },
  {
    id: "calendar",
    title: "Calendar",
    href: "/calendar",
    icon: <Calendar size={20} />,
    category: "main"
  },
  {
    id: "accounts",
    title: "Accounts",
    href: "/accounts",
    icon: <Wallet size={20} />,
    category: "main"
  },
  {
    id: "market",
    title: "Market Data",
    href: "/market",
    icon: <Globe size={20} />,
    category: "tools"
  },
  {
    id: "contacts",
    title: "Contacts",
    href: "/contacts",
    icon: <Users size={20} />,
    category: "tools"
  },
  {
    id: "help",
    title: "Help Center",
    href: "/help",
    icon: <HelpCircle size={20} />,
    category: "support"
  },
  {
    id: "knowledge",
    title: "Knowledge Base",
    href: "/knowledge",
    icon: <Book size={20} />,
    category: "support"
  },
  {
    id: "chat",
    title: "Live Chat",
    href: "/chat",
    icon: <MessageSquare size={20} />,
    category: "support"
  },
  {
    id: "downloads",
    title: "Downloads",
    href: "/downloads",
    icon: <Download size={20} />,
    category: "tools"
  },
  {
    id: "uploads",
    title: "Upload Files",
    href: "/uploads",
    icon: <Upload size={20} />,
    category: "tools"
  },
  {
    id: "security",
    title: "Security",
    href: "/security",
    icon: <Lock size={20} />,
    category: "settings"
  },
  {
    id: "payments",
    title: "Payments",
    href: "/payments",
    icon: <CreditCard size={20} />,
    category: "settings"
  },
  {
    id: "compliance",
    title: "Compliance",
    href: "/compliance",
    icon: <ShieldCheck size={20} />,
    category: "tools"
  },
  {
    id: "settings",
    title: "Settings",
    href: "/settings",
    icon: <Settings size={20} />,
    category: "settings"
  },
  {
    id: "activity",
    title: "Activity Log",
    href: "/activity",
    icon: <Activity size={20} />,
    category: "tools"
  }
];
