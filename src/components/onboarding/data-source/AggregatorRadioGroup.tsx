
import React from "react";
import { AggregatorInfo } from "@/context/OnboardingContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface AggregatorRadioGroupProps {
  aggregatorInfo: AggregatorInfo;
  handleAggregatorSelection: (value: "yes" | "no") => void;
}

const AggregatorRadioGroup: React.FC<AggregatorRadioGroupProps> = ({
  aggregatorInfo,
  handleAggregatorSelection
}) => {
  const radioGroupValue = aggregatorInfo.usesAggregator ? "yes" : "no";

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-black">How would you like to provide your financial data?</h3>
      
      <RadioGroup 
        value={radioGroupValue} 
        onValueChange={(value) => handleAggregatorSelection(value as "yes" | "no")}
        className="space-y-3"
      >
        <div className="flex items-start space-x-3">
          <RadioGroupItem value="yes" id="usesAggregator" />
          <div className="grid gap-1.5">
            <Label htmlFor="usesAggregator" className="font-medium text-black">
              Connect to data aggregator
            </Label>
            <p className="text-sm text-gray-500">
              We'll connect to your data aggregator to automatically import your financial data.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <RadioGroupItem value="no" id="noAggregator" />
          <div className="grid gap-1.5">
            <Label htmlFor="noAggregator" className="font-medium text-black">
              Submit Financial Information
            </Label>
            <p className="text-sm text-gray-500">
              Manually enter your financial accounts or upload your financial documents.
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default AggregatorRadioGroup;
