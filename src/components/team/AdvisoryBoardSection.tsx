
import React from "react";
import { Advisor } from "./teamData";
import TeamMemberImage from "./TeamMemberImage";
import SocialLinks from "./SocialLinks";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface AdvisoryBoardSectionProps {
  advisors: Advisor[];
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

/**
 * Displays the advisory board section with advisor profiles
 */
const AdvisoryBoardSection: React.FC<AdvisoryBoardSectionProps> = ({ 
  advisors,
  searchQuery = "",
  onSearchChange
}) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Advisory Board</h2>
      
      {onSearchChange && (
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-9"
            placeholder="Search advisory board..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {advisors.map((advisor) => (
          <div key={advisor.id} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm h-full">
            <div className="flex flex-col items-center mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-3">
                <TeamMemberImage 
                  image={advisor.image} 
                  name={advisor.name} 
                />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 text-center">{advisor.name}</h3>
              <p className="text-gray-600 text-center">{advisor.title}, {advisor.company}</p>
              
              <div className="mt-2">
                <SocialLinks 
                  links={{
                    linkedin: advisor.linkedin,
                    twitter: advisor.twitter,
                    github: advisor.github
                  }}
                />
              </div>
            </div>
            
            <p className="text-gray-600 text-sm">{advisor.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdvisoryBoardSection;
