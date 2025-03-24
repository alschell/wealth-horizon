
import React from "react";
import { motion } from "framer-motion";
import { AGGREGATORS } from "@/utils/financialDataConstants";
import { SearchableSelectField } from "@/components/onboarding/family-office/field-components";
import { itemVariants } from "@/components/onboarding/common/AnimationVariants";
import AggregatorCredentialsForm from "./AggregatorCredentialsForm";
import { AggregatorInfo } from "@/context/OnboardingContext";
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
  return (
    <motion.div 
      custom={1}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 border p-4 rounded-lg mt-4"
    >
      <div className="space-y-2">
        <Label>Select your aggregator:</Label>
        <SearchableSelectField
          id="aggregatorName"
          label="Aggregator"
          value={aggregatorInfo.aggregatorName || ""}
          onChange={handleAggregatorNameChange}
          placeholder="Select your aggregator"
          options={AGGREGATORS}
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
