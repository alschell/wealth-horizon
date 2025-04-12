
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { Cookie, Info, Shield, CheckCircle, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CookiesPolicy = () => {
  return (
    <PageTemplate
      title="Cookies Policy"
      description="Information about how we use cookies and similar technologies on our website."
      icon={Cookie}
    >
      <div className="space-y-10">
        <section>
          <p className="text-gray-600">
            This Cookies Policy explains how WealthHorizon ("we", "us", or "our") uses cookies and similar technologies when you visit our website or use our wealth management platform. By using our platform, you consent to the use of cookies as described in this policy.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Are Cookies?</h2>
          <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <Info size={24} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-gray-600 mb-4">
                  Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners. Cookies help:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Remember your preferences and settings</li>
                  <li>Understand how you navigate through our platform</li>
                  <li>Enhance your user experience</li>
                  <li>Provide features like secure login and authentication</li>
                  <li>Analyze how our platform is performing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Types of Cookies We Use</h2>
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Essential Cookies</h3>
              <div className="flex items-start">
                <div className="mt-1 mr-3 flex-shrink-0">
                  <CheckCircle size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="text-gray-600">
                    These cookies are necessary for the platform to function properly and cannot be switched off in our systems. They are usually set in response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms. 
                  </p>
                  <div className="mt-3 bg-gray-50 p-3 rounded-md">
                    <h4 className="font-medium text-gray-700 mb-1">Examples:</h4>
                    <ul className="list-disc pl-6 text-sm text-gray-600">
                      <li>Authentication cookies</li>
                      <li>Security cookies</li>
                      <li>Session management</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Analytical Cookies</h3>
              <div className="flex items-start">
                <div className="mt-1 mr-3 flex-shrink-0">
                  <CheckCircle size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600">
                    These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our platform. They help us know which pages are the most and least popular and see how visitors navigate around the site.
                  </p>
                  <div className="mt-3 bg-gray-50 p-3 rounded-md">
                    <h4 className="font-medium text-gray-700 mb-1">Examples:</h4>
                    <ul className="list-disc pl-6 text-sm text-gray-600">
                      <li>Google Analytics cookies</li>
                      <li>Performance monitoring</li>
                      <li>Usage statistics</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Functional Cookies</h3>
              <div className="flex items-start">
                <div className="mt-1 mr-3 flex-shrink-0">
                  <CheckCircle size={18} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-600">
                    These cookies enable enhanced functionality and personalization features. They may be set by us or by third-party providers whose services we have added to our pages.
                  </p>
                  <div className="mt-3 bg-gray-50 p-3 rounded-md">
                    <h4 className="font-medium text-gray-700 mb-1">Examples:</h4>
                    <ul className="list-disc pl-6 text-sm text-gray-600">
                      <li>Remembering user preferences</li>
                      <li>Language settings</li>
                      <li>Interface customization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">How to Control Cookies</h2>
          <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
            <p className="text-gray-600 mb-6">
              Most web browsers allow you to control cookies through their settings. You can typically find these settings in the "Options" or "Preferences" menu of your browser. However, please note that restricting cookies may impact the functionality of our platform.
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b">
                <AccordionTrigger className="text-gray-800">Managing Cookies in Chrome</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Click the three dots in the top right corner and select "Settings"</li>
                    <li>Scroll down and click on "Privacy and security"</li>
                    <li>Click on "Cookies and other site data"</li>
                    <li>Adjust your cookie settings as needed</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b">
                <AccordionTrigger className="text-gray-800">Managing Cookies in Firefox</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Click the three lines in the top right corner and select "Options"</li>
                    <li>Click on "Privacy & Security" in the sidebar</li>
                    <li>Scroll to the "Cookies and Site Data" section</li>
                    <li>Adjust your cookie settings as needed</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b">
                <AccordionTrigger className="text-gray-800">Managing Cookies in Safari</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Click "Safari" in the menu bar and select "Preferences"</li>
                    <li>Click on the "Privacy" tab</li>
                    <li>Adjust your cookie settings in the "Cookies and website data" section</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-gray-800">Managing Cookies in Edge</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Click the three dots in the top right corner and select "Settings"</li>
                    <li>Click on "Cookies and site permissions"</li>
                    <li>Click on "Manage and delete cookies and site data"</li>
                    <li>Adjust your cookie settings as needed</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Third-Party Cookies</h2>
          <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <AlertTriangle size={24} className="text-amber-500" />
              </div>
              <div>
                <p className="text-gray-600 mb-4">
                  Our platform may use third-party services that set their own cookies. These third parties may collect your information for their own purposes. We recommend reviewing the privacy policies of these third parties to understand how they use your information.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Third-Party Services We Use:</h4>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    <li>Analytics services (e.g., Google Analytics)</li>
                    <li>Functionality and content providers</li>
                    <li>Authentication services</li>
                    <li>Customer support tools</li>
                  </ul>
                </div>
                <p className="text-gray-600">
                  We have no control over these third-party cookies. You can disable them by changing your browser settings or using opt-out options provided by these services.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-indigo-50 rounded-xl p-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
              <Shield size={24} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Cookie Policy Updates</h2>
          </div>
          <p className="text-gray-600 mb-6">
            We may update this Cookies Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page with an updated revision date. We encourage you to periodically review this page to stay informed about our use of cookies.
          </p>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-600 mb-2 font-medium">If you have any questions about our Cookies Policy, please contact us at:</p>
            <ul className="space-y-2 text-gray-600">
              <li>Email: contact@wealthhorizon.ai</li>
              <li>Address: 8 The Green STE B, Dover, DE 19901, United States</li>
              <li>Last Updated: April 1, 2025</li>
            </ul>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default CookiesPolicy;
