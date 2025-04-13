
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { TeamMember } from '../teamData';
import { TeamSortOption } from '../TeamFilter';
import { filterAndSortTeamMembers } from './teamFilterUtils';
import { useToast } from '@/hooks/use-toast';

/**
 * Context value interface for leadership team
 */
interface LeadershipContextValue {
  // Data states
  leadershipTeam: TeamMember[];
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
  
  // Leadership team filters
  leadershipSearch: string;
  setLeadershipSearch: (query: string) => void;
  leadershipSortBy: TeamSortOption;
  setLeadershipSortBy: (option: TeamSortOption) => void;
  filteredLeadership: TeamMember[];
  
  // Actions
  refreshLeadershipData: () => Promise<void>;
}

/**
 * Props for the LeadershipProvider component
 */
interface LeadershipProviderProps {
  children: React.ReactNode;
  initialLeadershipTeam?: TeamMember[];
  leadershipTeam?: TeamMember[];
  isLoading?: boolean;
  hasError?: boolean;
  errorMessage?: string | null;
  refreshTeamData?: () => Promise<void>;
}

// Create the context with a default value
const LeadershipContext = createContext<LeadershipContextValue | undefined>(undefined);

/**
 * Provider component for leadership team data and filtering state
 */
export const LeadershipProvider: React.FC<LeadershipProviderProps> = ({ 
  children,
  initialLeadershipTeam = [],
  leadershipTeam = initialLeadershipTeam,
  isLoading = false,
  hasError = false,
  errorMessage = null,
  refreshTeamData
}) => {
  const { toast } = useToast();
  
  // Filter state for leadership team
  const [leadershipSearch, setLeadershipSearch] = useState<string>('');
  const [leadershipSortBy, setLeadershipSortBy] = useState<TeamSortOption>('name');
  
  // Memoized filtered leadership team members
  const filteredLeadership = useMemo(() => 
    filterAndSortTeamMembers(leadershipTeam, leadershipSearch, leadershipSortBy),
    [leadershipTeam, leadershipSearch, leadershipSortBy]
  );
  
  // Wrap the search setter with error handling
  const handleSetLeadershipSearch = useCallback((query: string) => {
    try {
      setLeadershipSearch(query);
    } catch (error) {
      console.error('Error setting leadership search:', error);
      toast({
        title: 'Search Error',
        description: 'Failed to update search query',
        variant: 'destructive',
      });
    }
  }, [toast]);
  
  // Wrap the sort setter with error handling
  const handleSetLeadershipSortBy = useCallback((option: TeamSortOption) => {
    try {
      setLeadershipSortBy(option);
    } catch (error) {
      console.error('Error setting leadership sort:', error);
      toast({
        title: 'Sort Error',
        description: 'Failed to update sort criteria',
        variant: 'destructive',
      });
    }
  }, [toast]);
  
  // Refresh leadership data with error handling
  const refreshLeadershipData = useCallback(async () => {
    if (refreshTeamData) {
      try {
        await refreshTeamData();
      } catch (error) {
        console.error('Error refreshing leadership data:', error);
        toast({
          title: 'Refresh Error',
          description: 'Failed to refresh leadership data',
          variant: 'destructive',
        });
      }
    }
  }, [refreshTeamData, toast]);
  
  // Context value
  const value: LeadershipContextValue = {
    leadershipTeam,
    isLoading,
    hasError,
    errorMessage,
    
    leadershipSearch,
    setLeadershipSearch: handleSetLeadershipSearch,
    leadershipSortBy,
    setLeadershipSortBy: handleSetLeadershipSortBy,
    filteredLeadership,
    
    refreshLeadershipData,
  };
  
  return (
    <LeadershipContext.Provider value={value}>
      {children}
    </LeadershipContext.Provider>
  );
};

/**
 * Hook to use the leadership team context
 * @throws Error if used outside of a LeadershipProvider
 */
export const useLeadershipContext = () => {
  const context = useContext(LeadershipContext);
  
  if (context === undefined) {
    throw new Error('useLeadershipContext must be used within a LeadershipProvider');
  }
  
  return context;
};
