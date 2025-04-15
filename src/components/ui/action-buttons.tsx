
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface ActionButtonProps {
  onClick: () => void;
  className?: string;
  label?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export const DeleteButton = ({ 
  onClick, 
  className = "", 
  label = "Delete",
  size = "sm" 
}: ActionButtonProps) => {
  return (
    <Button
      variant="outline"
      size={size}
      onClick={onClick}
      className={`text-red-500 hover:text-red-700 hover:bg-red-50 ${className}`}
    >
      <Trash2 className="h-4 w-4" />
      {label !== "Delete" ? label : <span className="sr-only md:not-sr-only md:ml-2">Delete</span>}
    </Button>
  );
};

export const EditButton = ({ 
  onClick, 
  className = "", 
  label = "Edit",
  size = "sm" 
}: ActionButtonProps) => {
  return (
    <Button
      variant="outline"
      size={size}
      onClick={onClick}
      className={`hover:bg-blue-50 ${className}`}
    >
      <Edit className="h-4 w-4" />
      {label !== "Edit" ? label : <span className="sr-only md:not-sr-only md:ml-2">Edit</span>}
    </Button>
  );
};
