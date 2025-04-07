import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "./SectionHeader";
import { SparklesIcon } from "@radix-ui/react-icons";

const MarketSnapshot = () => {
  const marketData = [
    { label: "S&P 500", value: "4,400.50", change: "+0.25%" },
    { label: "Nasdaq", value: "13,630.75", change: "-0.10%" },
    { label: "Dow Jones", value: "34,500.20", change: "+0.15%" },
    { label: "Bitcoin", value: "29,500.00", change: "+1.50%" },
    { label: "Ethereum", value: "1,850.40", change: "+0.75%" },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <SectionHeader title="Market Snapshot" />
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
          >
            <Sliders className="h-4 w-4" />
            <span className="sr-only">Customize</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {marketData.map((item, index) => (
            <div key={index} className="space-y-1">
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-gray-500">
                {item.value} ({item.change})
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketSnapshot;
