
import React from "react";
import { Button } from "@/components/ui/button";
import { stressTestData, stressTestConfig } from "../utils/simulationData";
import StressTestChart from "./StressTestChart";
import AnalysisInsights from "../components/AnalysisInsights";

const StressTestTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button variant="outline" size="sm" className="bg-blue-50">Market Crash (-20%)</Button>
        <Button variant="outline" size="sm">Stagflation</Button>
        <Button variant="outline" size="sm">Rising Rates</Button>
        <Button variant="outline" size="sm">Global Recession</Button>
        <Button variant="outline" size="sm">Custom Scenario</Button>
      </div>

      <div className="w-full h-[300px]">
        <StressTestChart data={stressTestData} config={stressTestConfig} />
      </div>

      <AnalysisInsights scenarioType="stress-test" />
    </div>
  );
};

export default StressTestTab;
