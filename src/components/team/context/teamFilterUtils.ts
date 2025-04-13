import { TeamMember, Advisor } from '../teamData';
import { TeamSortOption } from '../TeamFilter';
import { 
  TeamFilterError, 
  TeamSortError 
} from '../errors/TeamErrors';
import { 
  SortOptions, 
  FilterOptions,
  SortField
} from '../types/advancedTeamTypes';

// Cache for expensive filter operations
const filterCache = new Map<string, ReadonlyArray<TeamMember | Advisor>>();

// Helper to get cache key
const getCacheKey = (items: any[], query: string, sort: string): string => {
  return `${query}:${sort}:${items.length}`;
};

// Helper for type-safe localized string comparison
const compareStrings = (a: string, b: string, options?: Intl.CollatorOptions): number => {
  return a.localeCompare(b, undefined, options || { sensitivity: 'base' });
};

/**
 * Enhanced filtering and sorting for team members with performance optimizations
 * Uses caching for repeated operations and provides detailed error information
 * 
 * @param teamMembers The array of team members to filter and sort
 * @param searchQuery The search query string to filter by
 * @param sortBy The sort option to sort by
 * @param options Additional filtering and sorting options
 * @returns Filtered and sorted array of team members
 * @throws TeamFilterError if filtering fails
 * @throws TeamSortError if sorting fails
 */
export function filterAndSortTeamMembers(
  teamMembers: ReadonlyArray<TeamMember>,
  searchQuery: string,
  sortBy: TeamSortOption,
  options?: {
    filterOptions?: FilterOptions,
    sortOptions?: Partial<SortOptions>
  }
): ReadonlyArray<TeamMember> {
  try {
    // Check cache first for performance
    const cacheKey = getCacheKey(teamMembers as any[], searchQuery, sortBy);
    if (filterCache.has(cacheKey)) {
      console.debug('Cache hit for filter operation:', cacheKey);
      return filterCache.get(cacheKey) as ReadonlyArray<TeamMember>;
    }
    
    console.debug('Cache miss for filter operation:', cacheKey);
    
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
    
    // Apply additional filters if provided
    const finalFiltered = options?.filterOptions 
      ? applyAdvancedFilters(filtered, options.filterOptions)
      : filtered;
    
    // Then sort
    try {
      // Use advanced sort if provided
      const sortField = mapSortOptionToField(sortBy);
      const sortDirection = options?.sortOptions?.direction || 'asc';
      const localeOptions = options?.sortOptions?.localeOptions;
      
      const result = [...finalFiltered].sort((a, b) => {
        const multiplier = sortDirection === 'asc' ? 1 : -1;
        
        switch (sortField) {
          case 'name':
            return multiplier * compareStrings(a.name, b.name, localeOptions);
          case 'title':
            return multiplier * compareStrings(a.title, b.title, localeOptions);
          case 'department':
            return multiplier * compareStrings(a.department, b.department, localeOptions);
          default:
            return 0;
        }
      });
      
      // Store in cache for future use
      filterCache.set(cacheKey, result);
      
      // Limit cache size to prevent memory issues
      if (filterCache.size > 100) {
        const oldestKey = filterCache.keys().next().value;
        filterCache.delete(oldestKey);
      }
      
      return result;
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
 * Enhanced filtering and sorting for advisors with performance optimizations
 * Uses caching for repeated operations and provides detailed error information
 * 
 * @param advisors The array of advisors to filter and sort
 * @param searchQuery The search query string to filter by
 * @param sortBy The sort option to sort by
 * @param options Additional filtering and sorting options
 * @returns Filtered and sorted array of advisors
 * @throws TeamFilterError if filtering fails
 * @throws TeamSortError if sorting fails
 */
export function filterAndSortAdvisors(
  advisors: ReadonlyArray<Advisor>,
  searchQuery: string,
  sortBy: TeamSortOption,
  options?: {
    filterOptions?: FilterOptions,
    sortOptions?: Partial<SortOptions>
  }
): ReadonlyArray<Advisor> {
  try {
    // Check cache first for performance
    const cacheKey = getCacheKey(advisors as any[], searchQuery, sortBy);
    if (filterCache.has(cacheKey)) {
      console.debug('Cache hit for advisor filter operation:', cacheKey);
      return filterCache.get(cacheKey) as ReadonlyArray<Advisor>;
    }
    
    console.debug('Cache miss for advisor filter operation:', cacheKey);
    
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
    
    // Apply additional filters if provided
    const finalFiltered = options?.filterOptions 
      ? applyAdvancedAdvisorFilters(filtered, options.filterOptions)
      : filtered;
    
    // Then sort
    try {
      // Use enhanced sort options
      const sortField = mapSortOptionToField(sortBy);
      const sortDirection = options?.sortOptions?.direction || 'asc';
      const localeOptions = options?.sortOptions?.localeOptions;
      
      const result = [...finalFiltered].sort((a, b) => {
        const multiplier = sortDirection === 'asc' ? 1 : -1;
        
        switch (sortField) {
          case 'name':
            return multiplier * compareStrings(a.name, b.name, localeOptions);
          case 'title':
            return multiplier * compareStrings(a.title, b.title, localeOptions);
          case 'company': // 'department' maps to 'company' for advisors
            return multiplier * compareStrings(a.company, b.company, localeOptions);
          default:
            return 0;
        }
      });
      
      // Store in cache for future use
      filterCache.set(cacheKey, result);
      
      // Limit cache size to prevent memory issues
      if (filterCache.size > 100) {
        const oldestKey = filterCache.keys().next().value;
        filterCache.delete(oldestKey);
      }
      
      return result;
    } catch (error) {
      console.error('Error sorting advisors:', error);
      throw new TeamSortError(`Failed to sort advisors by ${sortBy}: ${error instanceof Error ? error.message : 'unknown error'}`);
    }
  } catch (error) {
    console.error('Error filtering advisors:', error);
    throw new TeamFilterError(`Failed to filter advisors with query "${searchQuery}": ${error instanceof Error ? error.message : 'unknown error'}`);
  }
}

// Helper function to map sort option to field
function mapSortOptionToField(sortOption: TeamSortOption): SortField {
  switch (sortOption) {
    case 'name': return 'name';
    case 'title': return 'title';
    case 'department': return 'department';
    default: return 'name';
  }
}

// Apply advanced filters to team members
function applyAdvancedFilters(
  members: ReadonlyArray<TeamMember>, 
  filterOptions: FilterOptions
): ReadonlyArray<TeamMember> {
  return members.filter(member => {
    // Filter by departments if specified
    if (filterOptions.departments && filterOptions.departments.length > 0) {
      if (!filterOptions.departments.includes(member.department as any)) {
        return false;
      }
    }
    
    // Filter by excluded IDs
    if (filterOptions.excludeIds && filterOptions.excludeIds.includes(member.id)) {
      return false;
    }
    
    // Additional filters can be added here...
    
    return true;
  });
}

// Apply advanced filters to advisors
function applyAdvancedAdvisorFilters(
  advisors: ReadonlyArray<Advisor>, 
  filterOptions: FilterOptions
): ReadonlyArray<Advisor> {
  return advisors.filter(advisor => {
    // Filter by excluded IDs
    if (filterOptions.excludeIds && filterOptions.excludeIds.includes(advisor.id)) {
      return false;
    }
    
    // Additional advisor-specific filters can be added here...
    
    return true;
  });
}

// Clear the filter cache
export function clearFilterCache(): void {
  filterCache.clear();
  console.debug('Filter cache cleared');
}
