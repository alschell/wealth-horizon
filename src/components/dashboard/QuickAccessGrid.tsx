import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3, 
  LineChart, 
  TrendingUp, 
  Banknote, 
  Briefcase, 
  ArrowRightLeft,
  FileText, 
  Building,
  Users,
  Settings,
  Leaf,
  Scroll,
  Calculator,
  Shield,
  Building2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const allActionItems = [
  {
    id: "wealth-analysis",
    icon: BarChart3,
    label: "Analyze wealth",
    path: "/analyze-wealth",
    description: "Wealth analytics and insights"
  },
  {
    id: "market-data",
    icon: LineChart,
    label: "Access market data & news",
    path: "/market-data",
    description: "Real-time market data & news"
  },
  {
    id: "trading",
    icon: TrendingUp,
    label: "Trade",
    path: "/trading",
    description: "Execute trades across portfolios"
  },
  {
    id: "credit",
    icon: Banknote,
    label: "Manage credit facilities",
    path: "/credit-facilities",
    description: "Credit and lending facilities"
  },
  {
    id: "advice",
    icon: Briefcase,
    label: "Get advice",
    path: "/advice",
    description: "Investment advisory mandates"
  },
  {
    id: "cashflow",
    icon: ArrowRightLeft,
    label: "Manage cashflow & liquidity",
    path: "/cashflow",
    description: "Cash and liquidity management"
  },
  {
    id: "reports",
    icon: FileText,
    label: "Generate reports",
    path: "/reporting",
    description: "Custom financial reports"
  },
  {
    id: "users",
    icon: Users,
    label: "Manage users & permissions",
    path: "/dashboard/users",
    description: "User access and permissions"
  },
  {
    id: "integrations",
    icon: Building,
    label: "Manage integrations",
    path: "/integrations",
    description: "Connect to external services"
  },
  {
    id: "client-portal",
    icon: Users,
    label: "Client Portal",
    path: "/client-portal",
    description: "Manage client access"
  },
  {
    id: "esg",
    icon: Leaf,
    label: "ESG Investing",
    path: "/esg",
    description: "Sustainable investing metrics"
  },
  {
    id: "tax-optimization",
    icon: Calculator,
    label: "Tax Optimization",
    path: "/tax-optimization",
    description: "Tax planning & efficiency"
  },
  {
    id: "legacy-planning",
    icon: Scroll,
    label: "Legacy Planning",
    path: "/legacy-planning",
    description: "Succession & estate planning"
  },
  {
    id: "entity-management",
    icon: Building2,
    label: "Entity Management",
    path: "/entity-management",
    description: "Manage legal structures"
  },
  {
    id: "compliance",
    icon: Shield,
    label: "Compliance Monitoring",
    path: "/compliance-monitoring",
    description: "Regulatory compliance tracking"
  },
  {
    id: "documents",
    icon: FileText,
    label: "Documents",
    path: "/documents",
    description: "Document management"
  }
];

const QuickAccessGrid = () => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [temporarySelection, setTemporarySelection] = useState<string[]>([]);

  useEffect(() => {
    const savedItems = localStorage.getItem("quickAccessVisibleItems");
    if (savedItems) {
      setVisibleItems(JSON.parse(savedItems));
    } else {
      setVisibleItems(allActionItems.slice(0, 9).map(item => item.id));
    }
  }, []);

  const handleCustomizeOpen = () => {
    setTemporarySelection([...visibleItems]);
    setIsCustomizing(true);
  };

  const handleCustomizeSave = () => {
    setVisibleItems(temporarySelection);
    localStorage.setItem("quickAccessVisibleItems", JSON.stringify(temporarySelection));
    setIsCustomizing(false);
  };

  const handleCustomizeCancel = () => {
    setIsCustomizing(false);
  };

  const toggleItem = (id: string) => {
    if (temporarySelection.includes(id)) {
      setTemporarySelection(temporarySelection.filter(item => item !== id));
    } else {
      setTemporarySelection([...temporarySelection, id]);
    }
  };

  const filteredItems = allActionItems.filter(item => 
    visibleItems.includes(item.id)
  );

  return (
    <Card>
      <CardHeader className="px-6 pt-6 pb-4 flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-xl">Quick Access</CardTitle>
          <CardDescription>Frequently used features and tools</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleCustomizeOpen}>
          Customize
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filteredItems.map((item, index) => (
            <Link to={item.path} key={item.id}>
              <div className="h-full flex flex-col items-center justify-start p-4 text-center transition-all duration-200 hover:bg-gray-50 rounded-md">
                <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center mb-3 mt-2">
                  <item.icon className="h-5 w-5 text-gray-700" />
                </div>
                <h3 className="font-medium text-sm mb-1">{item.label}</h3>
                <p className="text-xs text-gray-500">{item.description}</p>
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
              {allActionItems.map((item) => (
                <div key={item.id} className="flex items-start space-x-3">
                  <Checkbox 
                    id={`item-${item.id}`}
                    checked={temporarySelection.includes(item.id)}
                    onCheckedChange={() => toggleItem(item.id)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={`item-${item.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {item.label}
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
            <Button variant="outline" onClick={handleCustomizeCancel}>Cancel</Button>
            <Button onClick={handleCustomizeSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default QuickAccessGrid;
