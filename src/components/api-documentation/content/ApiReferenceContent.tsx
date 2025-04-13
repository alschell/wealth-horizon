
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy } from "lucide-react";
import { Link } from "react-router-dom";

interface ApiReferenceContentProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  copiedSnippet: string | null;
  handleCopySnippet: (snippet: string, id: string) => void;
}

export const ApiReferenceContent: React.FC<ApiReferenceContentProps> = ({ 
  activeSection,
  setActiveSection,
  copiedSnippet,
  handleCopySnippet
}) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">API Reference</h1>
      
      <div className="mb-8">
        <Tabs value={activeSection} onValueChange={setActiveSection}>
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="models">Data Models</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">API Overview</h2>
            <p className="text-gray-700 mb-4">
              The WealthHorizon API is a RESTful API that provides access to the WealthHorizon platform's features and functionality.
              The API allows you to integrate WealthHorizon's wealth management capabilities into your own applications.
            </p>
            
            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Base URL</h3>
            <div className="bg-gray-100 p-3 rounded-md flex items-center justify-between">
              <code className="text-sm text-gray-800">https://api.wealthhorizon.ai/v1</code>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleCopySnippet("https://api.wealthhorizon.ai/v1", "base-url")}
              >
                {copiedSnippet === "base-url" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Request Format</h3>
            <p className="text-gray-700 mb-3">
              All requests should be sent with the appropriate HTTP method (GET, POST, PUT, DELETE)
              and should include the required headers and parameters.
            </p>
            
            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Response Format</h3>
            <p className="text-gray-700 mb-3">
              All responses are returned in JSON format. Successful responses include a <code>data</code> field
              with the requested information, while error responses include an <code>error</code> field with
              error details.
            </p>
            
            <div className="bg-gray-100 p-4 rounded-md mt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Example successful response</p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleCopySnippet(`{
  "data": {
    "id": "port_12345",
    "name": "Growth Portfolio",
    "created_at": "2023-06-15T10:30:00Z",
    "assets": [
      { "id": "asset_789", "name": "AAPL", "allocation": 0.25 },
      { "id": "asset_101", "name": "MSFT", "allocation": 0.25 },
      { "id": "asset_202", "name": "AMZN", "allocation": 0.20 },
      { "id": "asset_303", "name": "GOOGL", "allocation": 0.30 }
    ],
    "total_value": 1250000.00,
    "currency": "USD"
  }
}`, "success-response")}
                >
                  {copiedSnippet === "success-response" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <pre className="bg-gray-800 text-gray-200 p-3 rounded-md overflow-x-auto text-sm">
{`{
  "data": {
    "id": "port_12345",
    "name": "Growth Portfolio",
    "created_at": "2023-06-15T10:30:00Z",
    "assets": [
      { "id": "asset_789", "name": "AAPL", "allocation": 0.25 },
      { "id": "asset_101", "name": "MSFT", "allocation": 0.25 },
      { "id": "asset_202", "name": "AMZN", "allocation": 0.20 },
      { "id": "asset_303", "name": "GOOGL", "allocation": 0.30 }
    ],
    "total_value": 1250000.00,
    "currency": "USD"
  }
}`}
              </pre>
            </div>
          </TabsContent>
          
          <TabsContent value="authentication" className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Authentication</h2>
            
            <p className="text-gray-700 mb-4">
              The WealthHorizon API uses API keys for authentication. You can obtain an API key by joining the
              Developer Program. API keys should be included in the Authorization header of all requests.
            </p>
            
            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">API Key Authentication</h3>
            <div className="bg-gray-100 p-4 rounded-md mt-2">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Example request with API key</p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleCopySnippet(`curl -X GET "https://api.wealthhorizon.ai/v1/portfolios" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`, "auth-request")}
                >
                  {copiedSnippet === "auth-request" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <pre className="bg-gray-800 text-gray-200 p-3 rounded-md overflow-x-auto text-sm">
{`curl -X GET "https://api.wealthhorizon.ai/v1/portfolios" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
              </pre>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mt-6">
              <h4 className="text-blue-800 font-medium mb-2">Security Best Practices</h4>
              <ul className="list-disc list-inside text-blue-700 text-sm space-y-1">
                <li>Never expose your API key in client-side code</li>
                <li>Rotate your API keys periodically</li>
                <li>Use separate API keys for development and production</li>
                <li>Restrict API key permissions to only what's necessary</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="endpoints" className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">API Endpoints</h2>
            
            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <span className="inline-block w-2 h-6 bg-indigo-500 rounded-sm mr-2"></span>
                  Portfolio Management
                </h3>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-md">
                    <div className="bg-gray-50 px-4 py-3 flex items-center">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded mr-3">GET</span>
                      <code className="text-sm text-gray-800">/portfolios</code>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-700 mb-2">Get a list of all portfolios</p>
                      <Button size="sm" variant="outline" asChild className="text-xs">
                        <Link to="/api-docs/api-reference/portfolios">View details</Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md">
                    <div className="bg-gray-50 px-4 py-3 flex items-center">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded mr-3">GET</span>
                      <code className="text-sm text-gray-800">/portfolios/:id</code>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-700 mb-2">Get a specific portfolio by ID</p>
                      <Button size="sm" variant="outline" asChild className="text-xs">
                        <Link to="/api-docs/api-reference/portfolios-id">View details</Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md">
                    <div className="bg-gray-50 px-4 py-3 flex items-center">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded mr-3">POST</span>
                      <code className="text-sm text-gray-800">/portfolios</code>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-700 mb-2">Create a new portfolio</p>
                      <Button size="sm" variant="outline" asChild className="text-xs">
                        <Link to="/api-docs/api-reference/portfolios-create">View details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
              
              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <span className="inline-block w-2 h-6 bg-indigo-500 rounded-sm mr-2"></span>
                  Transaction API
                </h3>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-md">
                    <div className="bg-gray-50 px-4 py-3 flex items-center">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded mr-3">GET</span>
                      <code className="text-sm text-gray-800">/transactions</code>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-700 mb-2">Get a list of all transactions</p>
                      <Button size="sm" variant="outline" asChild className="text-xs">
                        <Link to="/api-docs/api-reference/transactions">View details</Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-md">
                    <div className="bg-gray-50 px-4 py-3 flex items-center">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded mr-3">POST</span>
                      <code className="text-sm text-gray-800">/transactions</code>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-700 mb-2">Create a new transaction</p>
                      <Button size="sm" variant="outline" asChild className="text-xs">
                        <Link to="/api-docs/api-reference/transactions-create">View details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </TabsContent>
          
          <TabsContent value="models" className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Models</h2>
            
            <div className="space-y-8">
              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Portfolio</h3>
                <div className="bg-gray-100 p-4 rounded-md">
                  <pre className="bg-gray-800 text-gray-200 p-3 rounded-md overflow-x-auto text-sm">
{`{
  "id": string,
  "name": string,
  "description": string,
  "created_at": ISO8601 date string,
  "updated_at": ISO8601 date string,
  "assets": Array<Asset>,
  "total_value": number,
  "currency": string
}`}
                  </pre>
                </div>
              </section>
              
              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Asset</h3>
                <div className="bg-gray-100 p-4 rounded-md">
                  <pre className="bg-gray-800 text-gray-200 p-3 rounded-md overflow-x-auto text-sm">
{`{
  "id": string,
  "name": string,
  "ticker": string,
  "asset_type": string,
  "allocation": number,
  "value": number,
  "currency": string,
  "metadata": {
    [key: string]: any
  }
}`}
                  </pre>
                </div>
              </section>
              
              <section>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Transaction</h3>
                <div className="bg-gray-100 p-4 rounded-md">
                  <pre className="bg-gray-800 text-gray-200 p-3 rounded-md overflow-x-auto text-sm">
{`{
  "id": string,
  "portfolio_id": string,
  "asset_id": string,
  "transaction_type": "buy" | "sell",
  "amount": number,
  "price": number,
  "currency": string,
  "timestamp": ISO8601 date string,
  "status": "pending" | "completed" | "failed",
  "metadata": {
    [key: string]: any
  }
}`}
                  </pre>
                </div>
              </section>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
