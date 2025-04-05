
import React from "react";
import { Bank, MandateType } from "../types";
import BankSelectorComponent from "./mandate/BankSelector";

interface BankSelectorProps {
  selectedBank: Bank | null;
  mandateType: MandateType;
  onBankSelection: (bank: Bank | null) => void;
}

const BankSelector: React.FC<BankSelectorProps> = ({
  selectedBank,
  mandateType,
  onBankSelection
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Select Advisory Institution</h2>
      <p className="text-gray-600 mb-6">
        Choose a bank to provide {mandateType === "discretionary" ? "discretionary management" : "advisory services"} for your assets.
      </p>
      
      <BankSelectorComponent 
        selectedBank={selectedBank}
        mandateType={mandateType}
        onBankSelection={onBankSelection}
      />
    </div>
  );
};

export default BankSelector;
