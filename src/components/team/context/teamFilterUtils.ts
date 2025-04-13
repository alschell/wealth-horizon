
import { TeamMember, Advisor } from '../teamData';
import { TeamSortOption } from '../TeamFilter';
import { TeamFilterError, TeamSortError } from '../errors/TeamErrors';

// Update function signatures to use ReadonlyArray
export function filterAndSortTeamMembers(
  members: ReadonlyArray<TeamMember>, 
  searchQuery: string, 
  sortBy: TeamSortOption
): ReadonlyArray<TeamMember> {
  try {
    // Filter based on search query
    let filtered = searchQuery ? members.filter(member => {
      const query = searchQuery.toLowerCase();
      return (
        member.name.toLowerCase().includes(query) ||
        member.title.toLowerCase().includes(query) ||
        member.department.toLowerCase().includes(query)
      );
    }) : members;
    
    // Sort the filtered results
    return [...filtered].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'department') return a.department.localeCompare(b.department);
      return 0;
    });
  } catch (error) {
    console.error('Error filtering team members:', error);
    if (error instanceof Error) {
      if (searchQuery) {
        throw new TeamFilterError(`Error filtering team members with query: ${searchQuery}`, {
          details: { searchQuery, sortBy },
          cause: error
        });
      } else {
        throw new TeamSortError(`Error sorting team members by: ${sortBy}`, {
          details: { sortBy },
          cause: error
        });
      }
    }
    throw error;
  }
}

export function filterAndSortAdvisors(
  advisors: ReadonlyArray<Advisor>, 
  searchQuery: string, 
  sortBy: TeamSortOption
): ReadonlyArray<Advisor> {
  try {
    // Filter based on search query
    let filtered = searchQuery ? advisors.filter(advisor => {
      const query = searchQuery.toLowerCase();
      return (
        advisor.name.toLowerCase().includes(query) ||
        advisor.title.toLowerCase().includes(query) ||
        advisor.company.toLowerCase().includes(query)
      );
    }) : advisors;
    
    // Sort the filtered results
    return [...filtered].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'department') return a.company.localeCompare(b.company);
      return 0;
    });
  } catch (error) {
    console.error('Error filtering advisors:', error);
    if (error instanceof Error) {
      if (searchQuery) {
        throw new TeamFilterError(`Error filtering advisors with query: ${searchQuery}`, {
          details: { searchQuery, sortBy },
          cause: error
        });
      } else {
        throw new TeamSortError(`Error sorting advisors by: ${sortBy}`, {
          details: { sortBy },
          cause: error
        });
      }
    }
    throw error;
  }
}
