
import React, { useState } from "react";
import { AggregatorInfo, FinancialAccountInfo, useOnboarding } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import ManualEntrySection from "@/components/onboarding/ManualEntrySection";
import {
  DataSourceFormHeader,
  DataSourceFormNavigation,
  AggregatorSection,
  DataSourceTabs
} from "./data-source";
import AggregatorRadioGroup from "./data-source/AggregatorRadioGroup";

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
  const [dataSourceMethod, setDataSourceMethod] = useState<"manual" | "upload">("manual");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState<string>(
    aggregatorInfo.usesAggregator ? "aggregator" : "manual"
  );

  const handleAggregatorInfoChange = (info: AggregatorInfo) => {
    setAggregatorInfo(info);
    setActiveTab(info.usesAggregator ? "aggregator" : "manual");
  };

  const handleAggregatorSelection = (value: string) => {
    const usesAggregator = value === "yes";
    setAggregatorInfo({
      ...aggregatorInfo,
      usesAggregator,
      aggregatorName: usesAggregator ? aggregatorInfo.aggregatorName : "",
      aggregatorCredentials: usesAggregator ? aggregatorInfo.aggregatorCredentials : { username: "" }
    });
    setActiveTab(usesAggregator ? "aggregator" : "manual");
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

  const handleBulkFilesSelected = (files: File[]) => {
    setUploadedFiles(files);
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
          
          <AggregatorRadioGroup
            usesAggregator={aggregatorInfo.usesAggregator}
            handleAggregatorSelection={handleAggregatorSelection}
          />
          
          <DataSourceTabs
            dataSourceMethod={dataSourceMethod}
            setDataSourceMethod={setDataSourceMethod}
            financialAccounts={onboardingData.financialAccounts}
            handleAddAccount={addFinancialAccount}
            handleRemoveAccount={removeFinancialAccount}
            uploadedFiles={uploadedFiles}
            handleBulkFilesSelected={handleBulkFilesSelected}
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
          
          <DataSourceFormNavigation
            onBack={() => setCurrentStep(3)}
          />
        </form>
      </Card>
    </motion.div>
  );
};

export default DataSourceForm;
