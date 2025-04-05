
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import BackButtonHeader from "@/components/navigation/BackButtonHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, LineChart, TrendingUp, Lightning } from "lucide-react";

const ScenarioTypes = [
  { id: "market_crash", name: "Market Crash", description: "Simulate a 20-30% market downturn" },
  { id: "interest_rate", name: "Interest Rate Spike", description: "Simulate 200-300 basis point rate increase" },
  { id: "inflation", name: "High Inflation", description: "Simulate 8-10% sustained inflation" },
  { id: "recession", name: "Economic Recession", description: "Simulate multi-quarter economic contraction" },
  { id: "custom", name: "Custom Scenario", description: "Define your own market conditions" },
];

const PortfolioScenarios = () => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <BackButtonHeader title="Back to Dashboard" />
        
        <PageHeaderCard
          icon={Lightning}
          title="Portfolio Scenario Analysis"
          description="Test how your portfolio would perform under different market conditions"
          iconColor="text-gray-700"
          iconBgColor="bg-gray-100"
        />
        
        <Tabs defaultValue="predefined" className="space-y-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="predefined">Predefined Scenarios</TabsTrigger>
            <TabsTrigger value="custom">Custom Scenario</TabsTrigger>
          </TabsList>
          
          <TabsContent value="predefined" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ScenarioTypes.map((scenario) => (
                <div 
                  key={scenario.id}
                  className={`
                    p-4 rounded-lg border cursor-pointer transition-all
                    ${selectedScenario === scenario.id 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'}
                  `}
                  onClick={() => setSelectedScenario(scenario.id)}
                >
                  <h3 className="font-medium">{scenario.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{scenario.description}</p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end mt-6">
              <Button 
                disabled={!selectedScenario}
                className="bg-black hover:bg-gray-800 text-white"
              >
                Run Scenario Analysis
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="font-medium mb-4">Define Custom Market Conditions</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Set specific parameters to simulate custom market conditions and evaluate the potential impact on your portfolio.
              </p>
              
              <div className="space-y-4">
                {/* Custom scenario builder would go here */}
                <p className="text-sm italic text-gray-500">Custom scenario builder coming soon...</p>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button disabled className="bg-black hover:bg-gray-800 text-white">
                Run Custom Analysis
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioScenarios;
