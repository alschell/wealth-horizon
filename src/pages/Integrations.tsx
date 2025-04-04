
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IntegrationsHeader from "@/components/integrations/IntegrationsHeader";
import IntegrationCards from "@/components/integrations/IntegrationCards";
import ActiveIntegrations from "@/components/integrations/ActiveIntegrations";
import { useOnboarding } from "@/context/OnboardingContext";
import { connectedIntegrations } from "@/components/integrations/data/connected-integrations";
import { ConnectedIntegrationType } from "@/components/integrations/types";
import { Database } from "lucide-react";

const Integrations = () => {
  const [activeTab, setActiveTab] = useState<string>("available");
  const { onboardingData } = useOnboarding();
  const [updatedConnectedIntegrations, setUpdatedConnectedIntegrations] = 
    useState<ConnectedIntegrationType[]>(connectedIntegrations);

  // Update connected integrations when onboarding data changes
  useEffect(() => {
    // First, remove any placeholder aggregator
    const filteredIntegrations = connectedIntegrations.filter(
      integration => integration.id !== "aggregator-placeholder"
    );

    // If user has selected an aggregator in onboarding, add it to connected integrations
    if (onboardingData.aggregatorInfo.usesAggregator && 
        onboardingData.aggregatorInfo.aggregatorName) {
      
      const aggregatorName = onboardingData.aggregatorInfo.aggregatorName;
      const aggregatorId = aggregatorName.toLowerCase().replace(/\s+/g, "-");
      
      const connectedAggregator: ConnectedIntegrationType = {
        id: aggregatorId,
        name: aggregatorName,
        description: `Connected financial data aggregator service`,
        icon: <Database className="h-6 w-6" />,
        category: "aggregators",
        features: [
          "Automatic data import",
          "Financial data consolidation", 
          "Reporting integration"
        ],
        status: "stable",
        connectionStatus: "active",
        lastSynced: "Today at 11:00 AM",
        authMethod: "apiKey",
        apiKeyName: `${aggregatorName} API Key`
      };
      
      setUpdatedConnectedIntegrations([...filteredIntegrations, connectedAggregator]);
    } else {
      setUpdatedConnectedIntegrations(filteredIntegrations);
    }
  }, [onboardingData.aggregatorInfo]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <IntegrationsHeader />
        
        <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="available">Available Integrations</TabsTrigger>
            <TabsTrigger value="connected">Connected Services</TabsTrigger>
          </TabsList>
          <TabsContent value="available" className="mt-6">
            <IntegrationCards />
          </TabsContent>
          <TabsContent value="connected" className="mt-6">
            <ActiveIntegrations connectedIntegrations={updatedConnectedIntegrations} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Integrations;
