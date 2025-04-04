
import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgePlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { integrationCategories, availableIntegrations } from "./data";
import IntegrationFilters from "./IntegrationFilters";
import AuthenticationDialog from "./auth/AuthenticationDialog";
import { IntegrationType } from "./types";

const IntegrationCards = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [selectedIntegration, setSelectedIntegration] = React.useState<IntegrationType | null>(null);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = React.useState(false);
  
  // Add useEffect to log categories and integrations when component mounts
  useEffect(() => {
    console.log("Integration categories in IntegrationCards:", integrationCategories);
    console.log("Available integrations in IntegrationCards:", availableIntegrations);
  }, []);

  const handleConnect = (integration: IntegrationType) => {
    setSelectedIntegration(integration);
    setIsAuthDialogOpen(true);
    
    toast({
      title: "Connection initiated",
      description: `Starting connection process with ${integration.name}...`,
    });
  };

  const filteredIntegrations = selectedCategory === "all" 
    ? availableIntegrations 
    : availableIntegrations.filter(integration => integration.category === selectedCategory);
  
  console.log("Filtered integrations:", filteredIntegrations);
  console.log("Selected category:", selectedCategory);

  return (
    <div className="space-y-6">
      <IntegrationFilters 
        categories={integrationCategories} 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      {filteredIntegrations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <Card key={integration.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                    {integration.icon}
                  </div>
                  <div className={`px-2 py-1 text-xs rounded-full ${
                    integration.status === "beta" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                  }`}>
                    {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                  </div>
                </div>
                <CardTitle className="mt-4">{integration.name}</CardTitle>
                <CardDescription>{integration.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-sm">
                  {integration.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handleConnect(integration)}
                >
                  <BadgePlus className="mr-2 h-4 w-4" />
                  Connect
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500">No integrations found for the selected category.</p>
        </div>
      )}
      
      {selectedIntegration && (
        <AuthenticationDialog
          isOpen={isAuthDialogOpen}
          onOpenChange={setIsAuthDialogOpen}
          integration={selectedIntegration}
        />
      )}
    </div>
  );
};

export default IntegrationCards;
