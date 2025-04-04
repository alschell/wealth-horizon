
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IntegrationType, ApiKeyFormData } from "../types";
import OAuthButton from "./OAuthButton";
import ApiKeyForm from "./ApiKeyForm";
import { toast } from "@/hooks/use-toast";

interface AuthenticationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  integration: IntegrationType;
}

const AuthenticationDialog: React.FC<AuthenticationDialogProps> = ({
  isOpen,
  onOpenChange,
  integration,
}) => {
  const handleApiKeySubmit = (data: ApiKeyFormData) => {
    // In a real app, you would send this to your backend
    console.log("API Key submitted:", data);
    
    // Close the dialog
    onOpenChange(false);
    
    // Show success toast
    toast({
      title: "Integration Connected",
      description: `Successfully connected to ${integration.name}`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect to {integration.name}</DialogTitle>
          <DialogDescription>
            Choose your preferred authentication method to connect.
          </DialogDescription>
        </DialogHeader>
        
        {integration.authMethod === "both" ? (
          <Tabs defaultValue="oauth" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="oauth">OAuth</TabsTrigger>
              <TabsTrigger value="apiKey">API Key</TabsTrigger>
            </TabsList>
            <TabsContent value="oauth" className="mt-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Connect securely with OAuth. You will be redirected to {integration.name} to authorize access.
                </p>
                <OAuthButton integration={integration} />
              </div>
            </TabsContent>
            <TabsContent value="apiKey" className="mt-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Enter your API key from your {integration.name} account.
                </p>
                <ApiKeyForm integration={integration} onSubmit={handleApiKeySubmit} />
              </div>
            </TabsContent>
          </Tabs>
        ) : integration.authMethod === "oauth" ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Connect securely with OAuth. You will be redirected to {integration.name} to authorize access.
            </p>
            <OAuthButton integration={integration} />
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter your API key from your {integration.name} account.
            </p>
            <ApiKeyForm integration={integration} onSubmit={handleApiKeySubmit} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthenticationDialog;
