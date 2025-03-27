
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, ArrowDown, TrendingUp, Info } from "lucide-react";
import { mockInstruments } from "../data";

const MarketInsights = () => {
  // Get top performers and trending stocks
  const featuredStocks = mockInstruments.slice(0, 5);
  const trendingStocks = mockInstruments.slice(5, 10);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium">Market Insights</h2>
      
      <Tabs defaultValue="featured">
        <TabsList className="mb-4">
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="watchlist">Your Watchlist</TabsTrigger>
        </TabsList>
        
        <TabsContent value="featured">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredStocks.map((stock) => (
              <MarketCard key={stock.id} stock={stock} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="trending">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {trendingStocks.map((stock) => (
              <MarketCard key={stock.id} stock={stock} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="watchlist">
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Info className="h-10 w-10 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No stocks in your watchlist yet</h3>
            <p className="text-gray-500">
              Add stocks to your watchlist to track their performance and get insights.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const MarketCard = ({ stock }: { stock: any }) => {
  const isPositive = Math.random() > 0.5;
  const changePercent = (Math.random() * 3).toFixed(2);
  
  return (
    <Card className="cursor-pointer hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-bold">{stock.symbol}</div>
            <div className="text-sm text-gray-500 truncate" title={stock.name}>
              {stock.name}
            </div>
          </div>
          {isPositive ? (
            <ArrowUp className="h-5 w-5 text-green-500" />
          ) : (
            <ArrowDown className="h-5 w-5 text-red-500" />
          )}
        </div>
        
        <div className="mt-2 font-medium">
          {stock.currentPrice.toLocaleString('en-US', {
            style: 'currency',
            currency: stock.currency
          })}
        </div>
        
        <div className={`text-sm mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{changePercent}%
        </div>
        
        <div className="text-xs text-gray-500 mt-2 flex items-center">
          <TrendingUp className="h-3 w-3 mr-1" />
          {stock.exchange}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketInsights;
