
import React from "react";
import { Bank, MandateType } from "../types";
import BankSelectorComponent from "./mandate/BankSelector";

interface BankSelectorProps {
  selectedBank: Bank | null;
  mandateType: MandateType;
  onBankSelection: (bank: Bank | null) => void;
  onNext: () => void;
}

const BankSelector: React.FC<BankSelectorProps> = ({
  selectedBank,
  mandateType,
  onBankSelection,
  onNext
}) => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Select Advisory Bank</h2>
        <p className="text-gray-600 mb-6">
          Choose a bank to provide {mandateType === "discretionary" ? "discretionary management" : "advisory services"} for your assets.
        </p>
        
        <BankSelectorComponent 
          selectedBank={selectedBank}
          mandateType={mandateType}
          onBankSelection={onBankSelection}
        />
      </div>
    </div>
  );
};

export default BankSelector;
