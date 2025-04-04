
import React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useInviteUserDialog } from "../hooks/useInviteUserDialog";

const UserManagementHeader = () => {
  const { openInviteDialog } = useInviteUserDialog();

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">User Management</h1>
        <p className="text-muted-foreground max-w-3xl">
          Manage users, roles, and permissions for your organization.
        </p>
      </div>
      <Button onClick={openInviteDialog} className="gap-2">
        <UserPlus className="h-4 w-4" />
        Invite User
      </Button>
    </div>
  );
};

export default UserManagementHeader;
