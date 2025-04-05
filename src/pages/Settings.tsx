
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SettingsInterface from "@/components/settings/SettingsInterface";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { Settings, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SettingsPage = () => {
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
          icon={Settings}
          title="Settings"
          description="Configure your account preferences, notifications, and security options"
          iconColor="text-gray-700"
          iconBgColor="bg-gray-100"
        />
        <SettingsInterface />
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
