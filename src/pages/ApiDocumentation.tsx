
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageTemplate from "@/components/shared/PageTemplate";
import { FileText, ChevronRight, Search, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

const ApiDocumentation = () => {
  const { docType } = useParams();
  const { toast } = useToast();
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
    toast({
      title: "Code copied to clipboard",
      description: "You can now paste it in your application",
      duration: 3000,
    });
    
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
        {/* Sidebar navigation */}
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
            
            <Separator className="my-4" />
            
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/developer-portal/join">
                <span>Join Developer Program</span>
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

const DocumentationLink = ({ 
  children, 
  to, 
  active
}: { 
  children: React.ReactNode; 
  to: string; 
  active: boolean;
}) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 text-sm rounded-md ${
        active 
          ? "bg-indigo-50 text-indigo-600 font-medium" 
          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </Link>
  );
};

const ApiReferenceContent = ({ 
  activeSection,
  setActiveSection,
  copiedSnippet,
  handleCopySnippet
}: {
  activeSection: string;
  setActiveSection: (section: string) => void;
  copiedSnippet: string | null;
  handleCopySnippet: (snippet: string, id: string) => void;
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

const IntegrationGuideContent = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Integration Guide</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
        <p className="text-gray-700 mb-4">
          This guide walks you through the process of integrating your systems with the WealthHorizon platform.
          Whether you're connecting a financial data provider, a custodian, or building your own custom interface,
          this guide provides the information you need to successfully connect to our platform.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Integration Types</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-medium text-lg text-gray-800 mb-2">Data Provider Integration</h3>
            <p className="text-gray-600 text-sm mb-4">
              Connect your data sources to WealthHorizon for seamless data flow and aggregation.
            </p>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-medium text-lg text-gray-800 mb-2">Custodian Integration</h3>
            <p className="text-gray-600 text-sm mb-4">
              Connect your custodian systems for real-time portfolio updates and transactions.
            </p>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-medium text-lg text-gray-800 mb-2">API Integration</h3>
            <p className="text-gray-600 text-sm mb-4">
              Build custom interfaces using our comprehensive API suite.
            </p>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-medium text-lg text-gray-800 mb-2">Webhook Integration</h3>
            <p className="text-gray-600 text-sm mb-4">
              Receive real-time notifications for platform events.
            </p>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Integration Workflow</h2>
        
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-indigo-100"></div>
          
          <div className="relative z-10 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <span className="text-indigo-600 font-semibold text-lg">1</span>
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Register as a Developer</h3>
                <p className="text-gray-600">
                  Sign up for the WealthHorizon Developer Program to get your API credentials and access to developer resources.
                </p>
                <Button className="mt-3" variant="outline" size="sm" asChild>
                  <Link to="/developer-portal/join">Join Developer Program</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <span className="text-indigo-600 font-semibold text-lg">2</span>
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Choose Your Integration Type</h3>
                <p className="text-gray-600">
                  Determine which integration method best suits your needs based on your system architecture and requirements.
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <span className="text-indigo-600 font-semibold text-lg">3</span>
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Implement Integration</h3>
                <p className="text-gray-600">
                  Use our SDKs and documentation to implement the integration in your systems. Our SDKs are available in multiple languages.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/sdk/download/js/2.1.0">JavaScript SDK</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/sdk/download/python/1.8.2">Python SDK</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/sdk/download/java/1.5.0">Java SDK</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <span className="text-indigo-600 font-semibold text-lg">4</span>
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Test in Sandbox</h3>
                <p className="text-gray-600">
                  Test your integration in our sandbox environment to ensure everything works as expected before going live.
                </p>
                <Button className="mt-3" variant="outline" size="sm">Access Sandbox</Button>
              </div>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <span className="text-indigo-600 font-semibold text-lg">5</span>
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Launch to Production</h3>
                <p className="text-gray-600">
                  Once testing is complete, obtain production credentials and go live with your integration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Support Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium text-gray-800 mb-2">Developer Forum</h3>
            <p className="text-sm text-gray-600 mb-3">
              Connect with other developers and get answers to your questions.
            </p>
            <Button size="sm" variant="link" className="p-0">Visit Forum</Button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium text-gray-800 mb-2">Support Tickets</h3>
            <p className="text-sm text-gray-600 mb-3">
              Create a support ticket for technical assistance.
            </p>
            <Button size="sm" variant="link" className="p-0">Open Ticket</Button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium text-gray-800 mb-2">Integration Consulting</h3>
            <p className="text-sm text-gray-600 mb-3">
              Get expert help with your integration project.
            </p>
            <Button size="sm" variant="link" className="p-0">Request Consultation</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const ReportingGuideContent = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reporting Guide</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
        <p className="text-gray-700 mb-4">
          The WealthHorizon Reporting API allows you to generate customized reports for portfolios, assets,
          transactions, and performance analytics. This guide covers how to create, customize, and retrieve
          reports programmatically.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Report Types</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-medium text-lg text-gray-800 mb-2">Portfolio Reports</h3>
            <p className="text-gray-600 text-sm mb-4">
              Comprehensive reports on portfolio composition, performance, and risk metrics.
            </p>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-medium text-lg text-gray-800 mb-2">Transaction Reports</h3>
            <p className="text-gray-600 text-sm mb-4">
              Detailed logs of all transactions within a specified time period.
            </p>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-medium text-lg text-gray-800 mb-2">Performance Reports</h3>
            <p className="text-gray-600 text-sm mb-4">
              Analyses of portfolio performance against benchmarks and goals.
            </p>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-medium text-lg text-gray-800 mb-2">Custom Reports</h3>
            <p className="text-gray-600 text-sm mb-4">
              Tailored reports with specific metrics and visualizations.
            </p>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Report Generation</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="font-medium text-gray-800 mb-4">Sample Report Request</h3>
          
          <pre className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-x-auto text-sm mb-4">
{`POST /v1/reports
{
  "report_type": "portfolio_performance",
  "parameters": {
    "portfolio_id": "port_12345",
    "start_date": "2023-01-01",
    "end_date": "2023-12-31",
    "include_benchmarks": true,
    "benchmarks": ["SPY", "AGG"],
    "frequency": "monthly"
  },
  "format": "pdf",
  "template_id": "template_standard"
}`}
          </pre>
          
          <h3 className="font-medium text-gray-800 mb-4 mt-6">Sample Response</h3>
          
          <pre className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-x-auto text-sm">
{`{
  "data": {
    "report_id": "report_789012",
    "status": "processing",
    "created_at": "2023-12-15T14:30:00Z",
    "estimated_completion_time": "2023-12-15T14:32:00Z",
    "download_url": null
  }
}`}
          </pre>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Report Templates</h2>
        
        <p className="text-gray-700 mb-6">
          WealthHorizon provides a variety of report templates that can be customized to meet your needs.
          You can also create your own templates using our template designer.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Template Preview</span>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-800">Standard Template</h3>
              <p className="text-sm text-gray-600 mb-3">Comprehensive layout with all metrics</p>
              <Button size="sm" variant="outline" className="w-full">Use Template</Button>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Template Preview</span>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-800">Executive Summary</h3>
              <p className="text-sm text-gray-600 mb-3">Condensed high-level overview</p>
              <Button size="sm" variant="outline" className="w-full">Use Template</Button>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Template Preview</span>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-800">Detailed Analysis</h3>
              <p className="text-sm text-gray-600 mb-3">In-depth breakdown of all metrics</p>
              <Button size="sm" variant="outline" className="w-full">Use Template</Button>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Scheduling Reports</h2>
        
        <p className="text-gray-700 mb-6">
          Reports can be scheduled to run automatically at specified intervals using the Reporting API.
          Scheduled reports can be delivered via email, saved to cloud storage, or accessed through the API.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-4">Sample Schedule Request</h3>
          
          <pre className="bg-gray-800 text-gray-200 p-4 rounded-md overflow-x-auto text-sm">
{`POST /v1/reports/schedules
{
  "name": "Monthly Portfolio Review",
  "report_template_id": "template_standard",
  "parameters": {
    "portfolio_id": "port_12345",
    "relative_period": "last_month",
    "include_benchmarks": true
  },
  "schedule": {
    "frequency": "monthly",
    "day_of_month": 1,
    "time": "09:00",
    "timezone": "America/New_York"
  },
  "delivery": {
    "method": "email",
    "recipients": ["client@example.com", "advisor@example.com"],
    "subject": "Monthly Portfolio Review - {{ month }} {{ year }}"
  },
  "format": "pdf"
}`}
          </pre>
        </div>
      </section>
    </div>
  );
};

const GettingStartedContent = ({ 
  copiedSnippet, 
  handleCopySnippet 
}: { 
  copiedSnippet: string | null;
  handleCopySnippet: (snippet: string, id: string) => void;
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

const DefaultDocContent = () => {
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

export default ApiDocumentation;
