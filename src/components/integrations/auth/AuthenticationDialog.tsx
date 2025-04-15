
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IntegrationType } from "../types";
import ApiKeyForm from "./ApiKeyForm";
import OAuthButton from "./OAuthButton";
import CredentialsForm from "./CredentialsForm";
import { toast } from "@/components/ui/use-toast";

export interface ApiKeyFormData {
  apiKey: string;
  service?: string;
}

interface AuthenticationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  integration: IntegrationType;
}

const AuthenticationDialog: React.FC<AuthenticationDialogProps> = ({
  isOpen,
  onClose,
  integration,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApiKeySubmit = async (data: ApiKeyFormData) => {
    setIsSubmitting(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Integration Connected",
        description: `Successfully connected to ${integration.name}`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine which authentication UI to show
  const renderAuthUI = () => {
    if (integration.authMethod === "apiKey") {
      return (
        <ApiKeyForm
          integration={integration}
          onSubmit={handleApiKeySubmit}
          onCancel={onClose}
        />
      );
    } else if (integration.authMethod === "oauth") {
      return <OAuthButton integration={integration} onSuccess={onClose} />;
    } else if (integration.authMethod === "credentials") {
      return <CredentialsForm integration={integration} onSubmit={() => {}} onCancel={onClose} />;
    } else if (integration.authMethod === "both") {
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Connect with OAuth</h3>
            <OAuthButton integration={integration} onSuccess={onClose} />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Connect with API Key</h3>
            <ApiKeyForm
              integration={integration}
              onSubmit={handleApiKeySubmit}
              onCancel={onClose}
            />
          </div>
        </div>
      );
    }
    
    return <div>Unsupported authentication method</div>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect to {integration.name}</DialogTitle>
          <DialogDescription>
            {integration.description}
          </DialogDescription>
        </DialogHeader>
        {renderAuthUI()}
      </DialogContent>
    </Dialog>
  );
};

export default AuthenticationDialog;
