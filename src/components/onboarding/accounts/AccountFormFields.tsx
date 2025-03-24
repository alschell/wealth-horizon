
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { 
  BasicInfoSection,
  LegalEntitySection,
  AccountDetailsSection,
  DocumentsSection
} from "./sections";
import { useLegalEntityMapping } from "./hooks/useLegalEntityMapping";

interface AccountFormFieldsProps {
  account: FinancialAccountInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
  onStatementsSelected: (files: File[]) => void;
}

const AccountFormFields = ({
  account,
  onInputChange,
  onSelectionChange,
  onStatementsSelected
}: AccountFormFieldsProps) => {
  const { 
    getLegalEntities, 
    handleLegalEntityChange,
    handleLeiChange
  } = useLegalEntityMapping(account, onSelectionChange);

  return (
    <div className="space-y-6">
      <BasicInfoSection
        account={account}
        onInputChange={onInputChange}
        onSelectionChange={onSelectionChange}
      />
      
      <LegalEntitySection
        account={account}
        legalEntities={getLegalEntities()}
        onInputChange={onInputChange}
        onSelectionChange={onSelectionChange}
        handleLegalEntityChange={handleLegalEntityChange}
        handleLeiChange={handleLeiChange}
      />
      
      <AccountDetailsSection
        account={account}
        onInputChange={onInputChange}
        onSelectionChange={onSelectionChange}
      />
      
      <DocumentsSection
        files={account.statements}
        onStatementsSelected={onStatementsSelected}
      />
    </div>
  );
};

export default AccountFormFields;
