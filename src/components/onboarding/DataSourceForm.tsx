
import React, { useState } from "react";
import { FinancialAccountInfo, useOnboarding } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import DataSourceTabs from "./data-source/DataSourceTabs";
import {
  DataSourceFormHeader,
  DataSourceFormNavigation,
  AggregatorSection,
  AggregatorRadioGroup
} from "./data-source";

const DataSourceForm = () => {
  const {
    onboardingData,
    updateAggregatorInfo,
    addFinancialAccount,
    removeFinancialAccount,
    updateFinancialAccount,
    setCurrentStep
  } = useOnboarding();

  const [aggregatorInfo, setAggregatorInfo] = useState({
    ...onboardingData.aggregatorInfo
  });
  
  const [dataSourceMethod, setDataSourceMethod] = useState<"manual" | "upload">("manual");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [financialAccounts, setFinancialAccounts] = useState<FinancialAccountInfo[]>(
    onboardingData.financialAccounts || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAggregatorInfoChange = (info: typeof aggregatorInfo) => {
    setAggregatorInfo(info);
  };

  const handleAggregatorSelection = (value: string) => {
    const usesAggregator = value === "yes";
    setAggregatorInfo({
      ...aggregatorInfo,
      usesAggregator,
      aggregatorName: usesAggregator ? aggregatorInfo.aggregatorName : "",
      aggregatorCredentials: usesAggregator 
        ? aggregatorInfo.aggregatorCredentials 
        : { username: "" }
    });
  };
  
  const handleAddAccount = (account: FinancialAccountInfo) => {
    const newAccounts = [...financialAccounts, account];
    setFinancialAccounts(newAccounts);
    
    // Also update in context
    addFinancialAccount(account);
    
    toast({
      title: "Account added",
      description: "Financial account has been added successfully."
    });
  };
  
  const handleRemoveAccount = (index: number) => {
    const newAccounts = [...financialAccounts];
    newAccounts.splice(index, 1);
    setFinancialAccounts(newAccounts);
    
    // Also update in context
    removeFinancialAccount(index);
    
    toast({
      title: "Account removed",
      description: "Financial account has been removed successfully."
    });
  };
  
  const handleUpdateAccount = (index: number, updatedAccount: FinancialAccountInfo) => {
    const newAccounts = [...financialAccounts];
    newAccounts[index] = updatedAccount;
    setFinancialAccounts(newAccounts);
    
    // Also update in context if it exists
    if (typeof updateFinancialAccount === 'function') {
      updateFinancialAccount(index, updatedAccount);
    } else {
      // Fallback approach if updateFinancialAccount doesn't exist
      removeFinancialAccount(index);
      addFinancialAccount(updatedAccount);
    }
    
    toast({
      title: "Account updated",
      description: "Financial account has been updated successfully."
    });
  };
  
  const handleBulkFilesSelected = (files: File[]) => {
    setUploadedFiles(files);
    
    toast({
      title: "Files uploaded",
      description: `${files.length} file(s) have been uploaded.`
    });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Validate the form based on aggregator selection
      if (aggregatorInfo.usesAggregator) {
        if (!aggregatorInfo.aggregatorName) {
          toast({
            title: "Missing information",
            description: "Please select an aggregator service.",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }
        
        if (!aggregatorInfo.aggregatorCredentials?.username) {
          toast({
            title: "Missing information",
            description: "Please provide aggregator credentials.",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }
      } else {
        // If not using aggregator, validate based on selected method
        if (dataSourceMethod === "manual" && financialAccounts.length === 0) {
          toast({
            title: "Missing information",
            description: "Please add at least one financial account.",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }
        
        if (dataSourceMethod === "upload" && uploadedFiles.length === 0) {
          toast({
            title: "Missing information",
            description: "Please upload at least one financial document.",
            variant: "destructive"
          });
          setIsSubmitting(false);
          return;
        }
      }
      
      // Save the data
      updateAggregatorInfo(aggregatorInfo);
      
      // Move to the next step
      setCurrentStep(5);
      
      toast({
        title: "Information saved",
        description: "Financial data source information has been saved successfully."
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "An error occurred",
        description: "There was a problem saving your information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="p-6 md:p-8 shadow-sm">
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
          <DataSourceFormHeader />
          
          <AggregatorRadioGroup
            usesAggregator={aggregatorInfo.usesAggregator}
            handleAggregatorSelection={handleAggregatorSelection}
          />
          
          {!aggregatorInfo.usesAggregator && (
            <DataSourceTabs
              dataSourceMethod={dataSourceMethod}
              setDataSourceMethod={setDataSourceMethod}
              financialAccounts={financialAccounts}
              handleAddAccount={handleAddAccount}
              handleRemoveAccount={handleRemoveAccount}
              handleUpdateAccount={handleUpdateAccount}
              uploadedFiles={uploadedFiles}
              handleBulkFilesSelected={handleBulkFilesSelected}
            />
          )}
          
          {aggregatorInfo.usesAggregator && (
            <AggregatorSection
              aggregatorInfo={aggregatorInfo}
              setAggregatorInfo={handleAggregatorInfoChange}
            />
          )}
          
          <DataSourceFormNavigation
            onBack={() => setCurrentStep(3)}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
        </form>
      </Card>
    </motion.div>
  );
};

export default DataSourceForm;
