
import React, { useCallback, memo } from "react";
import { TeamMember } from "./teamData";
import TeamMemberImage from "./TeamMemberImage";
import SocialLinks from "./SocialLinks";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TeamLoadingSkeleton from "./TeamLoadingSkeleton";

interface LeadershipSectionProps {
  teamMembers: TeamMember[];
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  isLoading?: boolean;
}

/**
 * Displays the leadership team section with member profiles
 * Features animations, accessibility improvements, and performance optimizations
 */
const LeadershipSection: React.FC<LeadershipSectionProps> = ({ 
  teamMembers, 
  searchQuery = "", 
  onSearchChange,
  isLoading = false
}) => {
  // Memoized search handler
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  }, [onSearchChange]);
  
  if (isLoading) {
    return (
      <section aria-busy="true" aria-label="Loading leadership team">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Leadership Team</h2>
        <TeamLoadingSkeleton count={4} isLeadership={true} />
      </section>
    );
  }
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };
  
  return (
    <section aria-labelledby="leadership-team-heading">
      <h2 
        id="leadership-team-heading" 
        className="text-2xl font-semibold text-gray-800 mb-6"
      >
        Leadership Team
      </h2>
      
      {onSearchChange && (
        <div className="relative mb-6">
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
            aria-hidden="true"
          />
          <Input
            className="pl-9"
            placeholder="Search leadership team..."
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search leadership team"
            role="searchbox"
          />
        </div>
      )}
      
      {teamMembers.length === 0 && (
        <div 
          className="py-8 text-center" 
          aria-live="polite"
          role="status"
        >
          <p className="text-gray-500">No team members found matching your search criteria.</p>
        </div>
      )}
      
      <AnimatePresence mode="wait">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          role="list"
          aria-label="Leadership team members"
        >
          {teamMembers.map((member) => (
            <motion.div 
              key={member.id} 
              className="flex flex-col md:flex-row bg-white p-6 rounded-lg border border-gray-100 shadow-sm"
              variants={itemVariants}
              role="listitem"
              aria-label={`${member.name}, ${member.title}`}
            >
              <div className="md:w-1/3 mb-4 md:mb-0 md:mr-6">
                <div className="h-48 w-48 mx-auto md:mx-0 rounded-lg overflow-hidden bg-gray-100">
                  <TeamMemberImage 
                    image={member.image} 
                    name={member.name}
                    fallbackIconSize={60}
                  />
                </div>
                
                <div className="flex justify-center md:justify-start mt-3">
                  <SocialLinks 
                    links={{
                      linkedin: member.linkedin,
                      twitter: member.twitter,
                      github: member.github
                    }}
                    aria-label={`${member.name}'s social profiles`}
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
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

/**
 * Memoized version of LeadershipSection to prevent unnecessary re-renders
 */
export default memo(LeadershipSection);
