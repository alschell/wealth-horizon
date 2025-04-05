
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IntegrationsHeader from "@/components/integrations/IntegrationsHeader";
import IntegrationCards from "@/components/integrations/IntegrationCards";
import ActiveIntegrations from "@/components/integrations/ActiveIntegrations";
import { useOnboarding } from "@/context/OnboardingContext";
import { connectedIntegrations } from "@/components/integrations/data/connected-integrations";
import { ConnectedIntegrationType } from "@/components/integrations/types";
import { Database, Link, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { Button } from "@/components/ui/button";

const Integrations = () => {
  const [activeTab, setActiveTab] = useState<string>("available");
  const { onboardingData } = useOnboarding();
  const navigate = useNavigate();
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
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
        
        <PageHeaderCard
          icon={Link}
          title="Integrations"
          description="Connect and manage external services and data providers"
          iconColor="text-cyan-700"
          iconBgColor="bg-cyan-100"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 max-w-md mb-8">
              <TabsTrigger value="available" className="text-sm">Available Integrations</TabsTrigger>
              <TabsTrigger value="connected" className="text-sm">Connected Services</TabsTrigger>
            </TabsList>
            <TabsContent value="available" className="mt-0">
              <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
                <div className="p-4">
                  <IntegrationCards />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="connected" className="mt-0">
              <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
                <div className="p-4">
                  <ActiveIntegrations connectedIntegrations={updatedConnectedIntegrations} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Integrations;
