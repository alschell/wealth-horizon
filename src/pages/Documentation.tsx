
import React, { useState } from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { BookOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  ApiReferenceSection,
  CodeExamples,
  DocumentationHeader,
  QuickStartGuide,
  ResourcesSection
} from "@/components/documentation";

const Documentation = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  return (
    <PageTemplate
      title="Documentation"
      description="Comprehensive guides and resources for using the WealthHorizon platform."
      icon={BookOpen}
    >
      <div className="space-y-12">
        <DocumentationHeader />
        
        <QuickStartGuide copiedCode={copiedCode} setCopiedCode={setCopiedCode} />
        
        <Separator />
        
        <CodeExamples />
        
        <ApiReferenceSection />
        
        <ResourcesSection />
      </div>
    </PageTemplate>
  );
};

export default Documentation;
