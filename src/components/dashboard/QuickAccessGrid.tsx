
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { 
  BarChart3, 
  Wallet, 
  ArrowUpRight, 
  Layers, 
  Briefcase, 
  FileText, 
  Zap,
  ChartBar
} from "lucide-react";

interface QuickAccessItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const QuickAccessItem: React.FC<QuickAccessItemProps> = ({
  title,
  description,
  icon,
  href,
}) => (
  <Link to={href}>
    <Card className="p-4 hover:shadow-md transition-all h-full flex flex-col">
      <div className="mb-2 text-primary">{icon}</div>
      <h3 className="text-sm font-medium mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </Card>
  </Link>
);

const QuickAccessGrid: React.FC = () => {
  const quickAccessItems = [
    {
      title: "Trading",
      description: "Execute trades across multiple portfolios",
      icon: <BarChart3 size={24} />,
      href: "/trading",
    },
    {
      title: "Wealth Analysis",
      description: "Comprehensive view of your assets",
      icon: <ChartBar size={24} />,
      href: "/analyze-wealth",
    },
    {
      title: "Cashflow",
      description: "Manage liquidity and cash positions",
      icon: <Wallet size={24} />,
      href: "/cashflow",
    },
    {
      title: "Market Data",
      description: "Real-time market information",
      icon: <ArrowUpRight size={24} />,
      href: "/market-data",
    },
    {
      title: "Portfolio Scenarios",
      description: "Run what-if analysis on your portfolios",
      icon: <Layers size={24} />,
      href: "/portfolio-scenarios",
    },
    {
      title: "Advice",
      description: "Investment advice and recommendations",
      icon: <Briefcase size={24} />,
      href: "/advice",
    },
    {
      title: "Reporting",
      description: "Custom reports and analytics",
      icon: <FileText size={24} />,
      href: "/reporting",
    },
    {
      title: "AI Assistant",
      description: "Get AI-powered financial insights",
      icon: <Zap size={24} />,
      href: "/ai-assistant",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {quickAccessItems.map((item, index) => (
        <QuickAccessItem key={index} {...item} />
      ))}
    </div>
  );
};

export default QuickAccessGrid;
