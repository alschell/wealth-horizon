
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, Clock, CheckCircle } from "lucide-react";
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Trading Dashboard</h1>
        <Button onClick={handleStartNewTrade} className="flex items-center gap-2">
          <PlusCircle size={16} />
          Start New Trade
        </Button>
      </div>
      
      <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 py-3 border-b bg-gray-50">
            <TabsList className="grid w-[400px] grid-cols-2">
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Clock size={16} />
                Pending Trades
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <CheckCircle size={16} />
                Trade History
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="pending" className="p-4">
            <PendingTradesList />
          </TabsContent>
          
          <TabsContent value="completed" className="p-4">
            <PastTradesList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TradingDashboard;
