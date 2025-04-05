
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AdviceInterface from "@/components/advice/AdviceInterface";
import { Lightbulb } from "lucide-react";
import FormHeader from "@/components/onboarding/common/FormHeader";

const Advice = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <FormHeader
          icon={<Lightbulb className="h-6 w-6" />}
          title="Advisory"
          description="Get personalized financial advice and recommendations"
        />
        <AdviceInterface />
      </div>
    </DashboardLayout>
  );
};

export default Advice;
