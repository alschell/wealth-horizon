
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CashflowInterface from "@/components/cashflow/CashflowInterface";

const CashflowManagement = () => {
  return (
    <DashboardLayout>
      <CashflowInterface />
    </DashboardLayout>
  );
};

export default CashflowManagement;
