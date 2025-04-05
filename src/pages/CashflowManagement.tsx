
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CashflowInterface from "@/components/cashflow/CashflowInterface";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { DollarSign } from "lucide-react";

const CashflowManagement = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeaderCard
          icon={DollarSign}
          title="Cashflow & Liquidity"
          description="Monitor and manage your cash positions, deposits, and liquidity forecasts"
          iconColor="text-emerald-700"
          iconBgColor="bg-emerald-100"
        />
        <CashflowInterface />
      </div>
    </DashboardLayout>
  );
};

export default CashflowManagement;
