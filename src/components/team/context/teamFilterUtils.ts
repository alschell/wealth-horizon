
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
  members: readonly TeamMember[],
  searchQuery: string,
  sortBy: TeamSortOption
): readonly TeamMember[] => {
  try {
    // Filter by search query
    const filtered = searchQuery.trim() 
      ? members.filter(member => {
          const lowercaseQuery = searchQuery.toLowerCase().trim();
          // Check for matches in various fields
          return (
            member.name.toLowerCase().includes(lowercaseQuery) ||
            member.title.toLowerCase().includes(lowercaseQuery) ||
            member.department.toLowerCase().includes(lowercaseQuery) ||
            (member.bio && member.bio.toLowerCase().includes(lowercaseQuery))
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
  } catch (error) {
    console.error('Error filtering or sorting team members:', error);
    return members; // Return original data on error
  }
};

/**
 * Filter and sort advisors based on search query and sort criteria
 * @param advisors - Array of advisors to filter
 * @param searchQuery - Search query string
 * @param sortBy - Sort criteria
 * @returns Filtered and sorted advisors
 */
export const filterAndSortAdvisors = (
  advisors: readonly Advisor[],
  searchQuery: string,
  sortBy: TeamSortOption
): readonly Advisor[] => {
  try {
    // Filter by search query
    const filtered = searchQuery.trim() 
      ? advisors.filter(advisor => {
          const lowercaseQuery = searchQuery.toLowerCase().trim();
          // Check for matches in various fields
          return (
            advisor.name.toLowerCase().includes(lowercaseQuery) ||
            advisor.title.toLowerCase().includes(lowercaseQuery) ||
            advisor.company.toLowerCase().includes(lowercaseQuery) ||
            (advisor.bio && advisor.bio.toLowerCase().includes(lowercaseQuery))
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
  } catch (error) {
    console.error('Error filtering or sorting advisors:', error);
    return advisors; // Return original data on error
  }
};

/**
 * Creates a general search function for team items
 * @param searchableFields - Fields to search in
 * @returns A search function
 */
export const createSearchFunction = <T extends Record<string, any>>(searchableFields: string[]) => {
  return (items: readonly T[], searchQuery: string): readonly T[] => {
    if (!searchQuery.trim()) return items;
    
    const lowercaseQuery = searchQuery.toLowerCase().trim();
    
    return items.filter(item => 
      searchableFields.some(field => {
        const value = item[field];
        return typeof value === 'string' && value.toLowerCase().includes(lowercaseQuery);
      })
    );
  };
};

/**
 * Creates a general sort function for team items
 * @returns A sort function
 */
export const createSortFunction = <T extends Record<string, any>>(fieldMappings: Record<string, string>) => {
  return (items: readonly T[], sortBy: string): readonly T[] => {
    const field = fieldMappings[sortBy] || 'name';
    
    return [...items].sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];
      
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB);
      }
      
      return 0;
    });
  };
};
