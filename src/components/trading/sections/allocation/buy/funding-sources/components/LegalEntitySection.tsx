
import React, { ReactNode } from "react";

interface LegalEntitySectionProps {
  name: string;
  children: ReactNode;
}

export const LegalEntitySection: React.FC<LegalEntitySectionProps> = ({
  name,
  children
}) => {
  return (
    <div className="pl-4 border-l-2 border-gray-200 space-y-4">
      <h4 className="text-sm font-medium">{name}</h4>
      {children}
    </div>
  );
};
