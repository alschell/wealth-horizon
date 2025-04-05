
import React from "react";
import { Link } from "react-router-dom";
import { 
  PieChart, 
  TrendingUp, 
  DollarSign, 
  LineChart, 
  FileText, 
  Users, 
  Settings, 
  HelpCircle 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Quick action definitions
const modules = [
  {
    id: "wealth-analysis",
    title: "Wealth Analysis",
    description: "Analyze your wealth portfolio distribution and performance",
    icon: <PieChart className="h-6 w-6" />,
    link: "/analyze-wealth",
    color: "bg-blue-50",
    textColor: "text-blue-600",
    iconColor: "text-blue-500"
  },
  {
    id: "trading",
    title: "Trading",
    description: "Create and manage trade orders across your portfolios",
    icon: <TrendingUp className="h-6 w-6" />,
    link: "/trading",
    color: "bg-indigo-50",
    textColor: "text-indigo-600",
    iconColor: "text-indigo-500"
  },
  {
    id: "advisory",
    title: "Financial Insights",
    description: "Get personalized investment advice and insights",
    icon: <HelpCircle className="h-6 w-6" />,
    link: "/advice",
    color: "bg-purple-50",
    textColor: "text-purple-600",
    iconColor: "text-purple-500"
  },
  {
    id: "cashflow",
    title: "Cashflow Management",
    description: "Manage liquidity and term deposits",
    icon: <DollarSign className="h-6 w-6" />,
    link: "/cashflow",
    color: "bg-green-50",
    textColor: "text-green-600",
    iconColor: "text-green-500"
  },
  {
    id: "market-data",
    title: "Market Data",
    description: "Track market performance and financial news",
    icon: <LineChart className="h-6 w-6" />,
    link: "/market-data",
    color: "bg-red-50",
    textColor: "text-red-600",
    iconColor: "text-red-500"
  },
  {
    id: "reporting",
    title: "Reporting",
    description: "Generate and view financial reports",
    icon: <FileText className="h-6 w-6" />,
    link: "/reporting",
    color: "bg-amber-50",
    textColor: "text-amber-600",
    iconColor: "text-amber-500"
  },
  {
    id: "users",
    title: "User Management",
    description: "Manage team members and access permissions",
    icon: <Users className="h-6 w-6" />,
    link: "/dashboard/users",
    color: "bg-teal-50",
    textColor: "text-teal-600",
    iconColor: "text-teal-500"
  },
  {
    id: "settings",
    title: "Settings",
    description: "Configure your account and preferences",
    icon: <Settings className="h-6 w-6" />,
    link: "/settings",
    color: "bg-gray-50",
    textColor: "text-gray-600",
    iconColor: "text-gray-500"
  }
];

const QuickAccessGrid = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Access</CardTitle>
        <CardDescription>Jump to key sections of your wealth management platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map(module => (
            <Link 
              to={module.link} 
              key={module.id}
              className="block group"
            >
              <div className={`h-full p-4 rounded-lg border border-transparent group-hover:border-gray-200 transition-all ${module.color} hover:shadow-md`}>
                <div className={`p-3 rounded-full inline-block ${module.iconColor} bg-white/80 mb-3`}>
                  {module.icon}
                </div>
                <h3 className={`font-medium ${module.textColor}`}>{module.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{module.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAccessGrid;
