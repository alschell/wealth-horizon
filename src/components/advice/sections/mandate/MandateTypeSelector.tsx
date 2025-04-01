
import React from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Lightbulb } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MandateType } from "../../types";
import { Card } from "@/components/ui/card";

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
      <Card 
        className={`relative p-4 h-full cursor-pointer transition-all ${
          mandateType === "discretionary" 
            ? 'ring-2 ring-black bg-white' 
            : 'bg-white hover:bg-gray-50'
        }`}
      >
        <RadioGroupItem 
          value="discretionary" 
          id="discretionary" 
          className="sr-only" 
        />
        <Label 
          htmlFor="discretionary" 
          className="cursor-pointer flex flex-col items-center h-full text-center"
        >
          <div className="mb-3">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="font-medium mb-2">Discretionary</h3>
          <p className="text-sm text-gray-600">
            Bank manages your assets according to your profile
          </p>

          <div className="mt-auto pt-4 space-y-2 text-xs">
            <div className="flex items-center justify-center">
              <Check className="h-4 w-4 text-green-600 mr-1 shrink-0" />
              <span>Professional portfolio management</span>
            </div>
          </div>
        </Label>
        {mandateType === "discretionary" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2"
          >
            <div className="bg-black text-white p-1 rounded-full">
              <Check className="h-3 w-3" />
            </div>
          </motion.div>
        )}
      </Card>

      <Card 
        className={`relative p-4 h-full cursor-pointer transition-all ${
          mandateType === "advisory" 
            ? 'ring-2 ring-black bg-white' 
            : 'bg-white hover:bg-gray-50'
        }`}
      >
        <RadioGroupItem 
          value="advisory" 
          id="advisory" 
          className="sr-only" 
        />
        <Label 
          htmlFor="advisory" 
          className="cursor-pointer flex flex-col items-center h-full text-center"
        >
          <div className="mb-3">
            <Lightbulb className="h-5 w-5 text-amber-600" />
          </div>
          <h3 className="font-medium mb-2">Advisory</h3>
          <p className="text-sm text-gray-600">
            Get recommendations but maintain control
          </p>

          <div className="mt-auto pt-4 space-y-2 text-xs">
            <div className="flex items-center justify-center">
              <Check className="h-4 w-4 text-green-600 mr-1 shrink-0" />
              <span>Full decision-making authority</span>
            </div>
          </div>
        </Label>
        {mandateType === "advisory" && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2"
          >
            <div className="bg-black text-white p-1 rounded-full">
              <Check className="h-3 w-3" />
            </div>
          </motion.div>
        )}
      </Card>
    </RadioGroup>
  );
};

export default MandateTypeSelector;
