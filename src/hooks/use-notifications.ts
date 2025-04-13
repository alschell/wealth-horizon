
import { toast } from "@/hooks/use-toast";
import { useCallback } from "react";

export const useNotifications = () => {
  // Use useCallback to prevent unnecessary re-renders
  const showSuccess = useCallback((message: string, description?: string) => {
    toast({
      title: message,
      description: description,
      variant: "default",
    });
  }, []);

  const showError = useCallback((message: string, description?: string) => {
    toast({
      title: message,
      description: description || "Please try again",
      variant: "destructive",
    });
  }, []);

  const showInfo = useCallback((message: string, description?: string) => {
    toast({
      title: message,
      description: description,
    });
  }, []);

  const showWarning = useCallback((message: string, description?: string) => {
    toast({
      title: message,
      description: description,
      variant: "destructive",
      className: "bg-amber-50 border-amber-200 text-amber-800",
    });
  }, []);

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
};
