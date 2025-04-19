import React, { useMemo } from "react";
import UserManagementHeader from "../components/UserManagementHeader";
import UsersList from "../components/UsersList";
import InviteUserDialog from "../components/InviteUserDialog";
import EditUserDialog from "../components/EditUserDialog";
import DeleteUserDialog from "../components/DeleteUserDialog";
import DeactivateUserDialog from "../components/DeactivateUserDialog";
import ActivateUserDialog from "../components/ActivateUserDialog";
import ResendInviteDialog from "../components/ResendInviteDialog";
import ViewPermissionsDialog from "../components/ViewPermissionsDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useUserActionDialog } from "../hooks/useUserActionDialog";
import { showSuccess } from "@/utils/toast";
import { useGlobalInviteUserDialog } from "../hooks/useInviteUserDialog";

const UserManagementInterface = () => {
  const {
    selectedUser,
    editDialogOpen,
    deleteDialogOpen,
    deactivateDialogOpen,
    activateDialogOpen,
    resendInviteDialogOpen,
    viewPermissionsDialogOpen,
    closeAllDialogs,
    handleEditUser,
    handleDeleteUser,
    handleDeactivateUser,
    handleActivateUser,
    handleResendInvite
  } = useUserActionDialog();
  
  const { isOpen: inviteDialogOpen } = useGlobalInviteUserDialog();
  
  const tabContent = useMemo(() => ({
    active: (
      <TabsContent value="active" className="mt-0">
        <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
          <div className="p-4">
            <UsersList status="active" />
          </div>
        </div>
      </TabsContent>
    ),
    invited: (
      <TabsContent value="invited" className="mt-0">
        <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
          <div className="p-4">
            <UsersList status="invited" />
          </div>
        </div>
      </TabsContent>
    ),
    inactive: (
      <TabsContent value="inactive" className="mt-0">
        <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
          <div className="p-4">
            <UsersList status="inactive" />
          </div>
        </div>
      </TabsContent>
    )
  }), []);

  return (
    <div className="max-w-7xl mx-auto w-full p-4">
      <UserManagementHeader />
      <InviteUserDialog />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6"
      >
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-md mb-8">
            <TabsTrigger value="active" className="text-sm">Active Users</TabsTrigger>
            <TabsTrigger value="invited" className="text-sm">Pending Invites</TabsTrigger>
            <TabsTrigger value="inactive" className="text-sm">Inactive Users</TabsTrigger>
          </TabsList>
          
          {tabContent.active}
          {tabContent.invited}
          {tabContent.inactive}
        </Tabs>
      </motion.div>
      
      <EditUserDialog 
        open={editDialogOpen} 
        user={selectedUser} 
        onClose={closeAllDialogs} 
        onSave={handleEditUser} 
      />
      
      <DeleteUserDialog 
        open={deleteDialogOpen} 
        user={selectedUser} 
        onClose={closeAllDialogs} 
        onConfirm={() => {
          handleDeleteUser();
          showSuccess("User invitation deleted", selectedUser ? `Invitation for ${selectedUser.name} has been deleted.` : "");
        }} 
      />
      
      <DeactivateUserDialog 
        open={deactivateDialogOpen} 
        user={selectedUser} 
        onClose={closeAllDialogs} 
        onConfirm={() => {
          handleDeactivateUser();
          showSuccess("User deactivated", selectedUser ? `${selectedUser.name} has been deactivated.` : "");
        }} 
      />
      
      <ActivateUserDialog 
        open={activateDialogOpen} 
        user={selectedUser} 
        onClose={closeAllDialogs} 
        onConfirm={() => {
          handleActivateUser();
          showSuccess("User activated", selectedUser ? `${selectedUser.name} has been activated.` : "");
        }} 
      />
      
      <ResendInviteDialog 
        open={resendInviteDialogOpen} 
        user={selectedUser} 
        onClose={closeAllDialogs} 
        onConfirm={() => {
          handleResendInvite();
          showSuccess("Invitation resent", selectedUser ? `Invitation has been resent to ${selectedUser.email}.` : "");
        }} 
      />
      
      <ViewPermissionsDialog 
        open={viewPermissionsDialogOpen} 
        user={selectedUser} 
        onClose={closeAllDialogs} 
      />
    </div>
  );
};

export default React.memo(UserManagementInterface);
