
import { useState, useEffect, useCallback } from 'react';
import { TeamMember, Advisor } from '../teamData';
import { useToast } from '@/hooks/use-toast';

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
  
  // Function to refresh team data with proper error handling
  const refreshTeamData = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage(null);
    
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate loading with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate incoming data
      if (!Array.isArray(initialLeadershipTeam) || !Array.isArray(initialAdvisoryBoard)) {
        throw new Error('Invalid team data structure');
      }
      
      // Validate team members have required fields
      const invalidLeader = initialLeadershipTeam.find(
        leader => !leader.id || !leader.name || !leader.title || !leader.department
      );
      
      if (invalidLeader) {
        console.warn('Found invalid leadership team member:', invalidLeader);
        throw new Error('Some leadership team members have incomplete data');
      }
      
      // Validate advisors have required fields
      const invalidAdvisor = initialAdvisoryBoard.find(
        advisor => !advisor.id || !advisor.name || !advisor.title || !advisor.company
      );
      
      if (invalidAdvisor) {
        console.warn('Found invalid advisor:', invalidAdvisor);
        throw new Error('Some advisory board members have incomplete data');
      }
      
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
