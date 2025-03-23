
import React from "react";
import { AggregatorInfo } from "@/context/OnboardingContext";
import { toast } from "@/components/ui/use-toast";
import AggregatorFormSection from "../AggregatorFormSection";

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
  return (
    <AggregatorFormSection 
      aggregatorInfo={aggregatorInfo}
      setAggregatorInfo={setAggregatorInfo}
      itemVariants={itemVariants}
    />
  );
};

export default AggregatorSection;
