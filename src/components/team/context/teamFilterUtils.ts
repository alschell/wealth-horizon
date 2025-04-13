
import { TeamMember, Advisor } from '../teamData';
import { TeamSortOption } from '../TeamFilter';

/**
 * Filters and sorts team members based on search query and sort option
 * @param teamMembers The array of team members to filter and sort
 * @param searchQuery The search query string to filter by
 * @param sortBy The sort option to sort by
 * @returns Filtered and sorted array of team members
 */
export function filterAndSortTeamMembers(
  teamMembers: ReadonlyArray<TeamMember>,
  searchQuery: string,
  sortBy: TeamSortOption
): ReadonlyArray<TeamMember> {
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
}

/**
 * Filters and sorts advisors based on search query and sort option
 * @param advisors The array of advisors to filter and sort
 * @param searchQuery The search query string to filter by
 * @param sortBy The sort option to sort by
 * @returns Filtered and sorted array of advisors
 */
export function filterAndSortAdvisors(
  advisors: ReadonlyArray<Advisor>,
  searchQuery: string,
  sortBy: TeamSortOption
): ReadonlyArray<Advisor> {
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
}
