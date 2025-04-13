
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

/**
 * Team page showcasing leadership and advisory board members
 */
const Team: React.FC = () => {
  // Use our new filter hooks
  const { 
    filteredItems: filteredLeadership,
    searchQuery: leadershipSearch,
    setSearchQuery: setLeadershipSearch
  } = useTeamFilters(leadershipTeam);
  
  const { 
    filteredItems: filteredAdvisors,
    searchQuery: advisorsSearch,
    setSearchQuery: setAdvisorsSearch
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
          <LeadershipSection 
            teamMembers={filteredLeadership} 
            searchQuery={leadershipSearch}
            onSearchChange={setLeadershipSearch}
          />
          
          <Separator />
          
          <AdvisoryBoardSection 
            advisors={filteredAdvisors}
            searchQuery={advisorsSearch}
            onSearchChange={setAdvisorsSearch}
          />
          
          <JoinSection />
        </div>
      </PageTemplate>
    </>
  );
};

export default Team;
