
import React from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, LightbulbIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MandateType } from "../../types";

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
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div className={`border rounded-lg p-4 cursor-pointer transition-all ${
        mandateType === "discretionary" ? "border-black bg-gray-100" : "border-gray-200 hover:bg-gray-50"
      }`}>
        <RadioGroupItem 
          value="discretionary" 
          id="discretionary" 
          className="sr-only" 
        />
        <Label 
          htmlFor="discretionary" 
          className="cursor-pointer flex flex-col h-full"
        >
          <div className="flex items-start mb-3">
            <div className="shrink-0 mr-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-medium text-lg mb-1">Discretionary Mandate</p>
              <p className="text-sm text-gray-600">Bank manages your assets according to your investment profile and objectives</p>
            </div>
            {mandateType === "discretionary" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-2"
              >
                <Check className="h-5 w-5 text-black" />
              </motion.div>
            )}
          </div>

          <div className="mt-auto">
            <div className="text-sm space-y-2">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                <span>Professional portfolio management</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                <span>Dedicated investment team</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                <span>Tactical asset allocation</span>
              </div>
            </div>
          </div>
        </Label>
      </div>

      <div className={`border rounded-lg p-4 cursor-pointer transition-all ${
        mandateType === "advisory" ? "border-black bg-gray-100" : "border-gray-200 hover:bg-gray-50"
      }`}>
        <RadioGroupItem 
          value="advisory" 
          id="advisory" 
          className="sr-only" 
        />
        <Label 
          htmlFor="advisory" 
          className="cursor-pointer flex flex-col h-full"
        >
          <div className="flex items-start mb-3">
            <div className="shrink-0 mr-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <LightbulbIcon className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-medium text-lg mb-1">Advisory Mandate</p>
              <p className="text-sm text-gray-600">Receive recommendations but maintain final decision-making authority</p>
            </div>
            {mandateType === "advisory" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-2"
              >
                <Check className="h-5 w-5 text-black" />
              </motion.div>
            )}
          </div>

          <div className="mt-auto">
            <div className="text-sm space-y-2">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                <span>Personalized recommendations</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                <span>Maintain control over decisions</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2" />
                <span>Direct execution on platform</span>
              </div>
            </div>
          </div>
        </Label>
      </div>
    </RadioGroup>
  );
};

export default MandateTypeSelector;
