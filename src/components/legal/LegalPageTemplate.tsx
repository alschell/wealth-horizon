
import React from 'react';
import PageTemplate from "@/components/shared/PageTemplate";
import { FileText } from "lucide-react";
import { TranslatedText } from "@/components/ui/translated-text";

interface LegalPageTemplateProps {
  title: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
}

const LegalPageTemplate: React.FC<LegalPageTemplateProps> = ({
  title,
  description,
  children
}) => {
  return (
    <PageTemplate
      title={title}
      description={description}
      icon={FileText}
    >
      <div className="prose prose-gray max-w-none">
        {children}
      </div>
    </PageTemplate>
  );
};

export default LegalPageTemplate;
