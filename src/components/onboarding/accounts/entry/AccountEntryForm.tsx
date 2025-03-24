
import React from "react";
import { motion } from "framer-motion";
import { UseAccountFormStateReturn } from "./hooks/form/types";
import { FinancialAccountInfo } from "@/types/onboarding";
import { Button } from "@/components/ui/button";
import BasicInfoSection from "./components/BasicInfoSection";
import LegalEntitySection from "./components/LegalEntitySection";
import AccountDetailsSection from "./components/AccountDetailsSection";
import DocumentsSection from "./components/DocumentsSection";
import FormHeader from "./components/FormHeader";

interface AccountEntryFormProps {
  formState: UseAccountFormStateReturn;
  isEditing?: boolean;
  onCancel?: () => void;
}

const AccountEntryForm: React.FC<AccountEntryFormProps> = ({
  formState,
  isEditing = false,
  onCancel
}) => {
  const {
    newAccount,
    errors,
    legalEntities,
    handleInputChange,
    handleSelectionChange,
    handleLegalEntityChange,
    handleLeiChange,
    handleFilesSelected,
    handleAddAccount
  } = formState;

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
    >
      <FormHeader 
        title={formTitle} 
        subtitle={formSubtitle} 
      />
      
      <form className="space-y-6 mt-6">
        {/* LEI Field First */}
        <div className="space-y-4">
          <LegalEntitySection
            account={newAccount}
            legalEntities={legalEntities}
            onLegalEntityChange={handleLegalEntityChange}
            onLeiChange={handleLeiChange}
          />
        </div>
        
        {/* Account Name and Type Fields */}
        <div className="space-y-4">
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
          account={newAccount}
          onFilesSelected={handleFilesSelected}
        />
        
        {/* Form Actions */}
        <div className="flex justify-between pt-4">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button 
            type="button" 
            onClick={handleAddAccount}
            className={onCancel ? "" : "ml-auto"}
          >
            {buttonText}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AccountEntryForm;
