
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WealthSummary = () => {
  // Mock wealth data
  const wealthData = {
    totalAssets: 568000,
    totalLiabilities: 120000,
    netWorth: 448000,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Net Worth</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${wealthData.netWorth.toLocaleString()}</div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-2">
            <div>
              <p className="text-sm font-medium">Total Assets:</p>
              <p>${wealthData.totalAssets.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Liabilities:</p>
              <p>${wealthData.totalLiabilities.toLocaleString()}</p>
            </div>
          </TabsContent>
          <TabsContent value="details">
            <p>Detailed breakdown of assets and liabilities will go here.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WealthSummary;
