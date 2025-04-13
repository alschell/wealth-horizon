
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { Link } from "react-router-dom";

interface GettingStartedContentProps {
  copiedSnippet: string | null;
  handleCopySnippet: (snippet: string, id: string) => void;
}

export const GettingStartedContent: React.FC<GettingStartedContentProps> = ({ 
  copiedSnippet, 
  handleCopySnippet 
}) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Introduction</h2>
        <p className="text-gray-700 mb-4">
          Welcome to the WealthHorizon API documentation! This guide will help you get started with using
          our API to integrate with the WealthHorizon wealth management platform.
        </p>
        
        <p className="text-gray-700 mb-4">
          The WealthHorizon API provides programmatic access to the platform's features, allowing you to:
        </p>
        
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>Access and manage portfolio data</li>
          <li>Execute transactions</li>
          <li>Generate reports</li>
          <li>Integrate with data providers and custodians</li>
          <li>Create custom wealth management workflows</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Prerequisites</h2>
        
        <p className="text-gray-700 mb-4">
          Before you begin, make sure you have:
        </p>
        
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
          <li>
            <span className="font-medium">Developer Account:</span> Sign up for the WealthHorizon Developer Program
            to get access to API credentials.
          </li>
          <li>
            <span className="font-medium">API Key:</span> Generate an API key from the Developer Portal.
          </li>
          <li>
            <span className="font-medium">Basic Knowledge:</span> Familiarity with RESTful APIs and HTTP requests.
          </li>
        </ul>
        
        <div className="mt-4">
          <Button asChild>
            <Link to="/developer-portal/join">Join Developer Program</Link>
          </Button>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Start</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-3">1. Authentication</h3>
            <p className="text-gray-700 mb-3">
              All API requests require authentication using an API key. Include your API key in the
              Authorization header of all requests.
            </p>
            
            <div className="bg-gray-100 p-4 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Example request with authentication</p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleCopySnippet(`curl -X GET "https://api.wealthhorizon.ai/v1/portfolios" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`, "auth-example")}
                >
                  {copiedSnippet === "auth-example" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <pre className="bg-gray-800 text-gray-200 p-3 rounded-md overflow-x-auto text-sm">
{`curl -X GET "https://api.wealthhorizon.ai/v1/portfolios" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
              </pre>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800 mb-3">2. Retrieve Portfolios</h3>
            <p className="text-gray-700 mb-3">
              Let's start by retrieving a list of portfolios.
            </p>
            
            <div className="bg-gray-100 p-4 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Request</p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleCopySnippet(`curl -X GET "https://api.wealthhorizon.ai/v1/portfolios" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`, "portfolios-example")}
                >
                  {copiedSnippet === "portfolios-example" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <pre className="bg-gray-800 text-gray-200 p-3 rounded-md overflow-x-auto text-sm mb-4">
{`GET /v1/portfolios
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json`}
              </pre>
              
              <p className="text-sm font-medium text-gray-700 mb-2">Response</p>
              <pre className="bg-gray-800 text-gray-200 p-3 rounded-md overflow-x-auto text-sm">
{`{
  "data": {
    "portfolios": [
      {
        "id": "port_12345",
        "name": "Growth Portfolio",
        "created_at": "2023-06-15T10:30:00Z",
        "assets_count": 12,
        "total_value": 1250000.00,
        "currency": "USD"
      },
      {
        "id": "port_67890",
        "name": "Income Portfolio",
        "created_at": "2023-04-10T14:15:00Z",
        "assets_count": 8,
        "total_value": 750000.00,
        "currency": "USD"
      }
    ],
    "pagination": {
      "total": 2,
      "page": 1,
      "per_page": 10,
      "total_pages": 1
    }
  }
}`}
              </pre>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800 mb-3">3. Create a Transaction</h3>
            <p className="text-gray-700 mb-3">
              Now, let's create a new transaction.
            </p>
            
            <div className="bg-gray-100 p-4 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Request</p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleCopySnippet(`curl -X POST "https://api.wealthhorizon.ai/v1/transactions" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "portfolio_id": "port_12345",
    "asset_id": "asset_789",
    "transaction_type": "buy",
    "amount": 100,
    "price": 150.50,
    "currency": "USD"
  }'`, "transaction-example")}
                >
                  {copiedSnippet === "transaction-example" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <pre className="bg-gray-800 text-gray-200 p-3 rounded-md overflow-x-auto text-sm mb-4">
{`POST /v1/transactions
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "portfolio_id": "port_12345",
  "asset_id": "asset_789",
  "transaction_type": "buy",
  "amount": 100,
  "price": 150.50,
  "currency": "USD"
}`}
              </pre>
              
              <p className="text-sm font-medium text-gray-700 mb-2">Response</p>
              <pre className="bg-gray-800 text-gray-200 p-3 rounded-md overflow-x-auto text-sm">
{`{
  "data": {
    "id": "txn_456789",
    "portfolio_id": "port_12345",
    "asset_id": "asset_789",
    "transaction_type": "buy",
    "amount": 100,
    "price": 150.50,
    "currency": "USD",
    "total_value": 15050.00,
    "timestamp": "2023-12-15T15:30:45Z",
    "status": "pending"
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Next Steps</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-medium text-lg text-gray-800 mb-2">Explore the API Reference</h3>
            <p className="text-gray-600 text-sm mb-4">
              Dive deeper into the available endpoints, parameters, and response formats.
            </p>
            <Button asChild>
              <Link to="/api-docs/api-reference">View API Reference</Link>
            </Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-medium text-lg text-gray-800 mb-2">Download an SDK</h3>
            <p className="text-gray-600 text-sm mb-4">
              Use our official client libraries to simplify integration with your applications.
            </p>
            <Button asChild>
              <Link to="/sdk/download/js/2.1.0">Get JavaScript SDK</Link>
            </Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-medium text-lg text-gray-800 mb-2">Integration Guide</h3>
            <p className="text-gray-600 text-sm mb-4">
              Learn how to connect your systems with the WealthHorizon platform.
            </p>
            <Button asChild>
              <Link to="/api-docs/integration-guide">Read Integration Guide</Link>
            </Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-medium text-lg text-gray-800 mb-2">Sample Applications</h3>
            <p className="text-gray-600 text-sm mb-4">
              Explore example applications that demonstrate API usage.
            </p>
            <Button asChild>
              <Link to="/developer-portal/samples">View Samples</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
