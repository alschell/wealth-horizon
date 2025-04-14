
import React from "react";
import { Users } from "@/utils/icons";

const FormHeader: React.FC = () => {
  return (
    <>
      <div className="flex items-center gap-3 mb-2">
        <Users className="h-7 w-7 text-black" />
        <h2 className="text-2xl font-bold text-black">Beneficial Owners</h2>
      </div>
      <p className="text-gray-500">
        Please provide information about individuals who own or control 25% or more of your entity.
      </p>
    </>
  );
};

export default FormHeader;
