
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { itemVariants } from "@/components/onboarding/common/AnimationVariants";

interface AggregatorRadioGroupProps {
  usesAggregator: boolean;
  handleAggregatorSelection: (value: string) => void;
}

const AggregatorRadioGroup: React.FC<AggregatorRadioGroupProps> = ({
  usesAggregator,
  handleAggregatorSelection
}) => {
  return (
    <motion.div 
      custom={0}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <Label>Does your family office currently use a financial data aggregator?</Label>
      <RadioGroup
        value={usesAggregator ? "yes" : "no"}
        onValueChange={handleAggregatorSelection}
        className="flex flex-col space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="aggregator-yes" />
          <Label htmlFor="aggregator-yes" className="cursor-pointer">
            Yes, we use a financial data aggregator
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="aggregator-no" />
          <Label htmlFor="aggregator-no" className="cursor-pointer">
            No, we'll provide our financial information directly
          </Label>
        </div>
      </RadioGroup>
    </motion.div>
  );
};

export default AggregatorRadioGroup;
