
import React from "react";
import { AggregatorInfo } from "@/context/OnboardingContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface AggregatorCredentialsFormProps {
  aggregatorInfo: AggregatorInfo;
  handleCredentialsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  itemVariants: any;
}

const AggregatorCredentialsForm = ({
  aggregatorInfo,
  handleCredentialsChange,
  itemVariants
}: AggregatorCredentialsFormProps) => {
  return (
    <motion.div 
      custom={2}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <Label htmlFor="username">Username or API Key ID</Label>
      <Input
        id="username"
        name="username"
        value={aggregatorInfo.aggregatorCredentials?.username || ""}
        onChange={handleCredentialsChange}
        placeholder="Enter your username or API key identifier"
        className="h-11"
      />
      
      <Label htmlFor="apiKey">API Key (optional)</Label>
      <Input
        id="apiKey"
        name="apiKey"
        type="password"
        value={aggregatorInfo.aggregatorCredentials?.apiKey || ""}
        onChange={handleCredentialsChange}
        placeholder="Enter your API key if applicable"
        className="h-11"
      />
      
      <p className="text-sm text-gray-500 mt-2">
        We'll use these credentials to securely connect to your {aggregatorInfo.aggregatorName} account.
        Your credentials are encrypted and stored securely.
      </p>
    </motion.div>
  );
};

export default AggregatorCredentialsForm;
