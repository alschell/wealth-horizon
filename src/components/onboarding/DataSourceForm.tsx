
import React, { useState, useEffect } from "react";
import { FinancialAccountInfo, useOnboarding } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Wallet, Upload, Database } from "lucide-react";
import FormHeader from "./common/FormHeader";
import FormFooter from "./common/FormFooter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AccountFormHeader,
  AccountFormButton
} from "./accounts/form";
import {
  AccountForm,
  AccountList
} from "./accounts/entry";

// Aggregator Components
const AggregatorRadioGroup = ({ usesAggregator, handleAggregatorSelection }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">How would you like to provide your financial data?</h3>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div 
          className={`relative flex-1 border rounded-md p-4 cursor-pointer hover:border-black ${
            !usesAggregator ? "border-black bg-gray-50" : "border-gray-200"
          }`}
          onClick={() => handleAggregatorSelection("no")}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                !usesAggregator ? "border-black" : "border-gray-400"
              }`}>
                {!usesAggregator && <div className="w-2 h-2 rounded-full bg-black" />}
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
            usesAggregator ? "border-black bg-gray-50" : "border-gray-200"
          }`}
          onClick={() => handleAggregatorSelection("yes")}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                usesAggregator ? "border-black" : "border-gray-400"
              }`}>
                {usesAggregator && <div className="w-2 h-2 rounded-full bg-black" />}
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

// Aggregator Section
const AggregatorSection = ({ aggregatorInfo, setAggregatorInfo }) => {
  const aggregators = [
    "Plaid",
    "Yodlee",
    "MX",
    "Finicity",
    "Akoya",
    "Salt Edge",
    "TrueLayer",
    "Tink",
    "Other"
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-black">
          Select Data Aggregator<span className="text-red-500 ml-1">*</span>
        </label>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {aggregators.map((name) => (
            <div 
              key={name}
              className={`border rounded-md p-3 cursor-pointer hover:border-black transition-colors ${
                aggregatorInfo.aggregatorName === name ? "border-black bg-gray-50" : "border-gray-200"
              }`}
              onClick={() => setAggregatorInfo({
                ...aggregatorInfo,
                aggregatorName: name
              })}
            >
              <div className="text-center">
                <span className="text-sm font-medium text-black">{name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-4 border-t pt-4">
        <h3 className="text-md font-medium">Aggregator Credentials</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-black">
              Username<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="username"
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
              value={aggregatorInfo.aggregatorCredentials?.username || ''}
              onChange={(e) => setAggregatorInfo({
                ...aggregatorInfo,
                aggregatorCredentials: {
                  ...aggregatorInfo.aggregatorCredentials,
                  username: e.target.value
                }
              })}
            />
          </div>
          
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-black">
              API Key <span className="text-gray-500 text-xs font-normal">(Optional)</span>
            </label>
            <input
              id="apiKey"
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
              value={aggregatorInfo.aggregatorCredentials?.apiKey || ''}
              onChange={(e) => setAggregatorInfo({
                ...aggregatorInfo,
                aggregatorCredentials: {
                  ...aggregatorInfo.aggregatorCredentials,
                  apiKey: e.target.value
                }
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// File Upload Section
const FileUploadSection = ({ uploadedFiles, handleBulkFilesSelected }) => {
  return (
    <div className="space-y-6">
      <div className="border border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-black mb-1">Upload Financial Statements</h3>
          <p className="text-sm text-gray-500 mb-4">
            Drag and drop your financial statements here, or click to browse files
          </p>
          
          <label htmlFor="file-upload" className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium bg-black text-white hover:bg-gray-800 py-2 px-4">
            Browse Files
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              multiple
              onChange={(e) => {
                if (e.target.files?.length) {
                  handleBulkFilesSelected(Array.from(e.target.files));
                }
              }}
            />
          </label>
        </div>
      </div>
      
      {uploadedFiles.length > 0 && (
        <div className="border rounded-md p-4">
          <h4 className="font-medium mb-3">Uploaded Files ({uploadedFiles.length})</h4>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">
                      {file.name.split('.').pop()?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-red-500 p-2 h-auto"
                  onClick={() => {
                    handleBulkFilesSelected(uploadedFiles.filter((_, i) => i !== index));
                  }}
                >
                  <Trash2 className="h-5 w-5" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main DataSourceForm Component
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
  const [currentAccount, setCurrentAccount] = useState<FinancialAccountInfo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  // Load existing accounts
  useEffect(() => {
    if (onboardingData.financialAccounts?.length) {
      setFinancialAccounts(onboardingData.financialAccounts);
    }
  }, [onboardingData.financialAccounts]);

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
    // Only institution and legal entity are required
    if (!account.institution) {
      toast({
        title: "Missing information",
        description: "Please provide the institution name.",
        variant: "destructive"
      });
      return;
    }

    if (isEditing && editIndex !== -1) {
      // Update existing account
      const updatedAccounts = [...financialAccounts];
      updatedAccounts[editIndex] = account;
      setFinancialAccounts(updatedAccounts);
      
      // Update in context
      updateFinancialAccount(editIndex, account);
      
      setIsEditing(false);
      setEditIndex(-1);
      setCurrentAccount(null);
      
      toast({
        title: "Account updated",
        description: "Financial account has been updated successfully."
      });
    } else {
      // Add new account
      const newAccounts = [...financialAccounts, account];
      setFinancialAccounts(newAccounts);
      
      // Also update in context
      addFinancialAccount(account);
      
      toast({
        title: "Account added",
        description: "Financial account has been added successfully."
      });
    }
  };
  
  const handleRemoveAccount = (index: number) => {
    const newAccounts = [...financialAccounts];
    newAccounts.splice(index, 1);
    setFinancialAccounts(newAccounts);
    
    // Also update in context
    removeFinancialAccount(index);
    
    // If removing the account being edited, reset edit state
    if (isEditing && index === editIndex) {
      setIsEditing(false);
      setEditIndex(-1);
      setCurrentAccount(null);
    }
    
    toast({
      title: "Account removed",
      description: "Financial account has been removed successfully."
    });
  };
  
  const handleEditAccount = (index: number) => {
    setCurrentAccount(financialAccounts[index]);
    setIsEditing(true);
    setEditIndex(index);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditIndex(-1);
    setCurrentAccount(null);
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
          <FormHeader 
            icon={<Database className="h-7 w-7 text-black" />}
            title="Financial Data Source"
            description="Provide information about your financial accounts or connect to a data aggregator."
          />
          
          <AggregatorRadioGroup
            usesAggregator={aggregatorInfo.usesAggregator}
            handleAggregatorSelection={handleAggregatorSelection}
          />
          
          {!aggregatorInfo.usesAggregator && (
            <Tabs 
              value={dataSourceMethod} 
              onValueChange={(value) => setDataSourceMethod(value as "manual" | "upload")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="manual" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  <Wallet className="w-4 h-4 mr-2" />
                  Manual Entry
                </TabsTrigger>
                <TabsTrigger value="upload" className="data-[state=active]:bg-black data-[state=active]:text-white">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Statements
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="manual" className="space-y-6">
                {!isEditing && (
                  <div className="mb-4">
                    <AccountFormButton 
                      onClick={() => {
                        setCurrentAccount(null);
                        setIsEditing(false);
                      }}
                    />
                  </div>
                )}
                
                {(currentAccount !== null || isEditing || financialAccounts.length === 0) && (
                  <Card className="p-5">
                    <AccountFormHeader />
                    <AccountForm 
                      onAddAccount={handleAddAccount}
                      initialAccount={currentAccount || undefined}
                      onCancel={isEditing ? handleCancelEdit : undefined}
                    />
                  </Card>
                )}
                
                {financialAccounts.length > 0 && (
                  <AccountList 
                    accounts={financialAccounts}
                    onRemove={handleRemoveAccount}
                    onEdit={handleEditAccount}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="upload" className="space-y-4">
                <FileUploadSection 
                  uploadedFiles={uploadedFiles}
                  handleBulkFilesSelected={handleBulkFilesSelected}
                />
              </TabsContent>
            </Tabs>
          )}
          
          {aggregatorInfo.usesAggregator && (
            <AggregatorSection
              aggregatorInfo={aggregatorInfo}
              setAggregatorInfo={handleAggregatorInfoChange}
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
