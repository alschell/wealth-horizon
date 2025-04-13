
import React, { createContext, useContext } from 'react';
import { TeamContextValue, TeamProviderProps } from './TeamContextTypes';
import { useTeamData } from './useTeamData';
import { LeadershipProvider, useLeadershipContext } from './LeadershipContext';
import { AdvisoryProvider, useAdvisoryContext } from './AdvisoryContext';

// Create the context with a default value
const TeamContext = createContext<TeamContextValue | undefined>(undefined);

/**
 * Provider component for team data and filtering state
 * Acts as a facade over Leadership and Advisory contexts
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
  
  return (
    <LeadershipProvider 
      initialLeadershipTeam={initialLeadershipTeam}
      leadershipTeam={leadershipTeam}
      isLoading={isLoading}
      hasError={hasError}
      errorMessage={errorMessage}
      refreshTeamData={refreshTeamData}
    >
      <AdvisoryProvider
        initialAdvisoryBoard={initialAdvisoryBoard}
        advisoryBoard={advisoryBoard}
        isLoading={isLoading}
        hasError={hasError}
        errorMessage={errorMessage}
        refreshTeamData={refreshTeamData}
      >
        <TeamContextConsumer>
          {(contextValue) => (
            <TeamContext.Provider value={contextValue}>
              {children}
            </TeamContext.Provider>
          )}
        </TeamContextConsumer>
      </AdvisoryProvider>
    </LeadershipProvider>
  );
};

/**
 * Internal component to consume both contexts and combine them
 */
const TeamContextConsumer: React.FC<{
  children: (contextValue: TeamContextValue) => React.ReactNode;
}> = ({ children }) => {
  const leadership = useLeadershipContext();
  const advisory = useAdvisoryContext();
  
  // Combined context value
  const value: TeamContextValue = {
    leadershipTeam: leadership.leadershipTeam,
    advisoryBoard: advisory.advisoryBoard,
    isLoading: leadership.isLoading || advisory.isLoading,
    hasError: leadership.hasError || advisory.hasError,
    errorMessage: leadership.errorMessage || advisory.errorMessage,
    
    leadershipSearch: leadership.leadershipSearch,
    setLeadershipSearch: leadership.setLeadershipSearch,
    leadershipSortBy: leadership.leadershipSortBy,
    setLeadershipSortBy: leadership.setLeadershipSortBy,
    filteredLeadership: leadership.filteredLeadership,
    leadershipLoading: leadership.isLoading,
    
    advisorsSearch: advisory.advisorsSearch,
    setAdvisorsSearch: advisory.setAdvisorsSearch,
    advisorsSortBy: advisory.advisorsSortBy,
    setAdvisorsSortBy: advisory.setAdvisorsSortBy,
    filteredAdvisors: advisory.filteredAdvisors,
    advisorsLoading: advisory.isLoading,
    
    refreshTeamData: async () => {
      await Promise.all([
        leadership.refreshLeadershipData(),
        advisory.refreshAdvisoryData()
      ]);
    },
  };
  
  return <>{children(value)}</>;
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
