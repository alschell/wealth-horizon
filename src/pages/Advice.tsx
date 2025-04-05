
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AdviceInterface from "@/components/advice/AdviceInterface";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { Lightbulb } from "lucide-react";

const Advice = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeaderCard
          icon={Lightbulb}
          title="Financial Advice"
          description="Get personalized recommendations and insights for your financial portfolio"
          iconColor="text-amber-700"
          iconBgColor="bg-amber-100"
        />
        <AdviceInterface />
      </div>
    </DashboardLayout>
  );
};

export default Advice;
