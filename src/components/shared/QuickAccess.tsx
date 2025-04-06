
import React from "react";
import { 
  AreaChart, 
  ArrowRight, 
  BarChart3, 
  Briefcase, 
  Building, 
  FileText, 
  LucideIcon, 
  Newspaper, 
  Pencil, 
  Settings, 
  Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "react-router-dom";

type QuickAccessItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  visibleOn: string[];
};

// Define which items should be visible on which pages
const quickAccessItems: QuickAccessItem[] = [
  {
    title: "Portfolio",
    description: "View your complete portfolio breakdown",
    icon: AreaChart,
    path: "/portfolio",
    visibleOn: ["dashboard", "advice", "market-data", "documents"]
  },
  {
    title: "Advice",
    description: "Review advisory relationships and mandates",
    icon: Briefcase,
    path: "/advice",
    visibleOn: ["dashboard", "portfolio", "market-data", "documents"]
  },
  {
    title: "Market Data",
    description: "Access real-time market information",
    icon: BarChart3,
    path: "/market-data",
    visibleOn: ["dashboard", "portfolio", "advice", "documents"]
  },
  {
    title: "Documents",
    description: "Manage and review all documents",
    icon: FileText,
    path: "/documents",
    visibleOn: ["dashboard", "portfolio", "advice", "market-data"]
  },
  {
    title: "Family Office",
    description: "Manage your family office settings",
    icon: Building,
    path: "/family-office",
    visibleOn: ["dashboard"]
  },
  {
    title: "News",
    description: "Latest financial news and insights",
    icon: Newspaper,
    path: "/news",
    visibleOn: ["dashboard", "market-data"]
  },
  {
    title: "Users",
    description: "Manage access and permissions",
    icon: Users,
    path: "/users",
    visibleOn: ["dashboard", "settings"]
  },
  {
    title: "Reports",
    description: "Generate and view reports",
    icon: FileText,
    path: "/reports",
    visibleOn: ["dashboard", "portfolio"]
  }
];

interface QuickAccessProps {
  pathname?: string;
  customItems?: QuickAccessItem[];
}

const QuickAccess = ({ pathname, customItems }: QuickAccessProps) => {
  const location = useLocation();
  const currentPath = pathname || location.pathname;
  
  // Extract the current page name from the path
  const currentPage = currentPath.split('/')[1] || 'dashboard';
  
  // Filter the quick access items to show only those relevant to the current page
  const filteredItems = customItems || quickAccessItems.filter(item => 
    item.visibleOn.includes(currentPage)
  );
  
  // Limit to 6 items max
  const displayItems = filteredItems.slice(0, 6);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Quick Access</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
        >
          <Pencil className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Customize</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {displayItems.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <item.icon className="h-4 w-4 text-gray-600" />
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <p className="text-xs text-gray-500 mt-1">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;
