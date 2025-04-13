
import React from "react";
import { Helmet } from "react-helmet-async";
import { Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import PageTemplate from "@/components/shared/PageTemplate";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { 
  LeadershipSection, 
  AdvisoryBoardSection, 
  JoinSection,
  TeamFilter,
  leadershipTeam,
  advisoryBoard
} from "@/components/team";
import { TeamProvider, useTeamContext } from "@/components/team/context/TeamContext";

/**
 * Team page content that uses the TeamContext
 */
const TeamContent: React.FC = () => {
  const { 
    filteredLeadership,
    leadershipSearch,
    setLeadershipSearch,
    leadershipSortBy,
    setLeadershipSortBy,
    
    filteredAdvisors,
    advisorsSearch,
    setAdvisorsSearch,
    advisorsSortBy,
    setAdvisorsSortBy,
    
    isLoading,
    hasError,
    refreshTeamData
  } = useTeamContext();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }
  
  // Show error state with retry button
  if (hasError) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Failed to load team data</h2>
        <p className="text-gray-600 mb-6">There was a problem retrieving team information.</p>
        <button 
          onClick={refreshTeamData}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
        />
        
        <LeadershipSection 
          teamMembers={filteredLeadership} 
          searchQuery={leadershipSearch}
          onSearchChange={setLeadershipSearch}
        />
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
        />
        
        <AdvisoryBoardSection 
          advisors={filteredAdvisors}
          searchQuery={advisorsSearch}
          onSearchChange={setAdvisorsSearch}
        />
      </section>
      
      <JoinSection />
    </div>
  );
};

/**
 * Team page with context provider and error boundary
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
            <TeamContent />
          </TeamProvider>
        </ErrorBoundary>
      </PageTemplate>
    </>
  );
};

export default Team;
