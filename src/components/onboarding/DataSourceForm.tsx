
import React, { useState, useEffect } from "react";
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
    setCurrentStep
  } = useOnboarding();
  
  const financialAccounts = onboardingData.financialAccounts;
  
  const [aggregatorInfo, setAggregatorInfo] = useState<AggregatorInfo>(onboardingData.aggregatorInfo);
  const [dataSourceMethod, setDataSourceMethod] = useState<"manual" | "upload">("manual");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isValid, setIsValid] = useState(false);

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

  // Handle account operations without changing the data source method
  const handleAddAccount = (account: FinancialAccountInfo) => {
    addFinancialAccount(account);
    // We don't change dataSourceMethod, ensuring user stays in the same tab
  };

  const handleRemoveAccount = (index: number) => {
    removeFinancialAccount(index);
    // We don't change dataSourceMethod, ensuring user stays in the same tab
  };

  // Validate the form based on the selected option
  useEffect(() => {
    if (aggregatorInfo.usesAggregator) {
      // Using aggregator - validate credentials
      const isAggregatorValid = !!aggregatorInfo.aggregatorName && 
        !!aggregatorInfo.aggregatorCredentials?.username &&
        (aggregatorInfo.aggregatorName !== "Other" || 
         (aggregatorInfo.aggregatorName === "Other" && !!aggregatorInfo.aggregatorName));
        
      setIsValid(isAggregatorValid);
    } else {
      // Not using aggregator - validate based on method
      if (dataSourceMethod === "manual") {
        setIsValid(financialAccounts.length > 0);
      } else if (dataSourceMethod === "upload") {
        setIsValid(uploadedFiles.length > 0);
      }
    }
  }, [aggregatorInfo, dataSourceMethod, uploadedFiles, financialAccounts]);

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
      
      if (!aggregatorInfo.aggregatorCredentials?.username) {
        toast({
          title: "Missing Information", 
          description: "Please enter your User ID.",
          variant: "destructive"
        });
        return;
      }
      
      if (aggregatorInfo.aggregatorName === "Other" && !aggregatorInfo.aggregatorName) {
        toast({
          title: "Missing Information",
          description: "Please enter the aggregator name.",
          variant: "destructive"
        });
        return;
      }
    } else {
      if (dataSourceMethod === "manual" && financialAccounts.length === 0) {
        toast({
          title: "Missing Information",
          description: "Please add at least one financial account.",
          variant: "destructive"
        });
        return;
      }
    }

    // Proceed to next step
    setCurrentStep(6);
    // Scroll to top before navigating to the next page
    window.scrollTo(0, 0);
    navigate("/onboarding/review");
  };

  const handleBack = () => {
    // Scroll to top before navigating to the previous page
    window.scrollTo(0, 0);
    navigate("/onboarding/beneficial-owners");
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
        </FormSection>
      ) : (
        <FormSection className="mt-6">
          <DataSourceTabs 
            dataSourceMethod={dataSourceMethod}
            setDataSourceMethod={setDataSourceMethod}
            financialAccounts={financialAccounts}
            handleAddAccount={handleAddAccount}
            handleRemoveAccount={handleRemoveAccount}
            handleUpdateAccount={() => {}}
            uploadedFiles={uploadedFiles}
            handleBulkFilesSelected={handleBulkFilesSelected}
          />
        </FormSection>
      )}

      <FormFooter 
        onBack={handleBack}
        onSubmit={handleSubmit}
        disableContinue={!isValid}
      />
    </FormLayout>
  );
};

export default DataSourceForm;
