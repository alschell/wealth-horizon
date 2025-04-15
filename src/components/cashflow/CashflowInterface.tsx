
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CashflowOverview from "./sections/CashflowOverview";
import LiquidityPlanner from "./sections/LiquidityPlanner";
import TermDeposits from "./sections/TermDeposits";
import RecurringPayments from "./sections/RecurringPayments";
import { BarChart, Calendar, Wallet, CircleDollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const CashflowInterface = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="overflow-hidden border border-gray-200">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-gray-50 p-1 border-b">
              <TabsList className="grid grid-cols-1 sm:grid-cols-4 w-full">
                <TabsTrigger 
                  value="overview" 
                  className="flex items-center justify-center gap-2 py-3 data-[state=active]:bg-white"
                >
                  <BarChart className="h-4 w-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="planner" 
                  className="flex items-center justify-center gap-2 py-3 data-[state=active]:bg-white"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Liquidity Planner</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="recurring" 
                  className="flex items-center justify-center gap-2 py-3 data-[state=active]:bg-white"
                >
                  <Wallet className="h-4 w-4" />
                  <span>Recurring Payments</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="deposits" 
                  className="flex items-center justify-center gap-2 py-3 data-[state=active]:bg-white"
                >
                  <CircleDollarSign className="h-4 w-4" />
                  <span>Term Deposits</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-6">
              <TabsContent value="overview" className="mt-0 pt-0 animate-in fade-in-50 duration-300">
                <CashflowOverview />
              </TabsContent>
              
              <TabsContent value="planner" className="mt-0 pt-0 animate-in fade-in-50 duration-300">
                <LiquidityPlanner />
              </TabsContent>
              
              <TabsContent value="recurring" className="mt-0 pt-0 animate-in fade-in-50 duration-300">
                <RecurringPayments />
              </TabsContent>
              
              <TabsContent value="deposits" className="mt-0 pt-0 animate-in fade-in-50 duration-300">
                <TermDeposits />
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </motion.div>
    </div>
  );
};

export default CashflowInterface;
