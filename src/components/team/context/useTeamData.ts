
import { useState, useEffect, useCallback } from 'react';
import { TeamMember, Advisor } from '../teamData';
import { useToast } from '@/hooks/use-toast';
import { 
  TeamDataFetchError,
  TeamDataValidationError,
  MissingTeamMemberDataError,
  MissingAdvisorDataError
} from '../errors/TeamErrors';

interface UseTeamDataResult {
  /** Leadership team data */
  leadershipTeam: ReadonlyArray<TeamMember>;
  /** Advisory board data */
  advisoryBoard: ReadonlyArray<Advisor>;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  hasError: boolean;
  /** Error message if any */
  errorMessage: string | null;
  /** Function to refresh team data */
  refreshTeamData: () => Promise<void>;
}

/**
 * Custom hook for managing team data fetching and state
 * Provides data fetching, error handling, and state management
 */
export function useTeamData(
  initialLeadershipTeam: ReadonlyArray<TeamMember> = [],
  initialAdvisoryBoard: ReadonlyArray<Advisor> = []
): UseTeamDataResult {
  const { toast } = useToast();
  
  // Data state
  const [leadershipTeam, setLeadershipTeam] = useState<ReadonlyArray<TeamMember>>(initialLeadershipTeam);
  const [advisoryBoard, setAdvisoryBoard] = useState<ReadonlyArray<Advisor>>(initialAdvisoryBoard);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Function to validate team member data
  const validateTeamMember = (member: TeamMember): boolean => {
    if (!member.id || !member.name || !member.title || !member.department) {
      console.warn('Found invalid leadership team member:', member);
      throw new MissingTeamMemberDataError(member.id || 'unknown');
    }
    return true;
  };
  
  // Function to validate advisor data
  const validateAdvisor = (advisor: Advisor): boolean => {
    if (!advisor.id || !advisor.name || !advisor.title || !advisor.company) {
      console.warn('Found invalid advisor:', advisor);
      throw new MissingAdvisorDataError(advisor.id || 'unknown');
    }
    return true;
  };
  
  // Function to refresh team data with proper error handling
  const refreshTeamData = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage(null);
    
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate loading with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate the data structure
      if (!Array.isArray(initialLeadershipTeam) || !Array.isArray(initialAdvisoryBoard)) {
        throw new TeamDataValidationError('Invalid team data structure');
      }
      
      // Validate each team member
      initialLeadershipTeam.forEach(validateTeamMember);
      
      // Validate each advisor
      initialAdvisoryBoard.forEach(validateAdvisor);
      
      // Update state with initial data (or API response)
      setLeadershipTeam(initialLeadershipTeam);
      setAdvisoryBoard(initialAdvisoryBoard);
      
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
      
      // Use the specific error type and message if available
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setErrorMessage(errorMessage);
      
      // Set a toast notification with the appropriate error message
      toast({
        title: 'Error loading team data',
        description: errorMessage,
        variant: 'destructive',
      });
      
      // Log the error for debugging
      console.error('Team data error:', error);
      
      // Fall back to empty arrays in case of error
      setLeadershipTeam([]);
      setAdvisoryBoard([]);
    }
  }, [initialLeadershipTeam, initialAdvisoryBoard, toast]);
  
  // Load data on mount and when dependencies change
  useEffect(() => {
    refreshTeamData();
  }, [refreshTeamData]);
  
  return {
    leadershipTeam,
    advisoryBoard,
    isLoading,
    hasError,
    errorMessage,
    refreshTeamData,
  };
}
