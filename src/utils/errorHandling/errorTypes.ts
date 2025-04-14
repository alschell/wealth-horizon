
/**
 * Standardized error types for the application
 */

// Base application error
export class AppError extends Error {
  code?: string;
  status?: number;
  
  constructor(message: string, options: { code?: string; status?: number } = {}) {
    super(message);
    this.name = this.constructor.name;
    this.code = options.code;
    this.status = options.status;
    
    // Required for extending Error in TypeScript
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// API request errors
export class APIError extends AppError {
  endpoint?: string;
  
  constructor(message: string, options: { code?: string; status?: number; endpoint?: string } = {}) {
    super(message, options);
    this.endpoint = options.endpoint;
    
    // Required for extending Error in TypeScript
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

// Validation errors
export class ValidationError extends AppError {
  field?: string;
  
  constructor(message: string, options: { field?: string; code?: string } = {}) {
    super(message, { code: options.code, status: 400 });
    this.field = options.field;
    
    // Required for extending Error in TypeScript
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

// Authentication errors
export class AuthError extends AppError {
  constructor(message: string, options: { code?: string; status?: number } = {}) {
    super(message, { ...options, status: options.status || 401 });
    
    // Required for extending Error in TypeScript
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

// Not found errors
export class NotFoundError extends AppError {
  resource?: string;
  
  constructor(message: string, options: { resource?: string; code?: string } = {}) {
    super(message, { code: options.code, status: 404 });
    this.resource = options.resource;
    
    // Required for extending Error in TypeScript
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

// Permission errors
export class PermissionError extends AppError {
  resource?: string;
  
  constructor(message: string, options: { resource?: string; code?: string } = {}) {
    super(message, { code: options.code, status: 403 });
    this.resource = options.resource;
    
    // Required for extending Error in TypeScript
    Object.setPrototypeOf(this, PermissionError.prototype);
  }
}
