
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IntegrationsHeader from "@/components/integrations/IntegrationsHeader";
import IntegrationCards from "@/components/integrations/IntegrationCards";
import ActiveIntegrations from "@/components/integrations/ActiveIntegrations";

const Integrations = () => {
  const [activeTab, setActiveTab] = useState<string>("available");

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
            <ActiveIntegrations />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Integrations;
