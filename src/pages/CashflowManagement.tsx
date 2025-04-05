
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CashflowInterface from "@/components/cashflow/CashflowInterface";

const CashflowManagement = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <CashflowInterface />
      </div>
    </DashboardLayout>
  );
};

export default CashflowManagement;
