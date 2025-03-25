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
import { Separator } from "@/components/ui/separator";

const DataSourceForm: React.FC = () => {
  const navigate = useNavigate();
  const { 
    onboardingData, 
    updateAggregatorInfo, 
    addFinancialAccount, 
    removeFinancialAccount
  } = useOnboarding();
  
  const financialAccounts = onboardingData.financialAccounts;
  
  const [aggregatorInfo, setAggregatorInfo] = useState<AggregatorInfo>(onboardingData.aggregatorInfo);
  const [dataSourceMethod, setDataSourceMethod] = useState<"manual" | "upload">("manual");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleAggregatorSelection = (value: "yes" | "no") => {
    const newAggregatorInfo = {
      ...aggregatorInfo,
      usesAggregator: value === "yes"
    };
    setAggregatorInfo(newAggregatorInfo);
  };

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

  const handleAggregatorNameChange = (name: string) => {
    setAggregatorInfo(prev => ({
      ...prev,
      aggregatorName: name
    }));
  };

  const handleBulkFilesSelected = (files: File[]) => {
    setUploadedFiles(files);
  };

  const handleSubmit = () => {
    updateAggregatorInfo(aggregatorInfo);

    if (aggregatorInfo.usesAggregator) {
      if (!aggregatorInfo.aggregatorName) {
        toast({
          title: "Missing Information",
          description: "Please select an aggregator.",
          variant: "destructive"
        });
        return;
      }
    } else {
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

    navigate("/onboarding/beneficial-owners");
  };

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
        <FormSection>
          <AggregatorSection 
            aggregatorInfo={aggregatorInfo}
            setAggregatorInfo={setAggregatorInfo}
          />
          <Separator className="my-6" />
          <p className="text-sm text-gray-500 mb-6">
            Fields marked with <span className="text-red-500">*</span> are required.
          </p>
        </FormSection>
      ) : (
        <FormSection className="mt-6">
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
