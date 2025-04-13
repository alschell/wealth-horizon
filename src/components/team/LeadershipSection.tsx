
import React from "react";
import { LinkedIn, Twitter } from "lucide-react";
import { useImageErrorHandler } from "@/hooks/useImageErrorHandler";
import { TeamMember } from "./teamData";

interface LeadershipSectionProps {
  teamMembers: TeamMember[];
}

const LeadershipSection: React.FC<LeadershipSectionProps> = ({ teamMembers }) => {
  const handleImageError = useImageErrorHandler({
    fallbackImage: '/assets/team/profile-placeholder.jpg'
  });

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Leadership Team</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex flex-col md:flex-row bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
              <div className="h-48 w-48 mx-auto md:mx-0 rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="h-full w-full object-cover"
                  onError={handleImageError} 
                />
              </div>
              
              <div className="flex justify-center md:justify-start space-x-2 mt-3">
                {member.linkedin && (
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-indigo-600"
                  >
                    <LinkedIn size={18} />
                    <span className="sr-only">LinkedIn profile</span>
                  </a>
                )}
                
                {member.twitter && (
                  <a 
                    href={member.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-400"
                  >
                    <Twitter size={18} />
                    <span className="sr-only">Twitter profile</span>
                  </a>
                )}
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-indigo-600 mb-3">{member.title}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeadershipSection;
