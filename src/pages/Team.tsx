import React, { Suspense, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import PageTemplate from "@/components/shared/PageTemplate";
import { ErrorBoundary } from "@/components/error-boundary";
import TeamLoadingSkeleton from "@/components/team/TeamLoadingSkeleton";
import { 
  LeadershipSection, 
  AdvisoryBoardSection, 
  JoinSection,
  TeamFilter,
  leadershipTeam,
  advisoryBoard
} from "@/components/team";
import { TeamProvider, useTeamContext } from "@/components/team/context/TeamContext";
import { useLeadershipContext } from "@/components/team/context/LeadershipContext";
import { useAdvisoryContext } from "@/components/team/context/AdvisoryContext";

/**
 * Enhanced Team page content that uses the context
 * Features improved error handling, accessibility, and performance
 */
const TeamContent: React.FC = () => {
  const { 
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
    
    isLoading,
    hasError,
    refreshTeamData
  } = useTeamContext();
  
  // Leadership context for more detailed leadership data
  const leadership = useLeadershipContext();
  
  // Advisory context for more detailed advisory data
  const advisory = useAdvisoryContext();
  
  // Clear all leadership filters
  const clearLeadershipFilters = useCallback(() => {
    setLeadershipSearch('');
    setLeadershipSortBy('name');
  }, [setLeadershipSearch, setLeadershipSortBy]);
  
  // Clear all advisory filters
  const clearAdvisoryFilters = useCallback(() => {
    setAdvisorsSearch('');
    setAdvisorsSortBy('name');
  }, [setAdvisorsSearch, setAdvisorsSortBy]);
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-12" aria-busy="true">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Leadership Team</h2>
          <TeamLoadingSkeleton count={4} isLeadership={true} />
        </section>
        
        <Separator />
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Advisory Board</h2>
          <TeamLoadingSkeleton count={3} isLeadership={false} />
        </section>
      </div>
    );
  }
  
  // Show error state with retry button
  if (hasError) {
    return (
      <div className="text-center py-12" role="alert" aria-live="assertive">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Failed to load team data</h2>
        <p className="text-gray-600 mb-6">There was a problem retrieving team information.</p>
        <button 
          onClick={() => refreshTeamData()}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="Retry loading team data"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-12">
      <section>
        <TeamFilter 
          searchQuery={leadershipSearch}
          onSearchChange={setLeadershipSearch}
          sortBy={leadershipSortBy}
          onSortChange={setLeadershipSortBy}
          placeholder="Search leadership team..."
          showDepartmentSort={true}
          totalCount={leadership.leadershipTeam.length}
          filteredCount={filteredLeadership.length}
          onClearFilters={clearLeadershipFilters}
        />
        
        <ErrorBoundary componentName="LeadershipSection">
          <LeadershipSection 
            teamMembers={filteredLeadership} 
            searchQuery={leadershipSearch}
            onSearchChange={setLeadershipSearch}
            sortBy={leadershipSortBy}
            onSortChange={setLeadershipSortBy}
            showTitle={true}
          />
        </ErrorBoundary>
      </section>
      
      <Separator />
      
      <section>
        <TeamFilter 
          searchQuery={advisorsSearch}
          onSearchChange={setAdvisorsSearch}
          sortBy={advisorsSortBy}
          onSortChange={setAdvisorsSortBy}
          placeholder="Search advisory board..."
          showDepartmentSort={false}
          totalCount={advisory.advisoryBoard.length}
          filteredCount={filteredAdvisors.length}
          onClearFilters={clearAdvisoryFilters}
        />
        
        <ErrorBoundary componentName="AdvisoryBoardSection">
          <AdvisoryBoardSection 
            advisors={filteredAdvisors}
            searchQuery={advisorsSearch}
            onSearchChange={setAdvisorsSearch}
            sortBy={advisorsSortBy}
            onSortChange={setAdvisorsSortBy}
            showTitle={true}
          />
        </ErrorBoundary>
      </section>
      
      <ErrorBoundary componentName="JoinSection">
        <JoinSection />
      </ErrorBoundary>
    </div>
  );
};

/**
 * Team page with context providers and error boundary
 * Features improved document metadata and error handling
 */
const Team: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Leadership Team | WealthHorizon</title>
        <meta name="description" content="Meet the leadership team and advisory board behind WealthHorizon's innovative wealth management platform." />
        <meta name="keywords" content="wealth management, leadership team, fintech executives, family office technology, wealth tech" />
      </Helmet>
      
      <PageTemplate
        title="Our Team"
        description="Meet the talented leaders and advisors behind WealthHorizon."
        icon={Users}
      >
        <ErrorBoundary>
          <TeamProvider 
            initialLeadershipTeam={leadershipTeam}
            initialAdvisoryBoard={advisoryBoard}
          >
            <Suspense fallback={<div className="py-12"><TeamLoadingSkeleton count={2} isLeadership={true} /></div>}>
              <TeamContent />
            </Suspense>
          </TeamProvider>
        </ErrorBoundary>
      </PageTemplate>
    </>
  );
};

export default Team;
