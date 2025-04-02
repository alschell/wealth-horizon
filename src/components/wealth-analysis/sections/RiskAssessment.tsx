
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Shield, AlertCircle } from "lucide-react";

const RiskAssessment = () => {
  const [activeTab, setActiveTab] = useState("portfolio");

  const riskMetrics = [
    {
      label: "Overall Risk Score",
      score: 68,
      change: "+2",
      color: "bg-orange-500",
      tooltip: "Based on asset volatility, concentration, and correlation"
    },
    {
      label: "Volatility (3Y)",
      score: 12.4,
      unit: "%",
      change: "-0.8",
      changeDirection: "down",
      tooltip: "Standard deviation of returns"
    },
    {
      label: "Drawdown Risk",
      score: 18.2,
      unit: "%",
      change: "+1.5",
      changeDirection: "up",
      tooltip: "Maximum potential loss in adverse scenarios"
    },
    {
      label: "VaR (95%)",
      score: 7.5,
      unit: "%",
      change: "+0.3",
      changeDirection: "up",
      tooltip: "Value at Risk - potential loss in 95% of scenarios"
    }
  ];

  const exposureRisks = [
    { name: "Currency Risk", value: 32, warning: "High EUR exposure" },
    { name: "Geographic Risk", value: 28, warning: "Emerging markets concentration" },
    { name: "Sector Risk", value: 65, warning: "Technology sector overweight" },
    { name: "Liquidity Risk", value: 15, warning: null },
    { name: "Interest Rate Risk", value: 42, warning: "Long duration bonds" }
  ];

  const getRiskColor = (value: number) => {
    if (value < 20) return "bg-green-500";
    if (value < 40) return "bg-emerald-500";
    if (value < 60) return "bg-yellow-500";
    if (value < 80) return "bg-orange-500";
    return "bg-red-500";
  };

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
          <TabsContent value="portfolio" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {riskMetrics.map((metric) => (
                <div key={metric.label} className="flex flex-col">
                  <div className="text-sm text-gray-500 mb-1 flex items-center">
                    {metric.label}
                    <div className="relative group ml-1">
                      <span className="cursor-help text-gray-400">ⓘ</span>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-10">
                        {metric.tooltip}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold">
                      {metric.score}{metric.unit || ''}
                    </span>
                    <span className={`ml-2 text-xs flex items-center ${metric.changeDirection === 'down' ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.changeDirection === 'down' ? (
                        <TrendingDown className="h-3 w-3 mr-0.5" />
                      ) : (
                        <TrendingUp className="h-3 w-3 mr-0.5" />
                      )}
                      {metric.change}
                    </span>
                  </div>
                  {metric.color && (
                    <div className="w-full h-1.5 bg-gray-200 rounded mt-1">
                      <div 
                        className={`h-1.5 rounded ${metric.color}`} 
                        style={{ width: `${Math.min(100, metric.score)}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium mb-4">Top Risk Factors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-sm">Technology Sector Concentration</span>
                    </div>
                    <span className="text-sm font-medium">High</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-sm">Interest Rate Sensitivity</span>
                    </div>
                    <span className="text-sm font-medium">Medium</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-sm">Emerging Market Exposure</span>
                    </div>
                    <span className="text-sm font-medium">High</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Diversification Level</span>
                    </div>
                    <span className="text-sm font-medium">Strong</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Liquidity Rating</span>
                    </div>
                    <span className="text-sm font-medium">Strong</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-amber-500 mr-2" />
                      <span className="text-sm">Inflation Protection</span>
                    </div>
                    <span className="text-sm font-medium">Moderate</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="exposures" className="mt-0">
            <div className="space-y-6">
              {exposureRisks.map((risk) => (
                <div key={risk.name} className="space-y-1">
                  <div className="flex justify-between">
                    <div className="text-sm font-medium">{risk.name}</div>
                    <div className="text-sm font-medium">{risk.value}%</div>
                  </div>
                  <Progress value={risk.value} className="h-2" indicatorClassName={getRiskColor(risk.value)} />
                  {risk.warning && (
                    <div className="flex items-center mt-1 text-xs text-amber-600">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {risk.warning}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                <h4 className="text-sm font-medium mb-2">Risk Mitigation Suggestions</h4>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-1">•</span>
                    Reduce technology sector exposure by 15-20% to improve diversification
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-1">•</span>
                    Add Treasury Inflation-Protected Securities (TIPS) to hedge against inflation risks
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 font-bold mr-1">•</span>
                    Consider currency hedging for EUR exposure to reduce currency volatility
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="correlation" className="mt-0">
            <div className="text-sm text-gray-600">
              <p className="mb-4">
                This analysis shows how different assets in your portfolio move in relation to each other.
                Lower correlation between assets generally indicates better diversification.
              </p>
            </div>
            
            <div className="aspect-square max-h-[350px] w-full bg-gray-50 border border-gray-200 rounded-md p-4 flex items-center justify-center">
              <p className="text-gray-500 text-sm">Correlation matrix visualization would appear here</p>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Highest Correlations</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span>US Tech Equities — US Large Cap</span>
                    <span className="font-medium">0.92</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>European Bonds — US Bonds</span>
                    <span className="font-medium">0.85</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>Real Estate — Infrastructure</span>
                    <span className="font-medium">0.78</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Lowest Correlations</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span>Gold — US Equities</span>
                    <span className="font-medium">-0.21</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>Commodities — US Bonds</span>
                    <span className="font-medium">-0.15</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>Japanese Equities — EU Small Cap</span>
                    <span className="font-medium">0.12</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RiskAssessment;
