
import React from "react";
import { useImageErrorHandler } from "@/hooks/useImageErrorHandler";
import { awards } from "./mockData";

interface Award {
  year: string;
  award: string;
  organization: string;
  logo: string;
}

const AwardsSection: React.FC = () => {
  const handleImageError = useImageErrorHandler();

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Awards & Recognition</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {awards.map((item, index) => (
          <div key={index} className="bg-indigo-50 rounded-lg p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 overflow-hidden">
              <img 
                src={item.logo} 
                alt={item.organization}
                className="w-12 h-12 object-contain"
                onError={handleImageError}
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.award}</h3>
            <p className="text-gray-600 mb-2">{item.organization}</p>
            <span className="text-sm text-indigo-600">{item.year}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AwardsSection;
