
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageTemplate from "@/components/shared/PageTemplate";
import { Download, ArrowLeft, ExternalLink, Check, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

const SDKDownload = () => {
  const { sdkName, version } = useParams();
  const [progress, setProgress] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const { toast } = useToast();
  
  // Format SDK name for display
  const displayName = sdkName ? 
    sdkName === "js" ? "JavaScript" :
    sdkName === "python" ? "Python" :
    sdkName === "java" ? "Java" :
    sdkName === "dotnet" ? ".NET" : sdkName
    : "";
  
  // Determine file extension based on SDK type
  const getFileExtension = () => {
    switch(sdkName) {
      case "js": return "zip";
      case "python": return "tar.gz";
      case "java": return "jar";
      case "dotnet": return "dll";
      default: return "zip";
    }
  };
  
  const filename = `wealthhorizon-${sdkName}-sdk-v${version}.${getFileExtension()}`;
  
  // Simulate download progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 20;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setDownloaded(true);
          toast({
            title: "Download Complete",
            description: `${displayName} SDK v${version} has been downloaded successfully.`,
          });
          return 100;
        }
        
        return newProgress;
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, [displayName, version, toast]);

  return (
    <PageTemplate
      title={`${displayName} SDK Download`}
      description={`Download and install the WealthHorizon ${displayName} SDK v${version} for your applications.`}
      icon={Package}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{displayName} SDK</h2>
              <p className="text-gray-600">Version {version}</p>
            </div>
            <div className="h-16 w-16 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Download className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          
          {!downloaded ? (
            <div className="space-y-4">
              <p className="text-gray-700">Your download is in progress. Please wait while we prepare your SDK package.</p>
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-gray-500">Downloading {filename}... {Math.round(progress)}%</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-100 rounded-md p-4 flex items-start">
                <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-green-800">Download Complete</h3>
                  <p className="text-green-700 text-sm mt-1">
                    Your file {filename} has been downloaded successfully.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
                <h3 className="font-medium text-gray-800 mb-2">Installation Instructions</h3>
                <div className="text-sm text-gray-700 space-y-2">
                  {sdkName === "js" && (
                    <>
                      <p>Install via npm:</p>
                      <pre className="bg-gray-800 text-gray-200 p-3 rounded-md overflow-x-auto">
                        npm install wealthhorizon-sdk@{version}
                      </pre>
                      <p className="mt-2">Or using yarn:</p>
                      <pre className="bg-gray-800 text-gray-200 p-3 rounded-md overflow-x-auto">
                        yarn add wealthhorizon-sdk@{version}
                      </pre>
                    </>
                  )}
                  
                  {sdkName === "python" && (
                    <>
                      <p>Install via pip:</p>
                      <pre className="bg-gray-800 text-gray-200 p-3 rounded-md overflow-x-auto">
                        pip install wealthhorizon-sdk=={version}
                      </pre>
                      <p className="mt-2">Or from the downloaded file:</p>
                      <pre className="bg-gray-800 text-gray-200 p-3 rounded-md overflow-x-auto">
                        pip install wealthhorizon-python-sdk-v{version}.tar.gz
                      </pre>
                    </>
                  )}
                  
                  {sdkName === "java" && (
                    <>
                      <p>Maven dependency:</p>
                      <pre className="bg-gray-800 text-gray-200 p-3 rounded-md overflow-x-auto">
{`<dependency>
  <groupId>ai.wealthhorizon</groupId>
  <artifactId>wealthhorizon-sdk</artifactId>
  <version>${version}</version>
</dependency>`}
                      </pre>
                      <p className="mt-2">Or Gradle:</p>
                      <pre className="bg-gray-800 text-gray-200 p-3 rounded-md overflow-x-auto">
                        implementation 'ai.wealthhorizon:wealthhorizon-sdk:{version}'
                      </pre>
                    </>
                  )}
                  
                  {sdkName === "dotnet" && (
                    <>
                      <p>Install via NuGet:</p>
                      <pre className="bg-gray-800 text-gray-200 p-3 rounded-md overflow-x-auto">
                        Install-Package WealthHorizon.SDK -Version {version}
                      </pre>
                      <p className="mt-2">Or using .NET CLI:</p>
                      <pre className="bg-gray-800 text-gray-200 p-3 rounded-md overflow-x-auto">
                        dotnet add package WealthHorizon.SDK --version {version}
                      </pre>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" className="flex items-center gap-2" asChild>
            <Link to="/documentation">
              <ArrowLeft className="h-4 w-4" /> Back to Documentation
            </Link>
          </Button>
          
          <Button className="flex items-center gap-2" asChild>
            <Link to="/api-docs/getting-started">
              <span>View Documentation</span> <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default SDKDownload;
