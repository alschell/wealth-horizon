
import React from "react";

export const HiringProcessSection: React.FC = () => {
  return (
    <div className="bg-indigo-50 rounded-xl p-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Hiring Process</h3>
      <ol className="space-y-4">
        <li className="flex items-start">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3 mt-0.5">
            1
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Application Review</h4>
            <p className="text-gray-600 text-sm">Our team reviews your application and assesses your qualifications.</p>
          </div>
        </li>
        <li className="flex items-start">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3 mt-0.5">
            2
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Initial Interview</h4>
            <p className="text-gray-600 text-sm">A conversation with our recruiting team to discuss your experience and goals.</p>
          </div>
        </li>
        <li className="flex items-start">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3 mt-0.5">
            3
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Technical Assessment</h4>
            <p className="text-gray-600 text-sm">Role-specific evaluation of your skills and expertise.</p>
          </div>
        </li>
        <li className="flex items-start">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3 mt-0.5">
            4
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Team Interviews</h4>
            <p className="text-gray-600 text-sm">Meet with potential teammates and stakeholders.</p>
          </div>
        </li>
        <li className="flex items-start">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3 mt-0.5">
            5
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Offer & Onboarding</h4>
            <p className="text-gray-600 text-sm">Welcome to the WealthHorizon team!</p>
          </div>
        </li>
      </ol>
    </div>
  );
};
