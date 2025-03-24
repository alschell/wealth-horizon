
import React from "react";
import { motion } from "framer-motion";
import { FinancialAccountInfo } from "@/types/onboarding";
import { useAccountFormState } from "./hooks/useAccountFormState";
import FormHeader from "./components/FormHeader";
import BasicInfoSection from "./components/BasicInfoSection";
import LegalEntitySection from "./components/LegalEntitySection";
import AccountDetailsSection from "./components/AccountDetailsSection";
import FormActions from "./components/FormActions";

interface AccountFormProps {
  onAddAccount: (account: FinancialAccountInfo) => void;
  accountToEdit?: FinancialAccountInfo;
  isEditing?: boolean;
  onCancelEdit?: () => void;
}

const AccountForm: React.FC<AccountFormProps> = ({
  onAddAccount,
  accountToEdit,
  isEditing = false,
  onCancelEdit
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
  const formSubtitle = isEditing 
    ? "Update the details of your financial account" 
    : "Enter the details of your financial account";
  const buttonText = isEditing ? "Update Account" : "Add Account";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm border p-6"
    >
      <FormHeader 
        title={formTitle} 
        subtitle={formSubtitle} 
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
        
        {/* Form Actions */}
        <FormActions
          onAddAccount={handleAddAccount}
          isEditing={isEditing}
          buttonText={buttonText}
          onCancelEdit={onCancelEdit}
        />
      </form>
    </motion.div>
  );
};

export default AccountForm;
