
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ConnectedIntegrationType } from "./types";

interface ActiveIntegrationsProps {
  connectedIntegrations: ConnectedIntegrationType[];
}

const ActiveIntegrations: React.FC<ActiveIntegrationsProps> = ({ connectedIntegrations }) => {
  const handleSync = (integration: ConnectedIntegrationType) => {
    toast({
      title: "Sync initiated",
      description: `Syncing data from ${integration.name}...`,
    });
  };

  const handleDisconnect = (integration: ConnectedIntegrationType) => {
    toast({
      title: "Disconnection initiated",
      description: `Disconnecting ${integration.name}...`,
    });
  };

  if (connectedIntegrations.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium mb-2">No Connected Integrations</h3>
        <p className="text-gray-500">Connect services from the Available Integrations tab</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {connectedIntegrations.map((integration) => (
        <Card key={integration.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                {integration.icon}
              </div>
              <div className={`flex items-center px-2 py-1 text-xs rounded-full ${
                integration.connectionStatus === "active" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-amber-100 text-amber-800"
              }`}>
                {integration.connectionStatus === "active" 
                  ? <CheckCircle2 className="h-3 w-3 mr-1" /> 
                  : <AlertCircle className="h-3 w-3 mr-1" />}
                {integration.connectionStatus === "active" ? "Active" : "Needs Attention"}
              </div>
            </div>
            <CardTitle className="mt-4">{integration.name}</CardTitle>
            <CardDescription>{integration.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500 mb-4">
              Last synced: {integration.lastSynced}
            </div>
            <ul className="space-y-1 text-sm">
              {integration.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex gap-2 justify-between">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => handleSync(integration)}
            >
              Sync
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              onClick={() => handleDisconnect(integration)}
            >
              Disconnect
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ActiveIntegrations;
