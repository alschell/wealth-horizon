import { useState } from "react";
import { useOnboarding, AggregatorInfo, FinancialAccountInfo } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, BarChart4, Wallet, Upload } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AggregatorFormSection from "./AggregatorFormSection";
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
    } else if (dataSourceMethod === "manual") {
      // Allow skipping validation for testing purposes
      // if (financialAccounts.length === 0) {
      //   toast({
      //     title: "Missing information",
      //     description: "Please add at least one financial account.",
      //     variant: "destructive"
      //   });
      //   return;
      // }
    } else if (dataSourceMethod === "upload") {
      // Allow skipping validation for testing purposes
      // if (uploadedFiles.length === 0) {
      //   toast({
      //     title: "Missing information",
      //     description: "Please upload at least one file.",
      //     variant: "destructive"
      //   });
      //   return;
      // }
    }
    
    updateAggregatorInfo(aggregatorInfo);
    
    setCurrentStep(5);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
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
            <BarChart4 className="h-7 w-7 text-gray-900" />
            <h2 className="text-2xl font-bold text-gray-900">Financial Data Source</h2>
          </div>
          <p className="text-gray-500">
            Please tell us how you'd like to provide your financial information.
          </p>

          <AggregatorFormSection 
            aggregatorInfo={aggregatorInfo} 
            setAggregatorInfo={setAggregatorInfo}
            itemVariants={itemVariants}
          />

          {!aggregatorInfo.usesAggregator && (
            <motion.div 
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 border p-4 rounded-lg"
            >
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
            </motion.div>
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
                className="rounded-lg text-gray-700"
                onClick={() => setCurrentStep(3)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                type="submit" 
                size="lg" 
                className="rounded-lg bg-gray-900 hover:bg-gray-800 text-white"
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
