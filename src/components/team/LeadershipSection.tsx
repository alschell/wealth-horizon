
import React from "react";
import { Linkedin, Twitter, Github } from "lucide-react";
import TeamMemberImage from "./TeamMemberImage";
import { TeamMember } from "./teamData";
import SocialLinks from "./SocialLinks";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface LeadershipSectionProps {
  teamMembers: TeamMember[];
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

/**
 * Displays the leadership team section with member profiles
 */
const LeadershipSection: React.FC<LeadershipSectionProps> = ({ 
  teamMembers, 
  searchQuery = "", 
  onSearchChange 
}) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Leadership Team</h2>
      
      {onSearchChange && (
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-9"
            placeholder="Search leadership team..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex flex-col md:flex-row bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
              <div className="h-48 w-48 mx-auto md:mx-0 rounded-lg overflow-hidden bg-gray-100">
                <TeamMemberImage 
                  image={member.image} 
                  name={member.name}
                />
              </div>
              
              <div className="flex justify-center md:justify-start mt-3">
                <SocialLinks 
                  links={{
                    linkedin: member.linkedin,
                    twitter: member.twitter,
                    github: member.github
                  }}
                />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-indigo-600 mb-3">{member.title}</p>
              {member.department && (
                <p className="text-gray-500 mb-3">Department: {member.department}</p>
              )}
              <p className="text-gray-600">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LeadershipSection;
