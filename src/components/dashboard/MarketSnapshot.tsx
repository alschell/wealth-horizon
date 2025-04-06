
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const MarketSnapshot = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  
  // Define market indices for the snapshot view
  const indices = [
    {
      name: "S&P 500",
      value: "4,587.20",
      change: 0.85,
      data: [
        { date: "Jan", value: 4300 },
        { date: "Feb", value: 4250 },
        { date: "Mar", value: 4400 },
        { date: "Apr", value: 4480 },
        { date: "May", value: 4520 },
        { date: "Jun", value: 4587.20 }
      ]
    },
    {
      name: "NASDAQ",
      value: "14,346.30",
      change: 1.2,
      data: [
        { date: "Jan", value: 13500 },
        { date: "Feb", value: 13800 },
        { date: "Mar", value: 14100 },
        { date: "Apr", value: 13900 },
        { date: "May", value: 14200 },
        { date: "Jun", value: 14346.30 }
      ]
    },
    {
      name: "Dow Jones",
      value: "32,627.80",
      change: 0.45,
      data: [
        { date: "Jan", value: 31800 },
        { date: "Feb", value: 32000 },
        { date: "Mar", value: 32400 },
        { date: "Apr", value: 32200 },
        { date: "May", value: 32500 },
        { date: "Jun", value: 32627.80 }
      ]
    },
    {
      name: "FTSE 100",
      value: "6,952.30",
      change: -0.22,
      data: [
        { date: "Jan", value: 7000 },
        { date: "Feb", value: 7050 },
        { date: "Mar", value: 6980 },
        { date: "Apr", value: 6920 },
        { date: "May", value: 6970 },
        { date: "Jun", value: 6952.30 }
      ]
    },
    {
      name: "DAX",
      value: "14,688.40",
      change: 0.31,
      data: [
        { date: "Jan", value: 14400 },
        { date: "Feb", value: 14500 },
        { date: "Mar", value: 14600 },
        { date: "Apr", value: 14550 },
        { date: "May", value: 14650 },
        { date: "Jun", value: 14688.40 }
      ]
    },
    {
      name: "Nikkei 225",
      value: "29,176.70",
      change: 1.34,
      data: [
        { date: "Jan", value: 28000 },
        { date: "Feb", value: 28400 },
        { date: "Mar", value: 28800 },
        { date: "Apr", value: 29000 },
        { date: "May", value: 29100 },
        { date: "Jun", value: 29176.70 }
      ]
    },
    {
      name: "Shanghai Comp",
      value: "3,442.61",
      change: -0.92,
      data: [
        { date: "Jan", value: 3500 },
        { date: "Feb", value: 3490 },
        { date: "Mar", value: 3460 },
        { date: "Apr", value: 3450 },
        { date: "May", value: 3470 },
        { date: "Jun", value: 3442.61 }
      ]
    },
    {
      name: "Hang Seng",
      value: "28,750.83",
      change: -1.28,
      data: [
        { date: "Jan", value: 29200 },
        { date: "Feb", value: 29150 },
        { date: "Mar", value: 29000 },
        { date: "Apr", value: 28900 },
        { date: "May", value: 28800 },
        { date: "Jun", value: 28750.83 }
      ]
    },
    {
      name: "ASX 200",
      value: "6,821.20",
      change: 0.27,
      data: [
        { date: "Jan", value: 6750 },
        { date: "Feb", value: 6780 },
        { date: "Mar", value: 6800 },
        { date: "Apr", value: 6810 },
        { date: "May", value: 6815 },
        { date: "Jun", value: 6821.20 }
      ]
    },
    {
      name: "CAC 40",
      value: "5,997.96",
      change: 0.42,
      data: [
        { date: "Jan", value: 5900 },
        { date: "Feb", value: 5930 },
        { date: "Mar", value: 5950 },
        { date: "Apr", value: 5970 },
        { date: "May", value: 5980 },
        { date: "Jun", value: 5997.96 }
      ]
    },
  ];

  const handleIndexClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Market Snapshot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {indices.map((index, i) => (
              <div 
                key={i} 
                className="flex justify-between items-center p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleIndexClick(index)}
              >
                <span className="font-medium text-sm">{index.name}</span>
                <div className="flex items-center">
                  <span className="mr-2">{index.value}</span>
                  <div className={`flex items-center ${
                    index.change >= 0 ? "text-emerald-600" : "text-red-500"
                  }`}>
                    {index.change >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    <span className="text-xs">
                      {index.change >= 0 ? "+" : ""}
                      {index.change}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <Link to="/market-data" className="block mt-4">
              <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                View All Market Data & News
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Index chart dialog */}
      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedIndex?.name} - {selectedIndex?.value}
              <span className={`ml-2 text-sm ${
                selectedIndex?.change >= 0 ? "text-emerald-600" : "text-red-500"
              }`}>
                {selectedIndex?.change >= 0 ? "+" : ""}
                {selectedIndex?.change}%
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className="h-80 w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={selectedIndex?.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={selectedIndex?.change >= 0 ? "#10B981" : "#EF4444"} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={selectedIndex?.change >= 0 ? "#10B981" : "#EF4444"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={selectedIndex?.change >= 0 ? "#10B981" : "#EF4444"} 
                  fillOpacity={1}
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={() => navigate("/market-data")}>
              View Detailed Analysis
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MarketSnapshot;
