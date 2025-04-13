
import { TeamMember, Advisor } from '../teamData';
import { TeamSortOption } from '../TeamFilter';
import { TeamFilterError, TeamSortError } from '../errors/TeamErrors';

/**
 * Filters and sorts team members based on search query and sort option
 * Enhanced with specific error handling
 * @param teamMembers The array of team members to filter and sort
 * @param searchQuery The search query string to filter by
 * @param sortBy The sort option to sort by
 * @returns Filtered and sorted array of team members
 * @throws TeamFilterError if filtering fails
 * @throws TeamSortError if sorting fails
 */
export function filterAndSortTeamMembers(
  teamMembers: ReadonlyArray<TeamMember>,
  searchQuery: string,
  sortBy: TeamSortOption
): ReadonlyArray<TeamMember> {
  try {
    // First filter
    const filtered = teamMembers.filter(member => {
      if (!searchQuery.trim()) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        member.name.toLowerCase().includes(query) ||
        member.title.toLowerCase().includes(query) ||
        member.department.toLowerCase().includes(query) ||
        member.bio.toLowerCase().includes(query)
      );
    });
    
    // Then sort
    try {
      return [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'title':
            return a.title.localeCompare(b.title);
          case 'department':
            return a.department.localeCompare(b.department);
          default:
            return 0;
        }
      });
    } catch (error) {
      console.error('Error sorting team members:', error);
      throw new TeamSortError(`Failed to sort team members by ${sortBy}: ${error instanceof Error ? error.message : 'unknown error'}`);
    }
  } catch (error) {
    console.error('Error filtering team members:', error);
    throw new TeamFilterError(`Failed to filter team members with query "${searchQuery}": ${error instanceof Error ? error.message : 'unknown error'}`);
  }
}

/**
 * Filters and sorts advisors based on search query and sort option
 * Enhanced with specific error handling
 * @param advisors The array of advisors to filter and sort
 * @param searchQuery The search query string to filter by
 * @param sortBy The sort option to sort by
 * @returns Filtered and sorted array of advisors
 * @throws TeamFilterError if filtering fails
 * @throws TeamSortError if sorting fails
 */
export function filterAndSortAdvisors(
  advisors: ReadonlyArray<Advisor>,
  searchQuery: string,
  sortBy: TeamSortOption
): ReadonlyArray<Advisor> {
  try {
    // First filter
    const filtered = advisors.filter(advisor => {
      if (!searchQuery.trim()) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        advisor.name.toLowerCase().includes(query) ||
        advisor.title.toLowerCase().includes(query) ||
        advisor.company.toLowerCase().includes(query) ||
        advisor.bio.toLowerCase().includes(query)
      );
    });
    
    // Then sort
    try {
      return [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'title':
            return a.title.localeCompare(b.title);
          case 'department':
            return a.company.localeCompare(b.company);
          default:
            return 0;
        }
      });
    } catch (error) {
      console.error('Error sorting advisors:', error);
      throw new TeamSortError(`Failed to sort advisors by ${sortBy}: ${error instanceof Error ? error.message : 'unknown error'}`);
    }
  } catch (error) {
    console.error('Error filtering advisors:', error);
    throw new TeamFilterError(`Failed to filter advisors with query "${searchQuery}": ${error instanceof Error ? error.message : 'unknown error'}`);
  }
}
