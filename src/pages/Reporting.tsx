
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ReportingInterface from "@/components/reporting/ReportingInterface";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { FileText } from "lucide-react";

const Reporting = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeaderCard
          icon={FileText}
          title="Reporting"
          description="Access and generate comprehensive financial reports and statements"
          iconColor="text-orange-700"
          iconBgColor="bg-orange-100"
        />
        <ReportingInterface />
      </div>
    </DashboardLayout>
  );
};

export default Reporting;
