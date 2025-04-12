
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { Shield } from "lucide-react";

const Security = () => {
  return (
    <PageTemplate
      title="Security"
      description="Learn about how we safeguard your data and protect your financial information."
      icon={Shield}
    />
  );
};

export default Security;
