
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { FileText, AlertTriangle, Shield, Scale, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const TermsOfService = () => {
  return (
    <PageTemplate
      title="Terms of Service"
      description="The terms and conditions governing your use of the WealthHorizon platform."
      icon={FileText}
    >
      <div className="space-y-10">
        <section>
          <div className="flex items-center text-gray-500 mb-4">
            <Clock size={18} className="mr-2" />
            <span>Last updated: April 1, 2025</span>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <AlertTriangle size={24} className="text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Important Notice</h3>
                <p className="text-gray-600">
                  By accessing or using the WealthHorizon platform, you agree to be bound by these Terms of Service. Please read these terms carefully before using our services. If you do not agree to all the terms and conditions, you may not access or use our platform.
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray-600">
            These Terms of Service ("Terms") govern your access to and use of the WealthHorizon platform, including any associated mobile applications, websites, software, and services (collectively, the "Platform") provided by WealthHorizon ("we", "us", or "our").
          </p>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6" id="services">1. Services</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>1.1 Description of Services.</strong> WealthHorizon provides a comprehensive wealth management platform designed for family offices and financial institutions. Our Platform includes portfolio management, reporting, analytics, and other financial services tools.
            </p>
            <p>
              <strong>1.2 Service Access.</strong> Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to access and use the Platform for your internal business purposes.
            </p>
            <p>
              <strong>1.3 Service Modifications.</strong> We reserve the right to modify, suspend, or discontinue any part of the Platform at any time, with or without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation of the Platform.
            </p>
            <p>
              <strong>1.4 Service Level Agreement.</strong> If you have subscribed to a paid service tier, the availability and performance of the Platform may be subject to a separate Service Level Agreement.
            </p>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6" id="account">2. Account Registration and Security</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>2.1 Account Creation.</strong> To access certain features of the Platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            <p>
              <strong>2.2 Account Security.</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access to or use of your account.
            </p>
            <p>
              <strong>2.3 Authorized Users.</strong> If you register an account on behalf of a company or other entity, you represent and warrant that you have the authority to bind that entity to these Terms. You also agree to provide access only to authorized users within your organization and to manage user permissions appropriately.
            </p>
            <p>
              <strong>2.4 Authentication.</strong> We may implement multi-factor authentication and other security measures to protect your account. You agree to comply with all security procedures and requirements we establish.
            </p>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6" id="data">3. Your Data</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>3.1 Ownership of Your Data.</strong> You retain all rights, title, and interest in and to the data and content you upload, submit, or otherwise make available through the Platform ("Your Data"). You grant us a limited license to use, host, and process Your Data solely for the purpose of providing and improving the Platform.
            </p>
            <p>
              <strong>3.2 Data Security.</strong> We implement reasonable security measures to protect Your Data. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security. Our Privacy Policy describes how we collect, use, and protect your information.
            </p>
            <p>
              <strong>3.3 Data Integration.</strong> Our Platform may allow you to integrate data from third-party sources. You are responsible for ensuring that you have the necessary rights and permissions to use and share such data. We are not responsible for the accuracy or quality of data from third-party sources.
            </p>
            <p>
              <strong>3.4 Data Retention.</strong> We will retain Your Data as long as your account is active or as needed to provide services. Upon termination of your account, we will retain Your Data for a reasonable period as required by law or for legitimate business purposes.
            </p>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6" id="restrictions">4. Restrictions and Acceptable Use</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>4.1 Prohibited Uses.</strong> You agree not to use the Platform:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>In any way that violates any applicable law or regulation</li>
              <li>To transmit any material that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable</li>
              <li>To impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity</li>
              <li>To interfere with or disrupt the Platform or servers or networks connected to the Platform</li>
              <li>To attempt to gain unauthorized access to any portion of the Platform or any other accounts, computer systems, or networks connected to the Platform</li>
              <li>To reverse engineer, decompile, or disassemble any portion of the Platform</li>
            </ul>
            <p>
              <strong>4.2 Usage Limitations.</strong> We may impose usage limitations, such as the number of users, data storage limits, or API call volumes, depending on your subscription plan. You agree not to exceed these limits without upgrading your subscription.
            </p>
            <p>
              <strong>4.3 Compliance.</strong> You agree to use the Platform in compliance with all applicable laws, regulations, and industry standards, including financial regulations and data protection laws.
            </p>
          </div>
        </section>
        
        <section className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6" id="payment">5. Payment Terms</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>5.1 Subscription Fees.</strong> Access to certain features of the Platform requires a paid subscription. Subscription fees are based on the plan selected and the number of users with access to the Platform.
            </p>
            <p>
              <strong>5.2 Billing.</strong> We will bill you in accordance with the billing terms specified in your subscription plan. Fees are non-refundable except as required by law or as explicitly stated in these Terms.
            </p>
            <p>
              <strong>5.3 Taxes.</strong> All fees are exclusive of taxes, which we will charge as applicable. You are responsible for paying all taxes associated with your use of the Platform.
            </p>
            <p>
              <strong>5.4 Payment Methods.</strong> You agree to provide accurate and complete billing information, including legal name, address, telephone number, and payment method information. You authorize us to charge your payment method for all fees incurred.
            </p>
            <p>
              <strong>5.5 Price Changes.</strong> We may change our fees upon reasonable notice. Your continued use of the Platform after a fee change constitutes your agreement to pay the modified fees.
            </p>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6" id="termination">6. Term and Termination</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>6.1 Term.</strong> These Terms will remain in effect until terminated by either you or us as described below.
            </p>
            <p>
              <strong>6.2 Termination by You.</strong> You may terminate these Terms at any time by canceling your account and discontinuing use of the Platform. You are responsible for any fees incurred before the effective date of termination.
            </p>
            <p>
              <strong>6.3 Termination by Us.</strong> We may terminate these Terms and your access to the Platform, with or without cause, at any time and without notice. If we terminate for cause, we may do so immediately.
            </p>
            <p>
              <strong>6.4 Effect of Termination.</strong> Upon termination:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your right to access and use the Platform will immediately cease</li>
              <li>We may delete or archive Your Data in accordance with our data retention policies</li>
              <li>Any fees owed to us will become immediately due and payable</li>
              <li>Provisions of these Terms that by their nature should survive termination will survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability</li>
            </ul>
            <p>
              <strong>6.5 Data Export.</strong> Before termination, you may export Your Data using the Platform's export features. After termination, we may provide a reasonable opportunity for you to export Your Data, subject to payment of any applicable fees.
            </p>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6" id="intellectual-property">7. Intellectual Property</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>7.1 Our Intellectual Property.</strong> The Platform, including all software, algorithms, designs, graphics, interfaces, logos, and documentation, is protected by intellectual property laws. We (or our licensors) own all right, title, and interest in and to the Platform and all related intellectual property rights.
            </p>
            <p>
              <strong>7.2 Feedback.</strong> If you provide us with any feedback, suggestions, or ideas regarding the Platform, you grant us a perpetual, worldwide, royalty-free, irrevocable license to use, reproduce, modify, create derivative works from, distribute, and display such feedback for any purpose without compensation to you.
            </p>
            <p>
              <strong>7.3 Trademarks.</strong> "WealthHorizon" and our logos, product names, and service names are our trademarks. You may not use these trademarks without our prior written consent.
            </p>
          </div>
        </section>
        
        <section className="bg-indigo-50 rounded-xl p-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
              <Scale size={24} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Legal Notices</h2>
          </div>
          <div className="space-y-6 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Disclaimer of Warranties</h3>
              <p className="bg-white rounded-lg p-4 border border-gray-200">
                THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE PLATFORM IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Limitation of Liability</h3>
              <p className="bg-white rounded-lg p-4 border border-gray-200">
                IN NO EVENT WILL WE BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE PLATFORM.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Indemnification</h3>
              <p className="bg-white rounded-lg p-4 border border-gray-200">
                You agree to indemnify, defend, and hold harmless WealthHorizon and its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) that arise from or relate to your use of the Platform, violation of these Terms, or infringement of any intellectual property or other rights of any person or entity.
              </p>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6" id="miscellaneous">10. Miscellaneous</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>10.1 Governing Law.</strong> These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.
            </p>
            <p>
              <strong>10.2 Dispute Resolution.</strong> Any dispute arising from or relating to the subject matter of these Terms shall be finally settled by arbitration in Dover, Delaware, using the English language in accordance with the Arbitration Rules and Procedures of the Judicial Arbitration and Mediation Services, Inc. (JAMS).
            </p>
            <p>
              <strong>10.3 Severability.</strong> If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
            </p>
            <p>
              <strong>10.4 Entire Agreement.</strong> These Terms constitute the entire agreement between you and us regarding the Platform and supersede all prior and contemporaneous agreements, proposals, or representations, written or oral, concerning its subject matter.
            </p>
            <p>
              <strong>10.5 Waiver.</strong> No waiver of any provision of these Terms shall be deemed a further or continuing waiver of such provision or any other provision, and our failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
            </p>
            <p>
              <strong>10.6 Assignment.</strong> You may not assign any of your rights or obligations under these Terms without our prior written consent. We may assign our rights and obligations under these Terms without your consent.
            </p>
            <p>
              <strong>10.7 Force Majeure.</strong> We will not be liable for any delay or failure to perform resulting from causes outside our reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, or shortages of transportation facilities, fuel, energy, labor, or materials.
            </p>
          </div>
        </section>
        
        <section className="bg-white border border-gray-100 rounded-lg p-8 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
              <Shield size={24} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Contact Information</h2>
          </div>
          <p className="text-gray-600 mb-4">
            If you have any questions about these Terms, please contact us at:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>Email: legal@wealthhorizon.ai</li>
            <li>Address: 8 The Green STE B, Dover, DE 19901, United States</li>
            <li>Phone: +1 (831) 273 1336</li>
          </ul>
        </section>
      </div>
    </PageTemplate>
  );
};

export default TermsOfService;
