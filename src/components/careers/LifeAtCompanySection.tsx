
import React from "react";

export const LifeAtCompanySection: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Life at WealthHorizon</h3>
      <div className="space-y-4">
        <p className="text-gray-600">
          At WealthHorizon, we foster a culture of innovation, collaboration, and excellence. Our team members enjoy:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-0.5">
              ✓
            </div>
            <span className="text-gray-700">Flexible work arrangements with remote options</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-0.5">
              ✓
            </div>
            <span className="text-gray-700">Continuous learning and development opportunities</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-0.5">
              ✓
            </div>
            <span className="text-gray-700">Comprehensive health and wellness benefits</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-0.5">
              ✓
            </div>
            <span className="text-gray-700">Competitive compensation and equity packages</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3 mt-0.5">
              ✓
            </div>
            <span className="text-gray-700">Regular team events and community building</span>
          </li>
        </ul>
        
        <div className="mt-6">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Team collaboration" 
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
