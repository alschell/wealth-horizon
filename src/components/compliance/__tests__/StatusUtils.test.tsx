
import React from 'react';
import { render, screen } from '@testing-library/react';
import { 
  getStatusColor, 
  getStatusLabel, 
  getPriorityLabel, 
  RenderStatusIndicator,
  ComplianceStatus,
  PriorityLevel
} from '../StatusUtils';

describe('StatusUtils', () => {
  describe('getStatusColor', () => {
    it('returns correct color for each status', () => {
      expect(getStatusColor('completed')).toBe('success');
      expect(getStatusColor('in_progress')).toBe('info');
      expect(getStatusColor('pending')).toBe('warning');
      expect(getStatusColor('overdue')).toBe('error');
      expect(getStatusColor('not_started')).toBe('neutral');
    });
    
    it('returns neutral for fallback', () => {
      // TypeScript should prevent this at compile time, but we can test for runtime safety
      // @ts-expect-error Testing invalid input
      expect(getStatusColor('unknown' as ComplianceStatus)).toBe('neutral');
    });
  });
  
  describe('getPriorityLabel', () => {
    it('returns correct label for each priority', () => {
      expect(getPriorityLabel('high')).toBe('High Priority');
      expect(getPriorityLabel('medium')).toBe('Medium Priority');
      expect(getPriorityLabel('low')).toBe('Low Priority');
    });
    
    it('returns normal priority for fallback', () => {
      // TypeScript should prevent this at compile time, but we can test for runtime safety
      // @ts-expect-error Testing invalid input
      expect(getPriorityLabel('unknown' as PriorityLevel)).toBe('Normal Priority');
    });
  });
  
  describe('RenderStatusIndicator', () => {
    it('renders with status indicator', () => {
      render(<RenderStatusIndicator status="completed" />);
      expect(screen.getByText('Completed')).toBeInTheDocument();
    });
    
    it('renders with priority label when priority is provided', () => {
      render(<RenderStatusIndicator status="pending" priority="high" />);
      expect(screen.getByText('High Priority')).toBeInTheDocument();
    });
    
    it('does not render label when showLabel is false', () => {
      render(<RenderStatusIndicator status="completed" showLabel={false} />);
      expect(screen.queryByText('Completed')).not.toBeInTheDocument();
    });
  });
});
