
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuickStartGuideProps {
  copiedCode: string | null;
  setCopiedCode: (id: string | null) => void;
}

export const QuickStartGuide: React.FC<QuickStartGuideProps> = ({ copiedCode, setCopiedCode }) => {
  const { toast } = useToast();

  const handleCopyClick = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    toast({
      title: "Code copied to clipboard",
      description: "You can now paste it in your application",
      duration: 3000,
    });
    
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quick Start Guide</h2>
      <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Authentication</h3>
        <p className="text-gray-600 mb-4">
          All API requests to WealthHorizon require authentication. We support OAuth 2.0 and API key authentication methods.
        </p>
        <div className="bg-gray-50 rounded-md p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">API Key Authentication</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-gray-500 hover:text-gray-700"
              onClick={() => handleCopyClick('curl -X GET "https://api.wealthhorizon.ai/v1/portfolios" -H "Authorization: Bearer YOUR_API_KEY"', 'auth-example')}
            >
              {copiedCode === 'auth-example' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </Button>
          </div>
          <pre className="text-sm overflow-x-auto p-2 bg-gray-800 text-gray-200 rounded">
            <code>curl -X GET "https://api.wealthhorizon.ai/v1/portfolios" -H "Authorization: Bearer YOUR_API_KEY"</code>
          </pre>
        </div>
        <div className="flex items-center text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
          <Info size={16} className="text-blue-500 mr-2 flex-shrink-0" />
          <span>API keys should be kept secure and never exposed in client-side code.</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Integration</h3>
          <p className="text-gray-600 mb-4">
            Connect your existing data sources using our integration API endpoints.
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600">Support for financial data aggregators</span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600">Direct custodian integrations</span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600">Automated data synchronization</span>
            </li>
          </ul>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => window.location.href = "/api-docs/integration-guide"}
          >
            View Integration Guide
          </Button>
        </div>
        
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Reporting API</h3>
          <p className="text-gray-600 mb-4">
            Generate customized reports programmatically using our reporting endpoints.
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600">Custom report templates</span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600">Multiple export formats (PDF, XLSX, CSV)</span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600">Scheduled report generation</span>
            </li>
          </ul>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => window.location.href = "/api-docs/reporting-guide"}
          >
            View Reporting Guide
          </Button>
        </div>
      </div>
    </section>
  );
};
