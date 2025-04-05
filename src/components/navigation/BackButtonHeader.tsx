
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BackButtonHeaderProps {
  title?: string;
  destination?: string;
}

const BackButtonHeader: React.FC<BackButtonHeaderProps> = ({ 
  title, 
  destination = "/dashboard" 
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center gap-2 mb-4">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => navigate(destination)}
        className="flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <ArrowLeft className="h-4 w-4" /> 
        {title || "Back to Dashboard"}
      </Button>
    </div>
  );
};

export default BackButtonHeader;
