
import React from "react";
import { UserRound } from "lucide-react";
import { FormHeader } from "@/components/onboarding/common";

const PrimaryContactFormHeader: React.FC = () => {
  return (
    <FormHeader
      icon={<UserRound className="h-7 w-7" />}
      title="Primary Contact Information"
      description="Please provide details for the main point of contact at your family office."
    />
  );
};

export default PrimaryContactFormHeader;
