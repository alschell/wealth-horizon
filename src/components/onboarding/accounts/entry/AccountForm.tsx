
import React from "react";
import { motion } from "framer-motion";
import { FinancialAccountInfo } from "@/types/onboarding";
import { useAccountFormState } from "./hooks/useAccountFormState";
import FormHeader from "./components/FormHeader";
import BasicInfoSection from "./components/BasicInfoSection";
import LegalEntitySection from "./components/LegalEntitySection";
import AccountDetailsSection from "./components/AccountDetailsSection";
import DocumentsSection from "./components/DocumentsSection";
import FormActions from "./components/FormActions";

interface AccountFormProps {
  onAddAccount: (account: FinancialAccountInfo) => void;
  onCancel: () => void;
}

const AccountForm: React.FC<AccountFormProps> = ({
  onAddAccount,
  onCancel
}) => {
  const {
    newAccount,
    errors,
    handleInputChange,
    handleSelectionChange,
    getLegalEntities,
    handleFilesSelected,
    handleAddAccount
  } = useAccountFormState({ onAddAccount });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm border p-6"
    >
      <FormHeader 
        title="Add Financial Account" 
        subtitle="Enter the details of your financial account" 
      />
      
      <form className="space-y-6 mt-6">
        {/* Basic Info Section */}
        <BasicInfoSection
          account={newAccount}
          errors={errors}
          onInputChange={handleInputChange}
          onSelectionChange={handleSelectionChange}
        />
        
        {/* Legal Entity Section */}
        <LegalEntitySection
          account={newAccount}
          legalEntities={getLegalEntities()}
          onInputChange={handleInputChange}
          onSelectionChange={handleSelectionChange}
        />
        
        {/* Account Details Section */}
        <AccountDetailsSection
          account={newAccount}
          onInputChange={handleInputChange}
          onSelectionChange={handleSelectionChange}
        />
        
        {/* Documents Section */}
        <DocumentsSection
          files={newAccount.statements || []}
          onFilesSelected={handleFilesSelected}
          optional={true}
        />
        
        {/* Form Actions */}
        <FormActions
          onAddAccount={handleAddAccount}
          onCancel={onCancel}
        />
      </form>
    </motion.div>
  );
};

export default AccountForm;
