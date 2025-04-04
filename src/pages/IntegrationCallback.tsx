
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const IntegrationCallback = () => {
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const provider = searchParams.get("provider") || "unknown";
  const error_param = searchParams.get("error");

  useEffect(() => {
    const processOAuthCallback = async () => {
      // Validate state to prevent CSRF attacks
      const savedState = localStorage.getItem(`${provider}_oauth_state`);
      
      if (error_param) {
        setError(`Authentication failed: ${error_param}`);
        setIsProcessing(false);
        return;
      }
      
      if (!code) {
        setError("No authorization code received");
        setIsProcessing(false);
        return;
      }
      
      if (state !== savedState) {
        setError("Invalid state parameter. Authentication attempt may have been compromised.");
        setIsProcessing(false);
        return;
      }
      
      try {
        // In a real app, you would exchange the code for an access token with your backend
        console.log("Exchanging code for token", { code, state, provider });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Clear the state from localStorage
        localStorage.removeItem(`${provider}_oauth_state`);
        
        toast({
          title: "Integration connected",
          description: "Your account was successfully connected",
        });
        
        // Navigate back to integrations page
        navigate("/integrations");
      } catch (err) {
        console.error("Authentication error:", err);
        setError("Failed to complete authentication. Please try again.");
        setIsProcessing(false);
      }
    };
    
    processOAuthCallback();
  }, [code, state, provider, error_param, navigate]);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Integration Authentication</h1>
          
          {isProcessing ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-600">Processing authentication...</p>
            </div>
          ) : error ? (
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-md">
                <p className="text-red-800">{error}</p>
              </div>
              <Button onClick={() => navigate("/integrations")}>
                Return to Integrations
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-md">
                <p className="text-green-800">Authentication successful!</p>
              </div>
              <p>Redirecting you back to integrations...</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IntegrationCallback;
