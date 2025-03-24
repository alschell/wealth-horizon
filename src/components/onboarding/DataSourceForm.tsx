
import React, { useState } from "react";
import { AggregatorInfo, FinancialAccountInfo, useOnboarding } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ManualEntrySection } from "@/components/onboarding";
import {
  DataSourceFormHeader,
  DataSourceFormNavigation,
  AggregatorSection,
  DataSourceTabs
} from "./data-source";

const DataSourceForm = () => {
  const {
    onboardingData,
    updateAggregatorInfo,
    addFinancialAccount,
    removeFinancialAccount,
    setCurrentStep
  } = useOnboarding();

  const [aggregatorInfo, setAggregatorInfo] = useState<AggregatorInfo>(
    onboardingData.aggregatorInfo
  );
  const [activeTab, setActiveTab] = useState<string>(
    aggregatorInfo.usesAggregator ? "aggregator" : "manual"
  );

  const handleAggregatorInfoChange = (info: AggregatorInfo) => {
    setAggregatorInfo(info);
    setActiveTab(info.usesAggregator ? "aggregator" : "manual");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAggregatorInfo(aggregatorInfo);
    
    setCurrentStep(5);
    
    toast({
      title: "Information saved",
      description: "Financial data source information has been saved successfully.",
    });
  };

  const updateFinancialAccount = (index: number, updatedAccount: FinancialAccountInfo) => {
    // Remove the old account and add the updated one
    removeFinancialAccount(index);
    addFinancialAccount(updatedAccount);
    
    toast({
      title: "Account updated",
      description: "Financial account has been updated successfully.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DataSourceFormHeader />
          
          <DataSourceTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            usesAggregator={aggregatorInfo.usesAggregator}
            onAggregatorInfoChange={handleAggregatorInfoChange}
          />
          
          <Tabs value={activeTab} className="w-full">
            <TabsContent value="aggregator" className="mt-6 space-y-6">
              <AggregatorSection
                aggregatorInfo={aggregatorInfo}
                setAggregatorInfo={setAggregatorInfo}
              />
            </TabsContent>
            
            <TabsContent value="manual" className="mt-6 space-y-6">
              <ManualEntrySection
                financialAccounts={onboardingData.financialAccounts}
                addFinancialAccount={addFinancialAccount}
                removeFinancialAccount={removeFinancialAccount}
                updateFinancialAccount={updateFinancialAccount}
              />
            </TabsContent>
          </Tabs>
          
          <DataSourceFormNavigation />
        </form>
      </Card>
    </motion.div>
  );
};

export default DataSourceForm;
