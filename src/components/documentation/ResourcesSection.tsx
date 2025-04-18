
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Download, FileText, Github, Youtube } from "lucide-react";
import { showDocumentationToast, showDownloadToast } from "@/utils/toast/documentationToasts";

interface ResourcesSectionProps {}

export const ResourcesSection: React.FC<ResourcesSectionProps> = () => {
  const handleResourceClick = (resourceName: string) => {
    showDocumentationToast(`Accessing ${resourceName}`, "Loading resource");
  };

  const handleDownloadSDK = (sdkName: string, version: string) => {
    showDownloadToast(sdkName, version);
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Additional Resources</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Reference Materials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-500" />
              Reference Materials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800 mb-1">API Reference</h3>
              <p className="text-sm text-gray-600 mb-2">Complete API endpoint documentation.</p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={() => handleResourceClick("API Reference")}
              >
                View API Reference <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Data Models</h3>
              <p className="text-sm text-gray-600 mb-2">Detailed data model documentation.</p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={() => handleResourceClick("Data Models")}
              >
                View Data Models <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Error Codes</h3>
              <p className="text-sm text-gray-600 mb-2">Error code reference and troubleshooting.</p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={() => handleResourceClick("Error Codes")}
              >
                View Error Codes <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* SDKs & Libraries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-indigo-500" />
              SDKs & Libraries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800 mb-1">JavaScript SDK</h3>
              <p className="text-sm text-gray-600 mb-2">For browser and Node.js applications.</p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={() => handleDownloadSDK("JavaScript", "2.1.0")}
              >
                Download v2.1.0 <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Python SDK</h3>
              <p className="text-sm text-gray-600 mb-2">For Python applications and scripts.</p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={() => handleDownloadSDK("Python", "1.8.2")}
              >
                Download v1.8.2 <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Java SDK</h3>
              <p className="text-sm text-gray-600 mb-2">For Java and Android applications.</p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={() => handleDownloadSDK("Java", "1.5.0")}
              >
                Download v1.5.0 <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Learning Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-500" />
              Learning Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Tutorial Videos</h3>
              <p className="text-sm text-gray-600 mb-2">Step-by-step integration tutorials.</p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={() => handleResourceClick("Tutorial Videos")}
              >
                <Youtube className="mr-1 h-4 w-4" /> Watch Tutorials
              </Button>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Sample Projects</h3>
              <p className="text-sm text-gray-600 mb-2">Example applications and integrations.</p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={() => handleResourceClick("Sample Projects")}
              >
                <Github className="mr-1 h-4 w-4" /> Browse Examples
              </Button>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Developer Blog</h3>
              <p className="text-sm text-gray-600 mb-2">Latest updates and best practices.</p>
              <Button 
                variant="link" 
                className="p-0 h-auto text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={() => handleResourceClick("Developer Blog")}
              >
                Read Articles <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
