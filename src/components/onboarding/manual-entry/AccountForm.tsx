
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { AccountFormProps } from "./types";
import { useAccountForm } from "@/components/onboarding/accounts/hooks/useAccountForm";
import { useLegalEntityMapping } from "@/components/onboarding/accounts/hooks/useLegalEntityMapping";

import BasicInfoSection from "./sections/BasicInfoSection";
import LegalEntitySection from "./sections/LegalEntitySection";
import AccountDetailsSection from "./sections/AccountDetailsSection";

const AccountForm: React.FC<AccountFormProps> = ({ onAddAccount }) => {
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

  return (
    <Card className="p-5 border rounded-lg">
      <div className="grid grid-cols-1 gap-4">
        <LegalEntitySection 
          account={newAccount}
          legalEntities={legalEntitiesList}
          onInputChange={handleNewAccountChange}
          onSelectionChange={handleAccountSelectionChange}
          handleLegalEntityChange={handleLegalEntityChange}
          handleLeiChange={handleLeiChange}
        />
        
        <BasicInfoSection 
          account={newAccount}
          onInputChange={handleNewAccountChange}
          onSelectionChange={handleAccountSelectionChange}
        />
        
        <AccountDetailsSection 
          account={newAccount}
          onInputChange={handleNewAccountChange}
          onSelectionChange={handleAccountSelectionChange}
        />
        
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
  );
};

export default AccountForm;
