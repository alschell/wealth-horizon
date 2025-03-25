
import React from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Wallet } from "lucide-react";
import ManualEntrySection from "../ManualEntrySection";
import FileUploadSection from "../FileUploadSection";

interface DataSourceTabsProps {
  dataSourceMethod: "manual" | "upload";
  setDataSourceMethod: (method: "manual" | "upload") => void;
  financialAccounts: FinancialAccountInfo[];
  handleAddAccount: (account: FinancialAccountInfo) => void;
  handleRemoveAccount: (index: number) => void;
  handleUpdateAccount: (index: number, account: FinancialAccountInfo) => void;
  uploadedFiles: File[];
  handleBulkFilesSelected: (files: File[]) => void;
}

const DataSourceTabs = ({
  dataSourceMethod,
  setDataSourceMethod,
  financialAccounts,
  handleAddAccount,
  handleRemoveAccount,
  handleUpdateAccount,
  uploadedFiles,
  handleBulkFilesSelected
}: DataSourceTabsProps) => {
  return (
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
          accounts={financialAccounts}
          onAddAccount={handleAddAccount}
          onRemoveAccount={handleRemoveAccount}
        />
      </TabsContent>
      
      <TabsContent value="upload">
        <FileUploadSection 
          uploadedFiles={uploadedFiles}
          handleBulkFilesSelected={handleBulkFilesSelected}
        />
      </TabsContent>
    </Tabs>
  );
};

export default DataSourceTabs;
