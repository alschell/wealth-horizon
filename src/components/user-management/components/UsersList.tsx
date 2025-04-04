
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, UserX, UserCheck, Mail, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockUsers } from "../data/mockUsers";
import { UserType } from "../types";
import { useUserActionDialog } from "../hooks/useUserActionDialog";

interface UsersListProps {
  status: "active" | "invited" | "inactive";
}

const UsersList = ({ status }: UsersListProps) => {
  const [users, setUsers] = useState<UserType[]>(mockUsers);
  const { openEditDialog, openDeleteDialog, openDeactivateDialog, openActivateDialog, openResendInviteDialog, openViewPermissionsDialog } = useUserActionDialog();
  
  const filteredUsers = users.filter(user => user.status === status);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "invited":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Invited</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>;
      default:
        return null;
    }
  };
  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Admin</Badge>;
      case "member":
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Member</Badge>;
      case "viewer":
        return <Badge className="bg-sky-100 text-sky-800 hover:bg-sky-100">Viewer</Badge>;
      default:
        return null;
    }
  };
  
  if (filteredUsers.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium text-gray-600">
          {status === "active" ? "No active users found" : 
           status === "invited" ? "No pending invites" : 
           "No inactive users"}
        </h3>
        <p className="text-gray-500 mt-2">
          {status === "active" ? "Active users will appear here" : 
           status === "invited" ? "Send invites to add new users" : 
           "Deactivated users will appear here"}
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Activity</TableHead>
            <TableHead>Data Access</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{getRoleBadge(user.role)}</TableCell>
              <TableCell>{getStatusBadge(user.status)}</TableCell>
              <TableCell>{user.lastActivity || "Never"}</TableCell>
              <TableCell>{user.dataAccess}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white shadow-md">
                    <DropdownMenuItem onClick={() => openEditDialog(user)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit User</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem onClick={() => openViewPermissionsDialog(user)}>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View Permissions</span>
                    </DropdownMenuItem>
                    
                    {user.status === "invited" && (
                      <DropdownMenuItem onClick={() => openResendInviteDialog(user)}>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Resend Invite</span>
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuSeparator />
                    
                    {user.status === "active" ? (
                      <DropdownMenuItem onClick={() => openDeactivateDialog(user)} className="text-red-600 hover:text-red-600">
                        <UserX className="mr-2 h-4 w-4" />
                        <span>Deactivate User</span>
                      </DropdownMenuItem>
                    ) : user.status === "inactive" ? (
                      <DropdownMenuItem onClick={() => openActivateDialog(user)} className="text-green-600 hover:text-green-600">
                        <UserCheck className="mr-2 h-4 w-4" />
                        <span>Activate User</span>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => openDeleteDialog(user)} className="text-red-600 hover:text-red-600">
                        <UserX className="mr-2 h-4 w-4" />
                        <span>Delete Invitation</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;
