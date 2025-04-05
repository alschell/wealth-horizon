
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ReportingInterface from "@/components/reporting/ReportingInterface";

const Reporting = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ReportingInterface />
      </div>
    </DashboardLayout>
  );
};

export default Reporting;
