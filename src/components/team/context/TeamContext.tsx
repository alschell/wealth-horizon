
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TeamMember, Advisor } from '../teamData';
import { useToast } from '@/hooks/use-toast';
import { TeamSortOption } from '../TeamFilter';

// Define the context shape
interface TeamContextValue {
  // Data states
  leadershipTeam: TeamMember[];
  advisoryBoard: Advisor[];
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
  
  // Leadership team filters
  leadershipSearch: string;
  setLeadershipSearch: (query: string) => void;
  leadershipSortBy: TeamSortOption;
  setLeadershipSortBy: (option: TeamSortOption) => void;
  filteredLeadership: TeamMember[];
  
  // Advisory board filters
  advisorsSearch: string;
  setAdvisorsSearch: (query: string) => void;
  advisorsSortBy: TeamSortOption;
  setAdvisorsSortBy: (option: TeamSortOption) => void;
  filteredAdvisors: Advisor[];
  
  // Actions
  refreshTeamData: () => void;
}

// Create the context with a default value
const TeamContext = createContext<TeamContextValue | undefined>(undefined);

// Props for the provider component
interface TeamProviderProps {
  children: ReactNode;
  initialLeadershipTeam?: TeamMember[];
  initialAdvisoryBoard?: Advisor[];
}

/**
 * Provider component for team data and filtering state
 */
export const TeamProvider: React.FC<TeamProviderProps> = ({ 
  children,
  initialLeadershipTeam = [],
  initialAdvisoryBoard = []
}) => {
  const { toast } = useToast();
  
  // Data state
  const [leadershipTeam, setLeadershipTeam] = useState<TeamMember[]>(initialLeadershipTeam);
  const [advisoryBoard, setAdvisoryBoard] = useState<Advisor[]>(initialAdvisoryBoard);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Filter state for leadership team
  const [leadershipSearch, setLeadershipSearch] = useState('');
  const [leadershipSortBy, setLeadershipSortBy] = useState<TeamSortOption>('name');
  
  // Filter state for advisory board
  const [advisorsSearch, setAdvisorsSearch] = useState('');
  const [advisorsSortBy, setAdvisorsSortBy] = useState<TeamSortOption>('name');
  
  // Filtered leadership team members
  const filteredLeadership = React.useMemo(() => {
    return filterAndSortTeamMembers(leadershipTeam, leadershipSearch, leadershipSortBy);
  }, [leadershipTeam, leadershipSearch, leadershipSortBy]);
  
  // Filtered advisory board members
  const filteredAdvisors = React.useMemo(() => {
    return filterAndSortAdvisors(advisoryBoard, advisorsSearch, advisorsSortBy);
  }, [advisoryBoard, advisorsSearch, advisorsSortBy]);
  
  // Function to refresh team data
  const refreshTeamData = async () => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage(null);
    
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate loading with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update state with initial data (or API response)
      setLeadershipTeam(initialLeadershipTeam);
      setAdvisoryBoard(initialAdvisoryBoard);
      
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
      
      toast({
        title: 'Error loading team data',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    }
  };
  
  // Load data on mount
  useEffect(() => {
    refreshTeamData();
  }, []);
  
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
 */
export const useTeamContext = () => {
  const context = useContext(TeamContext);
  
  if (context === undefined) {
    throw new Error('useTeamContext must be used within a TeamProvider');
  }
  
  return context;
};

/**
 * Filter and sort team members
 */
const filterAndSortTeamMembers = (
  members: TeamMember[],
  searchQuery: string,
  sortBy: TeamSortOption
): TeamMember[] => {
  // Filter by search query
  const filtered = searchQuery 
    ? members.filter(member => {
        const lowercaseQuery = searchQuery.toLowerCase();
        return (
          member.name.toLowerCase().includes(lowercaseQuery) ||
          member.title.toLowerCase().includes(lowercaseQuery) ||
          member.department.toLowerCase().includes(lowercaseQuery)
        );
      })
    : members;
  
  // Sort filtered members
  return [...filtered].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'department') return a.department.localeCompare(b.department);
    return 0;
  });
};

/**
 * Filter and sort advisors
 */
const filterAndSortAdvisors = (
  advisors: Advisor[],
  searchQuery: string,
  sortBy: TeamSortOption
): Advisor[] => {
  // Filter by search query
  const filtered = searchQuery 
    ? advisors.filter(advisor => {
        const lowercaseQuery = searchQuery.toLowerCase();
        return (
          advisor.name.toLowerCase().includes(lowercaseQuery) ||
          advisor.title.toLowerCase().includes(lowercaseQuery) ||
          advisor.company.toLowerCase().includes(lowercaseQuery)
        );
      })
    : advisors;
  
  // Sort filtered advisors
  return [...filtered].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'department' && 'company' in a && 'company' in b) {
      return a.company.localeCompare(b.company);
    }
    return 0;
  });
};
