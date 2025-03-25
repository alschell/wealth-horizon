
import React, { useState, useEffect } from "react";
import { FinancialAccountInfo, useOnboarding } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Database } from "lucide-react";
import FormHeader from "./common/FormHeader";
import FormFooter from "./common/FormFooter";
import DataSourceTabs from "./data-source/DataSourceTabs";
import AggregatorSelector from "./data-source/AggregatorSelector";

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

  // Load existing accounts
  useEffect(() => {
    if (onboardingData.financialAccounts?.length) {
      setFinancialAccounts(onboardingData.financialAccounts);
    }
  }, [onboardingData.financialAccounts]);

  const handleAggregatorNameChange = (value: string) => {
    setAggregatorInfo({
      ...aggregatorInfo,
      aggregatorName: value
    });
  };

  const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAggregatorInfo({
      ...aggregatorInfo,
      aggregatorCredentials: {
        ...aggregatorInfo.aggregatorCredentials,
        [name]: value
      }
    });
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
    // Only institution and legal entity are required
    if (!account.institution) {
      toast({
        title: "Missing information",
        description: "Please provide the institution name.",
        variant: "destructive"
      });
      return;
    }

    if (!account.legalEntity) {
      toast({
        title: "Missing information",
        description: "Please provide the legal entity name.",
        variant: "destructive"
      });
      return;
    }

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
  
  const handleUpdateAccount = (index: number, account: FinancialAccountInfo) => {
    // Validate required fields
    if (!account.institution) {
      toast({
        title: "Missing information",
        description: "Please provide the institution name.",
        variant: "destructive"
      });
      return;
    }

    if (!account.legalEntity) {
      toast({
        title: "Missing information",
        description: "Please provide the legal entity name.",
        variant: "destructive"
      });
      return;
    }

    const updatedAccounts = [...financialAccounts];
    updatedAccounts[index] = account;
    setFinancialAccounts(updatedAccounts);
    
    // Update in context
    updateFinancialAccount(index, account);
    
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

  // AggregatorRadioGroup Component
  const AggregatorRadioGroup = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">How would you like to provide your financial data?</h3>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div 
            className={`relative flex-1 border rounded-md p-4 cursor-pointer hover:border-black ${
              !aggregatorInfo.usesAggregator ? "border-black bg-gray-50" : "border-gray-200"
            }`}
            onClick={() => handleAggregatorSelection("no")}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  !aggregatorInfo.usesAggregator ? "border-black" : "border-gray-400"
                }`}>
                  {!aggregatorInfo.usesAggregator && <div className="w-2 h-2 rounded-full bg-black" />}
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-black">Manual Entry</h4>
                <p className="text-sm text-gray-600">Add your accounts manually or upload statements</p>
              </div>
            </div>
          </div>
          
          <div 
            className={`relative flex-1 border rounded-md p-4 cursor-pointer hover:border-black ${
              aggregatorInfo.usesAggregator ? "border-black bg-gray-50" : "border-gray-200"
            }`}
            onClick={() => handleAggregatorSelection("yes")}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  aggregatorInfo.usesAggregator ? "border-black" : "border-gray-400"
                }`}>
                  {aggregatorInfo.usesAggregator && <div className="w-2 h-2 rounded-full bg-black" />}
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-black">Use Data Aggregator</h4>
                <p className="text-sm text-gray-600">Connect through a data aggregation service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
          <FormHeader 
            icon={<Database className="h-7 w-7 text-black" />}
            title="Financial Data Source"
            description="Provide information about your financial accounts or connect to a data aggregator."
          />
          
          <AggregatorRadioGroup />
          
          {!aggregatorInfo.usesAggregator ? (
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
          ) : (
            <AggregatorSelector
              aggregatorInfo={aggregatorInfo}
              handleAggregatorNameChange={handleAggregatorNameChange}
              handleCredentialsChange={handleCredentialsChange}
            />
          )}
          
          <FormFooter
            onBack={() => setCurrentStep(3)}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            showRequired={true}
          />
        </form>
      </Card>
    </motion.div>
  );
};

export default DataSourceForm;
