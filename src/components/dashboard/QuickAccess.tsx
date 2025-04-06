
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUpRight,
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
} from "lucide-react";

const QuickAccess = () => {
  const quickLinks = [
    {
      title: "Reports",
      description: "Generate financial reports",
      icon: <FileText className="h-5 w-5" />,
      link: "/reporting",
      color: "text-blue-500 bg-blue-50"
    },
    {
      title: "Market Data",
      description: "Access market information",
      icon: <BarChart3 className="h-5 w-5" />,
      link: "/market-data",
      color: "text-gray-500 bg-gray-50"
    },
    {
      title: "Integrations",
      description: "Manage connected services",
      icon: <Landmark className="h-5 w-5" />,
      link: "/integrations",
      color: "text-violet-500 bg-violet-50"
    },
    {
      title: "ESG Investing",
      description: "Sustainable investing metrics",
      icon: <Leaf className="h-5 w-5" />,
      link: "/esg",
      color: "text-emerald-500 bg-emerald-50"
    },
    {
      title: "Compliance",
      description: "Regulatory compliance tracking",
      icon: <Shield className="h-5 w-5" />,
      link: "/compliance-monitoring",
      color: "text-slate-500 bg-slate-50"
    },
    {
      title: "Tax Optimization",
      description: "Tax planning & efficiency",
      icon: <Calculator className="h-5 w-5" />,
      link: "/tax-optimization",
      color: "text-indigo-500 bg-indigo-50"
    },
    {
      title: "Entity Management",
      description: "Manage legal structures",
      icon: <Building2 className="h-5 w-5" />,
      link: "/entity-management",
      color: "text-purple-500 bg-purple-50"
    },
    {
      title: "Legacy Planning",
      description: "Succession & estate planning",
      icon: <Scroll className="h-5 w-5" />,
      link: "/legacy-planning",
      color: "text-amber-500 bg-amber-50"
    },
    {
      title: "Client Portal",
      description: "Manage client access",
      icon: <Users className="h-5 w-5" />,
      link: "/client-portal",
      color: "text-sky-500 bg-sky-50"
    },
    {
      title: "Trading",
      description: "Execute investment trades",
      icon: <TrendingUp className="h-5 w-5" />,
      link: "/trading",
      color: "text-green-500 bg-green-50"
    },
    {
      title: "Documents",
      description: "Document management",
      icon: <FileText className="h-5 w-5" />,
      link: "/documents",
      color: "text-blue-500 bg-blue-50"
    },
    {
      title: "Analyze Wealth",
      description: "Portfolio analysis tools",
      icon: <BarChart3 className="h-5 w-5" />,
      link: "/analyze-wealth",
      color: "text-gray-600 bg-gray-50"
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md">Quick Access</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {quickLinks.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex flex-col p-3 rounded-lg hover:bg-gray-50 transition-colors border"
            >
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-full ${item.color}`}>
                  {item.icon}
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAccess;
