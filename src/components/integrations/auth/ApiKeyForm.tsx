
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IntegrationType } from "../types";
import { toast } from "@/components/ui/use-toast";

export interface ApiKeyFormData {
  apiKey: string;
  service?: string;
}

interface ApiKeyFormProps {
  integration: IntegrationType;
  onSubmit: (data: ApiKeyFormData) => void;
  onCancel: () => void;
}

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ 
  integration, 
  onSubmit,
  onCancel
}) => {
  const [apiKey, setApiKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "Missing API Key",
        description: "Please enter your API key",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formData: ApiKeyFormData = {
        apiKey,
        service: integration.id
      };
      
      onSubmit(formData);
    } catch (error) {
      console.error("Error connecting API:", error);
      toast({
        title: "Connection Failed",
        description: "There was an error connecting to the service. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="apiKey">
          {integration.apiKeyName || `${integration.name} API Key`}
        </Label>
        <Input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key"
          autoComplete="off"
          required
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Connecting..." : "Connect"}
        </Button>
      </div>
    </form>
  );
};

export default ApiKeyForm;
