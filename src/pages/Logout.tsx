
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Logout = () => {
  const navigate = useNavigate();

  // Simulated logout function - in a real app, this would clear auth tokens, etc.
  const handleLogout = () => {
    // Clear any auth data from localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    
    // Show success toast
    toast.success("You have been successfully logged out");
    
    // Redirect to landing page after logout
    navigate("/");
  };
  
  const handleCancel = () => {
    // Go back to previous page
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50/30 to-white p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-md w-full text-center">
        <div className="mx-auto w-16 h-16 flex items-center justify-center bg-red-50 rounded-full mb-6">
          <LogOut className="h-8 w-8 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Sign Out</h1>
        <p className="text-gray-600 mb-8">
          Are you sure you want to sign out of your Wealth Pro account?
        </p>
        
        <div className="space-y-3">
          <Button 
            variant="default" 
            className="w-full py-6 bg-black hover:bg-gray-800 text-white" 
            onClick={handleLogout}
          >
            Yes, Sign Out
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6" 
            onClick={handleCancel}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
