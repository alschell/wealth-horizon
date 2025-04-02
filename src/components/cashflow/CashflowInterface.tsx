
import React, { useState } from "react";
import CashflowHeader from "./components/CashflowHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CashflowOverview from "./sections/CashflowOverview";
import LiquidityPlanner from "./sections/LiquidityPlanner";
import TermDeposits from "./sections/TermDeposits";
import RecurringPayments from "./sections/RecurringPayments";

const CashflowInterface = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <CashflowHeader />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full max-w-3xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="planner">Liquidity Planner</TabsTrigger>
          <TabsTrigger value="recurring">Recurring Payments</TabsTrigger>
          <TabsTrigger value="deposits">Term Deposits</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <CashflowOverview />
        </TabsContent>
        
        <TabsContent value="planner">
          <LiquidityPlanner />
        </TabsContent>
        
        <TabsContent value="recurring">
          <RecurringPayments />
        </TabsContent>
        
        <TabsContent value="deposits">
          <TermDeposits />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CashflowInterface;
