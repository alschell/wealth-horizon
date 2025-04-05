
import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, LineChart, PieChart, DollarSign, 
  FileText, Briefcase, BarChart, Leaf, Users, Lightning
} from "lucide-react";

const QuickAccessGrid = () => {
  const quickAccess = [
    {
      title: "Analyze Wealth",
      description: "View detailed analysis of your assets and liabilities",
      icon: <PieChart className="h-8 w-8 text-blue-600" />,
      link: "/analyze-wealth",
      color: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-100 dark:border-blue-800/30"
    },
    {
      title: "Portfolio Scenarios",
      description: "Run simulations to test portfolio performance",
      icon: <Lightning className="h-8 w-8 text-purple-600" />,
      link: "/portfolio-scenarios",
      color: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-100 dark:border-purple-800/30",
      isNew: true
    },
    {
      title: "Trade",
      description: "Execute trades across multiple accounts",
      icon: <Briefcase className="h-8 w-8 text-gray-600" />,
      link: "/trading",
      color: "bg-gray-50 dark:bg-gray-800",
      borderColor: "border-gray-100 dark:border-gray-700"
    },
    {
      title: "Cash Management",
      description: "Manage liquidity across all accounts",
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      link: "/cashflow",
      color: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-100 dark:border-green-800/30"
    },
    {
      title: "Market Data",
      description: "Access market data and research",
      icon: <LineChart className="h-8 w-8 text-indigo-600" />,
      link: "/market-data",
      color: "bg-indigo-50 dark:bg-indigo-900/20",
      borderColor: "border-indigo-100 dark:border-indigo-800/30"
    },
    {
      title: "Reports",
      description: "Generate and view reports",
      icon: <FileText className="h-8 w-8 text-orange-600" />,
      link: "/reporting",
      color: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-100 dark:border-orange-800/30"
    },
    {
      title: "ESG Analysis",
      description: "Analyze environmental, social & governance impact",
      icon: <Leaf className="h-8 w-8 text-emerald-600" />,
      link: "/esg-analysis",
      color: "bg-emerald-50 dark:bg-emerald-900/20",
      borderColor: "border-emerald-100 dark:border-emerald-800/30",
      isNew: true
    },
    {
      title: "Wealth Transfer",
      description: "Plan for generational wealth transfer",
      icon: <Users className="h-8 w-8 text-amber-600" />,
      link: "/wealth-transfer",
      color: "bg-amber-50 dark:bg-amber-900/20",
      borderColor: "border-amber-100 dark:border-amber-800/30",
      isNew: true
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickAccess.map((item, index) => (
        <Link
          to={item.link}
          key={index}
          className={`group p-4 rounded-lg border ${item.borderColor} ${item.color} relative hover:shadow-md transition-all duration-200`}
        >
          {item.isNew && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              New
            </span>
          )}
          <div className="flex flex-col h-full">
            <div className="mb-2">{item.icon}</div>
            <h3 className="font-medium mb-1">{item.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{item.description}</p>
            <div className="mt-auto flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
              <span className="mr-1 group-hover:mr-2 transition-all">Explore</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuickAccessGrid;
