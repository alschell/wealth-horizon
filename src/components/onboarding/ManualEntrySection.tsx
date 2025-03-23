
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { AccountForm, AccountList } from "./accounts";
import { Card } from "@/components/ui/card";

interface ManualEntrySectionProps {
  financialAccounts: FinancialAccountInfo[];
  addFinancialAccount: (account: FinancialAccountInfo) => void;
  removeFinancialAccount: (index: number) => void;
}

const ManualEntrySection = ({ 
  financialAccounts, 
  addFinancialAccount, 
  removeFinancialAccount 
}: ManualEntrySectionProps) => {
  return (
    <div className="space-y-6 mt-4">
      {/* List of added accounts */}
      {financialAccounts.length > 0 && (
        <Card className="p-4 shadow-sm bg-white">
          <AccountList 
            accounts={financialAccounts} 
            onRemoveAccount={removeFinancialAccount} 
          />
        </Card>
      )}
      
      {/* Add new account form */}
      <Card className="p-4 shadow-sm bg-white">
        <AccountForm onAddAccount={addFinancialAccount} />
      </Card>
    </div>
  );
};

export default ManualEntrySection;
