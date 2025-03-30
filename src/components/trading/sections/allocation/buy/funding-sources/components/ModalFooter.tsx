
import React from "react";
import { Button } from "@/components/ui/button";

interface ModalFooterProps {
  onApply: () => void;
  onClose: () => void;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ onApply, onClose }) => {
  return (
    <div className="flex justify-end gap-3 mt-6 border-t pt-4">
      <Button 
        variant="outline" 
        onClick={onClose}
        className="min-w-[100px]"
      >
        Cancel
      </Button>
      <Button
        onClick={onApply}
        className="min-w-[100px] bg-black text-white hover:bg-gray-800"
      >
        Apply
      </Button>
    </div>
  );
};
