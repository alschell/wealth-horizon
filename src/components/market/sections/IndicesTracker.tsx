
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { TrendingUp, TrendingDown, Star, LineChart, Filter, Bell } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const IndicesTracker = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [subscribedIndices, setSubscribedIndices] = useState<string[]>(["S&P 500", "NASDAQ"]);
  
  // Mock data - would come from API in real app
  const indices = [
    { id: "1", name: "S&P 500", value: "4,587.20", change: 0.85, volume: "2.3B", region: "US" },
    { id: "2", name: "NASDAQ", value: "14,346.30", change: 1.2, volume: "1.9B", region: "US" },
    { id: "3", name: "Dow Jones", value: "36,124.56", change: 0.32, volume: "954M", region: "US" },
    { id: "4", name: "Russell 2000", value: "2,062.85", change: 1.74, volume: "845M", region: "US" },
    { id: "5", name: "FTSE 100", value: "7,582.10", change: -0.32, volume: "654M", region: "Europe" },
    { id: "6", name: "DAX", value: "15,947.80", change: -0.15, volume: "734M", region: "Europe" },
    { id: "7", name: "CAC 40", value: "7,185.35", change: -0.45, volume: "523M", region: "Europe" },
    { id: "8", name: "Nikkei 225", value: "37,156.45", change: 1.45, volume: "1.1B", region: "Asia" },
    { id: "9", name: "Hang Seng", value: "17,418.95", change: -0.86, volume: "1.5B", region: "Asia" },
    { id: "10", name: "Shanghai", value: "3,039.15", change: 0.47, volume: "23.2B", region: "Asia" },
  ];
  
  const filteredIndices = indices.filter(index => {
    if (filter !== "all" && index.region !== filter) return false;
    if (searchTerm && !index.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });
  
  const toggleSubscription = (indexName: string) => {
    if (subscribedIndices.includes(indexName)) {
      setSubscribedIndices(subscribedIndices.filter(name => name !== indexName));
    } else {
      setSubscribedIndices([...subscribedIndices, indexName]);
    }
  };
  
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

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold">Global Indices</h2>
            <Badge variant="outline" className="text-xs">Live</Badge>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={filter === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button 
              variant={filter === "US" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("US")}
            >
              US
            </Button>
            <Button 
              variant={filter === "Europe" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("Europe")}
            >
              Europe
            </Button>
            <Button 
              variant={filter === "Asia" ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter("Asia")}
            >
              Asia
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Input 
              placeholder="Search indices..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-3 bg-white w-full" 
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Highest Value</DropdownMenuItem>
              <DropdownMenuItem>Biggest Gainers</DropdownMenuItem>
              <DropdownMenuItem>Biggest Losers</DropdownMenuItem>
              <DropdownMenuItem>Highest Volume</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>
      
      <motion.div variants={item}>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Index</TableHead>
                  <TableHead>Last Price</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead className="hidden md:table-cell">Volume</TableHead>
                  <TableHead className="hidden md:table-cell">Region</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIndices.map((index) => (
                  <TableRow key={index.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{index.name}</TableCell>
                    <TableCell>{index.value}</TableCell>
                    <TableCell>
                      <div className={`flex items-center ${
                        index.change >= 0 ? "text-green-500" : "text-red-500"
                      }`}>
                        {index.change >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        <span>
                          {index.change >= 0 ? "+" : ""}{index.change}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{index.volume}</TableCell>
                    <TableCell className="hidden md:table-cell">{index.region}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <LineChart className="h-4 w-4" />
                          <span className="sr-only">View chart</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`h-8 w-8 p-0 ${subscribedIndices.includes(index.name) ? 'text-amber-500' : ''}`}
                          onClick={() => toggleSubscription(index.name)}
                        >
                          <Star className="h-4 w-4" fill={subscribedIndices.includes(index.name) ? "currentColor" : "none"} />
                          <span className="sr-only">
                            {subscribedIndices.includes(index.name) ? 'Unsubscribe' : 'Subscribe'}
                          </span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Index Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Select an index to view detailed performance chart</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Your Subscriptions</CardTitle>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Bell className="h-4 w-4" />
                <span className="text-xs">Manage Alerts</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {subscribedIndices.length > 0 ? (
              <div className="space-y-4">
                {indices
                  .filter(index => subscribedIndices.includes(index.name))
                  .map(index => (
                    <div key={index.id} className="flex justify-between items-center py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">{index.name}</p>
                        <p className="text-xs text-gray-500">{index.region}</p>
                      </div>
                      <div className={`flex items-center ${
                        index.change >= 0 ? "text-green-500" : "text-red-500"
                      }`}>
                        {index.change >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        <span>
                          {index.change >= 0 ? "+" : ""}{index.change}%
                        </span>
                      </div>
                    </div>
                  ))
                }
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <Star className="h-8 w-8 text-gray-300 mb-2" />
                <p className="text-gray-500">No subscriptions yet</p>
                <p className="text-xs text-gray-400 mt-1">Click the star icon to add indices to your watchlist</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default IndicesTracker;
