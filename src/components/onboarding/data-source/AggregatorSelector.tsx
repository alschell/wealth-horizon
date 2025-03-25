
import React, { useState } from "react";
import { motion } from "framer-motion";
import { AGGREGATORS } from "@/components/onboarding/constants/aggregators";
import { SearchableSelectField } from "@/components/onboarding/common/fields";
import { itemVariants } from "@/components/onboarding/common/AnimationVariants";
import AggregatorCredentialsForm from "./AggregatorCredentialsForm";
import { AggregatorInfo } from "@/context/OnboardingContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AggregatorSelectorProps {
  aggregatorInfo: AggregatorInfo;
  handleAggregatorNameChange: (value: string) => void;
  handleCredentialsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AggregatorSelector: React.FC<AggregatorSelectorProps> = ({
  aggregatorInfo,
  handleAggregatorNameChange,
  handleCredentialsChange
}) => {
  const [showCustomInput, setShowCustomInput] = useState(aggregatorInfo.aggregatorName === "Other (Manual Entry)");
  const [customAggregator, setCustomAggregator] = useState("");

  // Handle aggregator selection safely
  const handleAggregatorChange = (value: string) => {
    if (value === "Other (Manual Entry)") {
      setShowCustomInput(true);
      handleAggregatorNameChange(value);
    } else {
      setShowCustomInput(false);
      handleAggregatorNameChange(value);
    }
  };

  const handleCustomAggregatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAggregator(e.target.value);
    if (e.target.value) {
      handleAggregatorNameChange(e.target.value);
    } else {
      handleAggregatorNameChange("Other (Manual Entry)");
    }
  };

  return (
    <motion.div 
      custom={1}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 border p-4 rounded-lg mt-4"
    >
      <div className="space-y-2">
        <SearchableSelectField
          id="aggregatorName"
          label="Aggregator"
          value={showCustomInput ? "Other (Manual Entry)" : aggregatorInfo.aggregatorName || ""}
          placeholder="Select your aggregator"
          options={AGGREGATORS}
          onChange={handleAggregatorChange}
          allowCustomValue={false}
        />
      </div>

      {showCustomInput && (
        <div className="space-y-2">
          <Label htmlFor="customAggregator">Enter Aggregator Name</Label>
          <Input
            id="customAggregator"
            value={customAggregator}
            onChange={handleCustomAggregatorChange}
            placeholder="Enter your aggregator's name"
            className="h-11"
          />
        </div>
      )}

      {aggregatorInfo.aggregatorName && (
        <AggregatorCredentialsForm 
          aggregatorInfo={aggregatorInfo}
          handleCredentialsChange={handleCredentialsChange}
          itemVariants={itemVariants}
        />
      )}
    </motion.div>
  );
};

export default AggregatorSelector;
