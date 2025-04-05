
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MarketDataInterface from "@/components/market/MarketDataInterface";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { BarChart2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const MarketData = () => {
  const navigate = useNavigate();
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
        
        <PageHeaderCard
          icon={BarChart2}
          title="Market Data & News"
          description="Access real-time market data, news, and research across global markets"
          iconColor="text-gray-700"
          iconBgColor="bg-gray-100"
        />
        <MarketDataInterface />
      </div>
    </DashboardLayout>
  );
};

export default MarketData;
