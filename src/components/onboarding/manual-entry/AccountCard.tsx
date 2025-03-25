
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { AccountCardProps } from "./types";

const AccountCard: React.FC<AccountCardProps> = ({ account, index, onRemove }) => {
  return (
    <div className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center">
      <div>
        <p className="font-medium text-black">{account.accountName || "Unnamed Account"}</p>
        <p className="text-sm text-gray-600">
          {account.institution} • {account.legalEntity}
          {account.accountType && ` • ${account.accountType}`}
          {account.currency && ` • ${account.currency}`}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onRemove(index)}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default AccountCard;
