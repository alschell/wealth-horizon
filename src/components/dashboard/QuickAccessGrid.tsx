
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  PieChart, 
  TrendingUp, 
  DollarSign, 
  LineChart, 
  FileText, 
  Users, 
  Lightbulb,
  Link as LinkIcon,
  CreditCard,
  Settings,
  Edit
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// All available modules
const allModules = [
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
    icon: <Lightbulb className="h-6 w-6" />,
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
    id: "integrations",
    title: "Manage integrations",
    description: "Connect and manage third-party integrations",
    icon: <LinkIcon className="h-6 w-6" />,
    link: "/integrations",
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
    id: "credit-facilities",
    title: "Manage credit facilities",
    description: "Manage and monitor your credit lines and facilities",
    icon: <CreditCard className="h-6 w-6" />,
    link: "/credit-facilities",
    color: "bg-gray-50",
    textColor: "text-gray-600",
    iconColor: "text-gray-500"
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    description: "Get AI-powered insights and recommendations",
    icon: <Lightbulb className="h-6 w-6" />,
    link: "/ai-assistant",
    color: "bg-gray-50",
    textColor: "text-gray-600",
    iconColor: "text-gray-500"
  }
];

const QuickAccessGrid = () => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [selectedModules, setSelectedModules] = useState<string[]>(() => {
    const saved = localStorage.getItem("selectedQuickAccessModules");
    return saved ? JSON.parse(saved) : 
      ["wealth-analysis", "trading", "advisory", "cashflow", "market-data", "reporting", "integrations", "users", "credit-facilities"];
  });

  // Save to localStorage whenever selection changes
  useEffect(() => {
    localStorage.setItem("selectedQuickAccessModules", JSON.stringify(selectedModules));
  }, [selectedModules]);

  // Filter modules based on selected IDs
  const displayedModules = allModules.filter(module => 
    selectedModules.includes(module.id)
  );

  const handleModuleToggle = (moduleId: string) => {
    setSelectedModules(prev => {
      if (prev.includes(moduleId)) {
        return prev.filter(id => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Quick Access</CardTitle>
          <CardDescription>Jump to key sections of your wealth management platform</CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Edit className="h-4 w-4" />
              Customize
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Customize Quick Access</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {allModules.map(module => (
                  <div key={module.id} className="flex items-start space-x-3">
                    <Checkbox 
                      id={module.id} 
                      checked={selectedModules.includes(module.id)} 
                      onCheckedChange={() => handleModuleToggle(module.id)}
                    />
                    <div className="grid gap-1.5">
                      <Label htmlFor={module.id}>{module.title}</Label>
                      <p className="text-sm text-gray-500">{module.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedModules.map(module => (
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
