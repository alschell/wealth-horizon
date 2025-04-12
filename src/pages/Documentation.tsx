import React, { useState } from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { BookOpen, FileText, Code, Link, Download, Copy, ExternalLink, CheckCircle, Info, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const API_DOCS_URL = "https://api.wealthhorizon.ai/docs";
const DEVELOPER_PORTAL_URL = "https://developers.wealthhorizon.ai";
const SDK_BASE_URL = "https://downloads.wealthhorizon.ai/sdk";

const Documentation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [downloadingSDK, setDownloadingSDK] = useState<string | null>(null);
  const [joiningProgram, setJoiningProgram] = useState(false);
  const [openingDocs, setOpeningDocs] = useState<string | null>(null);

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

  const handleDownloadSDK = (sdkName: string, version: string) => {
    setDownloadingSDK(sdkName);
    toast({
      title: `Downloading ${sdkName} SDK v${version}`,
      description: "Your download will begin shortly",
    });
    
    let filename;
    switch(sdkName) {
      case "JavaScript":
        filename = `wealthhorizon-js-sdk-v${version}.zip`;
        break;
      case "Python":
        filename = `wealthhorizon-python-sdk-v${version}.tar.gz`;
        break;
      case "Java":
        filename = `wealthhorizon-java-sdk-v${version}.jar`;
        break;
      case ".NET":
        filename = `wealthhorizon-dotnet-sdk-v${version}.dll`;
        break;
      default:
        filename = `wealthhorizon-${sdkName.toLowerCase()}-sdk-v${version}.zip`;
    }
    
    const downloadUrl = `${SDK_BASE_URL}/${filename.toLowerCase()}`;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    setTimeout(() => {
      toast({
        title: "Download complete",
        description: `${sdkName} SDK v${version} has been downloaded`,
        duration: 3000,
      });
      setDownloadingSDK(null);
    }, 1500);
  };

  const openDocumentation = (docType: string) => {
    setOpeningDocs(docType);
    toast({
      title: `Opening ${docType} documentation`,
      description: "Loading documentation resources",
    });
    
    const docsPath = docType.toLowerCase().replace(/\s/g, '-');
    const completeUrl = `${API_DOCS_URL}/${docsPath}`;
    
    window.open(completeUrl, '_blank');
    
    setTimeout(() => {
      setOpeningDocs(null);
    }, 1000);
  };

  const joinDeveloperProgram = () => {
    setJoiningProgram(true);
    toast({
      title: "Joining Developer Program",
      description: "Redirecting to developer registration portal",
    });
    
    window.open(`${DEVELOPER_PORTAL_URL}/join`, '_blank');
    
    setTimeout(() => {
      setJoiningProgram(false);
    }, 1500);
  };

  return (
    <PageTemplate
      title="Documentation"
      description="Comprehensive guides and resources for using the WealthHorizon platform."
      icon={BookOpen}
    >
      <div className="space-y-12">
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
                >
                  {openingDocs === "API Reference" ? (
                    <>Loading... <span className="animate-spin ml-1">⟳</span></>
                  ) : (
                    <><FileText size={16} /> API Reference</>
                  )}
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
                  <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Support for financial data aggregators</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Direct custodian integrations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Automated data synchronization</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={() => openDocumentation("Integration Guide")}
                disabled={openingDocs === "Integration Guide"}
              >
                {openingDocs === "Integration Guide" ? (
                  <>Loading... <span className="animate-spin ml-1">⟳</span></>
                ) : (
                  <><Link size={16} /> View Integration Guide</>
                )}
              </Button>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Reporting API</h3>
              <p className="text-gray-600 mb-4">
                Generate customized reports programmatically using our reporting endpoints.
              </p>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Custom report templates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Multiple export formats (PDF, XLSX, CSV)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Scheduled report generation</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={() => openDocumentation("Reporting Guide")}
                disabled={openingDocs === "Reporting Guide"}
              >
                {openingDocs === "Reporting Guide" ? (
                  <>Loading... <span className="animate-spin ml-1">⟳</span></>
                ) : (
                  <><FileText size={16} /> View Reporting Guide</>
                )}
              </Button>
            </div>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Code Examples</h2>
          <Tabs defaultValue="javascript" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="java">Java</TabsTrigger>
              <TabsTrigger value="csharp">C#</TabsTrigger>
            </TabsList>
            
            <TabsContent value="javascript" className="space-y-6">
              <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 flex items-center justify-between">
                  <span className="font-medium text-gray-700">Fetch Portfolio Data</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-gray-500 hover:text-gray-700"
                    onClick={() => handleCopyClick(`
const fetchPortfolioData = async (apiKey, portfolioId) => {
  const response = await fetch(
    \`https://api.wealthhorizon.ai/v1/portfolios/\${portfolioId}\`,
    {
      headers: {
        Authorization: \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  if (!response.ok) {
    throw new Error(\`API error: \${response.status}\`);
  }
  
  return await response.json();
};`, 'js-fetch')}
                  >
                    {copiedCode === 'js-fetch' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </Button>
                </div>
                <div className="p-4 bg-gray-900">
                  <pre className="text-sm text-gray-200 overflow-x-auto">
                    <code>{`const fetchPortfolioData = async (apiKey, portfolioId) => {
  const response = await fetch(
    \`https://api.wealthhorizon.ai/v1/portfolios/\${portfolioId}\`,
    {
      headers: {
        Authorization: \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  if (!response.ok) {
    throw new Error(\`API error: \${response.status}\`);
  }
  
  return await response.json();
};`}</code>
                  </pre>
                </div>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 flex items-center justify-between">
                  <span className="font-medium text-gray-700">Create a Transaction</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-gray-500 hover:text-gray-700"
                    onClick={() => handleCopyClick(`const createTransaction = async (apiKey, transactionData) => {
  const response = await fetch(
    'https://api.wealthhorizon.ai/v1/transactions',
    {
      method: 'POST',
      headers: {
        Authorization: \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transactionData)
    }
  );
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || \`API error: \${response.status}\`);
  }
  
  return await response.json();
};`, 'js-create')}
                  >
                    {copiedCode === 'js-create' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </Button>
                </div>
                <div className="p-4 bg-gray-900">
                  <pre className="text-sm text-gray-200 overflow-x-auto">
                    <code>{`const createTransaction = async (apiKey, transactionData) => {
  const response = await fetch(
    'https://api.wealthhorizon.ai/v1/transactions',
    {
      method: 'POST',
      headers: {
        Authorization: \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transactionData)
    }
  );
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || \`API error: \${response.status}\`);
  }
  
  return await response.json();
};`}</code>
                  </pre>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="python" className="space-y-6">
              <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 flex items-center justify-between">
                  <span className="font-medium text-gray-700">Fetch Portfolio Data</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-gray-500 hover:text-gray-700"
                    onClick={() => handleCopyClick(`import requests

def fetch_portfolio_data(api_key, portfolio_id):
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    
    response = requests.get(
        f'https://api.wealthhorizon.ai/v1/portfolios/{portfolio_id}',
        headers=headers
    )
    
    response.raise_for_status()
    return response.json()`, 'py-fetch')}
                  >
                    {copiedCode === 'py-fetch' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </Button>
                </div>
                <div className="p-4 bg-gray-900">
                  <pre className="text-sm text-gray-200 overflow-x-auto">
                    <code>{`import requests

def fetch_portfolio_data(api_key, portfolio_id):
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    
    response = requests.get(
        f'https://api.wealthhorizon.ai/v1/portfolios/{portfolio_id}',
        headers=headers
    )
    
    response.raise_for_status()
    return response.json()`}</code>
                  </pre>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="java" className="space-y-6">
              <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 flex items-center justify-between">
                  <span className="font-medium text-gray-700">Fetch Portfolio Data</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-gray-500 hover:text-gray-700"
                    onClick={() => handleCopyClick(`import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class WealthHorizonApi {
    private final HttpClient httpClient = HttpClient.newBuilder().build();
    private final String apiKey;
    
    public WealthHorizonApi(String apiKey) {
        this.apiKey = apiKey;
    }
    
    public String fetchPortfolioData(String portfolioId) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.wealthhorizon.ai/v1/portfolios/" + portfolioId))
            .header("Authorization", "Bearer " + apiKey)
            .header("Content-Type", "application/json")
            .GET()
            .build();
            
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() != 200) {
            throw new RuntimeException("API error: " + response.statusCode());
        }
        
        return response.body();
    }
}`, 'java-fetch')}
                  >
                    {copiedCode === 'java-fetch' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </Button>
                </div>
                <div className="p-4 bg-gray-900">
                  <pre className="text-sm text-gray-200 overflow-x-auto">
                    <code>{`import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class WealthHorizonApi {
    private final HttpClient httpClient = HttpClient.newBuilder().build();
    private final String apiKey;
    
    public WealthHorizonApi(String apiKey) {
        this.apiKey = apiKey;
    }
    
    public String fetchPortfolioData(String portfolioId) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.wealthhorizon.ai/v1/portfolios/" + portfolioId))
            .header("Authorization", "Bearer " + apiKey)
            .header("Content-Type", "application/json")
            .GET()
            .build();
            
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() != 200) {
            throw new RuntimeException("API error: " + response.statusCode());
        }
        
        return response.body();
    }
}`}</code>
                  </pre>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="csharp" className="space-y-6">
              <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 flex items-center justify-between">
                  <span className="font-medium text-gray-700">Fetch Portfolio Data</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-gray-500 hover:text-gray-700"
                    onClick={() => handleCopyClick(`using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

public class WealthHorizonApi
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    
    public WealthHorizonApi(string apiKey)
    {
        _httpClient = new HttpClient();
        _apiKey = apiKey;
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
    }
    
    public async Task<string> FetchPortfolioDataAsync(string portfolioId)
    {
        var response = await _httpClient.GetAsync($"https://api.wealthhorizon.ai/v1/portfolios/{portfolioId}");
        
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }
}`, 'csharp-fetch')}
                  >
                    {copiedCode === 'csharp-fetch' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </Button>
                </div>
                <div className="p-4 bg-gray-900">
                  <pre className="text-sm text-gray-200 overflow-x-auto">
                    <code>{`using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

public class WealthHorizonApi
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    
    public WealthHorizonApi(string apiKey)
    {
        _httpClient = new HttpClient();
        _apiKey = apiKey;
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
    }
    
    public async Task<string> FetchPortfolioDataAsync(string portfolioId)
    {
        var response = await _httpClient.GetAsync($"https://api.wealthhorizon.ai/v1/portfolios/{portfolioId}");
        
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }
}`}</code>
                  </pre>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        <section className="bg-white border border-gray-100 rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">API Reference</h2>
          <p className="text-gray-600 mb-6">
            Explore our comprehensive API documentation for detailed information on endpoints, parameters, and responses.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Portfolio Management", endpoints: 12, category: "Core" },
              { title: "Transaction API", endpoints: 8, category: "Core" },
              { title: "Reporting & Analytics", endpoints: 15, category: "Core" },
              { title: "User Management", endpoints: 7, category: "Administrative" },
              { title: "Data Integration", endpoints: 10, category: "Integration" },
              { title: "Authentication", endpoints: 5, category: "Security" }
            ].map((api, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-800">{api.title}</h3>
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full px-2 py-1">
                    {api.category}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-4">{api.endpoints} endpoints</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full flex items-center justify-center gap-1"
                  onClick={() => openDocumentation(api.title)}
                >
                  <Code size={14} /> View Reference
                </Button>
              </div>
            ))}
          </div>
        </section>
        
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
              <Link size={24} className="mr-3" />
              <h2 className="text-xl font-semibold text-white">Developer Resources</h2>
            </div>
            <p className="mb-6 text-gray-300">
              Additional resources to help you integrate with the WealthHorizon platform.
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center">
                <CheckCircle size={16} className="mr-2 text-green-400" />
                <span>Developer Community Forum</span>
              </li>
              <li className="flex items-center">
                <CheckCircle size={16} className="mr-2 text-green-400" />
                <span>API Changelog & Release Notes</span>
              </li>
              <li className="flex items-center">
                <CheckCircle size={16} className="mr-2 text-green-400" />
                <span>Sample Applications & Repositories</span>
              </li>
              <li className="flex items-center">
                <CheckCircle size={16} className="mr-2 text-green-400" />
                <span>Webhook Integration Guide</span>
              </li>
            </ul>
            <Button 
              className="flex items-center gap-2 bg-white text-gray-800 hover:bg-gray-100"
              onClick={joinDeveloperProgram}
              disabled={joiningProgram}
            >
              {joiningProgram ? (
                <span className="flex items-center">
                  Joining Program... <span className="animate-spin ml-2">⟳</span>
                </span>
              ) : (
                <>Join Developer Program <ExternalLink size={16} /></>
              )}
            </Button>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default Documentation;
