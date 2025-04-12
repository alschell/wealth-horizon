
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { FileText } from "lucide-react";

const Blog = () => {
  return (
    <PageTemplate
      title="Blog"
      description="Insights, analysis, and updates from our wealth management experts."
      icon={FileText}
    />
  );
};

export default Blog;
