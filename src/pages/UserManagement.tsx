
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import UserManagementInterface from "@/components/user-management/components/UserManagementInterface";
import { Users } from "lucide-react";
import FormHeader from "@/components/onboarding/common/FormHeader";

const UserManagement = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <FormHeader
          icon={<Users className="h-6 w-6" />}
          title="User Management"
          description="Manage users and their permissions"
        />
        <UserManagementInterface />
      </div>
    </DashboardLayout>
  );
};

export default UserManagement;
