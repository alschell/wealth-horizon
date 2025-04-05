
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
    title: "Analyze wealth",
    description: "Analyze assets and liabilities, run sophisticated benchmarks and simulations",
    icon: <PieChart className="h-6 w-6" />,
    link: "/analyze-wealth",
    color: "bg-gray-50",
    textColor: "text-gray-600",
    iconColor: "text-gray-500"
  },
  {
    id: "trading",
    title: "Trade",
    description: "Create and manage trade orders across your portfolios",
    icon: <TrendingUp className="h-6 w-6" />,
    link: "/trading",
    color: "bg-gray-50",
    textColor: "text-gray-600",
    iconColor: "text-gray-500"
  },
  {
    id: "advisory",
    title: "Get advice",
    description: "Get personalized investment advice and insights",
    icon: <HelpCircle className="h-6 w-6" />,
    link: "/advice",
    color: "bg-gray-50",
    textColor: "text-gray-600",
    iconColor: "text-gray-500"
  },
  {
    id: "cashflow",
    title: "Manage cashflow & liquidity",
    description: "Manage liquidity and term deposits",
    icon: <DollarSign className="h-6 w-6" />,
    link: "/cashflow",
    color: "bg-gray-50",
    textColor: "text-gray-600",
    iconColor: "text-gray-500"
  },
  {
    id: "market-data",
    title: "Access market data & news",
    description: "Track market performance and financial news",
    icon: <LineChart className="h-6 w-6" />,
    link: "/market-data",
    color: "bg-gray-50",
    textColor: "text-gray-600",
    iconColor: "text-gray-500"
  },
  {
    id: "reporting",
    title: "Generate reports",
    description: "Generate and view financial reports",
    icon: <FileText className="h-6 w-6" />,
    link: "/reporting",
    color: "bg-gray-50",
    textColor: "text-gray-600",
    iconColor: "text-gray-500"
  },
  {
    id: "users",
    title: "Manage users & permissions",
    description: "Manage team members and access permissions",
    icon: <Users className="h-6 w-6" />,
    link: "/dashboard/users",
    color: "bg-gray-50",
    textColor: "text-gray-600",
    iconColor: "text-gray-500"
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
