
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { riskMetricsData } from "./utils/riskUtils";
import PortfolioRiskTab from "./tabs/PortfolioRiskTab";
import RiskExposuresTab from "./exposures/RiskExposuresTab";
import CorrelationTab from "./correlation/CorrelationTab";

const RiskAssessment = () => {
  const [activeTab, setActiveTab] = useState("portfolio");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <CardTitle>Risk Assessment</CardTitle>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid w-full md:w-auto grid-cols-3">
                <TabsTrigger value="portfolio">Portfolio Risk</TabsTrigger>
                <TabsTrigger value="exposures">Risk Exposures</TabsTrigger>
                <TabsTrigger value="correlation">Correlation Analysis</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="portfolio" className="mt-0">
              <PortfolioRiskTab riskMetrics={riskMetricsData} />
            </TabsContent>
            
            <TabsContent value="exposures" className="mt-0">
              <RiskExposuresTab />
            </TabsContent>
            
            <TabsContent value="correlation" className="mt-0">
              <CorrelationTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RiskAssessment;
