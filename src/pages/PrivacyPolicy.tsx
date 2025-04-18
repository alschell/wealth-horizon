import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { Lock, Eye, UserCheck, Globe, Shield, Calendar, Cookie } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PrivacyPolicy = () => {
  return (
    <PageTemplate
      title="Privacy Policy"
      description="Information about how we collect, use, and protect your personal data."
      icon={Lock}
    >
      <div className="space-y-10">
        <section>
          <div className="flex items-center text-gray-500 mb-4">
            <Calendar size={18} className="mr-2" />
            <span>Last updated: April 1, 2025</span>
          </div>
          <p className="text-gray-600">
            At WealthHorizon, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our wealth management platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
          </p>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Information We Collect</h2>
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                  <UserCheck size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
              </div>
              <p className="text-gray-600 mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Register for an account</li>
                <li>Express interest in obtaining information about our services</li>
                <li>Participate in activities on the platform</li>
                <li>Contact customer support</li>
              </ul>
              <p className="text-gray-600 mt-4">
                This information may include your name, email address, phone number, job title, company name, and other details necessary to provide our services.
              </p>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                  <Globe size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Automatically Collected Information</h3>
              </div>
              <p className="text-gray-600 mb-4">
                When you access our platform, we may automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Device information (browser type, operating system, IP address)</li>
                <li>Usage data (pages visited, time spent on platform)</li>
                <li>Performance data and error logs</li>
                <li>Location information</li>
              </ul>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                  <Cookie size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Cookies and Similar Technologies</h3>
              </div>
              <p className="text-gray-600 mb-4">
                We use cookies and similar tracking technologies to collect and track information about your interactions with our platform.
              </p>
              <div className="bg-gray-50 p-3 rounded-md mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Types of Cookies We Use:</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li><span className="font-medium">Essential Cookies:</span> Necessary for the platform to function properly and cannot be switched off in our systems.</li>
                  <li><span className="font-medium">Analytical Cookies:</span> Help us count visits and traffic sources so we can measure and improve platform performance.</li>
                  <li><span className="font-medium">Functional Cookies:</span> Enable enhanced functionality and personalization features.</li>
                </ul>
              </div>
              <p className="text-gray-600">
                You can control cookies through your browser settings. However, restricting cookies may impact the functionality of our platform. For more details on how we use cookies, please see our Cookies section below.
              </p>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                  <Eye size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Financial Information</h3>
              </div>
              <p className="text-gray-600">
                As a wealth management platform, we collect and process financial information necessary to provide our services. This may include investment data, portfolio information, transaction details, and financial account information. We handle this information with the highest level of security and confidentiality.
              </p>
            </div>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">How We Use Your Information</h2>
          <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
            <p className="text-gray-600 mb-6">
              We use the information we collect for various purposes, including:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Business Operations</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Providing and maintaining our services</li>
                  <li>Processing transactions and managing accounts</li>
                  <li>Responding to inquiries and customer service requests</li>
                  <li>Fulfilling our contractual obligations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Improvement & Analytics</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Improving and personalizing user experience</li>
                  <li>Developing new products and features</li>
                  <li>Analyzing usage patterns and trends</li>
                  <li>Measuring the effectiveness of our services</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Communication</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Sending administrative information</li>
                  <li>Providing updates about our services</li>
                  <li>Sending marketing communications (with consent)</li>
                  <li>Responding to your comments and questions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Security & Compliance</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Protecting against unauthorized access</li>
                  <li>Preventing fraudulent activity</li>
                  <li>Complying with legal obligations</li>
                  <li>Enforcing our terms and policies</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Cookies Policy</h2>
          <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What Are Cookies?</h3>
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
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Types of Cookies We Use</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-700 mb-2">Essential Cookies</h4>
                  <p className="text-gray-600">
                    These cookies are necessary for the platform to function properly and cannot be switched off in our systems. They are usually set in response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms.
                  </p>
                  <p className="text-gray-600 mt-2">
                    Examples: Authentication cookies, security cookies, session management
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-700 mb-2">Analytical Cookies</h4>
                  <p className="text-gray-600">
                    These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our platform. They help us know which pages are the most and least popular and see how visitors navigate around the site.
                  </p>
                  <p className="text-gray-600 mt-2">
                    Examples: Google Analytics cookies, performance monitoring, usage statistics
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-700 mb-2">Functional Cookies</h4>
                  <p className="text-gray-600">
                    These cookies enable enhanced functionality and personalization features. They may be set by us or by third-party providers whose services we have added to our pages.
                  </p>
                  <p className="text-gray-600 mt-2">
                    Examples: Remembering user preferences, language settings, interface customization
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Control Cookies</h3>
              <p className="text-gray-600 mb-4">
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
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Third-Party Cookies</h3>
              <p className="text-gray-600 mb-4">
                Our platform may use third-party services that set their own cookies. These third parties may collect your information for their own purposes. We recommend reviewing the privacy policies of these third parties to understand how they use your information.
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium text-gray-700 mb-2">Third-Party Services We Use:</h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Analytics services (e.g., Google Analytics)</li>
                  <li>Functionality and content providers</li>
                  <li>Authentication services</li>
                  <li>Customer support tools</li>
                </ul>
              </div>
              <p className="text-gray-600 mt-4">
                We have no control over these third-party cookies. You can disable them by changing your browser settings or using opt-out options provided by these services.
              </p>
            </div>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="bg-white border border-gray-100 rounded-lg shadow-sm">
            <AccordionItem value="item-1" className="border-b px-6">
              <AccordionTrigger className="py-4 text-gray-800">How long do you retain my data?</AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b px-6">
              <AccordionTrigger className="py-4 text-gray-800">Do you share my information with third parties?</AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                We may share your information with service providers who help us operate our platform, business partners with whom we jointly offer products or services, and legal authorities when required by law. We do not sell your personal information to third parties.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b px-6">
              <AccordionTrigger className="py-4 text-gray-800">What rights do I have regarding my data?</AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                Depending on your location, you may have the right to access, correct, update, or request deletion of your personal information. You may also have the right to object to processing, ask us to restrict processing, or request portability of your information. To exercise these rights, please contact our privacy team.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-b px-6">
              <AccordionTrigger className="py-4 text-gray-800">How do you protect my financial information?</AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                We implement robust security measures to protect your financial information, including encryption, access controls, secure infrastructure, and regular security assessments. We comply with industry standards and regulations governing financial data protection.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="px-6">
              <AccordionTrigger className="py-4 text-gray-800">How will I be notified of privacy policy changes?</AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                We may update this privacy policy from time to time. When we make material changes, we will notify you by updating the "Last Updated" date at the top of this policy, sending you an email, or displaying a notice within our platform.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
        
        <section className="bg-indigo-50 rounded-xl p-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
              <Shield size={24} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Contact Our Privacy Team</h2>
          </div>
          <p className="text-gray-600 mb-6">
            If you have questions or concerns about this privacy policy or our privacy practices, please contact our privacy team at:
          </p>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <ul className="space-y-2 text-gray-600">
              <li>Email: <a href="mailto:contact@wealthhorizon.ai" className="text-indigo-600 hover:text-indigo-800">contact@wealthhorizon.ai</a></li>
              <li>Address: 8 The Green STE B, Dover, DE 19901, United States</li>
              <li>Phone: <a href="tel:+18312731336" className="text-indigo-600 hover:text-indigo-800">+1 (831) 273 1336</a></li>
            </ul>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default PrivacyPolicy;
