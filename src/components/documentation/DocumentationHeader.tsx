import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, FileText } from "lucide-react";
import { showDownloadToast, showDocumentationToast } from "@/utils/toast/documentationToasts";

export const DocumentationHeader: React.FC = () => {
  const [downloadingSDK, setDownloadingSDK] = useState<string | null>(null);
  const [openingDocs, setOpeningDocs] = useState<string | null>(null);

  const handleDownloadSDK = (sdkName: string, version: string) => {
    setDownloadingSDK(sdkName);
    showDownloadToast(sdkName, version);
    
    setTimeout(() => {
      setDownloadingSDK(null);
    }, 1500);
  };

  const openDocumentation = (docType: string) => {
    setOpeningDocs(docType);
    showDocumentationToast(`Opening ${docType} documentation`, "Loading documentation resources");
    
    setTimeout(() => {
      setOpeningDocs(null);
    }, 1000);
  };

  return (
    <section>
      <div className="bg-indigo-50 rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">WealthHorizon API Documentation</h2>
            <p className="text-gray-600 max-w-2xl">
              Complete technical documentation for integrating with the WealthHorizon platform, including API references, code examples, and integration guides.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              className="flex items-center gap-2"
              onClick={() => openDocumentation("API Reference")}
              disabled={openingDocs === "API Reference"}
              asChild
            >
              <Link to="/api-docs/api-reference">
                {openingDocs === "API Reference" ? (
                  <>Loading... <span className="animate-spin ml-1">⟳</span></>
                ) : (
                  <><FileText size={16} /> API Reference</>
                )}
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => handleDownloadSDK("WealthHorizon", "2.1.0")}
              disabled={downloadingSDK === "WealthHorizon"}
            >
              {downloadingSDK === "WealthHorizon" ? (
                <>Downloading... <span className="animate-spin ml-1">⟳</span></>
              ) : (
                <><Download size={16} /> Download SDK</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
