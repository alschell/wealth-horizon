
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AIAssistant from "@/components/ai-assistant/AIAssistant";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { Brain, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const AIAssistantPage = () => {
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
          icon={Brain}
          title="AI Financial Assistant"
          description="Get personalized recommendations, market insights, and execute financial actions"
          iconColor="text-gray-700"
          iconBgColor="bg-gray-100"
        />
        
        <AIAssistant />
      </div>
    </DashboardLayout>
  );
};

export default AIAssistantPage;
