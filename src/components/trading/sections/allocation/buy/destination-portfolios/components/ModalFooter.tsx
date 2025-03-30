
import React from "react";
import { Button } from "@/components/ui/button";

interface ModalFooterProps {
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  isConfirmDisabled?: boolean;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ 
  onClose, 
  onConfirm, 
  isLoading = false,
  isConfirmDisabled = false 
}) => {
  return (
    <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
      <Button 
        variant="outline" 
        onClick={onClose}
        className="min-w-[100px] h-10"
        disabled={isLoading}
      >
        Cancel
      </Button>
      <Button
        disabled={isLoading || isConfirmDisabled}
        onClick={onConfirm}
        className="min-w-[100px] h-10 bg-black text-white hover:bg-gray-800"
      >
        {isLoading ? "Processing..." : "Confirm"}
      </Button>
    </div>
  );
};

export default ModalFooter;
