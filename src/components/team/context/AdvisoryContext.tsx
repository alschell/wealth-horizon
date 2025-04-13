
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { Advisor } from '../teamData';
import { TeamSortOption } from '../TeamFilter';
import { filterAndSortAdvisors } from './teamFilterUtils';
import { useToast } from '@/hooks/use-toast';

/**
 * Context value interface for advisory board
 */
interface AdvisoryContextValue {
  // Data states
  advisoryBoard: Advisor[];
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
  
  // Advisory board filters
  advisorsSearch: string;
  setAdvisorsSearch: (query: string) => void;
  advisorsSortBy: TeamSortOption;
  setAdvisorsSortBy: (option: TeamSortOption) => void;
  filteredAdvisors: Advisor[];
  
  // Actions
  refreshAdvisoryData: () => Promise<void>;
}

/**
 * Props for the AdvisoryProvider component
 */
interface AdvisoryProviderProps {
  children: React.ReactNode;
  initialAdvisoryBoard?: Advisor[];
  advisoryBoard?: Advisor[];
  isLoading?: boolean;
  hasError?: boolean;
  errorMessage?: string | null;
  refreshTeamData?: () => Promise<void>;
}

// Create the context with a default value
const AdvisoryContext = createContext<AdvisoryContextValue | undefined>(undefined);

/**
 * Provider component for advisory board data and filtering state
 */
export const AdvisoryProvider: React.FC<AdvisoryProviderProps> = ({ 
  children,
  initialAdvisoryBoard = [],
  advisoryBoard = initialAdvisoryBoard,
  isLoading = false,
  hasError = false,
  errorMessage = null,
  refreshTeamData
}) => {
  const { toast } = useToast();
  
  // Filter state for advisory board
  const [advisorsSearch, setAdvisorsSearch] = useState<string>('');
  const [advisorsSortBy, setAdvisorsSortBy] = useState<TeamSortOption>('name');
  
  // Memoized filtered advisory board members
  const filteredAdvisors = useMemo(() => 
    filterAndSortAdvisors(advisoryBoard, advisorsSearch, advisorsSortBy),
    [advisoryBoard, advisorsSearch, advisorsSortBy]
  );
  
  // Wrap the search setter with error handling
  const handleSetAdvisorsSearch = useCallback((query: string) => {
    try {
      setAdvisorsSearch(query);
    } catch (error) {
      console.error('Error setting advisors search:', error);
      toast({
        title: 'Search Error',
        description: 'Failed to update search query',
        variant: 'destructive',
      });
    }
  }, [toast]);
  
  // Wrap the sort setter with error handling
  const handleSetAdvisorsSortBy = useCallback((option: TeamSortOption) => {
    try {
      setAdvisorsSortBy(option);
    } catch (error) {
      console.error('Error setting advisors sort:', error);
      toast({
        title: 'Sort Error',
        description: 'Failed to update sort criteria',
        variant: 'destructive',
      });
    }
  }, [toast]);
  
  // Refresh advisory data with error handling
  const refreshAdvisoryData = useCallback(async () => {
    if (refreshTeamData) {
      try {
        await refreshTeamData();
      } catch (error) {
        console.error('Error refreshing advisory data:', error);
        toast({
          title: 'Refresh Error',
          description: 'Failed to refresh advisory data',
          variant: 'destructive',
        });
      }
    }
  }, [refreshTeamData, toast]);
  
  // Context value
  const value: AdvisoryContextValue = {
    advisoryBoard,
    isLoading,
    hasError,
    errorMessage,
    
    advisorsSearch,
    setAdvisorsSearch: handleSetAdvisorsSearch,
    advisorsSortBy,
    setAdvisorsSortBy: handleSetAdvisorsSortBy,
    filteredAdvisors,
    
    refreshAdvisoryData,
  };
  
  return (
    <AdvisoryContext.Provider value={value}>
      {children}
    </AdvisoryContext.Provider>
  );
};

/**
 * Hook to use the advisory board context
 * @throws Error if used outside of a AdvisoryProvider
 */
export const useAdvisoryContext = () => {
  const context = useContext(AdvisoryContext);
  
  if (context === undefined) {
    throw new Error('useAdvisoryContext must be used within a AdvisoryProvider');
  }
  
  return context;
};
