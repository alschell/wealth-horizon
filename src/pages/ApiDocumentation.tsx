import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "@/components/shared/PageTemplate";
import { FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { showCopySuccessToast } from "@/utils/toast/documentationToasts";
import { 
  ApiReferenceContent, 
  GettingStartedContent,
  IntegrationGuideContent,
  ReportingGuideContent,
  DefaultDocContent,
  DocumentationLink
} from "@/components/api-documentation";

const ApiDocumentation = () => {
  const { docType } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("overview");
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const title = docType ? 
    docType === 'api-reference' ? 'API Reference' :
    docType === 'integration-guide' ? 'Integration Guide' :
    docType === 'reporting-guide' ? 'Reporting Guide' : 
    docType === 'getting-started' ? 'Getting Started' : 
    docType : 'Documentation';

  const handleCopySnippet = (snippet: string, id: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedSnippet(id);
    showCopySuccessToast();
    
    setTimeout(() => {
      setCopiedSnippet(null);
    }, 2000);
  };

  const renderContent = () => {
    switch(docType) {
      case 'api-reference':
        return <ApiReferenceContent 
                 activeSection={activeSection} 
                 setActiveSection={setActiveSection}
                 copiedSnippet={copiedSnippet}
                 handleCopySnippet={handleCopySnippet}
               />;
      case 'integration-guide':
        return <IntegrationGuideContent />;
      case 'reporting-guide':
        return <ReportingGuideContent />;
      case 'getting-started':
        return <GettingStartedContent 
                 copiedSnippet={copiedSnippet}
                 handleCopySnippet={handleCopySnippet}
               />;
      default:
        return <DefaultDocContent />;
    }
  };

  return (
    <PageTemplate
      title={title}
      description="Comprehensive documentation and resources for the WealthHorizon API and platform integration."
      icon={FileText}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sticky top-24">
            <div className="mb-4">
              <Input
                type="search"
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <nav className="space-y-1">
              <DocumentationLink
                to="/api-docs/getting-started"
                active={docType === 'getting-started'}
              >
                Getting Started
              </DocumentationLink>
              
              <DocumentationLink
                to="/api-docs/api-reference"
                active={docType === 'api-reference'}
              >
                API Reference
              </DocumentationLink>
              
              <DocumentationLink
                to="/api-docs/integration-guide"
                active={docType === 'integration-guide'}
              >
                Integration Guide
              </DocumentationLink>
              
              <DocumentationLink
                to="/api-docs/reporting-guide"
                active={docType === 'reporting-guide'}
              >
                Reporting Guide
              </DocumentationLink>
            </nav>
            
            <Separator className="my-4" />
            
            <h3 className="font-medium text-sm text-gray-800 mb-2">SDKs</h3>
            <nav className="space-y-1">
              <DocumentationLink to="/sdk/download/js/2.1.0" active={false}>
                JavaScript SDK
              </DocumentationLink>
              <DocumentationLink to="/sdk/download/python/1.8.2" active={false}>
                Python SDK
              </DocumentationLink>
              <DocumentationLink to="/sdk/download/java/1.5.0" active={false}>
                Java SDK
              </DocumentationLink>
              <DocumentationLink to="/sdk/download/dotnet/1.4.1" active={false}>
                .NET SDK
              </DocumentationLink>
            </nav>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ApiDocumentation;
