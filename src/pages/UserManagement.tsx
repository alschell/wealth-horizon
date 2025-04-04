
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import UserManagementInterface from "@/components/user-management/UserManagementInterface";

const UserManagement = () => {
  return (
    <DashboardLayout>
      <UserManagementInterface />
    </DashboardLayout>
  );
};

export default UserManagement;
