
import React from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { getInviteUserDialogStore } from "../hooks/useInviteUserDialog";

const UserManagementHeader = () => {
  const { openInviteDialog } = getInviteUserDialogStore();

  return (
    <div className="flex justify-end mb-8">
      <Button onClick={openInviteDialog} className="gap-2">
        <UserPlus className="h-4 w-4" />
        Invite User
      </Button>
    </div>
  );
};

export default UserManagementHeader;
