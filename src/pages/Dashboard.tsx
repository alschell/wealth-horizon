
import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WealthSummary from "@/components/dashboard/WealthSummary";
import NotificationsFeed from "@/components/dashboard/NotificationsFeed";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart4, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  HelpCircle, 
  FileText, 
  Users, 
  Settings as SettingsIcon,
  BarChartHorizontal
} from "lucide-react";

const Dashboard = () => {
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
      title: "Advisory",
      description: "Get personalized investment advice from experts",
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
      icon: <SettingsIcon className="h-6 w-6" />,
      link: "/settings",
      color: "bg-gray-50",
      textColor: "text-gray-600",
      iconColor: "text-gray-500"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Welcome to Wealth Pro</h1>
            <p className="text-gray-500 mt-1">Your comprehensive wealth management platform</p>
          </div>
          <Button className="mt-2 sm:mt-0">
            <Clock className="mr-2 h-4 w-4" /> Activity Log
          </Button>
        </div>

        {/* Key summary cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <WealthSummary />
            
            {/* Modules card grid */}
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
            
            {/* Key performance indicators */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Quick snapshot of your wealth performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="text-sm text-indigo-600 mb-1">Total Assets</p>
                    <p className="text-2xl font-bold">$568K</p>
                    <div className="flex items-center mt-1 text-green-600 text-xs">
                      <BarChartHorizontal className="h-3 w-3 mr-1" /> +5.2% YTD
                    </div>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="text-sm text-amber-600 mb-1">Net Worth</p>
                    <p className="text-2xl font-bold">$448K</p>
                    <div className="flex items-center mt-1 text-green-600 text-xs">
                      <BarChartHorizontal className="h-3 w-3 mr-1" /> +3.8% YTD
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 mb-1">Cash Balance</p>
                    <p className="text-2xl font-bold">$128K</p>
                    <div className="flex items-center mt-1 text-blue-600 text-xs">
                      <BarChartHorizontal className="h-3 w-3 mr-1" /> +1.2% YTD
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 mb-1">Investments</p>
                    <p className="text-2xl font-bold">$340K</p>
                    <div className="flex items-center mt-1 text-green-600 text-xs">
                      <BarChartHorizontal className="h-3 w-3 mr-1" /> +8.5% YTD
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <NotificationsFeed />
            
            {/* Market overview card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Market Snapshot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">S&P 500</span>
                    <div className="flex items-center">
                      <span className="mr-2">4,587.20</span>
                      <div className="flex items-center text-green-500">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        <span className="text-xs">+0.85%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">NASDAQ</span>
                    <div className="flex items-center">
                      <span className="mr-2">14,346.30</span>
                      <div className="flex items-center text-green-500">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        <span className="text-xs">+1.2%</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link to="/market-data" className="block mt-3">
                    <Button variant="outline" size="sm" className="w-full">
                      View Full Market Data
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent activities card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-2 rounded-md hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Portfolio rebalanced</p>
                        <p className="text-xs text-gray-500">Today at 09:45 AM</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2 rounded-md hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Cash deposit received</p>
                        <p className="text-xs text-gray-500">Yesterday at 2:30 PM</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link to="/analyze-wealth" className="block mt-3">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Activity
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
