
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
  accountToEdit?: FinancialAccountInfo;
  isEditing?: boolean;
}

const AccountForm: React.FC<AccountFormProps> = ({
  onAddAccount,
  accountToEdit,
  isEditing = false
}) => {
  const {
    newAccount,
    errors,
    handleInputChange,
    handleSelectionChange,
    handleFilesSelected,
    handleAddAccount
  } = useAccountFormState({ 
    onAddAccount,
    initialAccount: accountToEdit 
  });

  // Set form title based on editing state
  const formTitle = isEditing ? "Edit Financial Account" : "Add Financial Account";
  const buttonText = isEditing ? "Save Changes" : "Add Account";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm border p-6"
    >
      <FormHeader 
        title={formTitle} 
        subtitle="Enter the details of your financial account" 
      />
      
      <form className="space-y-6 mt-6">
        {/* LEI Field First */}
        <div className="space-y-2">
          <LegalEntitySection
            account={newAccount}
            onInputChange={handleInputChange}
            onSelectionChange={handleSelectionChange}
          />
        </div>
        
        {/* Account Name Field */}
        <div className="space-y-2">
          <BasicInfoSection
            account={newAccount}
            errors={errors}
            onInputChange={handleInputChange}
            onSelectionChange={handleSelectionChange}
          />
        </div>
        
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
          isEditing={isEditing}
          buttonText={buttonText}
        />
      </form>
    </motion.div>
  );
};

export default AccountForm;
