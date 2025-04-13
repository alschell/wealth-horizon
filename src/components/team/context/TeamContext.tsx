
import React, { createContext, useContext, useState, useMemo } from 'react';
import { TeamContextValue, TeamProviderProps } from './TeamContextTypes';
import { useTeamData } from './useTeamData';
import { filterAndSortTeamMembers, filterAndSortAdvisors } from './teamFilterUtils';
import { TeamSortOption } from '../TeamFilter';

// Create the context with a default value
const TeamContext = createContext<TeamContextValue | undefined>(undefined);

/**
 * Provider component for team data and filtering state
 */
export const TeamProvider: React.FC<TeamProviderProps> = ({ 
  children,
  initialLeadershipTeam = [],
  initialAdvisoryBoard = []
}) => {
  // Use the team data hook for data fetching and state
  const {
    leadershipTeam,
    advisoryBoard,
    isLoading,
    hasError,
    errorMessage,
    refreshTeamData,
  } = useTeamData(initialLeadershipTeam, initialAdvisoryBoard);
  
  // Filter state for leadership team
  const [leadershipSearch, setLeadershipSearch] = useState('');
  const [leadershipSortBy, setLeadershipSortBy] = useState<TeamSortOption>('name');
  
  // Filter state for advisory board
  const [advisorsSearch, setAdvisorsSearch] = useState('');
  const [advisorsSortBy, setAdvisorsSortBy] = useState<TeamSortOption>('name');
  
  // Memoized filtered leadership team members
  const filteredLeadership = useMemo(() => 
    filterAndSortTeamMembers(leadershipTeam, leadershipSearch, leadershipSortBy),
    [leadershipTeam, leadershipSearch, leadershipSortBy]
  );
  
  // Memoized filtered advisory board members
  const filteredAdvisors = useMemo(() => 
    filterAndSortAdvisors(advisoryBoard, advisorsSearch, advisorsSortBy),
    [advisoryBoard, advisorsSearch, advisorsSortBy]
  );
  
  // Context value
  const value: TeamContextValue = {
    leadershipTeam,
    advisoryBoard,
    isLoading,
    hasError,
    errorMessage,
    
    leadershipSearch,
    setLeadershipSearch,
    leadershipSortBy,
    setLeadershipSortBy,
    filteredLeadership,
    
    advisorsSearch,
    setAdvisorsSearch,
    advisorsSortBy,
    setAdvisorsSortBy,
    filteredAdvisors,
    
    refreshTeamData,
  };
  
  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  );
};

/**
 * Hook to use the team context
 * @throws Error if used outside of a TeamProvider
 */
export const useTeamContext = () => {
  const context = useContext(TeamContext);
  
  if (context === undefined) {
    throw new Error('useTeamContext must be used within a TeamProvider');
  }
  
  return context;
};
