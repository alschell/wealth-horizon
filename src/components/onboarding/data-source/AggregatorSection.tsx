
import React from "react";
import { AggregatorInfo } from "@/context/OnboardingContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AGGREGATORS } from "@/components/onboarding/constants/aggregators";
import { SearchableSelectField } from "../accounts/fields";

interface AggregatorSectionProps {
  aggregatorInfo: AggregatorInfo;
  setAggregatorInfo: React.Dispatch<React.SetStateAction<AggregatorInfo>>;
}

const AggregatorSection: React.FC<AggregatorSectionProps> = ({
  aggregatorInfo,
  setAggregatorInfo
}) => {
  const handleAggregatorChange = (value: string) => {
    setAggregatorInfo({
      ...aggregatorInfo,
      aggregatorName: value
    });
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
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-black">Select your aggregator*</Label>
        <div className="relative z-10">
          <SearchableSelectField
            id="aggregator"
            label="Aggregator"
            value={aggregatorInfo.aggregatorName || ""}
            placeholder="Select or enter your data aggregator"
            options={AGGREGATORS}
            onChange={handleAggregatorChange}
            required
            allowCustomValue={true}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-black">Username or Contact Email*</Label>
        <Input
          placeholder="Enter your username or contact email"
          name="username"
          value={aggregatorInfo.aggregatorCredentials?.username || ""}
          onChange={handleCredentialChange}
        />
      </div>

      <div className="mt-4">
        <Label className="text-black">API Key (optional)</Label>
        <Input
          placeholder="Enter your API key if applicable"
          name="apiKey"
          value={aggregatorInfo.aggregatorCredentials?.apiKey || ""}
          onChange={handleCredentialChange}
          className="mt-2"
        />
      </div>
    </div>
  );
};

export default AggregatorSection;
