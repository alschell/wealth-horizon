
/**
 * Custom error classes for team-related operations
 * Provides structured error handling and better debugging
 */

export class TeamError extends Error {
  code: string;
  details: Record<string, any>;
  timestamp: string;
  
  constructor(message: string, options?: { code?: string; details?: Record<string, any>; cause?: Error }) {
    super(message, { cause: options?.cause });
    this.name = 'TeamError';
    this.code = options?.code || 'TEAM_ERROR';
    this.details = options?.details || {};
    this.timestamp = new Date().toISOString();
    
    // Capture stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TeamError);
    }
  }
  
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      details: this.details,
      timestamp: this.timestamp,
      cause: this.cause ? (this.cause as Error).message : undefined,
      stack: this.stack
    };
  }
}

export class TeamDataError extends TeamError {
  constructor(message: string, options?: { details?: Record<string, any>; cause?: Error }) {
    super(message, { 
      code: 'TEAM_DATA_ERROR',
      details: options?.details,
      cause: options?.cause
    });
    this.name = 'TeamDataError';
  }
}

export class TeamFilterError extends TeamError {
  constructor(message: string, options?: { details?: Record<string, any>; cause?: Error }) {
    super(message, { 
      code: 'TEAM_FILTER_ERROR',
      details: options?.details,
      cause: options?.cause
    });
    this.name = 'TeamFilterError';
  }
}

export class TeamImageError extends TeamError {
  constructor(message: string, options?: { name?: string; url?: string; cause?: Error }) {
    super(message, { 
      code: 'TEAM_IMAGE_ERROR',
      details: {
        name: options?.name,
        url: options?.url,
        statusCode: options?.cause instanceof Error && 'status' in options.cause 
          ? (options.cause as any).status 
          : undefined
      },
      cause: options?.cause
    });
    this.name = 'TeamImageError';
  }
}

export class TeamAccessibilityError extends TeamError {
  constructor(message: string, options?: { element?: string; issue?: string; cause?: Error }) {
    super(message, { 
      code: 'TEAM_ACCESSIBILITY_ERROR',
      details: {
        element: options?.element,
        issue: options?.issue
      },
      cause: options?.cause
    });
    this.name = 'TeamAccessibilityError';
  }
}
