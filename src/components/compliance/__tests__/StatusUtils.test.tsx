
import React from 'react';
import { render, screen } from '@testing-library/react';
import { 
  getStatusColor, 
  getPriorityLabel, 
  RenderStatusIndicator,
  getStatusLabel,
  getImpactType,
  ComplianceStatus,
  PriorityLevel
} from '../StatusUtils';

describe('StatusUtils', () => {
  describe('getStatusColor', () => {
    it('returns the correct color for each status', () => {
      expect(getStatusColor('completed')).toBe('success');
      expect(getStatusColor('in_progress')).toBe('info');
      expect(getStatusColor('pending')).toBe('warning');
      expect(getStatusColor('overdue')).toBe('error');
      expect(getStatusColor('not_started')).toBe('neutral');
      
      // Test with invalid status - should return neutral as default
      const invalidStatus = 'invalid' as ComplianceStatus;
      expect(getStatusColor(invalidStatus)).toBe('neutral');
    });
  });

  describe('getPriorityLabel', () => {
    it('returns the correct label for each priority level', () => {
      expect(getPriorityLabel('high')).toBe('High Priority');
      expect(getPriorityLabel('medium')).toBe('Medium Priority');
      expect(getPriorityLabel('low')).toBe('Low Priority');
      
      // Test with invalid priority - should return default
      const invalidPriority = 'invalid' as PriorityLevel;
      expect(getPriorityLabel(invalidPriority)).toBe('Normal Priority');
    });
  });

  describe('RenderStatusIndicator', () => {
    it('renders with the correct status type', () => {
      render(<RenderStatusIndicator status="completed" />);
      expect(screen.getByText('Completed')).toBeInTheDocument();
    });

    it('renders with priority label when provided', () => {
      render(<RenderStatusIndicator status="pending" priority="high" />);
      expect(screen.getByText('High Priority')).toBeInTheDocument();
    });

    it('does not show label when showLabel is false', () => {
      render(<RenderStatusIndicator status="pending" showLabel={false} />);
      expect(screen.queryByText('Pending')).not.toBeInTheDocument();
    });
  });

  describe('getImpactType', () => {
    it('returns the correct impact type based on input', () => {
      expect(getImpactType('high')).toBe('error');
      expect(getImpactType('medium')).toBe('warning');
      expect(getImpactType('low')).toBe('info');
      expect(getImpactType('unknown')).toBe('info'); // Default case
    });
  });
});
