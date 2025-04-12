
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { HelpCircle } from "lucide-react";

const HelpCenter = () => {
  return (
    <PageTemplate
      title="Help Center"
      description="Support resources, tutorials, and answers to frequently asked questions."
      icon={HelpCircle}
    />
  );
};

export default HelpCenter;
