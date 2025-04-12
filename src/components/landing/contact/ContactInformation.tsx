
import React from "react";
import { Mail, Phone, MapPin, HelpCircle, Briefcase, FileText, Users, Handshake } from "lucide-react";
import { Link } from "react-router-dom";

const ContactInformation: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-8 h-full shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
      
      <div className="space-y-8">
        {/* Client Support Section */}
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-[#4E46DC]">
              <HelpCircle size={20} />
            </div>
            <div>
              <h4 className="text-gray-900 font-medium mb-1">Client Support</h4>
              <p className="text-gray-600 text-sm">
                <a href="mailto:support@wealthhorizon.ai" className="text-indigo-600 hover:text-indigo-800">
                  support@wealthhorizon.ai
                </a>
              </p>
              <p className="text-gray-600 text-sm">
                <Link to="/help-center" className="text-indigo-600 hover:text-indigo-800">
                  Log in to the Help Center
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        {/* Sales Section */}
        <div className="flex items-start">
          <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-[#4E46DC]">
            <Briefcase size={20} />
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-1">Sales</h4>
            <p className="text-gray-600 text-sm">
              <a href="mailto:sales@wealthhorizon.ai" className="text-indigo-600 hover:text-indigo-800">
                sales@wealthhorizon.ai
              </a>
            </p>
          </div>
        </div>
        
        {/* Press Inquiries */}
        <div className="flex items-start">
          <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-[#4E46DC]">
            <FileText size={20} />
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-1">Press Inquiries</h4>
            <p className="text-gray-600 text-sm">
              <a href="mailto:media@wealthhorizon.ai" className="text-indigo-600 hover:text-indigo-800">
                media@wealthhorizon.ai
              </a>
            </p>
          </div>
        </div>
        
        {/* Marketing Inquiries */}
        <div className="flex items-start">
          <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-[#4E46DC]">
            <Users size={20} />
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-1">Marketing Inquiries</h4>
            <p className="text-gray-600 text-sm">
              <a href="mailto:marketing@wealthhorizon.ai" className="text-indigo-600 hover:text-indigo-800">
                marketing@wealthhorizon.ai
              </a>
            </p>
          </div>
        </div>
        
        {/* Partnership Section - Moved after Marketing */}
        <div className="flex items-start">
          <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-[#4E46DC]">
            <Handshake size={20} />
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-1">Partnerships</h4>
            <p className="text-gray-600 text-sm">
              <a href="mailto:partnerships@wealthhorizon.ai" className="text-indigo-600 hover:text-indigo-800">
                partnerships@wealthhorizon.ai
              </a>
            </p>
          </div>
        </div>
        
        {/* Phone */}
        <div className="flex items-start">
          <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-[#4E46DC]">
            <Phone size={20} />
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-1">Phone</h4>
            <p className="text-gray-600 text-sm">+1 (831) 273-1336</p>
            <p className="text-gray-600 text-sm">Monday-Friday, 9am-6pm EST</p>
          </div>
        </div>
        
        {/* Address */}
        <div className="flex items-start">
          <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-[#4E46DC]">
            <MapPin size={20} />
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-1">Office</h4>
            <p className="text-gray-600 text-sm">
              8 The Green STE B<br />
              Dover, DE 19901<br />
              United States
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
