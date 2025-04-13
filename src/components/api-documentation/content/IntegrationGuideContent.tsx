
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export const IntegrationGuideContent: React.FC = () => {
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
