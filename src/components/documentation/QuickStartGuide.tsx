
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Steps, Step } from "@/components/ui/steps";
import { LightbulbIcon } from "lucide-react";
import { showCopySuccessToast } from "@/utils/toast/documentationToasts";

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
          <CardTitle>Quick Start Guide</CardTitle>
        </div>
        <CardDescription>
          Follow these steps to quickly integrate with the WealthHorizon API.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Steps>
          <Step number={1} title="Get API Keys">
            <div className="mt-2 text-sm text-gray-600">
              <p>Sign up for a developer account and obtain your API keys from the developer portal.</p>
              <a 
                href="/developer-portal" 
                className="inline-block mt-2 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Go to Developer Portal →
              </a>
            </div>
          </Step>
          
          <Step number={2} title="Install the SDK">
            <div className="mt-2 text-sm text-gray-600">
              <p>Install the WealthHorizon SDK using npm or yarn:</p>
              <div className="relative mt-2">
                <pre className="bg-gray-900 p-3 rounded-md text-white text-sm overflow-x-auto">
                  <code>npm install @wealthhorizon/sdk</code>
                </pre>
                <button 
                  onClick={() => handleCopyCode("npm install @wealthhorizon/sdk", "install-npm")}
                  className="absolute top-2 right-2 bg-indigo-500 text-white text-xs rounded px-2 py-1 hover:bg-indigo-600"
                >
                  {copiedCode === "install-npm" ? "Copied!" : "Copy"}
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
                  {copiedCode === "install-yarn" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </Step>
          
          <Step number={3} title="Initialize the SDK">
            <div className="mt-2 text-sm text-gray-600">
              <p>Import and initialize the SDK with your API key:</p>
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
                  {copiedCode === "init-sdk" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </Step>
          
          <Step number={4} title="Make Your First API Call">
            <div className="mt-2 text-sm text-gray-600">
              <p>Try making a simple API call to test your integration:</p>
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
                  {copiedCode === "first-call" ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </Step>
        </Steps>
        
        <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-100">
          <h4 className="text-sm font-medium text-blue-800">Need more help?</h4>
          <p className="mt-1 text-sm text-blue-700">
            Check out our <a href="/api-docs/api-reference" className="underline">API Reference</a> or 
            contact our <a href="/support" className="underline">Support Team</a> for assistance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
