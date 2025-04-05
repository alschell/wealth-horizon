
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AdviceInterface from "@/components/advice/AdviceInterface";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { Lightbulb, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Advice = () => {
  const navigate = useNavigate();
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
        
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
