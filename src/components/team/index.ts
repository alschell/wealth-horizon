
// Components
export { default as LeadershipSection } from "./LeadershipSection";
export { default as AdvisoryBoardSection } from "./AdvisoryBoardSection";
export { default as JoinSection } from "./JoinSection";
export { default as TeamMemberImage } from "./TeamMemberImage";
export { default as SocialLinks } from "./SocialLinks";
export { default as TeamFilter } from "./TeamFilter";
export { default as ErrorBoundary } from "@/components/shared/ErrorBoundary";

// Context
export { TeamProvider, useTeamContext } from "./context/TeamContext";

// Data
export { leadershipTeam, advisoryBoard } from "./teamData";

// Types
export type { 
  TeamMember, 
  Advisor, 
  SocialLinks as SocialLinksType 
} from "./teamData";
export type { TeamSortOption } from "./TeamFilter";

// Hooks
export { useTeamFilters } from "./hooks/useTeamFilters";
