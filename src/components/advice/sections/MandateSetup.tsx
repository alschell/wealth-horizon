
import React from "react";
import MandateTypeSelector from "./mandate/MandateTypeSelector";
import { MandateType } from "../types";

interface MandateSetupProps {
  mandateType: MandateType;
  onMandateTypeChange: (type: MandateType) => void;
}

const MandateSetup: React.FC<MandateSetupProps> = ({
  mandateType,
  onMandateTypeChange
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Select Mandate Type</h2>
      <p className="text-gray-600 mb-6">
        Choose the type of management that best fits your needs
      </p>
      
      <MandateTypeSelector 
        mandateType={mandateType}
        onChange={onMandateTypeChange}
      />
    </div>
  );
};

export default MandateSetup;
