
import React from 'react';
import PageTemplate from "@/components/shared/PageTemplate";
import { BookOpen } from "lucide-react";
import TranslatedText from "@/components/ui/translated-text";

const Blog = () => {
  return (
    <PageTemplate
      title={<TranslatedText>Blog</TranslatedText>}
      description={<TranslatedText>Insights and updates from the WealthHorizon team.</TranslatedText>}
      icon={BookOpen}
    >
      <div className="space-y-8">
        <TranslatedText>Blog content coming soon...</TranslatedText>
      </div>
    </PageTemplate>
  );
};

export default Blog;
