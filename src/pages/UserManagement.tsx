
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import UserManagementInterface from "@/components/user-management/components/UserManagementInterface";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserManagement = () => {
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
          icon={Users}
          title="Manage users & permissions"
          description="Manage user accounts, permissions, and access controls for your organization"
          iconColor="text-gray-700"
          iconBgColor="bg-gray-100"
        />
        <UserManagementInterface />
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
