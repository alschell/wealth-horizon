
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ModalFooterProps {
  onApply: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ 
  onApply, 
  onClose, 
  isLoading = false 
}) => {
  return (
    <div className="flex justify-end gap-3 mt-6 border-t pt-4">
      <Button 
        variant="outline" 
        onClick={onClose}
        className="min-w-[100px]"
        disabled={isLoading}
      >
        Cancel
      </Button>
      <Button
        onClick={onApply}
        className="min-w-[100px] bg-black text-white hover:bg-gray-800"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Applying...
          </>
        ) : (
          'Apply'
        )}
      </Button>
    </div>
  );
};
