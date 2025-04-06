
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

const Logout = () => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(true);

  // Simulated logout function - in a real app, this would clear auth tokens, etc.
  const handleLogout = () => {
    // Clear any auth data from localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    
    // Show success toast
    toast.success("You have been successfully logged out");
    
    // Close the dialog
    setShowConfirmation(false);
  };

  return (
    <>
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out of your Wealth Pro account?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => navigate(-1)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Log Out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {!showConfirmation && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50/30 to-white p-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center bg-red-50 rounded-full mb-6">
              <LogOut className="h-8 w-8 text-red-500" />
            </div>
            
            <h1 className="text-2xl font-bold mb-2">Signed Out</h1>
            <p className="text-gray-600 mb-8">
              You have been successfully signed out of your Wealth Pro account.
            </p>
            
            <div className="space-y-3">
              <Button 
                variant="default" 
                className="w-full py-6 bg-black hover:bg-gray-800 text-white" 
                onClick={() => navigate("/")}
              >
                Return to Home
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
