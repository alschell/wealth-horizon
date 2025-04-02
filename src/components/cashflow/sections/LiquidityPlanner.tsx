
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { LiquidityForecastChart } from "../components/LiquidityForecastChart";
import { LiquidityTable } from "../components/LiquidityTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const timeRangeOptions = [
  { value: "1m", label: "1 Month" },
  { value: "3m", label: "3 Months" },
  { value: "6m", label: "6 Months" },
  { value: "1y", label: "1 Year" }
];

const LiquidityPlanner = () => {
  const [timeRange, setTimeRange] = useState("3m");
  const [viewType, setViewType] = useState("chart");
  const [currency, setCurrency] = useState("USD");
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Liquidity Planner</h2>
          <p className="text-sm text-muted-foreground">
            Plan and forecast your cash position over time
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="CHF">CHF</SelectItem>
              <SelectItem value="JPY">JPY</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              {timeRangeOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="w-full md:w-auto">
            <Tabs value={viewType} onValueChange={setViewType} className="w-full md:w-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chart">Chart</TabsTrigger>
                <TabsTrigger value="table">Table</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <TabsContent value="chart" className="mt-0">
            <div className="h-[400px]">
              <LiquidityForecastChart 
                timeRange={timeRange} 
                currency={currency}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="table" className="mt-0">
            <LiquidityTable 
              timeRange={timeRange} 
              currency={currency}
            />
          </TabsContent>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button variant="outline" className="mr-2">Export Data</Button>
        <Button>Create Term Deposit</Button>
      </div>
    </div>
  );
};

export default LiquidityPlanner;
