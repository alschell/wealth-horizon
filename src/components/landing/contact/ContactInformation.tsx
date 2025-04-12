
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactInformation: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h3>
        <p className="text-gray-600">
          Our team is ready answer any questions you might have and to provide you personalized guidance on your <span className="text-indigo-600">Wealth</span><span>Horizon</span> journey.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200 space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Mail size={20} />
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-900">Email Us</h4>
            <p className="text-gray-600">contact@wealthhorizon.ai</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Phone size={20} />
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-900">Call Us</h4>
            <p className="text-gray-600">+1 (831) 273 1336</p>
            <p className="text-gray-600">Monday-Friday, 9am-6pm EST</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <MapPin size={20} />
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-900">Visit Us</h4>
            <p className="text-gray-600">
              Wealth Horizon LLC<br />
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
