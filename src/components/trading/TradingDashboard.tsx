
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, Clock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import PendingTradesList from "./dashboard/PendingTradesList";
import PastTradesList from "./dashboard/PastTradesList";
import { useNavigate } from "react-router-dom";

const TradingDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const navigate = useNavigate();

  const handleStartNewTrade = () => {
    navigate("/trading/new");
  };
  
  return (
    <div className="max-w-7xl mx-auto w-full p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-black">Trading</h1>
          <p className="text-gray-500 mt-1">
            Manage trades, view trade history, and execute new orders
          </p>
        </div>
        <div>
          <Button onClick={handleStartNewTrade} className="flex items-center gap-2">
            <PlusCircle size={16} />
            Start New Trade
          </Button>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-64 mb-8">
            <TabsTrigger value="pending" className="text-sm flex items-center gap-2">
              <Clock size={14} />
              Pending Trades
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-sm flex items-center gap-2">
              <CheckCircle size={14} />
              Trade History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="mt-0">
            <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
              <div className="p-4">
                <PendingTradesList />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
              <div className="p-4">
                <PastTradesList />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default TradingDashboard;
