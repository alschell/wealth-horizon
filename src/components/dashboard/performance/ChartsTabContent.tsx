
import React, { useState } from "react";
import AssetAllocationChart from "./AssetAllocationChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, PieChart, BarChart3, LineChart } from "lucide-react";

type ChartsTabContentProps = {
  assetAllocationData: any[];
};

const ChartsTabContent = ({ assetAllocationData }: ChartsTabContentProps) => {
  const [chartView, setChartView] = useState<'assets' | 'liabilities' | 'combined'>('combined');
  
  // Sample liabilities data
  const liabilitiesData = [
    { name: "Mortgage", value: 580000 },
    { name: "Credit Facilities", value: 350000 },
    { name: "Loans", value: 220000 },
    { name: "Other Debt", value: 50000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 mb-4">
        <Button 
          variant={chartView === 'combined' ? "secondary" : "outline"} 
          onClick={() => setChartView('combined')}
          className="text-sm"
        >
          Combined View
        </Button>
        <Button 
          variant={chartView === 'assets' ? "secondary" : "outline"} 
          onClick={() => setChartView('assets')}
          className="text-sm"
        >
          Assets Only
        </Button>
        <Button 
          variant={chartView === 'liabilities' ? "secondary" : "outline"} 
          onClick={() => setChartView('liabilities')}
          className="text-sm"
        >
          Liabilities Only
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Assets and Liabilities Summary */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-sm font-medium">Total Assets</span>
                <span className="text-lg font-bold">$6.88M</span>
              </div>
              <div className="flex justify-between items-center border-b pb-3">
                <span className="text-sm font-medium">Total Liabilities</span>
                <span className="text-lg font-bold">$1.20M</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-sm font-medium">Net Worth</span>
                <span className="text-lg font-bold">$5.68M</span>
              </div>
              
              <Button variant="outline" className="w-full mt-4 text-sm" size="sm">
                View Detailed Report <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Chart Display */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">
              {chartView === 'combined' ? 'Assets & Liabilities' : 
               chartView === 'assets' ? 'Asset Allocation' : 'Liabilities Breakdown'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              {chartView === 'combined' ? (
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div>
                    <p className="text-sm text-center mb-2 font-medium">Assets</p>
                    <AssetAllocationChart assetAllocationData={assetAllocationData} />
                  </div>
                  <div>
                    <p className="text-sm text-center mb-2 font-medium">Liabilities</p>
                    <AssetAllocationChart assetAllocationData={liabilitiesData} />
                  </div>
                </div>
              ) : chartView === 'assets' ? (
                <AssetAllocationChart assetAllocationData={assetAllocationData} />
              ) : (
                <AssetAllocationChart assetAllocationData={liabilitiesData} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown Section - Increased height and adjusted styling */}
      <div className="mt-6">
        <Tabs defaultValue={chartView === 'liabilities' ? "liabilities" : "assets"} className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="assets">Assets Breakdown</TabsTrigger>
            <TabsTrigger value="liabilities">Liabilities Breakdown</TabsTrigger>
          </TabsList>
          
          <TabsContent value="assets" className="mt-4">
            <Card>
              <CardContent className="pt-6 max-h-[400px] overflow-y-auto">
                <div className="space-y-4">
                  {assetAllocationData.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: asset.color }}></div>
                        <span className="font-medium">{asset.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${(asset.value/1000000).toFixed(2)}M</div>
                        <div className="text-xs text-muted-foreground">{Math.round(asset.value/68800*100)}% of assets</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="mt-6 w-full" size="sm">
                  Drill Down to Asset Details <ArrowDown className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="liabilities" className="mt-4">
            <Card>
              <CardContent className="pt-6 max-h-[400px] overflow-y-auto">
                <div className="space-y-4">
                  {liabilitiesData.map((liability, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-3" style={{ 
                          backgroundColor: ['#ff6b6b', '#5a67d8', '#38b2ac', '#718096'][index] 
                        }}></div>
                        <span className="font-medium">{liability.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${(liability.value/1000).toFixed(0)}K</div>
                        <div className="text-xs text-muted-foreground">{Math.round(liability.value/1200000*100)}% of liabilities</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="mt-6 w-full" size="sm">
                  Drill Down to Liability Details <ArrowDown className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChartsTabContent;
