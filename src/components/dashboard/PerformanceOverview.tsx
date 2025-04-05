
import React from "react";
import { 
  BarChartHorizontal, 
  TrendingUp, 
  DollarSign, 
  LineChart, 
  PieChart, 
  Newspaper, 
  Brain 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";

const PerformanceOverview = () => {
  // Sample data for performance chart
  const performanceData = [
    { month: "Jan", value: 4.2 },
    { month: "Feb", value: 4.5 },
    { month: "Mar", value: 4.8 },
    { month: "Apr", value: 4.7 },
    { month: "May", value: 5.0 },
    { month: "Jun", value: 5.2 },
    { month: "Jul", value: 5.5 },
    { month: "Aug", value: 5.7 },
    { month: "Sep", value: 5.68 }
  ];

  // Sample data for asset allocation
  const assetAllocationData = [
    { name: "Equities", value: 60 },
    { name: "Fixed Income", value: 20 },
    { name: "Real Estate", value: 10 },
    { name: "Alternatives", value: 5 },
    { name: "Cash", value: 5 }
  ];

  // Sample news data
  const newsData = [
    { title: "Fed signals potential rate cut in December", time: "2h ago" },
    { title: "Tech stocks rally on positive earnings", time: "5h ago" }
  ];

  // Sample recommendations
  const recommendations = [
    { text: "Rebalance your equity allocation to reduce risk", priority: "high" },
    { text: "Consider increasing fixed income exposure", priority: "medium" }
  ];

  // Chart config for the performance chart
  const chartConfig = {
    "value": {
      label: "Net Worth",
      color: "#000000"
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>Quick snapshot of your wealth performance</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Net Worth Chart - Fixed height container */}
            <div className="h-36 w-full">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Net Worth Trend</h3>
                  <p className="text-2xl font-bold">$4.48B</p>
                </div>
                <div className="flex items-center text-emerald-600 text-sm font-medium">
                  <TrendingUp className="h-4 w-4 mr-1" /> +3.8% YTD
                </div>
              </div>
              <div className="h-[calc(100%-2rem)] w-full">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#000000" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                      <YAxis hide />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#000000" 
                        fillOpacity={1}
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-600 mb-1">Total Assets</p>
                <p className="text-2xl font-bold">$5.68B</p>
                <div className="flex items-center mt-1 text-emerald-600 text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" /> +5.2% YTD
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-600 mb-1">Total Liabilities</p>
                <p className="text-2xl font-bold">$1.20B</p>
                <div className="flex items-center mt-1 text-gray-600 text-xs">
                  <BarChartHorizontal className="h-3 w-3 mr-1" /> -2.3% YTD
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-600 mb-1">Cash Balance</p>
                <p className="text-2xl font-bold">$1.28B</p>
                <div className="flex items-center mt-1 text-gray-600 text-xs">
                  <BarChartHorizontal className="h-3 w-3 mr-1" /> +1.2% YTD
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-600 mb-1">Investments</p>
                <p className="text-2xl font-bold">$3.40B</p>
                <div className="flex items-center mt-1 text-emerald-600 text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" /> +8.5% YTD
                </div>
              </div>
            </div>

            {/* Top Assets and Recent News */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top Assets */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 text-gray-500" /> Top Assets
                </h3>
                <div className="space-y-2">
                  <div className="p-2 rounded-md border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium">AAPL</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Apple Inc.</p>
                        <p className="text-xs text-gray-500">Technology</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">$420M</p>
                      <p className="text-xs text-emerald-600">+2.3%</p>
                    </div>
                  </div>
                  <div className="p-2 rounded-md border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium">MSFT</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Microsoft Corp.</p>
                        <p className="text-xs text-gray-500">Technology</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">$380M</p>
                      <p className="text-xs text-emerald-600">+1.8%</p>
                    </div>
                  </div>
                  <div className="p-2 rounded-md border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium">AMZN</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Amazon.com Inc.</p>
                        <p className="text-xs text-gray-500">Consumer</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">$325M</p>
                      <p className="text-xs text-red-500">-0.7%</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent News */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <Newspaper className="h-4 w-4 mr-1 text-gray-500" /> Recent News
                </h3>
                <div className="space-y-2">
                  {newsData.map((news, index) => (
                    <div key={index} className="p-3 rounded-md border border-gray-100">
                      <p className="text-sm font-medium">{news.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{news.time}</p>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    View All News
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="charts">
            <div className="space-y-6">
              {/* Asset Allocation Chart */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="text-sm font-medium mb-4 flex items-center">
                  <PieChart className="h-4 w-4 mr-1 text-gray-500" /> Asset Allocation
                </h3>
                <div className="flex flex-wrap justify-between">
                  {assetAllocationData.map((item, index) => (
                    <div key={index} className="mb-2">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-sm mr-2" style={{ backgroundColor: index === 0 ? '#000' : index === 1 ? '#777' : index === 2 ? '#aaa' : index === 3 ? '#555' : '#ccc' }} />
                        <span className="text-xs">{item.name}</span>
                      </div>
                      <p className="text-sm font-medium ml-5">{item.value}%</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Portfolio Performance Chart (placeholder) */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <LineChart className="h-4 w-4 mr-1 text-gray-500" /> Portfolio Performance
                </h3>
                <p className="text-xs text-gray-500 mb-4">Compared to benchmarks</p>
                <div className="h-36 flex items-center justify-center bg-gray-100 rounded">
                  <p className="text-sm text-gray-500">Detailed chart view available in the Analysis section</p>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View Full Analysis
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations">
            <div className="space-y-4">
              <h3 className="text-sm font-medium flex items-center">
                <Brain className="h-4 w-4 mr-1 text-gray-500" /> AI Recommendations
              </h3>
              
              {recommendations.map((rec, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-md border ${
                    rec.priority === 'high' ? 'border-amber-200 bg-amber-50' : 'border-gray-100 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-3 ${
                      rec.priority === 'high' ? 'bg-amber-200' : 'bg-gray-200'
                    }`}>
                      <Brain className="h-3 w-3 text-gray-700" />
                    </div>
                    <div>
                      <p className="text-sm">{rec.text}</p>
                      <p className="text-xs text-gray-500 mt-1 capitalize">{rec.priority} priority</p>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="p-3 rounded-md border border-gray-100">
                <p className="text-sm">Your cash reserves are above target. Consider investing $240M in short-term treasury instruments to improve yield while maintaining liquidity.</p>
                <div className="flex justify-end mt-2">
                  <Button variant="outline" size="sm" className="mr-2">
                    Dismiss
                  </Button>
                  <Button size="sm">
                    Take Action
                  </Button>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                View All Recommendations
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceOverview;
