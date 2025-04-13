
import { TeamMember, Advisor } from '../teamData';
import { TeamSortOption } from '../TeamFilter';

/**
 * Common base properties for team members and advisors
 */
export interface TeamPersonBase {
  readonly id: string;
  readonly name: string;
  readonly title: string;
  readonly bio: string;
  readonly image: string;
  readonly linkedin?: string;
  readonly twitter?: string;
  readonly github?: string;
}

/**
 * Enhanced type for team members with stricter typing
 */
export type EnhancedTeamMember = TeamMember & {
  readonly department: string;
};

/**
 * Enhanced type for advisors with stricter typing
 */
export type EnhancedAdvisor = Advisor & {
  readonly company: string;
};

/**
 * Team filter state interface
 */
export interface TeamFilterState {
  readonly searchQuery: string;
  readonly sortBy: TeamSortOption;
}

/**
 * Team data loading state
 */
export interface TeamLoadingState {
  readonly isLoading: boolean;
  readonly hasError: boolean;
  readonly errorMessage: string | null;
}

/**
 * Filtering result for team members
 */
export interface TeamFilterResult<T> {
  readonly items: ReadonlyArray<T>;
  readonly totalCount: number;
  readonly filteredCount: number;
}

/**
 * Filter event handlers
 */
export interface TeamFilterHandlers {
  readonly onSearchChange: (query: string) => void;
  readonly onSortChange: (option: TeamSortOption) => void;
}

/**
 * Team section accessibility props
 */
export interface TeamAccessibilityProps {
  readonly ariaLabelledBy?: string;
  readonly ariaLabel?: string;
  readonly role?: string;
}
