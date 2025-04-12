
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { FileText, Calendar, CheckCircle, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const TermsOfService = () => {
  return (
    <PageTemplate
      title="Terms of Service"
      description="The legal agreement between you and WealthHorizon governing your use of our platform."
      icon={FileText}
    >
      <div className="space-y-10">
        <section>
          <div className="flex items-center text-gray-500 mb-4">
            <Calendar size={18} className="mr-2" />
            <span>Last updated: April 1, 2025</span>
          </div>
          <p className="text-gray-600">
            Welcome to WealthHorizon. These Terms of Service ("Terms") govern your access to and use of the WealthHorizon platform, including any websites, mobile applications, and other services provided by WealthHorizon ("Services"). Please read these Terms carefully before using our Services.
          </p>
          <p className="text-gray-600 mt-4">
            By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Services.
          </p>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">1. Using WealthHorizon</h2>
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">1.1 Account Registration</h3>
              <p className="text-gray-600">
                To use certain features of the Services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p className="text-gray-600 mt-3">
                You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify WealthHorizon immediately of any unauthorized use of your account or any other breach of security.
              </p>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">1.2 Acceptable Use</h3>
              <p className="text-gray-600 mb-4">
                You agree to use the Services only for lawful purposes and in accordance with these Terms. You agree not to use the Services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," or "spam"</li>
                <li>To impersonate or attempt to impersonate WealthHorizon, a WealthHorizon employee, another user, or any other person or entity</li>
                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Services, or which may harm WealthHorizon or users of the Services</li>
                <li>To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Services, the server on which the Services are stored, or any server, computer, or database connected to the Services</li>
              </ul>
            </div>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">2. Intellectual Property Rights</h2>
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">2.1 Ownership</h3>
              <p className="text-gray-600">
                The Services and their entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by WealthHorizon, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">2.2 License to Use</h3>
              <p className="text-gray-600">
                Subject to your compliance with these Terms, WealthHorizon grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Services for your personal or internal business purposes. This license does not include any resale or commercial use of the Services or its contents; any collection and use of any product listings, descriptions, or prices; any derivative use of the Services or its contents; or any use of data mining, robots, or similar data gathering and extraction tools.
              </p>
            </div>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">3. Limitation of Liability</h2>
          <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
            <div className="flex items-start mb-4">
              <AlertTriangle size={20} className="text-amber-500 mr-3 mt-1" />
              <p className="text-gray-600">
                IN NO EVENT WILL WEALTHHORIZON, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SERVICES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
              </p>
            </div>
            <p className="text-gray-600">
              The foregoing does not affect any liability which cannot be excluded or limited under applicable law.
            </p>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">4. Changes to Terms</h2>
          <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
            <p className="text-gray-600">
              We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately when we post them, and apply to all access to and use of the Services thereafter.
            </p>
            <p className="text-gray-600 mt-3">
              Your continued use of the Services following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.
            </p>
          </div>
        </section>
        
        <section className="bg-indigo-50 rounded-xl p-8">
          <div className="flex items-center mb-4">
            <CheckCircle size={24} className="text-indigo-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
          </div>
          <p className="text-gray-600 mb-6">
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <ul className="space-y-2 text-gray-600">
              <li>Email: contact@wealthhorizon.ai</li>
              <li>Address: 8 The Green STE B, Dover, DE 19901, United States</li>
              <li>Phone: +1 (831) 273 1336</li>
            </ul>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default TermsOfService;
