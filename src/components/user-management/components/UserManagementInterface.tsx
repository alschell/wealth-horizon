
import React from "react";
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
import { toast } from "@/utils/toast";
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
  
  // Use the global hook to ensure the invite dialog state is properly tracked
  const { isOpen: inviteDialogOpen } = useGlobalInviteUserDialog();
  
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
          
          <TabsContent value="active" className="mt-0">
            <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
              <div className="p-4">
                <UsersList status="active" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="invited" className="mt-0">
            <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
              <div className="p-4">
                <UsersList status="invited" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="inactive" className="mt-0">
            <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
              <div className="p-4">
                <UsersList status="inactive" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
      
      {/* User action dialogs */}
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
          toast({
            title: "User invitation deleted",
            description: selectedUser ? `Invitation for ${selectedUser.name} has been deleted.` : "",
          });
        }} 
      />
      
      <DeactivateUserDialog 
        open={deactivateDialogOpen} 
        user={selectedUser} 
        onClose={closeAllDialogs} 
        onConfirm={() => {
          handleDeactivateUser();
          toast({
            title: "User deactivated",
            description: selectedUser ? `${selectedUser.name} has been deactivated.` : "",
          });
        }} 
      />
      
      <ActivateUserDialog 
        open={activateDialogOpen} 
        user={selectedUser} 
        onClose={closeAllDialogs} 
        onConfirm={() => {
          handleActivateUser();
          toast({
            title: "User activated",
            description: selectedUser ? `${selectedUser.name} has been activated.` : "",
          });
        }} 
      />
      
      <ResendInviteDialog 
        open={resendInviteDialogOpen} 
        user={selectedUser} 
        onClose={closeAllDialogs} 
        onConfirm={() => {
          handleResendInvite();
          toast({
            title: "Invitation resent",
            description: selectedUser ? `Invitation has been resent to ${selectedUser.email}.` : "",
          });
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

export default UserManagementInterface;
