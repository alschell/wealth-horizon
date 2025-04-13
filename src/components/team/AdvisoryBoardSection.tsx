
import React, { useCallback } from "react";
import { Advisor } from "./teamData";
import { useTeamFilter, useTeamAccessibility } from "./hooks/useTeamFilter";
import { filterAndSortAdvisors } from "./context/teamFilterUtils";
import AdvisorCard from "./cards/AdvisorCard";
import TeamLoadingSkeleton from "./TeamLoadingSkeleton";
import TeamEmptyState from "./states/TeamEmptyState";
import { motion, AnimatePresence } from "framer-motion";
import { TeamSortOption } from "./TeamFilter";

interface AdvisoryBoardSectionProps {
  advisors: ReadonlyArray<Advisor>;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  sortBy?: TeamSortOption;
  onSortChange?: (option: TeamSortOption) => void;
  isLoading?: boolean;
  showTitle?: boolean;
}

/**
 * Displays the advisory board section with advisor profiles
 * Features animations, accessibility improvements, and performance optimizations
 */
const AdvisoryBoardSection: React.FC<AdvisoryBoardSectionProps> = ({ 
  advisors, 
  searchQuery: externalSearchQuery, 
  onSearchChange: externalOnSearchChange,
  sortBy: externalSortBy,
  onSortChange: externalOnSortChange,
  isLoading = false,
  showTitle = true
}) => {
  // Use accessibility props for better screen reader support
  const accessibilityProps = useTeamAccessibility('advisory-board', 'Advisory Board');

  // Use our custom team filter hook when external filters aren't provided
  const {
    filteredItems: internalFilteredAdvisors,
    filterState: { searchQuery: internalSearchQuery, sortBy: internalSortBy },
    setSearchQuery: internalSetSearchQuery,
    setSortBy: internalSetSortBy,
  } = useTeamFilter<Advisor>({
    initialItems: advisors,
    initialSearchQuery: '',
    initialSortBy: 'name',
    filterFunction: (items, query) => items.filter(advisor => {
      const lowercaseQuery = query.toLowerCase();
      return (
        advisor.name.toLowerCase().includes(lowercaseQuery) ||
        advisor.title.toLowerCase().includes(lowercaseQuery) ||
        advisor.company.toLowerCase().includes(lowercaseQuery)
      );
    }),
    sortFunction: (items, sortOption) => [...items].sort((a, b) => {
      if (sortOption === 'name') return a.name.localeCompare(b.name);
      if (sortOption === 'title') return a.title.localeCompare(b.title);
      if (sortOption === 'department') return a.company.localeCompare(b.company);
      return 0;
    })
  });
  
  // Determine whether to use external or internal filtering
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery;
  const setSearchQuery = externalOnSearchChange || internalSetSearchQuery;
  const sortBy = externalSortBy !== undefined ? externalSortBy : internalSortBy;
  const setSortBy = externalOnSortChange || internalSetSortBy;
  
  // Compute filtered advisors when external filtering is used
  // Fix: Use type assertion to tell TypeScript this ReadonlyArray is compatible
  const filteredAdvisors = externalSearchQuery !== undefined || externalSortBy !== undefined
    ? filterAndSortAdvisors(advisors, searchQuery, sortBy as TeamSortOption)
    : internalFilteredAdvisors;
  
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
        aria-label="Loading advisory board"
        {...accessibilityProps}
      >
        {showTitle && (
          <h2 
            id="advisory-board-heading" 
            className="text-2xl font-semibold text-gray-800 mb-6"
          >
            Advisory Board
          </h2>
        )}
        <TeamLoadingSkeleton count={3} isLeadership={false} />
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
          id="advisory-board-heading" 
          className="text-2xl font-semibold text-gray-800 mb-6"
        >
          Advisory Board
        </h2>
      )}
      
      {filteredAdvisors.length === 0 && (
        <TeamEmptyState 
          searchTerm={searchQuery}
          entityName="advisors"
          onResetFilter={() => setSearchQuery('')}
        />
      )}
      
      <AnimatePresence mode="wait">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key="advisors-grid"
          role="list"
          aria-label="Advisory board members"
        >
          {filteredAdvisors.map((advisor, index) => (
            <AdvisorCard 
              key={advisor.id} 
              advisor={advisor}
              index={index}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

/**
 * Default export of the AdvisoryBoardSection
 */
export default React.memo(AdvisoryBoardSection);
