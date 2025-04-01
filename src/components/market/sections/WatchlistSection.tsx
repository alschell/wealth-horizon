
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { TrendingUp, TrendingDown, LineChart, Star, Plus, Search, BellRing, BellOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WatchlistSection = () => {
  // State for tabs and watchlists
  const [activeTab, setActiveTab] = useState("stocks");
  const [activeWatchlist, setActiveWatchlist] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock watchlist data - would come from API in real app
  const watchlists = [
    { id: "default", name: "Default Watchlist" },
    { id: "tech", name: "Tech Stocks" },
    { id: "dividends", name: "Dividend Payers" },
  ];
  
  const watchlistItems = {
    stocks: [
      { id: "1", symbol: "AAPL", name: "Apple Inc.", price: "183.27", change: 1.25, subscribed: true },
      { id: "2", symbol: "MSFT", name: "Microsoft Corp.", price: "406.32", change: 0.78, subscribed: true },
      { id: "3", symbol: "GOOGL", name: "Alphabet Inc.", price: "145.12", change: -0.45, subscribed: true },
      { id: "4", symbol: "AMZN", name: "Amazon.com Inc.", price: "178.89", change: 2.12, subscribed: false },
      { id: "5", symbol: "NVDA", name: "NVIDIA Corp.", price: "875.27", change: 3.45, subscribed: false },
    ],
    indices: [
      { id: "1", symbol: "SPX", name: "S&P 500", price: "4,587.20", change: 0.85, subscribed: true },
      { id: "2", symbol: "NDX", name: "Nasdaq 100", price: "15,874.56", change: 1.1, subscribed: true },
      { id: "3", symbol: "DJI", name: "Dow Jones Industrial", price: "36,124.56", change: 0.32, subscribed: false },
    ],
    crypto: [
      { id: "1", symbol: "BTC", name: "Bitcoin", price: "51,234.85", change: -2.15, subscribed: true },
      { id: "2", symbol: "ETH", name: "Ethereum", price: "2,876.42", change: -1.32, subscribed: false },
    ],
  };
  
  // Filter items based on search
  const filteredItems = watchlistItems[activeTab as keyof typeof watchlistItems].filter(item => {
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase()) && !item.symbol.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Toggle subscription
  const toggleSubscription = (id: string) => {
    // In a real app, this would update the state through an API call
    console.log(`Toggling subscription for item ${id}`);
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">My Watchlist</h2>
          <Tabs defaultValue="stocks" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="stocks">Stocks</TabsTrigger>
              <TabsTrigger value="indices">Indices</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white" 
            />
          </div>
          <Button variant="default" size="icon" className="bg-black">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
      
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">My Watchlists</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {watchlists.map(list => (
                <Button 
                  key={list.id}
                  variant={activeWatchlist === list.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveWatchlist(list.id)}
                >
                  <Star className="h-4 w-4 mr-2" />
                  {list.name}
                </Button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create New Watchlist
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>
                {watchlists.find(list => list.id === activeWatchlist)?.name}
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                {filteredItems.length} items
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-semibold">{item.symbol}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <div className={`flex items-center ${
                        item.change >= 0 ? "text-green-500" : "text-red-500"
                      }`}>
                        {item.change >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        <span>
                          {item.change >= 0 ? "+" : ""}{item.change}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <LineChart className="h-4 w-4" />
                          <span className="sr-only">View chart</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`h-8 w-8 p-0 ${item.subscribed ? 'text-blue-500' : ''}`}
                          onClick={() => toggleSubscription(item.id)}
                        >
                          {item.subscribed ? (
                            <BellRing className="h-4 w-4" />
                          ) : (
                            <BellOff className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {item.subscribed ? 'Unsubscribe' : 'Subscribe'}
                          </span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredItems.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="h-8 w-8 text-gray-300 mb-2" />
                        <p className="text-gray-500">No items found</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {searchTerm ? "Try a different search term" : "Add items to your watchlist"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Select an asset to view performance chart</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredItems.filter(item => item.subscribed).length > 0 ? (
                filteredItems
                  .filter(item => item.subscribed)
                  .map(item => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-0">
                      <div>
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">{item.symbol}</span>
                          <span className="text-sm text-gray-500">{item.name}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Alert on: Price movement &gt;5%
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Active
                      </Badge>
                    </div>
                  ))
                ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <BellOff className="h-8 w-8 text-gray-300 mb-2" />
                  <p className="text-gray-500">No active alerts</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Click the bell icon to set alerts for your watchlist items
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default WatchlistSection;
