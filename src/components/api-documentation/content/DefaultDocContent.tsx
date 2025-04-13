
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const DefaultDocContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Documentation</h1>
      
      <p className="text-gray-700">
        Welcome to the WealthHorizon platform documentation. Select a documentation section from
        the navigation menu to get started.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="border border-gray-200 rounded-lg p-6 hover:border-indigo-300 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Getting Started</h2>
          <p className="text-gray-600 mb-4">
            Learn the basics of the WealthHorizon API and platform integration.
          </p>
          <Button asChild>
            <Link to="/api-docs/getting-started">View Guide</Link>
          </Button>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-6 hover:border-indigo-300 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">API Reference</h2>
          <p className="text-gray-600 mb-4">
            Comprehensive documentation of all API endpoints, parameters, and responses.
          </p>
          <Button asChild>
            <Link to="/api-docs/api-reference">Explore API</Link>
          </Button>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-6 hover:border-indigo-300 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Integration Guide</h2>
          <p className="text-gray-600 mb-4">
            Connect your systems with the WealthHorizon platform.
          </p>
          <Button asChild>
            <Link to="/api-docs/integration-guide">Read Guide</Link>
          </Button>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-6 hover:border-indigo-300 hover:shadow-md transition-all">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Reporting Guide</h2>
          <p className="text-gray-600 mb-4">
            Generate custom reports and analytics using the Reporting API.
          </p>
          <Button asChild>
            <Link to="/api-docs/reporting-guide">View Guide</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
