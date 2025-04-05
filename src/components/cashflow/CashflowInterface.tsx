
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CashflowOverview from "./sections/CashflowOverview";
import LiquidityPlanner from "./sections/LiquidityPlanner";
import TermDeposits from "./sections/TermDeposits";
import RecurringPayments from "./sections/RecurringPayments";
import { ChartBar, Calendar, Wallet, Coins } from "lucide-react";

const CashflowInterface = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="bg-white p-1.5 rounded-lg border shadow-sm">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="overview" className="flex items-center gap-2 py-3">
              <ChartBar className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="planner" className="flex items-center gap-2 py-3">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Liquidity Planner</span>
            </TabsTrigger>
            <TabsTrigger value="recurring" className="flex items-center gap-2 py-3">
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">Recurring Payments</span>
            </TabsTrigger>
            <TabsTrigger value="deposits" className="flex items-center gap-2 py-3">
              <Coins className="h-4 w-4" />
              <span className="hidden sm:inline">Term Deposits</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <TabsContent value="overview" className="mt-0 pt-0 animate-fade-in">
            <CashflowOverview />
          </TabsContent>
          
          <TabsContent value="planner" className="mt-0 pt-0 animate-fade-in">
            <LiquidityPlanner />
          </TabsContent>
          
          <TabsContent value="recurring" className="mt-0 pt-0 animate-fade-in">
            <RecurringPayments />
          </TabsContent>
          
          <TabsContent value="deposits" className="mt-0 pt-0 animate-fade-in">
            <TermDeposits />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CashflowInterface;
