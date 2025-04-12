
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactInformation: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-8 h-full shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600">
            <Mail size={20} />
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-1">Email</h4>
            <p className="text-gray-600 text-sm">sales@wealthhorizon.ai</p>
            <p className="text-gray-600 text-sm">support@wealthhorizon.ai</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600">
            <Phone size={20} />
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-1">Phone</h4>
            <p className="text-gray-600 text-sm">+1 (831) 273-1336</p>
            <p className="text-gray-600 text-sm">Monday-Friday, 9am-6pm EST</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600">
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
