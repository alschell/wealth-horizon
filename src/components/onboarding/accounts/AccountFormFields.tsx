
import React from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { 
  InputField, 
  SelectField, 
  SearchableSelectField,
  FileField
} from "./fields";
import { INSTITUTIONS, CURRENCIES, ACCOUNT_TYPES } from "@/utils/financialDataConstants";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2 md:col-span-2">
        <InputField
          id="accountName"
          label="Account Name"
          name="accountName"
          value={account.accountName}
          onChange={onInputChange}
          placeholder="e.g., Main Investment Portfolio at UBS"
          required
        />
      </div>
      
      <div>
        <SearchableSelectField
          id="institution"
          label="Institution"
          value={account.institution}
          placeholder="Select institution"
          options={INSTITUTIONS.sort()}
          required
          onChange={(value) => onSelectionChange("institution", value)}
          allowCustomValue={true}
        />
      </div>
      
      <div>
        <SearchableSelectField
          id="accountType"
          label="Account Type"
          value={account.accountType}
          placeholder="Select account type"
          options={ACCOUNT_TYPES.sort()}
          required
          onChange={(value) => onSelectionChange("accountType", value as any)}
          extractValue={(type) => type.toLowerCase()}
        />
      </div>
      
      <div>
        <InputField
          id="accountSubtype"
          label="Account Subtype (optional)"
          name="accountSubtype"
          value={account.accountSubtype || ""}
          onChange={onInputChange}
          placeholder="e.g., Managed Account, Private Equity"
        />
      </div>
      
      <div>
        <SearchableSelectField
          id="currency"
          label="Primary Currency"
          value={account.currency}
          placeholder="Select currency"
          options={CURRENCIES.sort()}
          onChange={(value) => onSelectionChange("currency", value.split(" - ")[0])}
        />
      </div>
      
      <div>
        <InputField
          id="approximateValue"
          label="Approximate Value"
          name="approximateValue"
          value={account.approximateValue || ""}
          onChange={onInputChange}
          placeholder="e.g., 10,000,000"
        />
      </div>

      <div className="md:col-span-2">
        <FileField
          label="Account Statements"
          files={account.statements}
          onFilesSelected={onStatementsSelected}
        />
      </div>
    </div>
  );
};

export default AccountFormFields;
