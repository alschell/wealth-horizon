
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/context/OnboardingContext";
import { AggregatorInfo, FinancialAccountInfo } from "@/context/OnboardingContext";
import FormLayout from "@/components/onboarding/common/layouts/FormLayout";
import { FormFooter } from "@/components/onboarding/common";
import DataSourceFormHeader from "@/components/onboarding/data-source/DataSourceFormHeader";
import DataSourceTabs from "@/components/onboarding/data-source/DataSourceTabs";
import { AggregatorRadioGroup } from "@/components/onboarding/data-source";
import AggregatorSection from "@/components/onboarding/data-source/AggregatorSection";
import FormSection from "@/components/onboarding/common/layouts/FormSection";
import { toast } from "@/components/ui/use-toast";

const DataSourceForm: React.FC = () => {
  const navigate = useNavigate();
  const { 
    onboardingData, 
    updateAggregatorInfo, 
    addFinancialAccount, 
    removeFinancialAccount,
    financialAccounts = onboardingData.financialAccounts
  } = useOnboarding();
  
  const [aggregatorInfo, setAggregatorInfo] = useState<AggregatorInfo>(onboardingData.aggregatorInfo);
  const [dataSourceMethod, setDataSourceMethod] = useState<"manual" | "upload">("manual");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Handle aggregator selection
  const handleAggregatorSelection = (value: "yes" | "no") => {
    const newAggregatorInfo = {
      ...aggregatorInfo,
      usesAggregator: value === "yes"
    };
    setAggregatorInfo(newAggregatorInfo);
  };

  // Handle aggregator credentials change
  const handleAggregatorCredentialsChange = (
    field: keyof AggregatorInfo["aggregatorCredentials"], 
    value: string
  ) => {
    setAggregatorInfo(prev => ({
      ...prev,
      aggregatorCredentials: {
        ...prev.aggregatorCredentials,
        [field]: value
      }
    }));
  };

  // Handle aggregator name change
  const handleAggregatorNameChange = (name: string) => {
    setAggregatorInfo(prev => ({
      ...prev,
      aggregatorName: name
    }));
  };

  // Handle bulk file selection
  const handleBulkFilesSelected = (files: File[]) => {
    setUploadedFiles(files);
  };

  // Handle form submission
  const handleSubmit = () => {
    // Save aggregator info
    updateAggregatorInfo(aggregatorInfo);

    // Validate based on selection
    if (aggregatorInfo.usesAggregator) {
      // Validate aggregator details
      if (!aggregatorInfo.aggregatorName) {
        toast({
          title: "Missing Information",
          description: "Please select an aggregator.",
          variant: "destructive"
        });
        return;
      }
    } else {
      // Validate based on data source method
      if (dataSourceMethod === "manual") {
        if (financialAccounts.length === 0) {
          toast({
            title: "Missing Information",
            description: "Please add at least one financial account.",
            variant: "destructive"
          });
          return;
        }
      } else if (dataSourceMethod === "upload") {
        if (uploadedFiles.length === 0) {
          toast({
            title: "Missing Information",
            description: "Please upload at least one financial statement.",
            variant: "destructive"
          });
          return;
        }
      }
    }

    // Navigate to next step
    navigate("/onboarding/beneficial-owners");
  };

  // Handle go back
  const handleBack = () => {
    navigate("/onboarding/legal-documents");
  };

  return (
    <FormLayout>
      <DataSourceFormHeader />
      
      <FormSection>
        <AggregatorRadioGroup 
          aggregatorInfo={aggregatorInfo}
          handleAggregatorSelection={handleAggregatorSelection}
        />
      </FormSection>

      {aggregatorInfo.usesAggregator ? (
        <AggregatorSection 
          aggregatorInfo={aggregatorInfo}
          onAggregatorNameChange={handleAggregatorNameChange}
          onCredentialsChange={handleAggregatorCredentialsChange}
        />
      ) : (
        <FormSection>
          <h3 className="text-xl font-semibold mb-4">Submit Financial Information</h3>
          <DataSourceTabs 
            dataSourceMethod={dataSourceMethod}
            setDataSourceMethod={setDataSourceMethod}
            financialAccounts={financialAccounts}
            handleAddAccount={addFinancialAccount}
            handleRemoveAccount={removeFinancialAccount}
            handleUpdateAccount={() => {}}
            uploadedFiles={uploadedFiles}
            handleBulkFilesSelected={handleBulkFilesSelected}
          />
        </FormSection>
      )}

      <FormFooter 
        onBack={handleBack}
        onSubmit={handleSubmit}
      />
    </FormLayout>
  );
};

export default DataSourceForm;
