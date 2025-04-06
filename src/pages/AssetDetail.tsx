
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { Briefcase, ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

// Mock data for asset details
const assetDetailsData = {
  "us-tech-fund": {
    name: "US Tech Fund",
    value: "$1.24B",
    change: "+4.7%",
    isPositive: true,
    description: "A diversified technology fund investing in large-cap US tech companies.",
    allocation: 32.5,
    manager: "BlackRock Asset Management",
    inception: "March 15, 2010",
    performance: [
      { month: "Jan", value: 1.10 },
      { month: "Feb", value: 1.15 },
      { month: "Mar", value: 1.18 },
      { month: "Apr", value: 1.21 },
      { month: "May", value: 1.20 },
      { month: "Jun", value: 1.23 },
      { month: "Jul", value: 1.24 },
    ],
    holdings: [
      { name: "Apple Inc.", weight: "8.2%" },
      { name: "Microsoft Corp.", weight: "7.9%" },
      { name: "Alphabet Inc.", weight: "6.1%" },
      { name: "Amazon.com Inc.", weight: "5.8%" },
      { name: "NVIDIA Corp.", weight: "4.3%" },
    ]
  },
  "treasury-notes": {
    name: "Treasury Notes",
    value: "$845M",
    change: "+1.2%",
    isPositive: true,
    description: "A portfolio of US Treasury notes with various maturities.",
    allocation: 22.0,
    manager: "Federal Reserve Bank",
    inception: "January 10, 2015",
    performance: [
      { month: "Jan", value: 0.82 },
      { month: "Feb", value: 0.83 },
      { month: "Mar", value: 0.83 },
      { month: "Apr", value: 0.84 },
      { month: "May", value: 0.84 },
      { month: "Jun", value: 0.85 },
      { month: "Jul", value: 0.85 },
    ],
    holdings: [
      { name: "2-Year Treasury Note", weight: "25%" },
      { name: "5-Year Treasury Note", weight: "35%" },
      { name: "10-Year Treasury Note", weight: "30%" },
      { name: "30-Year Treasury Bond", weight: "10%" }
    ]
  },
  "real-estate": {
    name: "Real Estate Holdings",
    value: "$682M",
    change: "-2.1%",
    isPositive: false,
    description: "A diversified portfolio of commercial and residential properties.",
    allocation: 17.8,
    manager: "Morgan Stanley Real Estate",
    inception: "June 22, 2012",
    performance: [
      { month: "Jan", value: 0.70 },
      { month: "Feb", value: 0.71 },
      { month: "Mar", value: 0.70 },
      { month: "Apr", value: 0.69 },
      { month: "May", value: 0.68 },
      { month: "Jun", value: 0.67 },
      { month: "Jul", value: 0.68 },
    ],
    holdings: [
      { name: "Manhattan Office Complex", weight: "18%" },
      { name: "San Francisco Residential", weight: "15%" },
      { name: "London Commercial", weight: "14%" },
      { name: "Tokyo Office Tower", weight: "12%" },
      { name: "Sydney Retail Centers", weight: "10%" }
    ]
  },
  "private-equity": {
    name: "Private Equity",
    value: "$456M",
    change: "+8.3%",
    isPositive: true,
    description: "Investments in private companies and venture capital funds.",
    allocation: 11.9,
    manager: "KKR & Co.",
    inception: "August 5, 2013",
    performance: [
      { month: "Jan", value: 0.40 },
      { month: "Feb", value: 0.41 },
      { month: "Mar", value: 0.42 },
      { month: "Apr", value: 0.43 },
      { month: "May", value: 0.44 },
      { month: "Jun", value: 0.45 },
      { month: "Jul", value: 0.46 },
    ],
    holdings: [
      { name: "Tech Startup Fund III", weight: "22%" },
      { name: "Healthcare Innovation Partners", weight: "19%" },
      { name: "European Growth Equity", weight: "17%" },
      { name: "Asian Infrastructure Fund", weight: "15%" },
      { name: "Latin American Opportunities", weight: "10%" }
    ]
  }
};

const AssetDetail = () => {
  const { assetId } = useParams();
  const navigate = useNavigate();
  
  const assetData = assetDetailsData[assetId] || {
    name: "Unknown Asset",
    value: "$0",
    change: "0%",
    isPositive: true,
    description: "Asset information not available.",
    allocation: 0,
    manager: "Unknown",
    inception: "Unknown",
    performance: [],
    holdings: []
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </div>
        
        <PageHeaderCard
          icon={Briefcase}
          title={assetData.name}
          description={`Asset value: ${assetData.value} (${assetData.change})`}
          iconColor="text-gray-700"
          iconBgColor="bg-gray-100"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={assetData.performance} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={assetData.isPositive ? "#10B981" : "#EF4444"} stopOpacity={0.2}/>
                          <stop offset="95%" stopColor={assetData.isPositive ? "#10B981" : "#EF4444"} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <YAxis tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={assetData.isPositive ? "#10B981" : "#EF4444"} 
                        fillOpacity={1}
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Asset Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Portfolio Allocation</p>
                  <p className="font-medium">{assetData.allocation}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Manager</p>
                  <p className="font-medium">{assetData.manager}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Inception Date</p>
                  <p className="font-medium">{assetData.inception}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-sm">{assetData.description}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Top Holdings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {assetData.holdings.map((holding, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <p className="text-sm">{holding.name}</p>
                      <p className="text-sm font-medium">{holding.weight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AssetDetail;
