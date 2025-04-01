
import React from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Lightbulb } from "lucide-react";
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
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div 
        className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-md ${
          mandateType === "discretionary" 
            ? "border-black bg-gray-50" 
            : "border-gray-200 hover:bg-gray-50"
        }`}
      >
        <RadioGroupItem 
          value="discretionary" 
          id="discretionary" 
          className="sr-only" 
        />
        <Label 
          htmlFor="discretionary" 
          className="cursor-pointer flex flex-col h-full"
        >
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-medium">Discretionary</h3>
            {mandateType === "discretionary" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4"
              >
                <div className="bg-black text-white p-1 rounded-full">
                  <Check className="h-4 w-4" />
                </div>
              </motion.div>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-4">Bank manages your assets according to your profile</p>

          <div className="mt-auto space-y-2 text-sm">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2 shrink-0" />
              <span>Professional portfolio management</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2 shrink-0" />
              <span>Tactical allocation by experts</span>
            </div>
          </div>
        </Label>
      </div>

      <div 
        className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-md ${
          mandateType === "advisory" 
            ? "border-black bg-gray-50" 
            : "border-gray-200 hover:bg-gray-50"
        }`}
      >
        <RadioGroupItem 
          value="advisory" 
          id="advisory" 
          className="sr-only" 
        />
        <Label 
          htmlFor="advisory" 
          className="cursor-pointer flex flex-col h-full"
        >
          <div className="flex items-center mb-4">
            <div className="bg-amber-100 p-3 rounded-full mr-4">
              <Lightbulb className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-medium">Advisory</h3>
            {mandateType === "advisory" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4"
              >
                <div className="bg-black text-white p-1 rounded-full">
                  <Check className="h-4 w-4" />
                </div>
              </motion.div>
            )}
          </div>

          <p className="text-sm text-gray-600 mb-4">Get recommendations but maintain control</p>

          <div className="mt-auto space-y-2 text-sm">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2 shrink-0" />
              <span>Personalized recommendations</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2 shrink-0" />
              <span>Full decision-making authority</span>
            </div>
          </div>
        </Label>
      </div>
    </RadioGroup>
  );
};

export default MandateTypeSelector;
