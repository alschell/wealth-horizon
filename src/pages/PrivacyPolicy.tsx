
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { Lock } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <PageTemplate
      title="Privacy Policy"
      description="Information about how we collect, use, and protect your personal data."
      icon={Lock}
    />
  );
};

export default PrivacyPolicy;
