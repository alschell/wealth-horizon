
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CashflowInterface from "@/components/cashflow/CashflowInterface";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { DollarSign, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CashflowManagement = () => {
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
          icon={DollarSign}
          title="Cashflow & Liquidity"
          description="Monitor and manage your cash positions, deposits, and liquidity forecasts"
          iconColor="text-gray-700"
          iconBgColor="bg-gray-100"
        />
        <CashflowInterface />
      </div>
    </DashboardLayout>
  );
};

export default CashflowManagement;
