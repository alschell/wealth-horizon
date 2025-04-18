
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code } from "lucide-react";
import { showCopySuccessToast } from "@/utils/toast/documentationToasts";
import { TranslatedText } from "@/components/ui/translated-text";

interface CodeExamplesProps {}

export const CodeExamples: React.FC<CodeExamplesProps> = () => {
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    showCopySuccessToast();
  };

  return (
    <section>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-indigo-500" />
            <CardTitle><TranslatedText>Code Examples</TranslatedText></CardTitle>
          </div>
          <CardDescription>
            <TranslatedText>Ready-to-use code examples for common integration scenarios.</TranslatedText>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="javascript">
            <TabsList className="mb-4">
              <TabsTrigger value="javascript"><TranslatedText>JavaScript</TranslatedText></TabsTrigger>
              <TabsTrigger value="python"><TranslatedText>Python</TranslatedText></TabsTrigger>
              <TabsTrigger value="java"><TranslatedText>Java</TranslatedText></TabsTrigger>
              <TabsTrigger value="csharp"><TranslatedText>C#</TranslatedText></TabsTrigger>
            </TabsList>
            
            {/* JavaScript Example */}
            <TabsContent value="javascript" className="relative">
              <pre className="rounded-md bg-gray-900 p-4 text-sm text-white overflow-x-auto">
                <code>{`
import { WealthHorizonSDK } from '@wealthhorizon/sdk';

// Initialize the SDK with your API key
const wh = new WealthHorizonSDK({
  apiKey: 'your-api-key',
  environment: 'production' // or 'sandbox' for testing
});

// Fetch portfolio data
async function getPortfolioData() {
  try {
    const portfolios = await wh.portfolios.list();
    console.log('Portfolios:', portfolios);
    
    // Get performance metrics
    if (portfolios.length > 0) {
      const metrics = await wh.portfolios.getMetrics(portfolios[0].id);
      console.log('Performance metrics:', metrics);
    }
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
  }
}

getPortfolioData();
                `}</code>
              </pre>
              <button 
                onClick={() => handleCopyCode(`import { WealthHorizonSDK } from '@wealthhorizon/sdk';

// Initialize the SDK with your API key
const wh = new WealthHorizonSDK({
  apiKey: 'your-api-key',
  environment: 'production' // or 'sandbox' for testing
});

// Fetch portfolio data
async function getPortfolioData() {
  try {
    const portfolios = await wh.portfolios.list();
    console.log('Portfolios:', portfolios);
    
    // Get performance metrics
    if (portfolios.length > 0) {
      const metrics = await wh.portfolios.getMetrics(portfolios[0].id);
      console.log('Performance metrics:', metrics);
    }
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
  }
}

getPortfolioData();`)}
                className="absolute top-2 right-2 bg-indigo-500 text-white text-xs rounded px-2 py-1 hover:bg-indigo-600"
              >
                <TranslatedText>Copy</TranslatedText>
              </button>
            </TabsContent>
            
            {/* Other language examples would go here */}
            <TabsContent value="python">
              {/* Python example code */}
              <p className="text-center text-gray-500 py-4">
                <TranslatedText>Python example coming soon...</TranslatedText>
              </p>
            </TabsContent>
            
            <TabsContent value="java">
              {/* Java example code */}
              <p className="text-center text-gray-500 py-4">
                <TranslatedText>Java example coming soon...</TranslatedText>
              </p>
            </TabsContent>
            
            <TabsContent value="csharp">
              {/* C# example code */}
              <p className="text-center text-gray-500 py-4">
                <TranslatedText>C# example coming soon...</TranslatedText>
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
};
