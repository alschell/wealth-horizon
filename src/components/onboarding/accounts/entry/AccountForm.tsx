
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import FormHeader from "./components/FormHeader";
import FormActions from "./components/FormActions";
import BasicInfoSection from "./components/BasicInfoSection";
import LegalEntitySection from "./components/LegalEntitySection";
import AccountDetailsSection from "./components/AccountDetailsSection";
import DocumentsSection from "./components/DocumentsSection";
import { useAccountFormState } from "./hooks/useAccountFormState";

interface AccountFormProps {
  onAddAccount: (FinancialAccountInfo: FinancialAccountInfo) => void;
  enableLegalEntityFields?: boolean;
}

const AccountForm = ({ onAddAccount, enableLegalEntityFields = false }: AccountFormProps) => {
  const {
    newAccount,
    errors,
    handleInputChange,
    handleSelectionChange,
    getLegalEntities,
    extractCurrencyCode,
    handleFilesSelected,
    handleAddAccount
  } = useAccountFormState({ onAddAccount });

  return (
    <div className="space-y-6 border p-4 rounded-md">
      <FormHeader />
      
      <div className="space-y-6">
        {/* Place LEI section first for institutions */}
        {enableLegalEntityFields && (
          <LegalEntitySection
            account={newAccount}
            legalEntities={getLegalEntities()}
            onInputChange={handleInputChange}
            onSelectionChange={handleSelectionChange}
          />
        )}
        
        <BasicInfoSection
          account={newAccount}
          errors={errors}
          onInputChange={handleInputChange}
          onSelectionChange={handleSelectionChange}
        />
        
        <AccountDetailsSection
          account={newAccount}
          onInputChange={handleInputChange}
          onSelectionChange={handleSelectionChange}
          extractCurrencyCode={extractCurrencyCode}
        />
        
        <DocumentsSection
          files={newAccount.statements}
          onFilesSelected={handleFilesSelected}
          optional={true}
        />
      </div>
      
      <FormActions onAddAccount={handleAddAccount} />
    </div>
  );
};

export default AccountForm;
