
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import UserManagementInterface from "@/components/user-management/components/UserManagementInterface";

const UserManagement = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <UserManagementInterface />
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
