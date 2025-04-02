
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ScenarioSimulation = () => {
  const [scenarioType, setScenarioType] = useState("monte-carlo");
  const [riskLevel, setRiskLevel] = useState([50]); // 0-100 risk level

  // Sample data for Monte Carlo simulation
  const generateMonteCarloData = (riskFactor: number) => {
    const baseValue = 1000000;
    const volatility = riskFactor / 50; // Convert 0-100 scale to 0-2 scale
    const years = 20;
    const simulations = 10;
    
    const result = [];
    
    for (let year = 0; year <= years; year++) {
      const yearData: any = { year };
      
      for (let sim = 1; sim <= simulations; sim++) {
        // Different expected returns based on simulation path
        const expectedReturn = 0.06 + (sim * 0.005);
        
        if (year === 0) {
          yearData[`sim${sim}`] = baseValue;
        } else {
          const previousValue = result[year - 1][`sim${sim}`];
          const randomReturn = expectedReturn + ((Math.random() - 0.5) * volatility);
          yearData[`sim${sim}`] = Math.round(previousValue * (1 + randomReturn));
        }
      }
      
      // Calculate percentiles
      const simValues = [];
      for (let sim = 1; sim <= simulations; sim++) {
        simValues.push(yearData[`sim${sim}`]);
      }
      
      simValues.sort((a, b) => a - b);
      yearData.min = simValues[0];
      yearData.p25 = simValues[Math.floor(simulations * 0.25)];
      yearData.median = simValues[Math.floor(simulations * 0.5)];
      yearData.p75 = simValues[Math.floor(simulations * 0.75)];
      yearData.max = simValues[simulations - 1];
      
      result.push(yearData);
    }
    
    return result;
  };

  // Sample data for stress test scenarios
  const stressTestData = [
    { year: 2023, baseline: 1000000, marketCrash: 1000000, recession: 1000000, inflation: 1000000 },
    { year: 2024, baseline: 1060000, marketCrash: 800000, recession: 950000, inflation: 1020000 },
    { year: 2025, baseline: 1123600, marketCrash: 840000, recession: 940000, inflation: 1030200 },
    { year: 2026, baseline: 1191016, marketCrash: 890400, recession: 968000, inflation: 1030200 },
    { year: 2027, baseline: 1262477, marketCrash: 943824, recession: 997040, inflation: 1040502 },
    { year: 2028, baseline: 1338226, marketCrash: 1000453, recession: 1026951, inflation: 1050907 },
    { year: 2029, baseline: 1418519, marketCrash: 1060480, recession: 1057760, inflation: 1061416 },
    { year: 2030, baseline: 1503630, marketCrash: 1124109, recession: 1089493, inflation: 1072030 }
  ];

  const monteCarloData = generateMonteCarloData(riskLevel[0]);
  
  // Chart configs
  const monteCarloConfig = {
    median: { label: "Median Outcome", color: "#3B82F6" },
    p25: { label: "25th Percentile", color: "#D1D5DB" },
    p75: { label: "75th Percentile", color: "#D1D5DB" },
    min: { label: "Minimum", color: "#EF4444" },
    max: { label: "Maximum", color: "#10B981" }
  };

  const stressTestConfig = {
    baseline: { label: "Baseline", color: "#3B82F6" },
    marketCrash: { label: "Market Crash", color: "#EF4444" },
    recession: { label: "Recession", color: "#F59E0B" },
    inflation: { label: "High Inflation", color: "#8B5CF6" }
  };

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
          <div className="mb-6">
            {scenarioType === "monte-carlo" && (
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
            )}
            
            {scenarioType === "stress-test" && (
              <div className="flex flex-wrap gap-2 mb-4">
                <Button variant="outline" size="sm" className="bg-blue-50">Market Crash (-20%)</Button>
                <Button variant="outline" size="sm">Stagflation</Button>
                <Button variant="outline" size="sm">Rising Rates</Button>
                <Button variant="outline" size="sm">Global Recession</Button>
                <Button variant="outline" size="sm">Custom Scenario</Button>
              </div>
            )}
          </div>

          <div className="h-80">
            {scenarioType === "monte-carlo" && (
              <ChartContainer config={monteCarloConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monteCarloData}
                    margin={{ top: 10, right: 30, left: 30, bottom: 20 }}
                  >
                    <defs>
                      <linearGradient id="colorP25P75" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" />
                    <YAxis 
                      tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent />} 
                      formatter={(value) => [`$${(Number(value)).toLocaleString()}`, '']}
                    />
                    <Area type="monotone" dataKey="p25" stackId="1" stroke="#D1D5DB" fillOpacity={0} />
                    <Area type="monotone" dataKey="p75" stackId="1" stroke="#D1D5DB" fill="url(#colorP25P75)" />
                    <Line type="monotone" dataKey="min" stroke="#EF4444" strokeWidth={1} strokeDasharray="3 3" dot={false} />
                    <Line type="monotone" dataKey="median" stroke="#3B82F6" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="max" stroke="#10B981" strokeWidth={1} strokeDasharray="3 3" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}

            {scenarioType === "stress-test" && (
              <ChartContainer config={stressTestConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={stressTestData}
                    margin={{ top: 10, right: 30, left: 30, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" />
                    <YAxis 
                      tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent />} 
                      formatter={(value) => [`$${(Number(value)).toLocaleString()}`, '']}
                    />
                    <Line type="monotone" dataKey="baseline" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="marketCrash" stroke="#EF4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="recession" stroke="#F59E0B" strokeWidth={2} />
                    <Line type="monotone" dataKey="inflation" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2">Analysis Insights</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                {scenarioType === "monte-carlo"
                  ? `Based on ${riskLevel[0]}% risk tolerance, there is an 80% probability of achieving a portfolio value between $1.7M and $3.2M after 20 years.`
                  : "Under a market crash scenario, your portfolio could experience a 20% drawdown but is projected to recover within 4-5 years."}
              </p>
              <p>
                {scenarioType === "monte-carlo"
                  ? "The median expected outcome results in a 4.8x increase of your initial investment."
                  : "The high inflation scenario poses the most sustained negative impact to your long-term wealth growth."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScenarioSimulation;
