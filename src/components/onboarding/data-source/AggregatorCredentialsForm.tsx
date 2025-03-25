
import React from "react";
import { motion } from "framer-motion";
import { AggregatorInfo } from "@/context/OnboardingContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AggregatorCredentialsFormProps {
  aggregatorInfo: AggregatorInfo;
  handleCredentialsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  itemVariants: any;
}

const AggregatorCredentialsForm: React.FC<AggregatorCredentialsFormProps> = ({
  aggregatorInfo,
  handleCredentialsChange,
  itemVariants
}) => {
  return (
    <motion.div 
      custom={2}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <h3 className="text-md font-medium">Aggregator Credentials</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">
            Username<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="username"
            name="username"
            value={aggregatorInfo.aggregatorCredentials?.username || ""}
            onChange={handleCredentialsChange}
            placeholder="Enter your username"
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            value={aggregatorInfo.aggregatorCredentials?.email || ""}
            onChange={handleCredentialsChange}
            placeholder="Enter your email address (optional)"
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="apiKey">
            API Key
          </Label>
          <Input
            id="apiKey"
            name="apiKey"
            value={aggregatorInfo.aggregatorCredentials?.apiKey || ""}
            onChange={handleCredentialsChange}
            placeholder="Enter your API key if applicable"
            className="h-11"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default AggregatorCredentialsForm;
