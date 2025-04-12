
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { Cookie } from "lucide-react";

const CookiesPolicy = () => {
  return (
    <PageTemplate
      title="Cookies Policy"
      description="Information about how we use cookies and similar technologies on our website."
      icon={Cookie}
    />
  );
};

export default CookiesPolicy;
