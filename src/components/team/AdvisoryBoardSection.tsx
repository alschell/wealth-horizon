
import React from "react";
import { useImageErrorHandler } from "@/hooks/useImageErrorHandler";
import { advisoryBoard } from "./mockData";

const AdvisoryBoardSection: React.FC = () => {
  const handleImageError = useImageErrorHandler();

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Advisory Board</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {advisoryBoard.map((advisor) => (
          <div key={advisor.id} className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
              <img 
                src={advisor.image} 
                alt={advisor.name}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800">{advisor.name}</h3>
              <p className="text-indigo-600 font-medium mb-3">{advisor.title}</p>
              <p className="text-gray-600">{advisor.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdvisoryBoardSection;
