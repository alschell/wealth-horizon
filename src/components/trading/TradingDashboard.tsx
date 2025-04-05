
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PendingTradesList from "./dashboard/PendingTradesList";
import PastTradesList from "./dashboard/PastTradesList";
import FormHeader from "@/components/onboarding/common/FormHeader";

const TradingDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <FormHeader 
          icon={<TrendingUp className="h-6 w-6" />}
          title="Trading"
          description="View and manage your trades"
        />
        
        <Button asChild className="flex items-center gap-2">
          <Link to="/trading/new">
            <Plus className="h-4 w-4" />
            Place New Trade
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Trades</TabsTrigger>
          <TabsTrigger value="past">Trade History</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4">
          <PendingTradesList />
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          <PastTradesList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradingDashboard;
