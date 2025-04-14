
import { useState } from "react";
import { UserFormData } from "../types";
import { toast } from "@/utils/toast";

export const useInviteUserDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const openInviteDialog = () => {
    setIsOpen(true);
  };
  
  const closeInviteDialog = () => {
    setIsOpen(false);
  };
  
  const handleInviteUser = (data: UserFormData) => {
    // This would typically involve an API call to send the invitation
    console.log("Inviting user:", data);
    
    // Simulate a successful invitation
    setTimeout(() => {
      toast({
        title: "Invitation sent successfully",
        description: `An invitation has been sent to ${data.email}`,
      });
      closeInviteDialog();
    }, 500);
  };
  
  return {
    isOpen,
    openInviteDialog,
    closeInviteDialog,
    handleInviteUser
  };
};

// Create a global store for the invite dialog state
let globalStore: ReturnType<typeof useInviteUserDialog> | null = null;

export const getInviteUserDialogStore = () => {
  if (!globalStore) {
    // Initialize with default values
    globalStore = {
      isOpen: false,
      openInviteDialog: () => {
        if (globalStore) globalStore.isOpen = true;
      },
      closeInviteDialog: () => {
        if (globalStore) globalStore.isOpen = false;
      },
      handleInviteUser: (data: UserFormData) => {
        console.log("Global invite user:", data);
        if (globalStore) {
          toast({
            title: "Invitation sent successfully",
            description: `An invitation has been sent to ${data.email}`,
          });
          globalStore.isOpen = false;
        }
      }
    };
  }
  return globalStore;
};

// Update the global store when the hook is used
export const useGlobalInviteUserDialog = () => {
  const hookResult = useInviteUserDialog();
  globalStore = hookResult;
  return hookResult;
};
