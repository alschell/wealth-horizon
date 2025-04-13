
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { 
  BasicInfoSection,
  LegalEntitySection,
  AccountDetailsSection
} from "./sections";
import { useLegalEntityMapping } from "./hooks/useLegalEntityMapping";

interface AccountFormFieldsProps {
  account: FinancialAccountInfo;
  errors: Record<string, string>; 
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
  onStatementsSelected: (files: File[]) => void;
  onLegalEntityChange: (value: string) => void; // Added the missing prop
  onLeiChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Added the missing prop
}

const AccountFormFields = ({
  account,
  errors,
  onInputChange,
  onSelectionChange,
  onLegalEntityChange,
  onLeiChange,
  onStatementsSelected
}: AccountFormFieldsProps) => {
  const { 
    getLegalEntities, 
    handleLegalEntityChange,
    handleLeiChange
  } = useLegalEntityMapping(account, onSelectionChange);

  // Create an adapter function to convert event to string parameter
  const handleLeiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleLeiChange(e.target.value);
    onLeiChange(e); // Pass the event to parent component's handler
  };

  // Create adapter for legal entity change
  const handleEntityChange = (value: string) => {
    handleLegalEntityChange(value);
    onLegalEntityChange(value); // Pass the value to parent component's handler
  };

  return (
    <div className="space-y-6">
      <LegalEntitySection
        account={account}
        legalEntities={getLegalEntities()}
        onInputChange={onInputChange}
        onSelectionChange={onSelectionChange}
        handleLegalEntityChange={handleEntityChange}
        handleLeiChange={handleLeiInputChange}
      />
      
      <BasicInfoSection
        account={account}
        onInputChange={onInputChange}
        onSelectionChange={onSelectionChange}
      />
      
      <AccountDetailsSection
        account={account}
        onInputChange={onInputChange}
        onSelectionChange={onSelectionChange}
      />
    </div>
  );
};

export default AccountFormFields;
