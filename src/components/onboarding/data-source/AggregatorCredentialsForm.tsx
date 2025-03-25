
import React from "react";
import { InputField } from "../common/fields";
import { Card } from "@/components/ui/card";

interface AggregatorCredentialsFormProps {
  apiKey: string;
  onApiKeyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AggregatorCredentialsForm: React.FC<AggregatorCredentialsFormProps> = ({
  apiKey,
  onApiKeyChange
}) => {
  return (
    <Card className="p-4 mt-4">
      <InputField
        id="apiKey"
        name="apiKey"
        label="API Key"
        value={apiKey}
        onChange={onApiKeyChange}
        placeholder="Enter your API key if available"
      />
    </Card>
  );
};

export default AggregatorCredentialsForm;
