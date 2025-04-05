
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import UserManagementInterface from "@/components/user-management/components/UserManagementInterface";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { Users } from "lucide-react";

const UserManagement = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeaderCard
          icon={Users}
          title="User Management"
          description="Manage user accounts, permissions, and access controls for your organization"
          iconColor="text-violet-700"
          iconBgColor="bg-violet-100"
        />
        <UserManagementInterface />
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
