
import React from "react";
import { Button } from "@/components/ui/button";

interface ModalFooterProps {
  onClose: () => void;
  onConfirm: () => void;
  isConfirmDisabled?: boolean;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ 
  onClose, 
  onConfirm, 
  isConfirmDisabled = false 
}) => {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button 
        disabled={isConfirmDisabled}
        onClick={onConfirm}
      >
        Confirm
      </Button>
    </div>
  );
};

export default ModalFooter;
