
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Steps, Step } from "@/components/ui/steps";
import { LightbulbIcon } from "lucide-react";
import { showCopySuccessToast } from "@/utils/toast/documentationToasts";
import { TranslatedText } from "@/components/ui/translated-text";

interface QuickStartGuideProps {
  copiedCode: string | null;
  setCopiedCode: (value: string | null) => void;
}

export const QuickStartGuide: React.FC<QuickStartGuideProps> = ({
  copiedCode,
  setCopiedCode
}) => {
  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    showCopySuccessToast();
    
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <LightbulbIcon className="h-5 w-5 text-indigo-500" />
          <CardTitle><TranslatedText>Quick Start Guide</TranslatedText></CardTitle>
        </div>
        <CardDescription>
          <TranslatedText>Follow these steps to quickly integrate with the WealthHorizon API.</TranslatedText>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Steps>
          <Step number={1} title={<TranslatedText>Get API Keys</TranslatedText>}>
            <div className="mt-2 text-sm text-gray-600">
              <p><TranslatedText>Sign up for a developer account and obtain your API keys from the developer portal.</TranslatedText></p>
              <a 
                href="/developer-portal" 
                className="inline-block mt-2 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                <TranslatedText>Go to Developer Portal →</TranslatedText>
              </a>
            </div>
          </Step>
          
          <Step number={2} title={<TranslatedText>Install the SDK</TranslatedText>}>
            <div className="mt-2 text-sm text-gray-600">
              <p><TranslatedText>Install the WealthHorizon SDK using npm or yarn:</TranslatedText></p>
              <div className="relative mt-2">
                <pre className="bg-gray-900 p-3 rounded-md text-white text-sm overflow-x-auto">
                  <code>npm install @wealthhorizon/sdk</code>
                </pre>
                <button 
                  onClick={() => handleCopyCode("npm install @wealthhorizon/sdk", "install-npm")}
                  className="absolute top-2 right-2 bg-indigo-500 text-white text-xs rounded px-2 py-1 hover:bg-indigo-600"
                >
                  {copiedCode === "install-npm" ? <TranslatedText>Copied!</TranslatedText> : <TranslatedText>Copy</TranslatedText>}
                </button>
              </div>
              <div className="relative mt-2">
                <pre className="bg-gray-900 p-3 rounded-md text-white text-sm overflow-x-auto">
                  <code>yarn add @wealthhorizon/sdk</code>
                </pre>
                <button 
                  onClick={() => handleCopyCode("yarn add @wealthhorizon/sdk", "install-yarn")}
                  className="absolute top-2 right-2 bg-indigo-500 text-white text-xs rounded px-2 py-1 hover:bg-indigo-600"
                >
                  {copiedCode === "install-yarn" ? <TranslatedText>Copied!</TranslatedText> : <TranslatedText>Copy</TranslatedText>}
                </button>
              </div>
            </div>
          </Step>
          
          <Step number={3} title={<TranslatedText>Initialize the SDK</TranslatedText>}>
            <div className="mt-2 text-sm text-gray-600">
              <p><TranslatedText>Import and initialize the SDK with your API key:</TranslatedText></p>
              <div className="relative mt-2">
                <pre className="bg-gray-900 p-3 rounded-md text-white text-sm overflow-x-auto">
                  <code>{`
const { WealthHorizonSDK } = require('@wealthhorizon/sdk');

const wh = new WealthHorizonSDK({
  apiKey: 'your-api-key',
  environment: 'sandbox'
});`}
                  </code>
                </pre>
                <button 
                  onClick={() => handleCopyCode(`const { WealthHorizonSDK } = require('@wealthhorizon/sdk');

const wh = new WealthHorizonSDK({
  apiKey: 'your-api-key',
  environment: 'sandbox'
});`, "init-sdk")}
                  className="absolute top-2 right-2 bg-indigo-500 text-white text-xs rounded px-2 py-1 hover:bg-indigo-600"
                >
                  {copiedCode === "init-sdk" ? <TranslatedText>Copied!</TranslatedText> : <TranslatedText>Copy</TranslatedText>}
                </button>
              </div>
            </div>
          </Step>
          
          <Step number={4} title={<TranslatedText>Make Your First API Call</TranslatedText>}>
            <div className="mt-2 text-sm text-gray-600">
              <p><TranslatedText>Try making a simple API call to test your integration:</TranslatedText></p>
              <div className="relative mt-2">
                <pre className="bg-gray-900 p-3 rounded-md text-white text-sm overflow-x-auto">
                  <code>{`
// Get user profile information
async function getUserProfile() {
  try {
    const profile = await wh.users.getProfile();
    console.log('User profile:', profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
}

getUserProfile();`}
                  </code>
                </pre>
                <button 
                  onClick={() => handleCopyCode(`// Get user profile information
async function getUserProfile() {
  try {
    const profile = await wh.users.getProfile();
    console.log('User profile:', profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
}

getUserProfile();`, "first-call")}
                  className="absolute top-2 right-2 bg-indigo-500 text-white text-xs rounded px-2 py-1 hover:bg-indigo-600"
                >
                  {copiedCode === "first-call" ? <TranslatedText>Copied!</TranslatedText> : <TranslatedText>Copy</TranslatedText>}
                </button>
              </div>
            </div>
          </Step>
        </Steps>
        
        <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-100">
          <h4 className="text-sm font-medium text-blue-800"><TranslatedText>Need more help?</TranslatedText></h4>
          <p className="mt-1 text-sm text-blue-700">
            <TranslatedText>
              Check out our <a href="/api-docs/api-reference" className="underline">API Reference</a> or 
              contact our <a href="/support" className="underline">Support Team</a> for assistance.
            </TranslatedText>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
