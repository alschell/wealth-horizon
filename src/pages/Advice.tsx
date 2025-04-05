
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AdviceInterface from "@/components/advice/AdviceInterface";

const Advice = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <AdviceInterface />
      </div>
    </DashboardLayout>
  );
};

export default Advice;
