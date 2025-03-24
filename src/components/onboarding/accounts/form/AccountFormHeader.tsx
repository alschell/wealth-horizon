
import React from "react";
import { Wallet } from "lucide-react";

const AccountFormHeader = () => {
  return (
    <div className="flex items-center gap-2">
      <Wallet className="h-5 w-5 text-black" />
      <h3 className="font-medium text-black">Add a new financial account</h3>
    </div>
  );
};

export default AccountFormHeader;
