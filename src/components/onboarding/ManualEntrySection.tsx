
import React from "react";
import { useAccountForm } from "@/components/onboarding/accounts/hooks/useAccountForm";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { useLegalEntityMapping } from "@/components/onboarding/accounts/hooks/useLegalEntityMapping";
import { LEGAL_ENTITIES } from "@/components/onboarding/accounts/constants";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { 
  InputField, 
  SelectField, 
  SearchableSelectField 
} from "@/components/onboarding/accounts/fields";

// Account types for select field
const ACCOUNT_TYPES = [
  { value: "cash", label: "Cash" },
  { value: "checking", label: "Checking" },
  { value: "savings", label: "Savings" },
  { value: "brokerage", label: "Brokerage" },
  { value: "investment", label: "Investment" },
  { value: "portfolio", label: "Portfolio" },
  { value: "custody", label: "Custody" },
  { value: "trust", label: "Trust" },
  { value: "retirement", label: "Retirement" },
  { value: "private equity", label: "Private Equity" },
  { value: "hedge fund", label: "Hedge Fund" },
  { value: "venture capital", label: "Venture Capital" },
  { value: "real estate", label: "Real Estate" },
  { value: "fixed income", label: "Fixed Income" },
  { value: "credit", label: "Credit" },
  { value: "other", label: "Other" }
];

// Currencies for select field
const CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "CHF", "CAD", "AUD", "CNY", "HKD", "SGD"
].map(currency => ({ value: currency, label: currency }));

interface ManualEntrySectionProps {
  accounts: FinancialAccountInfo[];
  onAddAccount: (account: FinancialAccountInfo) => void;
  onRemoveAccount: (index: number) => void;
}

const ManualEntrySection: React.FC<ManualEntrySectionProps> = ({
  accounts,
  onAddAccount,
  onRemoveAccount
}) => {
  const {
    newAccount,
    handleNewAccountChange,
    handleAccountSelectionChange,
    handleAddAccount
  } = useAccountForm(onAddAccount);

  const {
    getLegalEntities,
    handleLegalEntityChange,
    handleLeiChange
  } = useLegalEntityMapping(newAccount, handleAccountSelectionChange);

  const legalEntitiesList = getLegalEntities();

  // Get all institutions from the mapping object
  const institutions = Object.keys(LEGAL_ENTITIES).sort();

  // Adapter function to transform event handler to value handler
  const handleSearchableSelectChange = (field: string) => (value: string) => {
    handleNewAccountChange({
      target: { name: field, value }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // Extract labels for select options
  const getOptionsAsStrings = (options: { value: string; label: string }[]) => {
    return options.map(option => option.label);
  };

  return (
    <div className="space-y-6">
      <Card className="p-5 border rounded-lg">
        <div className="grid grid-cols-1 gap-4">
          {/* First Row - Legal Entity Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SearchableSelectField 
              id="institution" 
              label="Institution"
              value={newAccount.institution}
              placeholder="Select institution"
              options={institutions}
              onChange={handleSearchableSelectChange('institution')}
              allowCustomValue={true}
              required={true}
            />
            
            <SearchableSelectField 
              id="legalEntity" 
              label="Legal Entity"
              value={newAccount.legalEntity}
              placeholder="Select legal entity"
              options={legalEntitiesList}
              onChange={handleLegalEntityChange}
              allowCustomValue={true}
              required={true}
            />
          </div>

          <InputField
            id="legalEntityIdentifier"
            label="Legal Entity Identifier (LEI)"
            name="legalEntityIdentifier"
            value={newAccount.legalEntityIdentifier}
            onChange={handleNewAccountChange}
            placeholder="e.g., 7H6GLXDRUGQFU57RNE97"
            required={false}
          />
          
          {/* Second Row - Basic Account Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <InputField
              id="accountName"
              label="Account Name"
              name="accountName"
              value={newAccount.accountName}
              onChange={handleNewAccountChange}
              placeholder="Enter account name"
              required={false}
            />
            
            <SelectField
              id="accountType"
              label="Account Type"
              name="accountType"
              value={newAccount.accountType}
              onChange={handleNewAccountChange}
              options={getOptionsAsStrings(ACCOUNT_TYPES)}
              placeholder="Select account type"
              required={false}
            />
          </div>
          
          {/* Third Row - Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <SelectField
              id="currency"
              label="Currency"
              name="currency"
              value={newAccount.currency}
              onChange={handleNewAccountChange}
              options={getOptionsAsStrings(CURRENCIES)}
              placeholder="Select currency"
              required={false}
            />
            
            <InputField
              id="approximateValue"
              label="Approximate Value"
              name="approximateValue"
              value={newAccount.approximateValue}
              onChange={handleNewAccountChange}
              placeholder="Enter value"
              required={false}
              type="text"
            />
            
            <InputField
              id="accountSubtype"
              label="Account Subtype"
              name="accountSubtype"
              value={newAccount.accountSubtype}
              onChange={handleNewAccountChange}
              placeholder="E.g., Retirement"
              required={false}
            />
          </div>
          
          <div className="flex justify-end mt-6">
            <Button 
              type="button" 
              className="bg-black hover:bg-gray-800 text-white flex items-center"
              onClick={handleAddAccount}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </div>
        </div>
      </Card>

      {accounts.length > 0 && (
        <div className="space-y-3 mt-6">
          <h3 className="text-lg font-medium">Added Accounts</h3>
          
          <div className="grid grid-cols-1 gap-3">
            {accounts.map((account, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center">
                <div>
                  <p className="font-medium text-black">{account.accountName || "Unnamed Account"}</p>
                  <p className="text-sm text-gray-600">
                    {account.institution} • {account.legalEntity}
                    {account.accountType && ` • ${account.accountType}`}
                    {account.currency && ` • ${account.currency}`}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveAccount(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManualEntrySection;
