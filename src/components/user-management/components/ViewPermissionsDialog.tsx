
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserType } from "../types";
import { BadgeCheck, XCircle } from "lucide-react";

interface ViewPermissionsDialogProps {
  open: boolean;
  user: UserType | null;
  onClose: () => void;
}

// Mock permissions data structure
const permissionsData = {
  dashboard: {
    title: "Dashboard",
    permissions: ["view", "export"]
  },
  trading: {
    title: "Trading",
    permissions: ["view", "create", "edit", "approve"]
  },
  wealth: {
    title: "Wealth Analysis",
    permissions: ["view", "export"]
  },
  cashflow: {
    title: "Cashflow Management",
    permissions: ["view", "create", "edit"]
  },
  users: {
    title: "User Management",
    permissions: ["view", "invite", "edit", "deactivate"]
  },
  integrations: {
    title: "Integrations",
    permissions: ["view", "connect", "disconnect"]
  },
  settings: {
    title: "Settings",
    permissions: ["view", "edit"]
  }
};

// Define which permissions are available for each role
const rolePermissions = {
  admin: {
    dashboard: ["view", "export"],
    trading: ["view", "create", "edit", "approve"],
    wealth: ["view", "export"],
    cashflow: ["view", "create", "edit"],
    users: ["view", "invite", "edit", "deactivate"],
    integrations: ["view", "connect", "disconnect"],
    settings: ["view", "edit"]
  },
  member: {
    dashboard: ["view", "export"],
    trading: ["view", "create", "edit"],
    wealth: ["view", "export"],
    cashflow: ["view", "create"],
    users: ["view"],
    integrations: ["view"],
    settings: ["view"]
  },
  viewer: {
    dashboard: ["view"],
    trading: ["view"],
    wealth: ["view"],
    cashflow: ["view"],
    users: [],
    integrations: ["view"],
    settings: ["view"]
  }
};

const ViewPermissionsDialog = ({ open, user, onClose }: ViewPermissionsDialogProps) => {
  if (!user) return null;
  
  const userRole = user.role as keyof typeof rolePermissions;
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>User Permissions</DialogTitle>
          <DialogDescription>
            Permissions for {user.name} ({user.email}) - {user.role.charAt(0).toUpperCase() + user.role.slice(1)} role with {user.dataAccess} data access
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {Object.entries(permissionsData).map(([key, section]) => {
              const sectionKey = key as keyof typeof rolePermissions.admin;
              const userPermissions = rolePermissions[userRole][sectionKey] || [];
              
              return (
                <div key={key} className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">{section.title}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {section.permissions.map(permission => {
                      const hasPermission = userPermissions.includes(permission);
                      return (
                        <div key={permission} className="flex items-center gap-2">
                          {hasPermission ? (
                            <BadgeCheck className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-gray-300" />
                          )}
                          <span className={`capitalize ${hasPermission ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {permission}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <DialogClose asChild>
          <Button className="mt-4">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPermissionsDialog;
