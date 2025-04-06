
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
  Sliders, 
  Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [isCustomizing, setIsCustomizing] = React.useState(false);
  const [visibleItems, setVisibleItems] = React.useState<string[]>([]);
  const [temporarySelection, setTemporarySelection] = React.useState<string[]>([]);
  
  // Extract the current page name from the path
  const currentPage = currentPath.split('/')[1] || 'dashboard';
  
  React.useEffect(() => {
    const savedItems = localStorage.getItem(`quickAccessItems_${currentPage}`);
    if (savedItems) {
      setVisibleItems(JSON.parse(savedItems));
    } else {
      // Default to showing all items relevant for this page
      const defaultVisible = quickAccessItems
        .filter(item => item.visibleOn.includes(currentPage))
        .map(item => item.title);
      setVisibleItems(defaultVisible);
    }
  }, [currentPage]);
  
  // Filter the quick access items to show only those selected by the user or relevant to the current page
  const filteredItems = customItems || quickAccessItems.filter(item => 
    item.visibleOn.includes(currentPage) && visibleItems.includes(item.title)
  );
  
  // Limit to 6 items max
  const displayItems = filteredItems.slice(0, 6);

  const handleCustomizeOpen = () => {
    setTemporarySelection([...visibleItems]);
    setIsCustomizing(true);
  };

  const handleCustomizeSave = () => {
    setVisibleItems(temporarySelection);
    localStorage.setItem(`quickAccessItems_${currentPage}`, JSON.stringify(temporarySelection));
    setIsCustomizing(false);
  };

  const toggleItem = (title: string) => {
    if (temporarySelection.includes(title)) {
      setTemporarySelection(temporarySelection.filter(item => item !== title));
    } else {
      setTemporarySelection([...temporarySelection, title]);
    }
  };

  const availableItems = quickAccessItems.filter(item => 
    item.visibleOn.includes(currentPage)
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Quick Access</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={handleCustomizeOpen}
        >
          <Sliders className="h-3.5 w-3.5" />
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

      <Dialog open={isCustomizing} onOpenChange={setIsCustomizing}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Customize Quick Access</DialogTitle>
            <DialogDescription>
              Select the items you want to show in your Quick Access grid.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto py-4">
            <div className="space-y-4">
              {availableItems.map((item) => (
                <div key={item.title} className="flex items-start space-x-3">
                  <Checkbox 
                    id={`item-${item.title}`}
                    checked={temporarySelection.includes(item.title)}
                    onCheckedChange={() => toggleItem(item.title)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={`item-${item.title}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.title}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCustomizing(false)}>Cancel</Button>
            <Button onClick={handleCustomizeSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuickAccess;
