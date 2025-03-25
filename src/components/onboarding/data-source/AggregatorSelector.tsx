
import React from "react";
import { AggregatorInfo } from "@/context/OnboardingContext";
import { AGGREGATORS } from "@/utils/constants";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AggregatorSelectorProps {
  aggregatorInfo: AggregatorInfo;
  handleAggregatorNameChange: (value: string) => void;
  handleCredentialsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AggregatorSelector = ({
  aggregatorInfo,
  handleAggregatorNameChange,
  handleCredentialsChange
}: AggregatorSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="aggregatorName">
          Data Aggregation Service<span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          value={aggregatorInfo.aggregatorName}
          onValueChange={handleAggregatorNameChange}
        >
          <SelectTrigger id="aggregatorName" className="h-11 w-full bg-white">
            <SelectValue placeholder="Select aggregator service" />
          </SelectTrigger>
          <SelectContent className="bg-white" style={{ zIndex: 100 }}>
            {AGGREGATORS.map((aggregator) => (
              <SelectItem 
                key={aggregator} 
                value={aggregator}
                className="cursor-pointer"
              >
                {aggregator}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {aggregatorInfo.aggregatorName && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Access Credentials</h3>
          
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
          
          {/* Only display API Key field for certain aggregators */}
          {(aggregatorInfo.aggregatorName === "Plaid" || 
           aggregatorInfo.aggregatorName === "Yodlee" || 
           aggregatorInfo.aggregatorName === "MX") && (
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                name="apiKey"
                value={aggregatorInfo.aggregatorCredentials?.apiKey || ""}
                onChange={handleCredentialsChange}
                placeholder="Enter your API key"
                className="h-11"
              />
            </div>
          )}
          
          {/* Add email field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              value={aggregatorInfo.aggregatorCredentials?.email || ""}
              onChange={handleCredentialsChange}
              placeholder="Enter your email address"
              className="h-11"
              type="email"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AggregatorSelector;
