
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ReportingInterface from "@/components/reporting/ReportingInterface";
import { FileText } from "lucide-react";
import FormHeader from "@/components/onboarding/common/FormHeader";

const Reporting = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <FormHeader
          icon={<FileText className="h-6 w-6" />}
          title="Reporting"
          description="Access and manage your financial reports"
        />
        <ReportingInterface />
      </div>
    </DashboardLayout>
  );
};

export default Reporting;
