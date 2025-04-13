
import React, { memo } from "react";
import { Advisor } from "./teamData";
import TeamMemberImage from "./TeamMemberImage";
import SocialLinks from "./SocialLinks";
import TeamFilter from "./TeamFilter";
import { useTeamFilters } from "./hooks/useTeamFilters";
import { motion } from "framer-motion";

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
 * Includes search filtering and card-based layout
 * 
 * @example
 * ```tsx
 * <AdvisoryBoardSection advisors={advisoryBoard} />
 * ```
 */
const AdvisoryBoardSection: React.FC<AdvisoryBoardSectionProps> = ({ 
  advisors,
  searchQuery: externalSearchQuery,
  onSearchChange: externalOnSearchChange
}) => {
  // Use the team filters hook for search and sorting functionality
  // Only use internal state if external controls aren't provided
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
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Advisory Board</h2>
      
      {/* Filter component for search and sort */}
      <TeamFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        placeholder="Search advisory board..."
        showDepartmentSort={false}
      />
      
      {/* No results message when filter returns empty array */}
      {filteredItems.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-gray-500">No advisors found matching your search criteria.</p>
        </div>
      )}
      
      {/* Advisors grid with animation */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredItems.map((advisor) => (
          <motion.div 
            key={advisor.id} 
            className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm h-full flex flex-col"
            variants={itemVariants}
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
    </section>
  );
};

/**
 * Memoized version of AdvisoryBoardSection component to prevent unnecessary re-renders
 * Only re-renders when props change
 */
export default memo(AdvisoryBoardSection);
