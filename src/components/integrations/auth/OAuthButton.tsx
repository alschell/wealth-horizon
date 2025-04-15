
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { IntegrationType } from "../types";
import { toast } from "@/components/ui/use-toast";

interface OAuthButtonProps {
  integration: IntegrationType;
  onSuccess: () => void;
}

const OAuthButton: React.FC<OAuthButtonProps> = ({ integration, onSuccess }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleOAuthConnect = () => {
    if (!integration.authUrl) {
      toast({
        title: "Configuration Error",
        description: "OAuth URL is not configured for this integration.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);

    // Mock OAuth flow for demo purposes
    // In a real app, this would open a popup or redirect to the OAuth provider
    try {
      const authUrl = new URL(integration.authUrl);
      
      // Add standard OAuth parameters
      authUrl.searchParams.append("client_id", "mock_client_id");
      authUrl.searchParams.append("redirect_uri", `${window.location.origin}/auth/callback`);
      authUrl.searchParams.append("response_type", "code");
      authUrl.searchParams.append("state", crypto.randomUUID());
      
      // Add scopes if available
      if (integration.scopes && integration.scopes.length > 0) {
        authUrl.searchParams.append("scope", integration.scopes.join(" "));
      }
      
      // In a real app, we would open this URL in a popup or redirect
      console.log("OAuth URL:", authUrl.toString());
      
      // Mock successful OAuth flow
      setTimeout(() => {
        setIsConnecting(false);
        toast({
          title: "Successfully Connected",
          description: `Connected to ${integration.name} via OAuth`,
        });
        onSuccess();
      }, 1500);
    } catch (error) {
      console.error("OAuth error:", error);
      setIsConnecting(false);
      toast({
        title: "Connection Failed",
        description: "Failed to connect via OAuth. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="default"
      className="w-full"
      onClick={handleOAuthConnect}
      disabled={isConnecting}
    >
      {isConnecting ? "Connecting..." : `Connect to ${integration.name}`}
    </Button>
  );
};

export default OAuthButton;
