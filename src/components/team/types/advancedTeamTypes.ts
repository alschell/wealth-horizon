
/**
 * Enhanced type definitions for team-related data
 * Provides more granular and safer type checking
 */

// Social media platform links with validation
export type SocialPlatform = 'linkedin' | 'twitter' | 'github' | 'facebook' | 'instagram';

export type SocialLink = {
  platform: SocialPlatform;
  url: string;
  username?: string;
};

// Department or functional area classifications
export type Department = 
  | 'Executive' 
  | 'Technology' 
  | 'Finance' 
  | 'Marketing' 
  | 'Sales' 
  | 'Operations' 
  | 'Product' 
  | 'Legal' 
  | 'Human Resources' 
  | 'Client Services' 
  | 'Investment' 
  | 'Research'
  | string; // Allow custom departments

// Base interface with common properties and strict validation
export interface TeamPersonBase {
  /** Unique identifier (UUID preferred) */
  id: string;
  /** Full name of the person */
  name: string;
  /** Job title or position */
  title: string;
  /** Professionally written biography */
  bio: string;
  /** Profile image path or URL */
  image: string;
  /** Collection of social media links */
  socialLinks?: SocialLink[];
  /** Email address (validated format) */
  email?: string;
  /** Contact information (optional) */
  contact?: {
    phone?: string;
    extension?: string;
    office?: string;
  };
  /** Additional professional details */
  details?: Record<string, unknown>;
}

// Leadership team member with department information
export interface EnhancedTeamMember extends TeamPersonBase {
  /** Department they belong to */
  department: Department;
  /** Position/rank within the company (e.g., C-level, Director) */
  level?: 'C-Suite' | 'Executive' | 'Senior Management' | 'Management' | 'Staff';
  /** Years with the company */
  tenure?: number;
  /** Direct reports count */
  directReports?: number;
  /** Previous roles at the company */
  previousRoles?: Array<{
    title: string;
    department: Department;
    startYear: number;
    endYear?: number;
  }>;
}

// Advisory board member with company affiliation and expertise
export interface EnhancedAdvisor extends TeamPersonBase {
  /** Company or organization affiliation */
  company: string;
  /** Areas of expertise */
  expertise?: string[];
  /** Academic credentials */
  credentials?: string[];
  /** Advisory board appointment date */
  appointedDate?: string; // YYYY-MM-DD format
  /** Whether they are a founding advisor */
  isFoundingAdvisor?: boolean;
}

// Type for team size analytics
export interface TeamComposition {
  departmentCounts: Record<string, number>;
  totalMembers: number;
  executiveCount: number;
  averageTenure?: number;
}

// Type for improved sorting options with locale awareness
export type SortField = 'name' | 'title' | 'department' | 'company' | 'tenure';

export interface SortOptions {
  field: SortField;
  direction: 'asc' | 'desc';
  localeOptions?: Intl.CollatorOptions;
}

// Used for type-safe filtering of team data
export interface FilterOptions {
  searchQuery?: string;
  departments?: Department[];
  expertise?: string[];
  joinedAfter?: Date;
  minTenure?: number;
  excludeIds?: string[];
}
