
import React from 'react';
import PageTemplate from "@/components/shared/PageTemplate";
import { FileText } from "lucide-react";
import TranslatedText from "@/components/ui/translated-text";

interface LegalPageTemplateProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const LegalPageTemplate: React.FC<LegalPageTemplateProps> = ({
  title,
  description,
  children
}) => {
  return (
    <PageTemplate
      title={<TranslatedText>{title}</TranslatedText>}
      description={<TranslatedText>{description}</TranslatedText>}
      icon={FileText}
    >
      <div className="prose prose-gray max-w-none">
        {children}
      </div>
    </PageTemplate>
  );
};

export default LegalPageTemplate;
