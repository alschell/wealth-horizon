
/**
 * Custom error types for team-related operations
 * Provides more specific error information for better error handling
 */

// Base error class for all team-related errors
export class TeamError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TeamError';
    // Maintains proper stack trace in modern JavaScript engines
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TeamError);
    }
  }
}

// Specific error for data fetching issues
export class TeamDataFetchError extends TeamError {
  constructor(message: string = 'Failed to fetch team data') {
    super(message);
    this.name = 'TeamDataFetchError';
  }
}

// Specific error for invalid data structure
export class TeamDataValidationError extends TeamError {
  constructor(message: string = 'Invalid team data structure') {
    super(message);
    this.name = 'TeamDataValidationError';
  }
}

// Specific error for filter operations
export class TeamFilterError extends TeamError {
  constructor(message: string = 'Error filtering team data') {
    super(message);
    this.name = 'TeamFilterError';
  }
}

// Specific error for sort operations
export class TeamSortError extends TeamError {
  constructor(message: string = 'Error sorting team data') {
    super(message);
    this.name = 'TeamSortError';
  }
}

// Error for missing team member information
export class MissingTeamMemberDataError extends TeamDataValidationError {
  constructor(memberId: string) {
    super(`Missing required data for team member: ${memberId}`);
    this.name = 'MissingTeamMemberDataError';
  }
}

// Error for missing advisor information
export class MissingAdvisorDataError extends TeamDataValidationError {
  constructor(advisorId: string) {
    super(`Missing required data for advisor: ${advisorId}`);
    this.name = 'MissingAdvisorDataError';
  }
}
