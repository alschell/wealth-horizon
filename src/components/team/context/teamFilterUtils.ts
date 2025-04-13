
import { TeamMember, Advisor } from '../teamData';
import { TeamSortOption } from '../TeamFilter';

/**
 * Filter and sort team members based on search query and sort criteria
 * @param members - Array of team members to filter
 * @param searchQuery - Search query string
 * @param sortBy - Sort criteria
 * @returns Filtered and sorted team members
 */
export const filterAndSortTeamMembers = (
  members: TeamMember[],
  searchQuery: string,
  sortBy: TeamSortOption
): TeamMember[] => {
  // Filter by search query
  const filtered = searchQuery 
    ? members.filter(member => {
        const lowercaseQuery = searchQuery.toLowerCase();
        return (
          member.name.toLowerCase().includes(lowercaseQuery) ||
          member.title.toLowerCase().includes(lowercaseQuery) ||
          member.department.toLowerCase().includes(lowercaseQuery)
        );
      })
    : members;
  
  // Sort filtered members
  return [...filtered].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'department') return a.department.localeCompare(b.department);
    return 0;
  });
};

/**
 * Filter and sort advisors based on search query and sort criteria
 * @param advisors - Array of advisors to filter
 * @param searchQuery - Search query string
 * @param sortBy - Sort criteria
 * @returns Filtered and sorted advisors
 */
export const filterAndSortAdvisors = (
  advisors: Advisor[],
  searchQuery: string,
  sortBy: TeamSortOption
): Advisor[] => {
  // Filter by search query
  const filtered = searchQuery 
    ? advisors.filter(advisor => {
        const lowercaseQuery = searchQuery.toLowerCase();
        return (
          advisor.name.toLowerCase().includes(lowercaseQuery) ||
          advisor.title.toLowerCase().includes(lowercaseQuery) ||
          advisor.company.toLowerCase().includes(lowercaseQuery)
        );
      })
    : advisors;
  
  // Sort filtered advisors
  return [...filtered].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'department' && 'company' in a && 'company' in b) {
      return a.company.localeCompare(b.company);
    }
    return 0;
  });
};
