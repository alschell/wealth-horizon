
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IntegrationType } from "../types";
import { toast } from "@/components/ui/use-toast";

interface CredentialsFormData {
  username: string;
  password: string;
  service?: string;
}

interface CredentialsFormProps {
  integration: IntegrationType;
  onSubmit: (data: CredentialsFormData) => void;
  onCancel: () => void;
}

const CredentialsForm: React.FC<CredentialsFormProps> = ({
  integration,
  onSubmit,
  onCancel,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formData: CredentialsFormData = {
        username,
        password,
        service: integration.id,
      };
      
      onSubmit(formData);
    } catch (error) {
      console.error("Error connecting:", error);
      toast({
        title: "Connection Failed",
        description: "There was an error connecting to the service. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          autoComplete="username"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
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

export default CredentialsForm;
