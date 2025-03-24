
import React from "react";
import { motion } from "framer-motion";
import { AGGREGATORS } from "@/components/onboarding/constants/aggregators";
import { SearchableSelectField } from "@/components/onboarding/accounts/fields";
import { itemVariants } from "@/components/onboarding/common/AnimationVariants";
import AggregatorCredentialsForm from "./AggregatorCredentialsForm";
import { AggregatorInfo } from "@/context/OnboardingContext";

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
  // Handle aggregator selection safely
  const handleAggregatorChange = (value: string) => {
    handleAggregatorNameChange(value);
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
          value={aggregatorInfo.aggregatorName || ""}
          placeholder="Select your aggregator"
          options={AGGREGATORS}
          onChange={handleAggregatorChange}
          allowCustomValue={true}
        />
      </div>

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
