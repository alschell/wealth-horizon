
import React from "react";
import { Wallet } from "lucide-react";

const FormHeader = () => {
  return (
    <h3 className="font-medium flex items-center gap-2 text-black">
      <Wallet className="h-5 w-5 text-black" />
      Add a new financial account
    </h3>
  );
};

export default FormHeader;
