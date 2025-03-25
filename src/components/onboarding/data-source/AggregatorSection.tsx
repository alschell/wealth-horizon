
import React from "react";
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

  // Ensure "Other" is at the end of the list
  const sortedAggregators = [...AGGREGATORS];
  if (sortedAggregators.includes("Other")) {
    const otherIndex = sortedAggregators.indexOf("Other");
    sortedAggregators.splice(otherIndex, 1);
    sortedAggregators.push("Other");
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3 mt-4">
        <Label className="text-black">Select your aggregator</Label>
        <div className="relative">
          <SearchableSelectField
            id="aggregator"
            label=""
            value={aggregatorInfo.aggregatorName || ""}
            placeholder="Select or enter your data aggregator"
            options={sortedAggregators}
            onChange={handleAggregatorChange}
            allowCustomValue={true}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-black">User ID*</Label>
        <Input
          placeholder="Enter your user ID"
          name="username"
          value={aggregatorInfo.aggregatorCredentials?.username || ""}
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
