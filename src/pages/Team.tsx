
import React from "react";
import { Helmet } from "react-helmet-async";
import { Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import PageTemplate from "@/components/shared/PageTemplate";
import { 
  LeadershipSection, 
  AdvisoryBoardSection, 
  JoinSection,
  leadershipTeam,
  advisoryBoard,
  useTeamFilters
} from "@/components/team";
import TeamFilter from "@/components/team/TeamFilter";

/**
 * Team page showcasing leadership and advisory board members
 */
const Team: React.FC = () => {
  // Use our improved filter hooks
  const { 
    filteredItems: filteredLeadership,
    searchQuery: leadershipSearch,
    setSearchQuery: setLeadershipSearch,
    sortBy: leadershipSortBy,
    setSortBy: setLeadershipSortBy
  } = useTeamFilters(leadershipTeam);
  
  const { 
    filteredItems: filteredAdvisors,
    searchQuery: advisorsSearch,
    setSearchQuery: setAdvisorsSearch,
    sortBy: advisorsSortBy,
    setSortBy: setAdvisorsSortBy
  } = useTeamFilters(advisoryBoard);

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
      </PageTemplate>
    </>
  );
};

export default Team;
