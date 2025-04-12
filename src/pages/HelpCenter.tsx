
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { HelpCircle, Search, FileText, MessageCircle, BookOpen, CheckCircle, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HelpCenter = () => {
  return (
    <PageTemplate
      title="Help Center"
      description="Find answers to common questions and get support using WealthHorizon."
      icon={HelpCircle}
    >
      <div className="space-y-12">
        <section className="relative">
          <div className="bg-indigo-50 rounded-xl p-8">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How can we help you today?</h2>
              <p className="text-gray-600 mb-6">
                Search our knowledge base for quick answers or browse through our help articles.
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input placeholder="Search for help articles..." className="pl-10" />
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Popular Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                  <FileText size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Getting Started</h3>
              </div>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Setting up your account</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Connecting data sources</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Configuring dashboards</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <a href="#">View Articles</a>
              </Button>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                  <BookOpen size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Platform Features</h3>
              </div>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Portfolio management tools</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Reporting capabilities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Data analytics features</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <a href="#">View Articles</a>
              </Button>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                  <MessageCircle size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Account & Billing</h3>
              </div>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Managing subscriptions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">User permissions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-600">Billing information</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <a href="#">View Articles</a>
              </Button>
            </div>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">How do I connect my financial accounts?</h3>
              <p className="text-gray-600">
                You can connect your accounts through our secure integration system. Navigate to Settings {'>'}  Integrations and select your financial institution from the list of available providers. Follow the prompts to securely connect your accounts.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Is my financial data secure?</h3>
              <p className="text-gray-600">
                Yes, security is our top priority. We use bank-level encryption to protect your data and never store login credentials. Our platform is SOC 2 Type II certified, and we regularly undergo security audits to ensure the highest standards of data protection.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">How do I create custom reports?</h3>
              <p className="text-gray-600">
                Custom reports can be created from the Reporting section. Click on "New Report," select the data points you want to include, choose visualization options, and save your report. You can also schedule automated report delivery to stakeholders.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Can I invite team members to access the platform?</h3>
              <p className="text-gray-600">
                Yes, you can invite team members through the User Management section. Set appropriate permissions for each user to control access to sensitive information. All users will receive an email invitation to set up their account.
              </p>
            </div>
          </div>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center mb-4">
              <MessageCircle size={24} className="mr-3" />
              <h2 className="text-xl font-semibold text-white">Chat with Support</h2>
            </div>
            <p className="mb-6">
              Get immediate assistance from our team of wealth management and technical experts through our chat support.
            </p>
            <Button className="bg-white text-indigo-600 hover:bg-gray-100">
              Start a Chat
            </Button>
          </div>
          
          <div className="bg-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center mb-4">
              <FileText size={24} className="mr-3" />
              <h2 className="text-xl font-semibold text-white">Contact Support</h2>
            </div>
            <p className="mb-6">
              Need additional help? Submit a support ticket and our team will get back to you as soon as possible.
            </p>
            <Button className="bg-white text-indigo-600 hover:bg-gray-100">
              Submit a Ticket
            </Button>
          </div>
        </section>
        
        <section className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Button variant="outline" className="justify-start h-auto py-4 px-5" asChild>
              <a href="/documentation" className="flex items-center">
                <BookOpen size={20} className="mr-3 text-indigo-600" />
                <span>API Documentation</span>
              </a>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-4 px-5" asChild>
              <a href="#" className="flex items-center">
                <FileText size={20} className="mr-3 text-indigo-600" />
                <span>User Guides</span>
              </a>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-4 px-5" asChild>
              <a href="#" className="flex items-center">
                <ExternalLink size={20} className="mr-3 text-indigo-600" />
                <span>Video Tutorials</span>
              </a>
            </Button>
            <Button variant="outline" className="justify-start h-auto py-4 px-5" asChild>
              <a href="#" className="flex items-center">
                <MessageCircle size={20} className="mr-3 text-indigo-600" />
                <span>Community Forum</span>
              </a>
            </Button>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default HelpCenter;
