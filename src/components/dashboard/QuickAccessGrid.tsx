
import React from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp, 
  Activity, 
  BarChart3, 
  FileText, 
  LineChart, 
  ArrowRightLeft,
  Banknote,
  Building,
  Briefcase,
  Brain,
  MessageSquare
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const actionItems = [
  {
    icon: TrendingUp,
    label: "Trading",
    path: "/trading",
    description: "Execute trades across portfolios"
  },
  {
    icon: Briefcase,
    label: "Advice",
    path: "/advice",
    description: "Investment advisory mandates"
  },
  {
    icon: LineChart,
    label: "Markets",
    path: "/market-data",
    description: "Real-time market data"
  },
  {
    icon: BarChart3,
    label: "Analyze Wealth",
    path: "/analyze-wealth",
    description: "Wealth analytics and insights"
  },
  {
    icon: ArrowRightLeft,
    label: "Cashflow",
    path: "/cashflow",
    description: "Manage cash and term deposits"
  },
  {
    icon: FileText,
    label: "Reporting",
    path: "/reporting",
    description: "Custom financial reports"
  },
  {
    icon: Banknote,
    label: "Borrow",
    path: "/borrow",
    description: "Lending and credit facilities"
  },
  {
    icon: Building,
    label: "Integrations",
    path: "/integrations",
    description: "Connect to external services"
  },
  {
    icon: Brain,
    label: "AI Assistant",
    path: "/ai-assistant",
    description: "Get financial recommendations"
  },
  {
    icon: MessageSquare,
    label: "Financial Chat",
    path: "/financial-chat",
    description: "Ask questions and execute actions"
  }
];

const QuickAccessGrid = () => {
  return (
    <div>
      <CardHeader className="px-0 pt-0 pb-4">
        <CardTitle className="text-xl">Quick Access</CardTitle>
      </CardHeader>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {actionItems.map((item, index) => (
          <Link to={item.path} key={index}>
            <Card className="h-full flex flex-col items-center justify-center p-4 text-center transition-all duration-200 hover:translate-y-[-2px] bg-white border border-gray-200 shadow-sm">
              <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                <item.icon className="h-5 w-5 text-gray-700" />
              </div>
              <h3 className="font-medium text-sm">{item.label}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessGrid;
