import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts";
import { MarketSummaryCard } from "../components/MarketSummaryCard";

const MarketOverview = () => {
  // Mock data - in a real app, this would come from an API
  const marketData = [
    { name: "S&P 500", value: "4,587.20", change: 0.85, color: "#10B981" },
    { name: "NASDAQ", value: "14,346.30", change: 1.2, color: "#10B981" },
    { name: "Dow Jones", value: "36,124.56", change: 0.32, color: "#10B981" },
    { name: "FTSE 100", value: "7,582.10", change: -0.32, color: "#EF4444" },
    { name: "DAX", value: "15,947.80", change: -0.15, color: "#EF4444" },
    { name: "Nikkei 225", value: "37,156.45", change: 1.45, color: "#10B981" },
  ];

  const chartData = [
    { name: "Jan", sp500: 4200, nasdaq: 13200, dowjones: 34800 },
    { name: "Feb", sp500: 4250, nasdaq: 13500, dowjones: 35000 },
    { name: "Mar", sp500: 4100, nasdaq: 13000, dowjones: 34500 },
    { name: "Apr", sp500: 4300, nasdaq: 13800, dowjones: 35200 },
    { name: "May", sp500: 4400, nasdaq: 14000, dowjones: 35500 },
    { name: "Jun", sp500: 4450, nasdaq: 14100, dowjones: 35800 },
    { name: "Jul", sp500: 4500, nasdaq: 14200, dowjones: 36000 },
    { name: "Aug", sp500: 4550, nasdaq: 14300, dowjones: 36100 },
    { name: "Sep", sp500: 4587, nasdaq: 14346, dowjones: 36124 },
  ];

  const assetClasses = [
    { name: "Equities", value: 2.1, color: "#10B981" },
    { name: "Fixed Income", value: -0.3, color: "#EF4444" },
    { name: "Commodities", value: 1.5, color: "#10B981" },
    { name: "Currencies", value: -0.2, color: "#EF4444" },
    { name: "Crypto", value: 3.5, color: "#10B981" },
  ];

  // Chart config
  const chartConfig = {
    sp500: {
      label: "S&P 500",
      color: "#10B981"
    },
    nasdaq: {
      label: "NASDAQ",
      color: "#8B5CF6"
    },
    dowjones: {
      label: "Dow Jones",
      color: "#3B82F6"
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MarketSummaryCard 
          title="Today's Markets"
          subtitle="Major indices overview"
          data={marketData.slice(0, 3)}
        />
        <MarketSummaryCard 
          title="Global Markets"
          subtitle="International indices"
          data={marketData.slice(3, 6)}
        />
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Asset Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assetClasses.map((asset) => (
                <div key={asset.name} className="flex justify-between items-center">
                  <span className="font-medium text-sm">{asset.name}</span>
                  <div className={`flex items-center ${
                    asset.value >= 0 ? "text-green-500" : "text-red-500"
                  }`}>
                    {asset.value >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    <span className="text-xs font-semibold">
                      {asset.value >= 0 ? "+" : ""}{asset.value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="w-full">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <CardTitle>Major Indices - 9 Month Trend</CardTitle>
              <Button variant="ghost" className="text-xs flex items-center gap-1 text-gray-500">
                View Full Chart <ArrowUpRight size={14} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} tickMargin={10} />
                    <YAxis tick={{ fontSize: 12 }} tickMargin={10} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="sp500" stroke="#10B981" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="nasdaq" stroke="#8B5CF6" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="dowjones" stroke="#3B82F6" strokeWidth={2} dot={false} />
                    <ChartLegend content={<ChartLegendContent />} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <CardTitle>Market Sectors</CardTitle>
              <Button variant="ghost" className="text-xs flex items-center gap-1 text-gray-500">
                View All <ArrowUpRight size={14} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  {name: 'Technology', value: 3.2},
                  {name: 'Healthcare', value: 1.5},
                  {name: 'Financials', value: -0.8},
                  {name: 'Energy', value: 2.1},
                  {name: 'Consumer', value: 0.5},
                  {name: 'Utilities', value: -0.3},
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} tickMargin={10} />
                  <YAxis tick={{ fontSize: 12 }} tickMargin={10} />
                  <ChartTooltip />
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <CardTitle>Commodities</CardTitle>
              <Button variant="ghost" className="text-xs flex items-center gap-1 text-gray-500">
                View All <ArrowUpRight size={14} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-2">
              {[
                { name: "Gold", price: "$2,356.70", change: 0.75, color: "#f59e0b" },
                { name: "Silver", price: "$28.12", change: 1.15, color: "#94a3b8" },
                { name: "Crude Oil", price: "$75.46", change: -0.65, color: "#030712" },
                { name: "Natural Gas", price: "$3.12", change: 2.15, color: "#0ea5e9" },
              ].map((item) => (
                <div key={item.name} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm">{item.price}</span>
                    <div className={`flex items-center ${
                      item.change >= 0 ? "text-green-500" : "text-red-500"
                    }`}>
                      {item.change >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      <span className="text-xs font-semibold">
                        {item.change >= 0 ? "+" : ""}{item.change}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default MarketOverview;
