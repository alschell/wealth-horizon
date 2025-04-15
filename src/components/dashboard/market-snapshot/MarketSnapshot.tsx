
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlusCircle, RefreshCw } from "lucide-react";
import MarketItemsGrid from "./components/items/MarketItemsGrid";
import SectionHeader from "../SectionHeader";
import { toast } from "@/hooks/use-toast";
import { useIndices } from "@/hooks/market-data/useIndices";
import { useQuote } from "@/hooks/market-data/useQuote";
import { formatQuote } from "@/utils/market-data/api";
import type { MarketItem } from "@/types/market";

const MarketSnapshot = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<MarketItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Fetch indices data
  const { data: indicesData, refetch: refetchIndices } = useIndices();
  
  // Fetch a few stocks as examples
  const stocks = ["AAPL", "MSFT", "GOOGL", "AMZN"];
  const { data: appleData, refetch: refetchApple } = useQuote("AAPL");
  const { data: microsoftData, refetch: refetchMicrosoft } = useQuote("MSFT");
  const { data: googleData, refetch: refetchGoogle } = useQuote("GOOGL");
  const { data: amazonData, refetch: refetchAmazon } = useQuote("AMZN");
  
  // Transform data to MarketItem format
  useEffect(() => {
    const marketItems: MarketItem[] = [];
    
    // Add indices
    if (indicesData?.length) {
      indicesData.forEach((index) => {
        if (index.data) {
          marketItems.push({
            id: `index-${index.symbol}`,
            label: index.symbol,
            value: index.data.c.toFixed(2),
            change: `${index.data.dp >= 0 ? '+' : ''}${index.data.dp.toFixed(2)}%`,
            category: "index"
          });
        }
      });
    }
    
    // Add stocks
    const stocksData = [
      { symbol: "AAPL", data: appleData, name: "Apple" },
      { symbol: "MSFT", data: microsoftData, name: "Microsoft" },
      { symbol: "GOOGL", data: googleData, name: "Google" },
      { symbol: "AMZN", data: amazonData, name: "Amazon" }
    ];
    
    stocksData.forEach(stock => {
      if (stock.data) {
        const formattedQuote = formatQuote(stock.data);
        if (formattedQuote) {
          marketItems.push({
            id: `stock-${stock.symbol}`,
            label: stock.name,
            value: `$${formattedQuote.price}`,
            change: `${parseFloat(formattedQuote.percentChange) >= 0 ? '+' : ''}${formattedQuote.percentChange}%`,
            category: "stock"
          });
        }
      }
    });
    
    setItems(marketItems);
    setIsLoading(false);
  }, [indicesData, appleData, microsoftData, googleData, amazonData]);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        refetchIndices(),
        refetchApple(),
        refetchMicrosoft(),
        refetchGoogle(),
        refetchAmazon()
      ]);
      toast({
        title: "Market data refreshed",
        description: "Latest market data has been loaded.",
      });
    } catch (error) {
      toast({
        title: "Failed to refresh market data",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <SectionHeader 
            title="Market Snapshot" 
            subtitle="View real-time market data" 
          />
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8"
              onClick={() => navigate("/market-data")}
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Customize
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <div className="py-8 text-center text-muted-foreground">
            Loading market data...
          </div>
        ) : (
          <MarketItemsGrid items={items} />
        )}
      </CardContent>
    </Card>
  );
};

export default MarketSnapshot;
