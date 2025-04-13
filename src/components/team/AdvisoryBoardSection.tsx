
import React from "react";
import { LinkedIn } from "lucide-react";
import { useImageErrorHandler } from "@/hooks/useImageErrorHandler";
import { Advisor } from "./teamData";

interface AdvisoryBoardSectionProps {
  advisors: Advisor[];
}

const AdvisoryBoardSection: React.FC<AdvisoryBoardSectionProps> = ({ advisors }) => {
  const handleImageError = useImageErrorHandler({
    fallbackImage: '/assets/team/profile-placeholder.jpg'
  });

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Advisory Board</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {advisors.map((advisor) => (
          <div key={advisor.id} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm h-full">
            <div className="flex flex-col items-center mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-3">
                <img 
                  src={advisor.image} 
                  alt={advisor.name} 
                  className="h-full w-full object-cover"
                  onError={handleImageError}
                />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 text-center">{advisor.name}</h3>
              <p className="text-gray-600 text-center">{advisor.title}, {advisor.company}</p>
              
              {advisor.linkedin && (
                <a 
                  href={advisor.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-2 text-gray-600 hover:text-indigo-600"
                >
                  <LinkedIn size={18} />
                  <span className="sr-only">LinkedIn profile</span>
                </a>
              )}
            </div>
            
            <p className="text-gray-600 text-sm">{advisor.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdvisoryBoardSection;
