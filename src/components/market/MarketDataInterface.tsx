
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketOverview from "./sections/MarketOverview";
import IndicesTracker from "./sections/IndicesTracker";
import NewsSection from "./sections/NewsSection";
import WatchlistSection from "./sections/WatchlistSection";
import { useLocation, useSearchParams } from "react-router-dom";
import { mockIndices } from "./sections/indices-tracker/data/mockData";

const MarketDataInterface = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Check if we have state from navigation or URL params
  useEffect(() => {
    // Check for state in location
    if (location.state) {
      const { activeTab: tab, articleId } = location.state as { 
        activeTab?: string;
        articleId?: string;
      };
      
      if (tab) {
        setActiveTab(tab);
      }
    }
    
    // Check for index param in URL
    const indexParam = searchParams.get('index');
    if (indexParam) {
      setActiveTab("indices");
    }
  }, [location.state, searchParams]);

  return (
    <div className="max-w-7xl mx-auto w-full p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Tabs 
          defaultValue="overview" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="text-sm">Market Overview</TabsTrigger>
            <TabsTrigger value="indices" className="text-sm">Indices</TabsTrigger>
            <TabsTrigger value="news" className="text-sm">News</TabsTrigger>
            <TabsTrigger value="watchlist" className="text-sm">My Watchlist</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <MarketOverview />
          </TabsContent>
          
          <TabsContent value="indices" className="mt-0">
            <IndicesTracker indices={mockIndices} />
          </TabsContent>
          
          <TabsContent value="news" className="mt-0">
            <NewsSection news={[]} articleId={location.state?.articleId} />
          </TabsContent>
          
          <TabsContent value="watchlist" className="mt-0">
            <WatchlistSection />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default MarketDataInterface;
