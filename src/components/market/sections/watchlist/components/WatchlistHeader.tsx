
import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus } from "lucide-react";
import { WatchlistHeaderProps } from "../types";

/**
 * Header component for the Watchlist section
 * Includes title, tabs, search, and add button
 * 
 * @param props - Component properties
 * @returns Watchlist header component
 */
const WatchlistHeader: React.FC<WatchlistHeaderProps> = ({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  item
}) => {
  return (
    <motion.div 
      variants={item} 
      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
    >
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
  );
};

export default WatchlistHeader;
