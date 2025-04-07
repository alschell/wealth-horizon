
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "./SectionHeader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

const MarketSnapshot = () => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  
  // Define defaultMarketItems before using it in useState
  const defaultMarketItems = [
    { id: "sp500", label: "S&P 500", value: "4,400.50", change: "+0.25%", emoji: "📈" },
    { id: "nasdaq", label: "Nasdaq", value: "13,630.75", change: "-0.10%", emoji: "📊" },
    { id: "dowjones", label: "Dow Jones", value: "34,500.20", change: "+0.15%", emoji: "📉" },
    { id: "bitcoin", label: "Bitcoin", value: "29,500.00", change: "+1.50%", emoji: "₿" },
    { id: "ethereum", label: "Ethereum", value: "1,850.40", change: "+0.75%", emoji: "Ξ" },
    { id: "gold", label: "Gold", value: "$1,850.20", change: "+0.35%", emoji: "🥇" },
    { id: "oil", label: "Crude Oil", value: "$79.15", change: "-0.60%", emoji: "🛢️" },
    { id: "dollar", label: "US Dollar", value: "1.0870", change: "+0.12%", emoji: "💵" },
    { id: "japan", label: "Nikkei 225", value: "32,450.80", change: "+1.20%", emoji: "🇯🇵" },
    { id: "germany", label: "DAX", value: "15,720.30", change: "+0.22%", emoji: "🇩🇪" },
    { id: "uk", label: "FTSE 100", value: "7,650.10", change: "-0.05%", emoji: "🇬🇧" },
    { id: "china", label: "Shanghai", value: "3,210.40", change: "-0.30%", emoji: "🇨🇳" },
  ];
  
  const [visibleItems, setVisibleItems] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("marketSnapshotVisibleItems");
      return saved ? JSON.parse(saved) : defaultMarketItems.map(item => item.id);
    } catch (e) {
      return defaultMarketItems.map(item => item.id);
    }
  });
  
  const [temporarySelection, setTemporarySelection] = useState<string[]>([]);

  const handleCustomizeOpen = () => {
    setTemporarySelection([...visibleItems]);
    setIsCustomizing(true);
  };

  const handleCustomizeSave = () => {
    setVisibleItems(temporarySelection);
    localStorage.setItem("marketSnapshotVisibleItems", JSON.stringify(temporarySelection));
    setIsCustomizing(false);
  };

  const toggleItem = (id: string) => {
    if (temporarySelection.includes(id)) {
      setTemporarySelection(temporarySelection.filter(item => item !== id));
    } else {
      setTemporarySelection([...temporarySelection, id]);
    }
  };

  // Get filtered items based on visible selection
  const filteredItems = defaultMarketItems.filter(item => visibleItems.includes(item.id));

  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <SectionHeader title="Market Snapshot" />
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={handleCustomizeOpen}
          >
            <Sliders className="h-4 w-4" />
            <span className="sr-only">Customize</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => (
            <div key={index} className="p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center mb-1">
                <span className="text-lg mr-2 w-6 text-center">{item.emoji}</span>
                <p className="text-sm font-medium">{item.label}</p>
              </div>
              <div className="flex flex-col ml-8">
                <p className="text-sm font-mono font-bold">{item.value}</p>
                <p className={`text-xs font-medium ${
                  item.change.startsWith('+') ? 'text-emerald-600' : 'text-red-500'
                }`}>
                  {item.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <Dialog open={isCustomizing} onOpenChange={setIsCustomizing}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Customize Market Snapshot</DialogTitle>
            <DialogDescription>
              Select which market data to display in your snapshot.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {defaultMarketItems.map((item) => (
                <div key={item.id} className="flex items-start space-x-3">
                  <Checkbox 
                    id={`market-${item.id}`}
                    checked={temporarySelection.includes(item.id)}
                    onCheckedChange={() => toggleItem(item.id)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={`market-${item.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <span className="mr-2">{item.emoji}</span>
                      {item.label}
                    </label>
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

export default MarketSnapshot;
