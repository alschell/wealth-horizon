
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";

export const ActivityHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <>
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
        icon={History}
        title="Activity History"
        description="View your complete activity history across all accounts and services"
        iconColor="text-gray-700"
        iconBgColor="bg-gray-100"
      />
    </>
  );
};
