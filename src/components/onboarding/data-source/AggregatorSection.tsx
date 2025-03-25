
import React, { useState, useEffect } from "react";
import { AggregatorInfo } from "@/context/OnboardingContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AGGREGATORS } from "@/utils/constants/aggregators";
import { SearchableSelectField } from "../accounts/fields";

interface AggregatorSectionProps {
  aggregatorInfo: AggregatorInfo;
  setAggregatorInfo: React.Dispatch<React.SetStateAction<AggregatorInfo>>;
}

const AggregatorSection: React.FC<AggregatorSectionProps> = ({
  aggregatorInfo,
  setAggregatorInfo
}) => {
  const [showCustomField, setShowCustomField] = useState(aggregatorInfo.aggregatorName === "Other");
  const [errors, setErrors] = useState<{
    aggregatorName?: boolean;
    username?: boolean;
    customAggregator?: boolean;
  }>({});

  const handleAggregatorChange = (value: string) => {
    setAggregatorInfo({
      ...aggregatorInfo,
      aggregatorName: value === "Other" ? "" : value
    });
    setShowCustomField(value === "Other");
    
    if (errors.aggregatorName) {
      setErrors(prev => ({ ...prev, aggregatorName: false }));
    }
  };

  const handleCustomAggregatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAggregatorInfo({
      ...aggregatorInfo,
      aggregatorName: e.target.value
    });
    
    if (errors.customAggregator && e.target.value) {
      setErrors(prev => ({ ...prev, customAggregator: false }));
    }
  };

  const handleCredentialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAggregatorInfo({
      ...aggregatorInfo,
      aggregatorCredentials: {
        ...aggregatorInfo.aggregatorCredentials,
        [name]: value
      }
    });
    
    if (name === 'username' && errors.username && value) {
      setErrors(prev => ({ ...prev, username: false }));
    }
  };

  // Ensure "Other" is at the end of the list
  const sortedAggregators = [...AGGREGATORS];
  const otherIndex = sortedAggregators.indexOf("Other");
  if (otherIndex > -1) {
    sortedAggregators.splice(otherIndex, 1);
    sortedAggregators.push("Other");
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3 mt-4">
        <Label className="text-black">
          Select your aggregator <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <SearchableSelectField
            id="aggregator"
            label=""
            value={showCustomField ? "Other" : aggregatorInfo.aggregatorName || ""}
            placeholder="Select or enter your data aggregator"
            options={sortedAggregators}
            onChange={handleAggregatorChange}
            allowCustomValue={false}
          />
        </div>
        
        {showCustomField && (
          <div className="mt-3">
            <Label className="text-black">
              Enter Aggregator Name <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="Enter the name of your aggregator"
              value={aggregatorInfo.aggregatorName || ""}
              onChange={handleCustomAggregatorChange}
              className="mt-1"
            />
            {errors.customAggregator && (
              <p className="text-sm font-medium text-red-500 mt-1">
                Please enter the aggregator name
              </p>
            )}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <Label className="text-black">
          User ID <span className="text-red-500">*</span>
        </Label>
        <Input
          placeholder="Enter your user ID"
          name="username"
          value={aggregatorInfo.aggregatorCredentials?.username || ""}
          onChange={handleCredentialChange}
        />
        {errors.username && (
          <p className="text-sm font-medium text-red-500 mt-1">
            Please enter your user ID
          </p>
        )}
      </div>

      <div className="space-y-3">
        <Label className="text-black">Contact email address</Label>
        <Input
          placeholder="Enter your contact email"
          name="email"
          type="email"
          value={aggregatorInfo.aggregatorCredentials?.email || ""}
          onChange={handleCredentialChange}
        />
      </div>

      <div className="space-y-3">
        <Label className="text-black">API Key</Label>
        <Input
          placeholder="Enter your API key if applicable"
          name="apiKey"
          value={aggregatorInfo.aggregatorCredentials?.apiKey || ""}
          onChange={handleCredentialChange}
        />
      </div>
    </div>
  );
};

export default AggregatorSection;
