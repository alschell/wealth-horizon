
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { generateMonteCarloData, monteCarloConfig } from "../utils/simulationData";
import MonteCarloChart from "./MonteCarloChart";
import AnalysisInsights from "../components/AnalysisInsights";

const MonteCarloTab = () => {
  const [riskLevel, setRiskLevel] = useState([50]); // 0-100 risk level
  const monteCarloData = generateMonteCarloData(riskLevel[0]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <h4 className="text-sm font-medium">Risk Level</h4>
            <span className="text-sm font-bold">{riskLevel[0]}%</span>
          </div>
          <Slider
            value={riskLevel}
            onValueChange={setRiskLevel}
            max={100}
            min={10}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Conservative</span>
            <span>Balanced</span>
            <span>Aggressive</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">Run 100 Simulations</Button>
          <Button variant="outline" size="sm">Run 1,000 Simulations</Button>
          <Button variant="outline" size="sm">Custom Parameters</Button>
        </div>
      </div>

      <div className="h-80">
        <MonteCarloChart data={monteCarloData} config={monteCarloConfig} />
      </div>

      <AnalysisInsights 
        scenarioType="monte-carlo"
        riskLevel={riskLevel[0]}
      />
    </div>
  );
};

export default MonteCarloTab;
