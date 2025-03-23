
import React, { useState } from "react";
import { useOnboarding, AggregatorInfo, FinancialAccountInfo } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, BarChart4, Wallet, Upload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CustomSelect } from "@/components/ui/custom-select";
import { AGGREGATORS } from "./constants/formOptions";
import ManualEntrySection from "./ManualEntrySection";
import FileUploadSection from "./FileUploadSection";

const DataSourceForm = () => {
  const { 
    onboardingData, 
    updateAggregatorInfo, 
    addFinancialAccount,
    removeFinancialAccount,
    setCurrentStep 
  } = useOnboarding();
  
  const [aggregatorInfo, setAggregatorInfo] = useState<AggregatorInfo>(onboardingData.aggregatorInfo);
  const [financialAccounts, setFinancialAccounts] = useState<FinancialAccountInfo[]>(onboardingData.financialAccounts);
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

  const handleAggregatorNameChange = (name: string) => {
    setAggregatorInfo({
      ...aggregatorInfo,
      aggregatorName: name,
      aggregatorCredentials: { username: "" }
    });
  };

  const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAggregatorInfo({
      ...aggregatorInfo,
      aggregatorCredentials: {
        ...aggregatorInfo.aggregatorCredentials!,
        [name]: value
      }
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
          <div className="flex items-center gap-3 mb-2">
            <BarChart4 className="h-7 w-7 text-blue-600" />
            <h2 className="text-2xl font-bold">Financial Data Source</h2>
          </div>
          <p className="text-gray-500">
            Please tell us how you'd like to provide your financial information.
          </p>

          <div className="space-y-4">
            <Label>Does your family office currently use a financial data aggregator?</Label>
            <RadioGroup
              value={aggregatorInfo.usesAggregator ? "yes" : "no"}
              onValueChange={handleAggregatorSelection}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="aggregator-yes" />
                <Label htmlFor="aggregator-yes" className="cursor-pointer">
                  Yes, we use a financial data aggregator
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="aggregator-no" />
                <Label htmlFor="aggregator-no" className="cursor-pointer">
                  No, we'll provide our financial information directly
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Conditional content based on aggregator usage */}
          {aggregatorInfo.usesAggregator && (
            <div className="space-y-6 border p-4 rounded-md mt-4">
              <div className="space-y-4">
                <Label htmlFor="aggregatorName">Select your aggregator</Label>
                <CustomSelect
                  id="aggregatorName"
                  label=""
                  value={aggregatorInfo.aggregatorName || ""}
                  onChange={handleAggregatorNameChange}
                  placeholder="Select your aggregator"
                  options={AGGREGATORS}
                />
              </div>

              {aggregatorInfo.aggregatorName && (
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-medium text-gray-700">Aggregator Credentials</h3>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username / API Key</Label>
                    <Input
                      id="username"
                      name="username"
                      value={aggregatorInfo.aggregatorCredentials?.username || ""}
                      onChange={handleCredentialsChange}
                      placeholder="Enter your aggregator username"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Secret (optional)</Label>
                    <Input
                      id="apiKey"
                      name="apiKey"
                      type="password"
                      value={aggregatorInfo.aggregatorCredentials?.apiKey || ""}
                      onChange={handleCredentialsChange}
                      placeholder="Enter your aggregator API secret"
                      className="h-11"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Credentials are encrypted and securely stored. We only use them to sync your financial data.
                  </p>
                </div>
              )}
            </div>
          )}

          {!aggregatorInfo.usesAggregator && (
            <div className="space-y-6 border p-4 rounded-md">
              <Tabs 
                defaultValue="manual" 
                value={dataSourceMethod}
                onValueChange={(value) => setDataSourceMethod(value as "manual" | "upload")}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 w-full mb-4">
                  <TabsTrigger value="manual" className="text-center py-2">
                    <Wallet className="h-4 w-4 mr-2" />
                    Manual Entry
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="text-center py-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="manual">
                  <ManualEntrySection 
                    financialAccounts={financialAccounts}
                    addFinancialAccount={handleAddAccount}
                    removeFinancialAccount={handleRemoveAccount}
                  />
                </TabsContent>
                
                <TabsContent value="upload">
                  <FileUploadSection 
                    uploadedFiles={uploadedFiles}
                    handleBulkFilesSelected={handleBulkFilesSelected}
                  />
                </TabsContent>
              </Tabs>
            </div>
          )}

          <div className="pt-4 border-t">
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline"
                size="lg" 
                className="rounded-lg text-gray-700"
                onClick={() => setCurrentStep(3)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                type="submit" 
                size="lg" 
                className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
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
