
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { FileText } from "lucide-react";

const TermsOfService = () => {
  return (
    <PageTemplate
      title="Terms of Service"
      description="The terms and conditions governing your use of the WealthHorizon platform."
      icon={FileText}
    />
  );
};

export default TermsOfService;
