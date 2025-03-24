
import React from "react";
import { AggregatorInfo } from "@/context/OnboardingContext";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { AGGREGATORS } from "@/utils/financialDataConstants";
import AggregatorCredentialsForm from "./AggregatorCredentialsForm";
import { SearchableSelectField } from "@/components/onboarding/family-office/field-components";

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
};

interface AggregatorSectionProps {
  aggregatorInfo: AggregatorInfo;
  setAggregatorInfo: (info: AggregatorInfo) => void;
}

const AggregatorSection = ({
  aggregatorInfo,
  setAggregatorInfo
}: AggregatorSectionProps) => {
  const handleAggregatorSelection = (value: string) => {
    setAggregatorInfo({
      ...aggregatorInfo,
      usesAggregator: value === "yes"
    });
  };

  const handleAggregatorNameChange = (value: string) => {
    setAggregatorInfo({
      ...aggregatorInfo,
      aggregatorName: value,
      aggregatorCredentials: { username: "" }
    });
  };

  const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAggregatorInfo({
      ...aggregatorInfo,
      aggregatorCredentials: {
        ...aggregatorInfo.aggregatorCredentials!,
        [name]: value
      }
    });
  };

  return (
    <>
      <motion.div 
        custom={0}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <Label>Does your family office currently use a financial data aggregator?</Label>
        <RadioGroup
          value={aggregatorInfo.usesAggregator ? "yes" : "no"}
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

      {aggregatorInfo.usesAggregator && (
        <motion.div 
          custom={1}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 border p-4 rounded-lg mt-4"
        >
          <SearchableSelectField
            id="aggregatorName"
            label=""
            value={aggregatorInfo.aggregatorName || ""}
            onChange={handleAggregatorNameChange}
            placeholder="Select your aggregator"
            options={AGGREGATORS}
          />

          {aggregatorInfo.aggregatorName && (
            <AggregatorCredentialsForm 
              aggregatorInfo={aggregatorInfo}
              handleCredentialsChange={handleCredentialsChange}
              itemVariants={itemVariants}
            />
          )}
        </motion.div>
      )}
    </>
  );
};

export default AggregatorSection;
