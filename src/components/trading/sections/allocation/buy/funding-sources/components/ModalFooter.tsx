
import React from "react";
import { Button } from "@/components/ui/button";

interface ModalFooterProps {
  onApply: () => void;
  disabled?: boolean;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ onApply, disabled = false }) => {
  return (
    <div className="mt-6 flex justify-end">
      <Button 
        onClick={onApply} 
        className="bg-black text-white hover:bg-gray-800"
        disabled={disabled}
      >
        Apply
      </Button>
    </div>
  );
};
