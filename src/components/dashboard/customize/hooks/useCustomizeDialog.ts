
import { useState } from "react";

/**
 * Hook to manage customization dialog state
 */
export const useCustomizeDialog = () => {
  const [isCustomizing, setIsCustomizing] = useState(false);

  const openCustomizeDialog = () => {
    setIsCustomizing(true);
  };

  const closeCustomizeDialog = () => {
    setIsCustomizing(false);
  };

  return {
    isCustomizing,
    openCustomizeDialog,
    closeCustomizeDialog
  };
};
