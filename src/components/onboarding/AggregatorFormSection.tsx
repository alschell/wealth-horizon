
import { useState } from "react";
import { AggregatorInfo } from "@/context/OnboardingContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { AGGREGATORS } from "@/utils/financialDataConstants";

interface AggregatorFormSectionProps {
  aggregatorInfo: AggregatorInfo;
  setAggregatorInfo: (info: AggregatorInfo) => void;
  itemVariants: any;
}

const AggregatorFormSection = ({ 
  aggregatorInfo, 
  setAggregatorInfo,
  itemVariants 
}: AggregatorFormSectionProps) => {
  
  // Handle aggregator radio selection
  const handleAggregatorSelection = (value: string) => {
    setAggregatorInfo({
      ...aggregatorInfo,
      usesAggregator: value === "yes"
    });
  };

  // Handle aggregator name selection
  const handleAggregatorNameChange = (name: string) => {
    setAggregatorInfo({
      ...aggregatorInfo,
      aggregatorName: name,
      aggregatorCredentials: { username: "" }
    });
  };

  // Handle aggregator credentials
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

      {/* Conditional content based on aggregator usage */}
      {aggregatorInfo.usesAggregator && (
        <motion.div 
          custom={1}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 border p-4 rounded-lg"
        >
          <div className="space-y-4">
            <Label htmlFor="aggregatorName">Select your aggregator</Label>
            <Select
              value={aggregatorInfo.aggregatorName}
              onValueChange={handleAggregatorNameChange}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select your aggregator" />
              </SelectTrigger>
              <SelectContent>
                {AGGREGATORS.map((aggregator) => (
                  <SelectItem key={aggregator} value={aggregator}>
                    {aggregator}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {aggregatorInfo.aggregatorName && (
            <div className="space-y-4">
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
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default AggregatorFormSection;
