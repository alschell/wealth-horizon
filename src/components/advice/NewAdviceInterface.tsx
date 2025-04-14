
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Lightbulb } from "lucide-react";
import AdviceContent from "./components/AdviceContent";
import { useAdvice } from "./hooks/useAdvice";

const NewAdviceInterface: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("assets");
  const { 
    adviceState, 
    handleMandateTypeChange, 
    handleBankSelection, 
    handleAssetToggle, 
    handleSubmit 
  } = useAdvice();

  const handleBackToAdvice = () => {
    navigate("/advice");
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            className="mr-2" 
            onClick={handleBackToAdvice}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Advisory
          </Button>
          <div className="p-2 bg-amber-100 rounded-lg">
            <Lightbulb className="h-6 w-6 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Create New Advisory Mandate</h1>
        </div>

        <div className="space-y-6">
          <AdviceContent 
            activeTab={activeTab}
            adviceState={adviceState}
            onMandateTypeChange={handleMandateTypeChange}
            onBankSelection={handleBankSelection}
            onAssetToggle={handleAssetToggle}
            onSubmit={handleSubmit}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewAdviceInterface;
