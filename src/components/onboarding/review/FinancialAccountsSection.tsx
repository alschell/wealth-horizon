
import React from "react";
import { FinancialAccountInfo, AggregatorInfo } from "@/context/OnboardingContext";
import ReviewSectionHeader from "./ReviewSectionHeader";

interface FinancialAccountsSectionProps {
  financialAccounts: FinancialAccountInfo[];
  aggregatorInfo: AggregatorInfo;
}

const FinancialAccountsSection: React.FC<FinancialAccountsSectionProps> = ({ 
  financialAccounts,
  aggregatorInfo
}) => {
  return (
    <section className="space-y-3 border-b pb-4">
      <ReviewSectionHeader title="Financial Accounts" stepIndex={5} />
      {financialAccounts.length > 0 ? (
        <div className="space-y-2">
          {financialAccounts.map((account, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-md text-sm">
              <div className="font-medium text-black">{account.accountName}</div>
              <div className="text-black">
                {account.institution}
                {account.legalEntity && ` · ${account.legalEntity}`}
                {account.accountType && ` · ${account.accountType}`}
                {account.currency && ` · ${account.currency}`}
              </div>
              {account.legalEntityIdentifier && (
                <div className="text-xs text-gray-500 mt-1">
                  LEI: {account.legalEntityIdentifier}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-black">
          {aggregatorInfo.usesAggregator 
            ? `Using aggregator: ${aggregatorInfo.aggregatorName}`
            : "No financial accounts added"
          }
        </div>
      )}
    </section>
  );
};

export default FinancialAccountsSection;
