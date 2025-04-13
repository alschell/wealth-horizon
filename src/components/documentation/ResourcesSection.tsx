
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, Link as LinkIcon, ExternalLink, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ResourcesSection: React.FC = () => {
  const { toast } = useToast();
  const [downloadingSDK, setDownloadingSDK] = useState<string | null>(null);
  const [joiningProgram, setJoiningProgram] = useState(false);

  const handleDownloadSDK = (sdkName: string, version: string) => {
    setDownloadingSDK(sdkName);
    toast({
      title: `Downloading ${sdkName} SDK v${version}`,
      description: "Your download will begin shortly",
    });
    
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: `${sdkName} SDK v${version} has been downloaded`,
        duration: 3000,
      });
      setDownloadingSDK(null);
    }, 1500);
  };

  const joinDeveloperProgram = () => {
    setJoiningProgram(true);
    toast({
      title: "Joining Developer Program",
      description: "Redirecting to developer registration portal",
    });
    
    setTimeout(() => {
      setJoiningProgram(false);
    }, 1500);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-indigo-50 rounded-xl p-8">
        <div className="flex items-center mb-4">
          <Download size={24} className="mr-3 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-800">SDKs & Libraries</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Download our official client libraries to simplify integration with your applications.
        </p>
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={() => handleDownloadSDK("JavaScript", "2.1.0")}
            disabled={!!downloadingSDK}
          >
            <span className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center text-indigo-600 mr-3">
              JS
            </span>
            {downloadingSDK === "JavaScript" ? (
              <span className="flex items-center">
                Downloading... <span className="animate-spin ml-2">⟳</span>
              </span>
            ) : (
              "JavaScript SDK v2.1.0"
            )}
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => handleDownloadSDK("Python", "1.8.2")}
            disabled={!!downloadingSDK}
          >
            <span className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center text-indigo-600 mr-3">
              PY
            </span>
            {downloadingSDK === "Python" ? (
              <span className="flex items-center">
                Downloading... <span className="animate-spin ml-2">⟳</span>
              </span>
            ) : (
              "Python SDK v1.8.2"
            )}
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => handleDownloadSDK("Java", "1.5.0")}
            disabled={!!downloadingSDK}
          >
            <span className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center text-indigo-600 mr-3">
              JV
            </span>
            {downloadingSDK === "Java" ? (
              <span className="flex items-center">
                Downloading... <span className="animate-spin ml-2">⟳</span>
              </span>
            ) : (
              "Java SDK v1.5.0"
            )}
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => handleDownloadSDK(".NET", "1.4.1")}
            disabled={!!downloadingSDK}
          >
            <span className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center text-indigo-600 mr-3">
              C#
            </span>
            {downloadingSDK === ".NET" ? (
              <span className="flex items-center">
                Downloading... <span className="animate-spin ml-2">⟳</span>
              </span>
            ) : (
              ".NET SDK v1.4.1"
            )}
          </Button>
        </div>
      </div>
      
      <div className="bg-gray-800 text-white rounded-xl p-8">
        <div className="flex items-center mb-4">
          <LinkIcon size={24} className="mr-3" />
          <h2 className="text-xl font-semibold text-white">Developer Resources</h2>
        </div>
        <p className="mb-6 text-gray-300">
          Additional resources to help you integrate with the WealthHorizon platform.
        </p>
        <ul className="space-y-4 mb-6">
          <li className="flex items-center">
            <Check size={16} className="mr-2 text-green-400" />
            <span>Developer Community Forum</span>
          </li>
          <li className="flex items-center">
            <Check size={16} className="mr-2 text-green-400" />
            <span>API Changelog & Release Notes</span>
          </li>
          <li className="flex items-center">
            <Check size={16} className="mr-2 text-green-400" />
            <span>Sample Applications & Repositories</span>
          </li>
          <li className="flex items-center">
            <Check size={16} className="mr-2 text-green-400" />
            <span>Webhook Integration Guide</span>
          </li>
        </ul>
        <Button 
          className="flex items-center gap-2 bg-white text-gray-800 hover:bg-gray-100"
          onClick={joinDeveloperProgram}
          disabled={joiningProgram}
          asChild
        >
          <Link to="/developer-portal/join">
            {joiningProgram ? (
              <span className="flex items-center">
                Joining Program... <span className="animate-spin ml-2">⟳</span>
              </span>
            ) : (
              <>Join Developer Program <ExternalLink size={16} /></>
            )}
          </Link>
        </Button>
      </div>
    </section>
  );
};
