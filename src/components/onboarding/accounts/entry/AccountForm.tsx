
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FinancialAccountInfo } from "@/types/onboarding";
import { useAccountFormState } from "../entry/hooks/useAccountFormState";

import LegalEntitySection from "../sections/LegalEntitySection";
import BasicInfoSection from "../sections/BasicInfoSection";
import AccountDetailsSection from "../sections/AccountDetailsSection";
import DocumentsSection from "../sections/DocumentsSection";

interface AccountFormProps {
  onAddAccount: (account: FinancialAccountInfo) => void;
  initialAccount?: FinancialAccountInfo;
  onCancel?: () => void;
}

const AccountForm: React.FC<AccountFormProps> = ({
  onAddAccount,
  initialAccount,
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
  } = useAccountFormState({
    onAddAccount,
    initialAccount
  });

  // Get legal entities for the selected institution
  const getLegalEntitiesForInstitution = () => {
    if (!newAccount.institution || !legalEntities[newAccount.institution]) {
      return [];
    }
    return legalEntities[newAccount.institution];
  };

  const isEditMode = Boolean(initialAccount);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddAccount();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 pt-4">
      {/* Legal Entity & Institution Section */}
      <LegalEntitySection
        account={newAccount}
        legalEntities={getLegalEntitiesForInstitution()}
        onInputChange={handleInputChange}
        onSelectionChange={handleSelectionChange}
        handleLegalEntityChange={handleLegalEntityChange}
        handleLeiChange={handleLeiChange}
      />

      {/* Basic Information Section */}
      <BasicInfoSection
        account={newAccount}
        onInputChange={handleInputChange}
        onSelectionChange={handleSelectionChange}
      />

      {/* Account Details Section */}
      <AccountDetailsSection
        account={newAccount}
        onInputChange={handleInputChange}
        onSelectionChange={handleSelectionChange}
      />

      {/* Statements Section */}
      <DocumentsSection
        files={newAccount.statements}
        onStatementsSelected={handleFilesSelected}
      />

      {/* Form Buttons */}
      <div className="flex justify-end space-x-2 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button type="submit">
          {isEditMode ? "Update Account" : "Add Account"}
        </Button>
      </div>
    </form>
  );
};

export default AccountForm;
