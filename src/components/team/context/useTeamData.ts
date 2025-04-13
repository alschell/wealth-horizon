
import { useState, useEffect, useCallback } from 'react';
import { TeamMember, Advisor } from '../teamData';
import { useToast } from '@/hooks/use-toast';

/**
 * Custom hook for managing team data fetching and state
 */
export function useTeamData(
  initialLeadershipTeam: TeamMember[] = [],
  initialAdvisoryBoard: Advisor[] = []
) {
  const { toast } = useToast();
  
  // Data state
  const [leadershipTeam, setLeadershipTeam] = useState<TeamMember[]>(initialLeadershipTeam);
  const [advisoryBoard, setAdvisoryBoard] = useState<Advisor[]>(initialAdvisoryBoard);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Function to refresh team data
  const refreshTeamData = useCallback(async () => {
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
  }, [initialLeadershipTeam, initialAdvisoryBoard, toast]);
  
  // Load data on mount
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
