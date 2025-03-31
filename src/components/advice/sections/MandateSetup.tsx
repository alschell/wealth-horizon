
import React from "react";
import { Button } from "@/components/ui/button";
import MandateTypeSelector from "./mandate/MandateTypeSelector";
import BankSelector from "./mandate/BankSelector";
import { Bank, MandateType } from "../types";

interface MandateSetupProps {
  mandateType: MandateType;
  selectedBank: Bank | null;
  onMandateTypeChange: (type: MandateType) => void;
  onBankSelection: (bank: Bank | null) => void;
  onNext: () => void;
}

const MandateSetup: React.FC<MandateSetupProps> = ({
  mandateType,
  selectedBank,
  onMandateTypeChange,
  onBankSelection,
  onNext
}) => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Select Mandate Type</h2>
        <p className="text-gray-600 mb-6">
          Choose how you would like your assets to be managed.
        </p>
        
        <MandateTypeSelector 
          mandateType={mandateType}
          onChange={onMandateTypeChange}
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Select Advisory Bank</h2>
        <p className="text-gray-600 mb-6">
          Choose a bank to provide {mandateType === "discretionary" ? "discretionary management" : "advisory services"} for your assets.
        </p>
        
        <BankSelector 
          selectedBank={selectedBank}
          mandateType={mandateType}
          onBankSelection={onBankSelection}
        />
      </div>
    </div>
  );
};

export default MandateSetup;
