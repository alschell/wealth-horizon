
import React from "react";
import { Mail, Phone, MapPin, HelpCircle, BriefcaseIcon, NewspaperIcon, UsersIcon, HandshakeIcon } from "lucide-react";
import TranslatedText from "@/components/ui/translated-text";

const ContactInformation: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-8 h-full shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        <TranslatedText>Contact Information</TranslatedText>
      </h3>
      
      <div className="space-y-8">
        {/* Client Support Section - Changed icon from HeadphonesIcon to HelpCircle */}
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 text-[#4E46DC]">
              <HelpCircle size={20} />
            </div>
            <div>
              <h4 className="text-gray-900 font-medium mb-1">
                <TranslatedText>Client Support</TranslatedText>
              </h4>
              <p className="text-gray-600 text-sm">
                <a href="mailto:support@wealthhorizon.ai" className="text-indigo-600 hover:text-indigo-800">
                  support@wealthhorizon.ai
                </a>
              </p>
            </div>
          </div>
        </div>
        
        {/* Sales Section */}
        <div className="flex items-start">
          <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 text-[#4E46DC]">
            <BriefcaseIcon size={20} />
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-1">
              <TranslatedText>Sales</TranslatedText>
            </h4>
            <p className="text-gray-600 text-sm">
              <a href="mailto:sales@wealthhorizon.ai" className="text-indigo-600 hover:text-indigo-800">
                sales@wealthhorizon.ai
              </a>
            </p>
          </div>
        </div>
        
        {/* Press Inquiries */}
        <div className="flex items-start">
          <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 text-[#4E46DC]">
            <NewspaperIcon size={20} />
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-1">
              <TranslatedText>Press Inquiries</TranslatedText>
            </h4>
            <p className="text-gray-600 text-sm">
              <a href="mailto:media@wealthhorizon.ai" className="text-indigo-600 hover:text-indigo-800">
                media@wealthhorizon.ai
              </a>
            </p>
          </div>
        </div>
        
        {/* Marketing Inquiries */}
        <div className="flex items-start">
          <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 text-[#4E46DC]">
            <UsersIcon size={20} />
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-1">
              <TranslatedText>Marketing Inquiries</TranslatedText>
            </h4>
            <p className="text-gray-600 text-sm">
              <a href="mailto:marketing@wealthhorizon.ai" className="text-indigo-600 hover:text-indigo-800">
                marketing@wealthhorizon.ai
              </a>
            </p>
          </div>
        </div>
        
        {/* Partnership Section - After Marketing per request */}
        <div className="flex items-start">
          <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 text-[#4E46DC]">
            <HandshakeIcon size={20} />
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-1">
              <TranslatedText>Partnerships</TranslatedText>
            </h4>
            <p className="text-gray-600 text-sm">
              <a href="mailto:partnerships@wealthhorizon.ai" className="text-indigo-600 hover:text-indigo-800">
                partnerships@wealthhorizon.ai
              </a>
            </p>
          </div>
        </div>
        
        {/* Phone - Updated with clickable tel: link */}
        <div className="flex items-start">
          <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 text-[#4E46DC]">
            <Phone size={20} />
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-1">
              <TranslatedText>Phone</TranslatedText>
            </h4>
            <p className="text-gray-600 text-sm">
              <a href="tel:+18312731336" className="text-indigo-600 hover:text-indigo-800">
                +1 (831) 273-1336
              </a>
            </p>
            <p className="text-gray-600 text-sm">
              <TranslatedText>Monday-Friday, 9am-6pm EST</TranslatedText>
            </p>
          </div>
        </div>
        
        {/* Address */}
        <div className="flex items-start">
          <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 text-[#4E46DC]">
            <MapPin size={20} />
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-1">
              <TranslatedText>Office</TranslatedText>
            </h4>
            <p className="text-gray-600 text-sm">
              8 The Green STE B<br />
              Dover, DE 19901<br />
              <TranslatedText>United States</TranslatedText>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
