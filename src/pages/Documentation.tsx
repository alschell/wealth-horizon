
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { BookOpen } from "lucide-react";

const Documentation = () => {
  return (
    <PageTemplate
      title="Documentation"
      description="Comprehensive guides and resources for using the WealthHorizon platform."
      icon={BookOpen}
    />
  );
};

export default Documentation;
