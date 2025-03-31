
import React from "react";
import MandateTypeSelector from "./mandate/MandateTypeSelector";
import { MandateType } from "../types";

interface MandateSetupProps {
  mandateType: MandateType;
  onMandateTypeChange: (type: MandateType) => void;
  onNext: () => void;
}

const MandateSetup: React.FC<MandateSetupProps> = ({
  mandateType,
  onMandateTypeChange,
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
    </div>
  );
};

export default MandateSetup;
