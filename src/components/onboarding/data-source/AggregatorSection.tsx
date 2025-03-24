
import React from "react";
import { AggregatorInfo } from "@/context/OnboardingContext";
import AggregatorRadioGroup from "./AggregatorRadioGroup";
import AggregatorSelector from "./AggregatorSelector";

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
      <AggregatorRadioGroup 
        usesAggregator={aggregatorInfo.usesAggregator} 
        handleAggregatorSelection={handleAggregatorSelection} 
      />

      {aggregatorInfo.usesAggregator && (
        <AggregatorSelector
          aggregatorInfo={aggregatorInfo}
          handleAggregatorNameChange={handleAggregatorNameChange}
          handleCredentialsChange={handleCredentialsChange}
        />
      )}
    </>
  );
};

export default AggregatorSection;
