
import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart3, 
  LineChart, 
  TrendingUp, 
  Banknote, 
  Briefcase, 
  ArrowRightLeft,
  FileText, 
  Building,
  Users,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const actionItems = [
  {
    icon: BarChart3,
    label: "Analyze wealth",
    path: "/analyze-wealth",
    description: "Wealth analytics and insights"
  },
  {
    icon: LineChart,
    label: "Access market data & news",
    path: "/market-data",
    description: "Real-time market data & news"
  },
  {
    icon: TrendingUp,
    label: "Trade",
    path: "/trading",
    description: "Execute trades across portfolios"
  },
  {
    icon: Banknote,
    label: "Manage credit facilities",
    path: "/credit-facilities",
    description: "Credit and lending facilities"
  },
  {
    icon: Briefcase,
    label: "Get advice",
    path: "/advice",
    description: "Investment advisory mandates"
  },
  {
    icon: ArrowRightLeft,
    label: "Manage cashflow & liquidity",
    path: "/cashflow",
    description: "Cash and liquidity management"
  },
  {
    icon: FileText,
    label: "Generate reports",
    path: "/reporting",
    description: "Custom financial reports"
  },
  {
    icon: Users,
    label: "Manage users & permissions",
    path: "/dashboard/users",
    description: "User access and permissions"
  },
  {
    icon: Building,
    label: "Manage integrations",
    path: "/integrations",
    description: "Connect to external services"
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
            <Card className="h-full flex flex-col items-center justify-start p-4 text-center transition-all duration-200 hover:bg-gray-50">
              <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center mb-3 mt-2">
                <item.icon className="h-5 w-5 text-gray-700" />
              </div>
              <h3 className="font-medium text-sm mb-1">{item.label}</h3>
              <p className="text-xs text-gray-500">{item.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessGrid;
