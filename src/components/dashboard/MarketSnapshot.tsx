
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, ChevronRight, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionHeader from "./SectionHeader";
import CustomizeMarketDataDialog, { MarketCategory, MarketItem } from "./CustomizeMarketDataDialog";

// Flag icons for currencies and markets
const getFlagIcon = (code: string) => {
  const flagMap: Record<string, string> = {
    // United States
    "US": "🇺🇸",
    // European Union
    "EU": "🇪🇺",
    // United Kingdom
    "UK": "🇬🇧",
    // Japan
    "JP": "🇯🇵",
    // China
    "CN": "🇨🇳",
    // Germany
    "DE": "🇩🇪",
    // Switzerland
    "CH": "🇨🇭",
    // Australia
    "AU": "🇦🇺",
    // Canada
    "CA": "🇨🇦",
    // Hong Kong
    "HK": "🇭🇰",
    // Singapore
    "SG": "🇸🇬",
    // Default for cryptocurrency/commodities
    "CRYPTO": "💰",
    "GOLD": "🏆",
    "OIL": "🛢️",
  };

  return flagMap[code] || "🌐";
};

// Market categories
const marketCategories: MarketCategory[] = [
  { id: "indices", name: "Stock Indices", description: "Major global stock market indices" },
  { id: "commodities", name: "Commodities", description: "Major global commodities" },
  { id: "crypto", name: "Cryptocurrencies", description: "Major cryptocurrencies" },
  { id: "forex", name: "Forex", description: "Major currency pairs" },
  { id: "bonds", name: "Bonds", description: "Government and corporate bonds" }
];

// All market items
const allMarkets: MarketItem[] = [
  { id: "sp500", name: "S&P 500", value: "5,328.42", change: "+0.83%", isPositive: true, flag: "US", category: "indices" },
  { id: "nasdaq", name: "NASDAQ", value: "16,742.39", change: "+1.24%", isPositive: true, flag: "US", category: "indices" },
  { id: "dow", name: "DOW JONES", value: "39,069.59", change: "-0.21%", isPositive: false, flag: "US", category: "indices" },
  { id: "ftse", name: "FTSE 100", value: "7,930.96", change: "+0.37%", isPositive: true, flag: "UK", category: "indices" },
  { id: "nikkei", name: "NIKKEI 225", value: "39,523.55", change: "+1.05%", isPositive: true, flag: "JP", category: "indices" },
  { id: "dax", name: "DAX", value: "18,236.19", change: "+0.42%", isPositive: true, flag: "DE", category: "indices" },
  { id: "hangseng", name: "HANG SENG", value: "16,512.42", change: "-0.95%", isPositive: false, flag: "HK", category: "indices" },
  { id: "asx", name: "ASX 200", value: "7,784.50", change: "+0.62%", isPositive: true, flag: "AU", category: "indices" },
  { id: "tsx", name: "TSX", value: "21,970.11", change: "+0.45%", isPositive: true, flag: "CA", category: "indices" },
  { id: "sse", name: "SSE", value: "3,045.28", change: "-0.33%", isPositive: false, flag: "CN", category: "indices" },
  { id: "sti", name: "STI", value: "3,212.76", change: "+0.27%", isPositive: true, flag: "SG", category: "indices" },
  { id: "oil", name: "CRUDE OIL", value: "$82.35", change: "+1.34%", isPositive: true, flag: "OIL", category: "commodities" },
  { id: "gold", name: "GOLD", value: "$2,345.70", change: "+0.68%", isPositive: true, flag: "GOLD", category: "commodities" },
  { id: "bitcoin", name: "BITCOIN", value: "$68,432.21", change: "+2.45%", isPositive: true, flag: "CRYPTO", category: "crypto" },
  { id: "eurusd", name: "EUR/USD", value: "1.0892", change: "-0.14%", isPositive: false, flag: "EU", category: "forex" },
  { id: "usdjpy", name: "USD/JPY", value: "151.23", change: "+0.25%", isPositive: true, flag: "JP", category: "forex" },
  { id: "gbpusd", name: "GBP/USD", value: "1.2756", change: "+0.18%", isPositive: true, flag: "UK", category: "forex" },
  { id: "usdchf", name: "USD/CHF", value: "0.8954", change: "-0.32%", isPositive: false, flag: "CH", category: "forex" },
  { id: "ustreas", name: "10Y US TREASURY", value: "4.25%", change: "+0.06", isPositive: true, flag: "US", category: "bonds" },
];

const MarketSnapshot = () => {
  const navigate = useNavigate();
  const [isCustomizing, setIsCustomizing] = React.useState(false);
  
  // Get selected categories from localStorage or default to all
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("marketSelectedCategories");
      return saved ? JSON.parse(saved) : marketCategories.map(c => c.id);
    } catch (e) {
      return marketCategories.map(c => c.id);
    }
  });
  
  // Get ordered items from localStorage or default to original order
  const [orderedItems, setOrderedItems] = React.useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("marketItemsOrder");
      return saved ? JSON.parse(saved) : allMarkets.map(m => m.id);
    } catch (e) {
      return allMarkets.map(m => m.id);
    }
  });
  
  // Filter markets based on selected categories
  const filteredMarkets = React.useMemo(() => {
    return allMarkets.filter(market => 
      selectedCategories.includes(market.category)
    ).sort((a, b) => {
      const aIndex = orderedItems.indexOf(a.id);
      const bIndex = orderedItems.indexOf(b.id);
      
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      
      return aIndex - bIndex;
    });
  }, [selectedCategories, orderedItems]);

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  
  const handleOrderChange = (newOrder: string[]) => {
    setOrderedItems(newOrder);
  };
  
  const saveCustomization = () => {
    localStorage.setItem("marketSelectedCategories", JSON.stringify(selectedCategories));
    localStorage.setItem("marketItemsOrder", JSON.stringify(orderedItems));
    setIsCustomizing(false);
  };

  const handleMarketClick = (marketName: string) => {
    // Navigate to the market data page and pass the selected index
    navigate(`/market-data?index=${encodeURIComponent(marketName)}`);
  };

  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <SectionHeader title="Market Snapshot" />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsCustomizing(true)}
            className="h-8 w-8 p-0"
          >
            <Sliders className="h-4 w-4" />
            <span className="sr-only">Customize</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-grow h-[165px]">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredMarkets.map((market, index) => (
              <div 
                key={market.id} 
                className="p-3 border border-gray-100 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleMarketClick(market.name)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{getFlagIcon(market.flag)}</span>
                  <p className="text-sm font-medium">{market.name}</p>
                </div>
                <p className="text-base font-semibold ml-7 mt-1">{market.value}</p>
                <div className="flex items-center mt-1 ml-7">
                  <span className={`text-xs flex items-center ${market.isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                    {market.isPositive ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                    {market.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="mt-auto pt-4">
          <Link to="/market-data">
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
              View All Market Data
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>

        <CustomizeMarketDataDialog
          isOpen={isCustomizing}
          onOpenChange={setIsCustomizing}
          selectedCategories={selectedCategories}
          allCategories={marketCategories}
          marketItems={allMarkets}
          orderedItems={orderedItems}
          onCategoryToggle={toggleCategory}
          onOrderChange={handleOrderChange}
          onSave={saveCustomization}
        />
      </CardContent>
    </Card>
  );
};

export default MarketSnapshot;
