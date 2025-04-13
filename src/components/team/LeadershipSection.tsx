
import React, { useCallback } from "react";
import { TeamMember } from "./teamData";
import { useTeamFilter, useTeamAccessibility } from "./hooks/useTeamFilter";
import { filterAndSortTeamMembers } from "./context/teamFilterUtils";
import TeamMemberCard from "./cards/TeamMemberCard";
import TeamLoadingSkeleton from "./TeamLoadingSkeleton";
import TeamEmptyState from "./states/TeamEmptyState";
import { motion, AnimatePresence } from "framer-motion";
import { TeamSortOption } from "./TeamFilter";

interface LeadershipSectionProps {
  teamMembers: TeamMember[];
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  sortBy?: TeamSortOption;
  onSortChange?: (option: TeamSortOption) => void;
  isLoading?: boolean;
  showTitle?: boolean;
}

/**
 * Displays the leadership team section with member profiles
 * Features animations, accessibility improvements, and performance optimizations
 */
const LeadershipSection: React.FC<LeadershipSectionProps> = ({ 
  teamMembers, 
  searchQuery: externalSearchQuery, 
  onSearchChange: externalOnSearchChange,
  sortBy: externalSortBy,
  onSortChange: externalOnSortChange,
  isLoading = false,
  showTitle = true
}) => {
  // Use accessibility props for better screen reader support
  const accessibilityProps = useTeamAccessibility('leadership-team', 'Leadership Team');

  // Use our custom team filter hook when external filters aren't provided
  const {
    filteredItems: internalFilteredMembers,
    filterState: { searchQuery: internalSearchQuery, sortBy: internalSortBy },
    setSearchQuery: internalSetSearchQuery,
    setSortBy: internalSetSortBy,
  } = useTeamFilter<TeamMember>({
    initialItems: teamMembers,
    initialSearchQuery: '',
    initialSortBy: 'name',
    filterFunction: (items, query) => items.filter(member => {
      const lowercaseQuery = query.toLowerCase();
      return (
        member.name.toLowerCase().includes(lowercaseQuery) ||
        member.title.toLowerCase().includes(lowercaseQuery) ||
        member.department.toLowerCase().includes(lowercaseQuery)
      );
    }),
    sortFunction: (items, sortOption) => [...items].sort((a, b) => {
      if (sortOption === 'name') return a.name.localeCompare(b.name);
      if (sortOption === 'title') return a.title.localeCompare(b.title);
      if (sortOption === 'department') return a.department.localeCompare(b.department);
      return 0;
    })
  });
  
  // Determine whether to use external or internal filtering
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const setSearchQuery = externalOnSearchChange || internalSetSearchQuery;
  const sortBy = externalSortBy !== undefined ? externalSortBy : internalSortBy;
  const setSortBy = externalOnSortChange || internalSetSortBy;
  
  // Compute filtered members when external filtering is used
  const filteredMembers = externalSearchQuery !== undefined || externalSortBy !== undefined
    ? filterAndSortTeamMembers(teamMembers, searchQuery, sortBy as TeamSortOption)
    : internalFilteredMembers;
  
  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  if (isLoading) {
    return (
      <section 
        aria-busy="true" 
        aria-label="Loading leadership team"
        {...accessibilityProps}
      >
        {showTitle && (
          <h2 
            id="leadership-team-heading" 
            className="text-2xl font-semibold text-gray-800 mb-6"
          >
            Leadership Team
          </h2>
        )}
        <TeamLoadingSkeleton count={4} isLeadership={true} />
      </section>
    );
  }
  
  return (
    <section 
      aria-labelledby={accessibilityProps.ariaLabelledBy}
      {...accessibilityProps}
    >
      {showTitle && (
        <h2 
          id="leadership-team-heading" 
          className="text-2xl font-semibold text-gray-800 mb-6"
        >
          Leadership Team
        </h2>
      )}
      
      {filteredMembers.length === 0 && (
        <TeamEmptyState 
          searchTerm={searchQuery}
          entityName="team members"
          onResetFilter={() => setSearchQuery('')}
        />
      )}
      
      <AnimatePresence mode="wait">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key="leadership-grid"
          role="list"
          aria-label="Leadership team members"
        >
          {filteredMembers.map((member, index) => (
            <TeamMemberCard 
              key={member.id} 
              member={member}
              index={index}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

/**
 * Default export of the LeadershipSection
 */
export default React.memo(LeadershipSection);
