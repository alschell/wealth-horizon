
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgePlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { integrationCategories, availableIntegrations } from "./integrationData";
import IntegrationFilters from "./IntegrationFilters";

const IntegrationCards = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const handleConnect = (integrationName: string) => {
    toast({
      title: "Connection initiated",
      description: `Starting connection process with ${integrationName}...`,
    });
  };

  const filteredIntegrations = selectedCategory === "all" 
    ? availableIntegrations 
    : availableIntegrations.filter(integration => integration.category === selectedCategory);

  return (
    <div className="space-y-6">
      <IntegrationFilters 
        categories={integrationCategories} 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
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
                onClick={() => handleConnect(integration.name)}
              >
                <BadgePlus className="mr-2 h-4 w-4" />
                Connect
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IntegrationCards;
