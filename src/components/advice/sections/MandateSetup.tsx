
import React from "react";
import MandateTypeSelector from "./mandate/MandateTypeSelector";
import { MandateType } from "../types";
import { Button } from "@/components/ui/button";
import { FormLayout, FormSection } from "@/components/onboarding/common/layouts";

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
    <FormSection>
      <FormLayout>
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">How would you like your assets managed?</h2>
            <p className="text-gray-500">Choose the type of management that best fits your needs</p>
          </div>
          
          <MandateTypeSelector 
            mandateType={mandateType}
            onChange={onMandateTypeChange}
          />
          
          <div className="pt-4">
            <Button onClick={onNext} className="w-full md:w-auto">
              Continue
            </Button>
          </div>
        </div>
      </FormLayout>
    </FormSection>
  );
};

export default MandateSetup;
