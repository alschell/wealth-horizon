
import React from "react";
import { ExternalLink } from "lucide-react";
import { useImageErrorHandler } from "@/hooks/useImageErrorHandler";
import { mediaFeatures } from "./mockData";

const MediaCoverageSection: React.FC = () => {
  const handleImageError = useImageErrorHandler();

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Media Coverage</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mediaFeatures.map((feature) => (
          <div key={feature.id} className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-40 bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
              <img 
                src={feature.image} 
                alt={`${feature.publication} article`} 
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-indigo-600 font-medium">{feature.publication}</span>
                <span className="text-sm text-gray-500">{feature.date}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{feature.title}</h3>
              <a href={feature.link} className="text-indigo-600 hover:text-indigo-800 flex items-center">
                Read Article <ExternalLink size={14} className="ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MediaCoverageSection;
