
import { useState } from "react";
import { UserType, UserFormData } from "../types";

export const useUserActionDialog = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);
  const [resendInviteDialogOpen, setResendInviteDialogOpen] = useState(false);
  const [viewPermissionsDialogOpen, setViewPermissionsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  
  const openEditDialog = (user: UserType) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };
  
  const openDeleteDialog = (user: UserType) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };
  
  const openDeactivateDialog = (user: UserType) => {
    setSelectedUser(user);
    setDeactivateDialogOpen(true);
  };
  
  const openActivateDialog = (user: UserType) => {
    setSelectedUser(user);
    setActivateDialogOpen(true);
  };
  
  const openResendInviteDialog = (user: UserType) => {
    setSelectedUser(user);
    setResendInviteDialogOpen(true);
  };
  
  const openViewPermissionsDialog = (user: UserType) => {
    setSelectedUser(user);
    setViewPermissionsDialogOpen(true);
  };
  
  const closeAllDialogs = () => {
    setEditDialogOpen(false);
    setDeleteDialogOpen(false);
    setDeactivateDialogOpen(false);
    setActivateDialogOpen(false);
    setResendInviteDialogOpen(false);
    setViewPermissionsDialogOpen(false);
    setSelectedUser(null);
  };
  
  const handleEditUser = (data: UserFormData) => {
    // This would typically involve an API call to update the user
    console.log("Editing user:", selectedUser?.id, data);
    closeAllDialogs();
  };
  
  const handleDeleteUser = () => {
    // This would typically involve an API call to delete the user
    console.log("Deleting user:", selectedUser?.id);
    closeAllDialogs();
  };
  
  const handleDeactivateUser = () => {
    // This would typically involve an API call to deactivate the user
    console.log("Deactivating user:", selectedUser?.id);
    closeAllDialogs();
  };
  
  const handleActivateUser = () => {
    // This would typically involve an API call to activate the user
    console.log("Activating user:", selectedUser?.id);
    closeAllDialogs();
  };
  
  const handleResendInvite = () => {
    // This would typically involve an API call to resend the invitation
    console.log("Resending invite to user:", selectedUser?.id);
    closeAllDialogs();
  };
  
  return {
    selectedUser,
    editDialogOpen,
    deleteDialogOpen,
    deactivateDialogOpen,
    activateDialogOpen,
    resendInviteDialogOpen,
    viewPermissionsDialogOpen,
    openEditDialog,
    openDeleteDialog,
    openDeactivateDialog,
    openActivateDialog,
    openResendInviteDialog,
    openViewPermissionsDialog,
    closeAllDialogs,
    handleEditUser,
    handleDeleteUser,
    handleDeactivateUser,
    handleActivateUser,
    handleResendInvite
  };
};
