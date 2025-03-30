
import React, { ReactNode } from "react";
import { Institution } from "@/components/trading/types";

interface InstitutionSectionProps {
  name: string;
  children: ReactNode;
}

export const InstitutionSection: React.FC<InstitutionSectionProps> = ({
  name,
  children
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium">{name}</h3>
      {children}
    </div>
  );
};
