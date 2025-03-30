
import React from "react";
import { Button } from "@/components/ui/button";

interface ModalFooterProps {
  onApply: () => void;
  onClose: () => void;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ onApply, onClose }) => {
  return (
    <div className="flex justify-end gap-2 mt-6">
      <Button variant="outline" onClick={onClose}>
        Cancel
      </Button>
      <Button 
        className="bg-black text-white hover:bg-gray-800"
        onClick={onApply}
      >
        Apply
      </Button>
    </div>
  );
};
