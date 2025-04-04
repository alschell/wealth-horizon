
import { useState } from "react";
import { UserFormData } from "../types";

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
    closeInviteDialog();
  };
  
  return {
    isOpen,
    openInviteDialog,
    closeInviteDialog,
    handleInviteUser
  };
};
