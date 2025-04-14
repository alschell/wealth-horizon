import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showCopySuccessToast } from "@/utils/toast/documentationToasts";

export const CodeExamples: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyClick = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    showCopySuccessToast();
    
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
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
  );
};
