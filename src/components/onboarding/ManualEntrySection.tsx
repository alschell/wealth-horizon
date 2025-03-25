import React, { useState } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { useAccountFormState } from "./accounts/entry/hooks/useAccountFormState";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, AlertCircle } from "lucide-react";
import AccountCard from "./accounts/AccountCard";

interface ManualEntrySectionProps {
  financialAccounts: FinancialAccountInfo[];
  addFinancialAccount: (account: FinancialAccountInfo) => void;
  removeFinancialAccount: (index: number) => void;
  updateFinancialAccount: (index: number, account: FinancialAccountInfo) => void;
}

const ManualEntrySection: React.FC<ManualEntrySectionProps> = ({
  financialAccounts,
  addFinancialAccount,
  removeFinancialAccount,
  updateFinancialAccount
}) => {
  const [showAddForm, setShowAddForm] = useState(true);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  const accountFormState = useAccountFormState({
    onAddAccount: (account) => {
      if (editingIndex !== null) {
        updateFinancialAccount(editingIndex, account);
        setEditingIndex(null);
      } else {
        addFinancialAccount(account);
      }
      setShowAddForm(false);
    },
    initialAccount: editingIndex !== null ? financialAccounts[editingIndex] : undefined
  });
  
  const handleEditAccount = (index: number) => {
    setEditingIndex(index);
    setShowAddForm(true);
  };

  const handleCancelForm = () => {
    if (financialAccounts.length === 0) {
      // Keep form visible if no accounts added yet
      return;
    }
    setShowAddForm(false);
    setEditingIndex(null);
  };

  return (
    <div className="space-y-6">
      {/* Display existing accounts */}
      {financialAccounts.length > 0 ? (
        <div className="space-y-4">
          {financialAccounts.map((account, index) => (
            <AccountCard
              key={index}
              account={account}
              index={index}
              onEdit={() => handleEditAccount(index)}
              onRemove={() => removeFinancialAccount(index)}
            />
          ))}
        </div>
      ) : !showAddForm ? (
        <div className="text-center py-8 border rounded-lg bg-gray-50">
          <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No financial accounts added yet.</p>
          <p className="text-sm text-gray-400 mt-1">Please add at least one account.</p>
        </div>
      ) : null}
      
      {/* Button to show add form */}
      {!showAddForm && (
        <Button 
          onClick={() => {
            setShowAddForm(true);
            setEditingIndex(null);
          }}
          className="w-full py-6 flex items-center justify-center gap-2"
          variant="outline"
        >
          <PlusCircle className="h-5 w-5" />
          Add Financial Account
        </Button>
      )}
      
      {/* Account entry form */}
      {showAddForm && (
        <Card className="border border-gray-200">
          <CardContent className="p-5">
            <form className="space-y-6 mt-6">
              {/* LEI Field and Institution/Legal Entity Section */}
              <div className="space-y-4">
                {accountFormState.newAccount && (
                  <div>
                    <InputField
                      id="legalEntityIdentifier"
                      label="Legal Entity Identifier (LEI)"
                      name="legalEntityIdentifier"
                      value={accountFormState.newAccount.legalEntityIdentifier || ""}
                      onChange={(e) => accountFormState.handleLeiChange(e)}
                      placeholder="e.g., 7H6GLXDRUGQFU57RNE97"
                      required={false}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <SearchableSelectField
                        id="institution"
                        label="Institution"
                        value={accountFormState.newAccount.institution || ""}
                        placeholder="Select institution"
                        options={Object.keys(accountFormState.legalEntities).sort()}
                        onChange={(value) => accountFormState.handleInputChange({
                          target: { name: 'institution', value }
                        } as React.ChangeEvent<HTMLInputElement>)}
                        allowCustomValue={true}
                        required={true}
                      />
                      
                      <SearchableSelectField
                        id="legalEntity"
                        label="Legal Entity"
                        value={accountFormState.newAccount.legalEntity || ""}
                        placeholder="Select legal entity"
                        options={accountFormState.newAccount.institution ? 
                          accountFormState.legalEntities[accountFormState.newAccount.institution] || [] : []}
                        onChange={(value) => accountFormState.handleLegalEntityChange(value)}
                        allowCustomValue={true}
                        required={true}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Account Name and Type Fields */}
              <div className="space-y-4">
                {accountFormState.newAccount && (
                  <div>
                    <InputField
                      id="accountName"
                      label="Account Name"
                      name="accountName"
                      value={accountFormState.newAccount.accountName}
                      onChange={accountFormState.handleInputChange}
                      placeholder="e.g., Main Investment Portfolio at UBS"
                      required={false}
                    />
                    
                    <div className="mt-4">
                      <SearchableSelectField
                        id="accountType"
                        label="Account Type"
                        value={accountFormState.newAccount.accountType || ""}
                        placeholder="Select account type"
                        options={["Checking", "Savings", "Investment", "Retirement", "Trust", "Credit Card", "Loan", "Other"]}
                        required={false}
                        onChange={(value) => accountFormState.handleSelectionChange("accountType", value)}
                        allowCustomValue={true}
                      />
                    </div>
                    
                    <div className="mt-4">
                      <SearchableSelectField
                        id="currency"
                        label="Primary Currency"
                        value={accountFormState.newAccount.currency || ""}
                        placeholder="Select currency"
                        options={["USD", "EUR", "GBP", "CHF", "JPY", "CAD", "AUD", "Other"]}
                        onChange={(value) => accountFormState.handleSelectionChange("currency", value)}
                        required={false}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Form Actions */}
              <div className="flex justify-between pt-4">
                {financialAccounts.length > 0 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleCancelForm}
                    className="text-black"
                  >
                    Cancel
                  </Button>
                )}
                <Button 
                  type="button" 
                  onClick={accountFormState.handleAddAccount}
                  className="bg-black hover:bg-gray-800 text-white ml-auto"
                >
                  {editingIndex !== null ? "Update Account" : "Add Account"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ManualEntrySection;
