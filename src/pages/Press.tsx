
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { Newspaper } from "lucide-react";

const Press = () => {
  return (
    <PageTemplate
      title="Press"
      description="News, announcements, and media resources about WealthHorizon."
      icon={Newspaper}
    />
  );
};

export default Press;
