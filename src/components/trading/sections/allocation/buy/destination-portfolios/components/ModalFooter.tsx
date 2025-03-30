
import React from "react";
import { Button } from "@/components/ui/button";

interface ModalFooterProps {
  onClose: () => void;
  onConfirm: () => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ onClose, onConfirm }) => {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button 
        className="bg-black text-white hover:bg-gray-800"
        onClick={onConfirm}
      >
        Confirm
      </Button>
    </div>
  );
};

export default ModalFooter;
