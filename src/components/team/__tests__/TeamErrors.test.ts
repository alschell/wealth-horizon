
import {
  TeamError,
  TeamDataFetchError,
  TeamDataValidationError,
  TeamFilterError,
  TeamSortError,
  MissingTeamMemberDataError,
  MissingAdvisorDataError
} from '../errors/TeamErrors';

describe('Team Error Classes', () => {
  describe('Base TeamError', () => {
    it('should create a basic error with correct name and message', () => {
      const error = new TeamError('Test error message');
      expect(error.name).toBe('TeamError');
      expect(error.message).toBe('Test error message');
      expect(error instanceof Error).toBe(true);
    });
    
    it('should maintain stack trace information', () => {
      const error = new TeamError('Stack trace test');
      expect(error.stack).toBeDefined();
    });
  });
  
  describe('TeamDataFetchError', () => {
    it('should use the default message when none provided', () => {
      const error = new TeamDataFetchError();
      expect(error.message).toBe('Failed to fetch team data');
      expect(error.name).toBe('TeamDataFetchError');
    });
    
    it('should use the provided message when specified', () => {
      const message = 'Network error while fetching';
      const error = new TeamDataFetchError(message);
      expect(error.message).toBe(message);
    });
    
    it('should be an instance of TeamError', () => {
      const error = new TeamDataFetchError();
      expect(error instanceof TeamError).toBe(true);
    });
  });
  
  describe('TeamDataValidationError', () => {
    it('should use correct default message', () => {
      const error = new TeamDataValidationError();
      expect(error.message).toBe('Invalid team data structure');
      expect(error.name).toBe('TeamDataValidationError');
    });
    
    it('should be an instance of TeamError', () => {
      const error = new TeamDataValidationError();
      expect(error instanceof TeamError).toBe(true);
    });
  });
  
  describe('Specific Validation Errors', () => {
    it('MissingTeamMemberDataError should include the member ID', () => {
      const memberId = 'user-123';
      const error = new MissingTeamMemberDataError(memberId);
      expect(error.message).toContain(memberId);
      expect(error.name).toBe('MissingTeamMemberDataError');
      expect(error instanceof TeamDataValidationError).toBe(true);
    });
    
    it('MissingAdvisorDataError should include the advisor ID', () => {
      const advisorId = 'advisor-456';
      const error = new MissingAdvisorDataError(advisorId);
      expect(error.message).toContain(advisorId);
      expect(error.name).toBe('MissingAdvisorDataError');
      expect(error instanceof TeamDataValidationError).toBe(true);
    });
  });
  
  describe('Operation Errors', () => {
    it('TeamFilterError should handle basic case', () => {
      const error = new TeamFilterError();
      expect(error.message).toBe('Error filtering team data');
      expect(error.name).toBe('TeamFilterError');
    });
    
    it('TeamSortError should handle basic case', () => {
      const error = new TeamSortError();
      expect(error.message).toBe('Error sorting team data');
      expect(error.name).toBe('TeamSortError');
    });
    
    it('Operation errors should be instances of TeamError', () => {
      expect(new TeamFilterError() instanceof TeamError).toBe(true);
      expect(new TeamSortError() instanceof TeamError).toBe(true);
    });
  });
  
  describe('Error Inheritance Chain', () => {
    it('should maintain proper inheritance relationships', () => {
      const memberError = new MissingTeamMemberDataError('test-id');
      
      expect(memberError instanceof MissingTeamMemberDataError).toBe(true);
      expect(memberError instanceof TeamDataValidationError).toBe(true);
      expect(memberError instanceof TeamError).toBe(true);
      expect(memberError instanceof Error).toBe(true);
      
      // Should not be instances of unrelated error types
      expect(memberError instanceof TeamFilterError).toBe(false);
      expect(memberError instanceof MissingAdvisorDataError).toBe(false);
    });
  });
});
