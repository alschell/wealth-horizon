
import { toast } from "@/hooks/use-toast";

export const useNotifications = () => {
  const showSuccess = (message: string, description?: string) => {
    toast({
      title: message,
      description: description,
      variant: "default",
    });
  };

  const showError = (message: string, description?: string) => {
    toast({
      title: message,
      description: description || "Please try again",
      variant: "destructive",
    });
  };

  const showInfo = (message: string, description?: string) => {
    toast({
      title: message,
      description: description,
    });
  };

  const showWarning = (message: string, description?: string) => {
    toast({
      title: message,
      description: description,
      variant: "destructive",
      className: "bg-amber-50 border-amber-200 text-amber-800",
    });
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
};
