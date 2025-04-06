
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
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
  Sliders,
  PieChart,
  LineChart,
  DollarSign,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

const allQuickLinks = [
  {
    title: "Analyze wealth",
    description: "Portfolio analysis tools",
    icon: <PieChart className="h-4 w-4" />,
    link: "/analyze-wealth",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Access market data & news",
    description: "Access market information",
    icon: <LineChart className="h-4 w-4" />,
    link: "/market-data",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Trade",
    description: "Execute investment trades",
    icon: <TrendingUp className="h-4 w-4" />,
    link: "/trading",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Manage credit facilities",
    description: "Manage credit facilities",
    icon: <Building2 className="h-4 w-4" />,
    link: "/credit-facilities",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Get advice",
    description: "Get personalized advice",
    icon: <Lightbulb className="h-4 w-4" />,
    link: "/advice",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Manage cashflow & liquidity",
    description: "Manage liquidity and deposits",
    icon: <DollarSign className="h-4 w-4" />,
    link: "/cashflow-management",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Generate reports",
    description: "Generate financial reports",
    icon: <FileText className="h-4 w-4" />,
    link: "/reporting",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Manage users & permissions",
    description: "Manage user accounts",
    icon: <Users className="h-4 w-4" />,
    link: "/user-management",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Manage integrations",
    description: "Manage connected services",
    icon: <Landmark className="h-4 w-4" />,
    link: "/integrations",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "ESG Investing",
    description: "Sustainable investing metrics",
    icon: <Leaf className="h-4 w-4" />,
    link: "/esg",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Compliance",
    description: "Regulatory compliance tracking",
    icon: <Shield className="h-4 w-4" />,
    link: "/compliance-monitoring",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Tax Optimization",
    description: "Tax planning & efficiency",
    icon: <Calculator className="h-4 w-4" />,
    link: "/tax-optimization",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Entity Management",
    description: "Manage legal structures",
    icon: <Building2 className="h-4 w-4" />,
    link: "/entity-management",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Legacy Planning",
    description: "Succession & estate planning",
    icon: <Scroll className="h-4 w-4" />,
    link: "/legacy-planning",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Client Portal",
    description: "Manage client access",
    icon: <Users className="h-4 w-4" />,
    link: "/client-portal",
    color: "text-gray-500 bg-gray-50"
  },
  {
    title: "Documents",
    description: "Document management",
    icon: <FileText className="h-4 w-4" />,
    link: "/documents",
    color: "text-gray-500 bg-gray-50"
  },
];

interface QuickAccessProps {
  pathname?: string;
}

const QuickAccess = ({ pathname }: QuickAccessProps) => {
  const [isCustomizing, setIsCustomizing] = React.useState(false);
  const [visibleItems, setVisibleItems] = React.useState<string[]>([]);
  const [temporarySelection, setTemporarySelection] = React.useState<string[]>([]);
  
  // Get current page from pathname or default to dashboard
  const currentPage = pathname?.split('/')[1] || 'dashboard';
  
  React.useEffect(() => {
    const savedItems = localStorage.getItem(`quickAccessItems_${currentPage}`);
    if (savedItems) {
      setVisibleItems(JSON.parse(savedItems));
    } else {
      // Default to showing all items
      setVisibleItems(allQuickLinks.map(item => item.title));
    }
  }, [currentPage]);
  
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

  // Filter the quick links based on user selection
  const filteredLinks = allQuickLinks.filter(link => 
    visibleItems.includes(link.title)
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Quick Access</CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCustomizeOpen}
            className="flex items-center gap-1"
          >
            <Sliders className="h-4 w-4 mr-1" />
            Customize
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredLinks.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex flex-col p-3 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              <div className="flex flex-col items-center justify-center">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-50 mb-2">
                  {item.icon}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>

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
              {[...allQuickLinks].sort((a, b) => a.title.localeCompare(b.title)).map((item) => (
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
    </Card>
  );
};

export default QuickAccess;
