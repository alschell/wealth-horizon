
import React, { memo, useEffect } from "react";
import { Advisor } from "./teamData";
import TeamMemberImage from "./TeamMemberImage";
import SocialLinks from "./SocialLinks";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface AdvisoryBoardSectionProps {
  /** Array of advisor data objects */
  advisors: Advisor[];
  /** Optional search query string */
  searchQuery?: string;
  /** Optional handler function for search query changes */
  onSearchChange?: (value: string) => void;
}

/**
 * Displays the advisory board section with advisor profiles
 * Includes search filtering and animated card-based layout
 * Features error handling and accessibility improvements
 */
const AdvisoryBoardSection: React.FC<AdvisoryBoardSectionProps> = ({ 
  advisors,
  searchQuery: externalSearchQuery,
  onSearchChange: externalOnSearchChange
}) => {
  const { toast } = useToast();
  
  // Use the team filters hook for search and sorting functionality
  const {
    searchQuery: internalSearchQuery,
    setSearchQuery: internalSetSearchQuery,
    sortBy,
    setSortBy,
    filteredItems
  } = useTeamFilters<Advisor>(advisors);
  
  // Determine whether to use external or internal state
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const setSearchQuery = externalOnSearchChange || internalSetSearchQuery;
  
  // Error handling and monitoring for data issues
  useEffect(() => {
    // Check if any advisors are missing required data
    const invalidAdvisors = advisors.filter(
      advisor => !advisor.name || !advisor.title || !advisor.company
    );
    
    if (invalidAdvisors.length > 0) {
      console.error("Advisory board data contains invalid entries:", invalidAdvisors);
      toast({
        title: "Data Warning",
        description: "Some advisory board members have incomplete information.",
        variant: "destructive",
      });
    }
  }, [advisors, toast]);
  
  // Animation variants for staggered card appearance
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
    <section aria-labelledby="advisory-board-heading">
      <h2 id="advisory-board-heading" className="text-2xl font-semibold text-gray-800 mb-6">Advisory Board</h2>
      
      {/* No results message when filter returns empty array */}
      {filteredItems.length === 0 && (
        <div className="py-8 text-center" aria-live="polite">
          <p className="text-gray-500">No advisors found matching your search criteria.</p>
        </div>
      )}
      
      {/* Advisors grid with animation */}
      <AnimatePresence>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key="advisors-grid"
          role="list"
          aria-label="Advisory board members"
        >
          {filteredItems.map((advisor) => (
            <motion.div 
              key={advisor.id} 
              className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm h-full flex flex-col"
              variants={itemVariants}
              role="listitem"
              aria-label={`${advisor.name}, ${advisor.title}`}
            >
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
              
              <p className="text-gray-600 text-sm mt-auto">{advisor.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default memo(AdvisoryBoardSection);
