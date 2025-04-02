
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const AssetAllocation = () => {
  // Sample data for the asset allocation chart
  const assetAllocationData = [
    { name: "Equities", value: 45, color: "#10B981" },
    { name: "Fixed Income", value: 25, color: "#3B82F6" },
    { name: "Real Estate", value: 15, color: "#8B5CF6" },
    { name: "Alternative Investments", value: 10, color: "#F59E0B" },
    { name: "Cash", value: 5, color: "#EC4899" }
  ];

  // Chart config for the asset allocation chart
  const chartConfig = assetAllocationData.reduce((acc, item) => {
    acc[item.name] = {
      label: item.name,
      color: item.color
    };
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetAllocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {assetAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Diversification Score</div>
              <div className="text-sm font-bold">85/100</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Risk-Return Ratio</div>
              <div className="text-sm font-bold">1.42</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Rebalancing Status</div>
              <div className="text-sm font-bold text-amber-500">Due in 5 days</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AssetAllocation;
