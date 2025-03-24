
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AccountFormButtonProps {
  onClick: () => void;
}

const AccountFormButton = ({ onClick }: AccountFormButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className="mt-2"
    >
      <Plus className="h-4 w-4 mr-2" />
      Add Account
    </Button>
  );
};

export default AccountFormButton;
