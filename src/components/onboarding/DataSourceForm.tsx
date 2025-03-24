
import React, { useState } from "react";
import { useOnboarding, AggregatorInfo, FinancialAccountInfo } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  AggregatorSection,
  DataSourceTabs,
  DataSourceFormNavigation,
  DataSourceFormHeader
} from "./data-source";

const DataSourceForm = () => {
  const { 
    onboardingData, 
    updateAggregatorInfo, 
    addFinancialAccount,
    removeFinancialAccount,
    setCurrentStep 
  } = useOnboarding();
  
  const [aggregatorInfo, setAggregatorInfo] = useState<AggregatorInfo>(onboardingData.aggregatorInfo);
  const [financialAccounts, setFinancialAccounts] = useState<FinancialAccountInfo[]>(
    (onboardingData.financialAccounts as unknown as FinancialAccountInfo[]) || []
  );
  const [dataSourceMethod, setDataSourceMethod] = useState<"manual" | "upload">("manual");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const handleAggregatorSelection = (value: string) => {
    setAggregatorInfo({
      ...aggregatorInfo,
      usesAggregator: value === "yes",
      aggregatorName: value === "no" ? undefined : aggregatorInfo.aggregatorName,
      aggregatorCredentials: value === "no" ? undefined : aggregatorInfo.aggregatorCredentials
    });
  };

  const handleAddAccount = (account: FinancialAccountInfo) => {
    const updatedAccounts = [...financialAccounts, account];
    setFinancialAccounts(updatedAccounts);
    addFinancialAccount(account);
  };

  const handleRemoveAccount = (index: number) => {
    const updatedAccounts = financialAccounts.filter((_, i) => i !== index);
    setFinancialAccounts(updatedAccounts);
    removeFinancialAccount(index);
  };

  const handleBulkFilesSelected = (files: File[]) => {
    setUploadedFiles(files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (aggregatorInfo.usesAggregator) {
      if (!aggregatorInfo.aggregatorName || !aggregatorInfo.aggregatorCredentials?.username) {
        toast({
          title: "Missing information",
          description: "Please provide your aggregator details.",
          variant: "destructive"
        });
        return;
      }
    }
    
    updateAggregatorInfo(aggregatorInfo);
    setCurrentStep(5); // Move to beneficial owners step
    
    toast({
      title: "Information saved",
      description: "Financial data source information has been saved successfully.",
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

          <div className="space-y-4">
            <Label className="text-black">Does your family office currently use a financial data aggregator?</Label>
            <RadioGroup
              value={aggregatorInfo.usesAggregator ? "yes" : "no"}
              onValueChange={handleAggregatorSelection}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="aggregator-yes" />
                <Label htmlFor="aggregator-yes" className="cursor-pointer text-black">
                  Yes, we use a financial data aggregator
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="aggregator-no" />
                <Label htmlFor="aggregator-no" className="cursor-pointer text-black">
                  No, we'll provide our financial information directly
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Conditional content based on aggregator usage */}
          {aggregatorInfo.usesAggregator && (
            <div className="space-y-6 border p-4 rounded-md mt-4">
              <AggregatorSection 
                aggregatorInfo={aggregatorInfo}
                setAggregatorInfo={setAggregatorInfo}
              />
            </div>
          )}

          {!aggregatorInfo.usesAggregator && (
            <div className="space-y-6 border p-4 rounded-md">
              <DataSourceTabs 
                dataSourceMethod={dataSourceMethod}
                setDataSourceMethod={setDataSourceMethod}
                financialAccounts={financialAccounts as any}
                handleAddAccount={handleAddAccount as any}
                handleRemoveAccount={handleRemoveAccount}
                uploadedFiles={uploadedFiles}
                handleBulkFilesSelected={handleBulkFilesSelected}
              />
            </div>
          )}

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-6">
              Fields marked with * are required.
            </p>
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline"
                size="lg" 
                className="rounded-lg"
                onClick={() => setCurrentStep(3)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                type="submit" 
                size="lg" 
                className="rounded-lg bg-black hover:bg-gray-800 text-white hover:shadow-md transition-shadow"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default DataSourceForm;
