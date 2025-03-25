
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface AccountFormButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const AccountFormButton = ({ onClick, disabled = false }: AccountFormButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className={`mt-2 ${disabled ? 'bg-gray-300 text-gray-500' : 'bg-black hover:bg-gray-800 text-white'}`}
    >
      <PlusCircle className="h-4 w-4 mr-2" />
      Add Account
    </Button>
  );
};

export default AccountFormButton;
