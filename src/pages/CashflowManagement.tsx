
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CashflowInterface from "@/components/cashflow/CashflowInterface";
import { Wallet } from "lucide-react";
import FormHeader from "@/components/onboarding/common/FormHeader";

const CashflowManagement = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <FormHeader
          icon={<Wallet className="h-6 w-6" />}
          title="Cashflow & Liquidity"
          description="Manage your cash positions and liquidity planning"
        />
        <CashflowInterface />
      </div>
    </DashboardLayout>
  );
};

export default CashflowManagement;
