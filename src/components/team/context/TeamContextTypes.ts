
import { TeamMember, Advisor } from '../teamData';
import { TeamSortOption } from '../TeamFilter';

/**
 * Team context value interface
 */
export interface TeamContextValue {
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

/**
 * Props for the TeamProvider component
 */
export interface TeamProviderProps {
  children: React.ReactNode;
  initialLeadershipTeam?: TeamMember[];
  initialAdvisoryBoard?: Advisor[];
}
