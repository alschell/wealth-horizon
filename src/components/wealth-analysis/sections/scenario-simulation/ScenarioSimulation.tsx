
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MonteCarloTab from "./monte-carlo/MonteCarloTab";
import StressTestTab from "./stress-test/StressTestTab";

const ScenarioSimulation = () => {
  const [scenarioType, setScenarioType] = useState("monte-carlo");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <CardTitle>Scenario Analysis & Simulation</CardTitle>
            <Tabs value={scenarioType} onValueChange={setScenarioType} className="w-full md:w-auto">
              <TabsList className="grid w-full md:w-auto grid-cols-2">
                <TabsTrigger value="monte-carlo">Monte Carlo</TabsTrigger>
                <TabsTrigger value="stress-test">Stress Test</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <TabsContent value="monte-carlo" className="mt-0">
            <MonteCarloTab />
          </TabsContent>
          
          <TabsContent value="stress-test" className="mt-0">
            <StressTestTab />
          </TabsContent>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScenarioSimulation;
