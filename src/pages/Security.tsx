
import React from "react";
import PageTemplate from "@/components/shared/PageTemplate";
import { Shield, Lock, Database, Server, Users, Monitor, FileCheck, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Security = () => {
  return (
    <PageTemplate
      title="Security"
      description="Learn about how we safeguard your data and protect your financial information."
      icon={Shield}
    >
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Security Approach</h2>
          <p className="text-gray-600 mb-6">
            At WealthHorizon, we understand that security is paramount when it comes to managing wealth and financial information. 
            We've built our platform with a security-first mindset, implementing multiple layers of protection to safeguard your data.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                  <Lock size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Data Encryption</h3>
              </div>
              <p className="text-gray-600">
                All sensitive data is encrypted both in transit and at rest using industry-standard AES-256 encryption, ensuring your information remains secure.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                  <Database size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Secure Infrastructure</h3>
              </div>
              <p className="text-gray-600">
                Our infrastructure is hosted in SOC 2 Type II compliant data centers with physical security measures and redundant systems.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                  <Users size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Access Controls</h3>
              </div>
              <p className="text-gray-600">
                Strict access controls, role-based permissions, and multi-factor authentication ensure only authorized users can access sensitive information.
              </p>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-4">
                  <Monitor size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Continuous Monitoring</h3>
              </div>
              <p className="text-gray-600">
                Our security team continuously monitors the platform for suspicious activities and potential vulnerabilities, with 24/7 alert systems.
              </p>
            </div>
          </div>
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Compliance & Certifications</h2>
          <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-sm">
            <p className="text-gray-600 mb-8">
              WealthHorizon maintains a robust compliance program and adheres to industry-leading security standards and regulations.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { title: "SOC 2 Type II", description: "Independently audited for security, availability, and confidentiality" },
                { title: "ISO 27001", description: "Certified information security management system" },
                { title: "GDPR Compliant", description: "Full compliance with European data protection regulations" },
                { title: "CCPA Compliant", description: "Adherence to California Consumer Privacy Act requirements" },
                { title: "FINRA Guidelines", description: "Following Financial Industry Regulatory Authority guidelines" },
                { title: "PCI DSS", description: "Payment Card Industry Data Security Standard compliance" }
              ].map((cert, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle size={18} className="text-green-600" />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-800">{cert.title}</h4>
                    <p className="text-sm text-gray-600">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Security Features</h2>
          <div className="space-y-4">
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Shield size={20} className="text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Multi-Factor Authentication (MFA)</h3>
                  <p className="text-gray-600">
                    Enable MFA to add an extra layer of security to your account. We support authentication apps, SMS verification, and security keys.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Server size={20} className="text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Secure Data Backup</h3>
                  <p className="text-gray-600">
                    Automated backups are performed regularly and stored in geographically distributed, encrypted locations to ensure data resilience.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FileCheck size={20} className="text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">Security Audits & Penetration Testing</h3>
                  <p className="text-gray-600">
                    Regular third-party security audits and penetration testing help identify and address potential vulnerabilities before they can be exploited.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-indigo-50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Security Best Practices</h2>
          <p className="text-gray-600 mb-6">
            We recommend the following practices to enhance the security of your WealthHorizon account:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <ol className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                    1
                  </div>
                  <span className="text-gray-700">Enable multi-factor authentication for all users</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                    2
                  </div>
                  <span className="text-gray-700">Use strong, unique passwords for your account</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                    3
                  </div>
                  <span className="text-gray-700">Regularly review user access privileges</span>
                </li>
              </ol>
            </div>
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <ol className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                    4
                  </div>
                  <span className="text-gray-700">Monitor account activity and report suspicious behavior</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                    5
                  </div>
                  <span className="text-gray-700">Keep your devices and software updated</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                    6
                  </div>
                  <span className="text-gray-700">Be vigilant against phishing attempts</span>
                </li>
              </ol>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
};

export default Security;
