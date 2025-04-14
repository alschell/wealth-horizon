
import React from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Lightbulb } from "@/utils/icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MandateType } from "../../types";
import { Card } from "@/components/ui/card";
import ExecutionTypeCard from "@/components/trading/sections/order-type/ExecutionTypeCard";

interface MandateTypeSelectorProps {
  mandateType: MandateType;
  onChange: (type: MandateType) => void;
}

const MandateTypeSelector: React.FC<MandateTypeSelectorProps> = ({
  mandateType,
  onChange
}) => {
  return (
    <RadioGroup 
      value={mandateType} 
      onValueChange={(value) => onChange(value as MandateType)}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div className="contents">
        <ExecutionTypeCard
          value="discretionary"
          title="Discretionary"
          description="Bank manages your assets according to your profile"
          icon={ShieldCheck}
          iconColor="text-blue-600"
          isSelected={mandateType === "discretionary"}
          onClick={(value) => onChange(value as MandateType)}
        />
        
        <ExecutionTypeCard
          value="advisory"
          title="Advisory"
          description="Get recommendations but maintain control"
          icon={Lightbulb}
          iconColor="text-amber-600"
          isSelected={mandateType === "advisory"}
          onClick={(value) => onChange(value as MandateType)}
        />
      </div>
    </RadioGroup>
  );
};

export default MandateTypeSelector;
