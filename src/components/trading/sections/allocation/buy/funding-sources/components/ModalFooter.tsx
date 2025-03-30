
import React from "react";
import { Button } from "@/components/ui/button";

interface ModalFooterProps {
  onApply: () => void;
  onClose: () => void;
  isApplyDisabled?: boolean;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ 
  onApply, 
  onClose,
  isApplyDisabled = false
}) => {
  // Use more prominent buttons for better UX
  return (
    <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
      <Button 
        variant="outline" 
        onClick={onClose}
        className="min-w-[100px] h-10"
      >
        Cancel
      </Button>
      <Button
        onClick={onApply}
        disabled={isApplyDisabled}
        className="min-w-[100px] h-10 bg-black text-white hover:bg-gray-800"
      >
        Apply
      </Button>
    </div>
  );
};
