
import React from "react";
import { Button } from "@/components/ui/button";
import { IntegrationType } from "../types";
import { toast } from "@/hooks/use-toast";

interface OAuthButtonProps {
  integration: IntegrationType;
}

const OAuthButton: React.FC<OAuthButtonProps> = ({ integration }) => {
  const handleOAuthConnect = () => {
    if (!integration.authUrl) {
      toast({
        title: "Error",
        description: "OAuth URL not configured for this integration",
        variant: "destructive",
      });
      return;
    }

    // In a real implementation, you would:
    // 1. Generate a state parameter for CSRF protection
    // 2. Store that state in localStorage or sessionStorage
    // 3. Configure redirect_uri to your callback endpoint
    
    const state = Math.random().toString(36).substring(2);
    localStorage.setItem(`${integration.id}_oauth_state`, state);
    
    // Build the OAuth URL with required parameters
    const params = new URLSearchParams({
      client_id: `DEMO_CLIENT_ID_${integration.id}`, // This would come from your env vars in real app
      redirect_uri: `${window.location.origin}/integrations/oauth-callback`,
      response_type: "code",
      state,
    });
    
    // Add scopes if available
    if (integration.scopes && integration.scopes.length > 0) {
      params.append("scope", integration.scopes.join(" "));
    }
    
    // Redirect to the OAuth provider
    window.location.href = `${integration.authUrl}?${params.toString()}`;
  };

  return (
    <Button 
      className="w-full" 
      onClick={handleOAuthConnect}
    >
      Connect with {integration.name}
    </Button>
  );
};

export default OAuthButton;
