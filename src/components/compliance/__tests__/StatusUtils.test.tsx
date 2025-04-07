
import React from 'react';
import { render, screen } from '@testing-library/react';
import { getStatusColor, getPriorityLabel, RenderStatusIndicator } from '../StatusUtils';

describe('StatusUtils', () => {
  describe('getStatusColor', () => {
    it('returns "success" for completed status', () => {
      expect(getStatusColor('completed')).toBe('success');
    });
    
    it('returns "warning" for pending status', () => {
      expect(getStatusColor('pending')).toBe('warning');
    });
    
    it('returns "error" for overdue status', () => {
      expect(getStatusColor('overdue')).toBe('error');
    });
    
    it('returns "neutral" for unknown status', () => {
      expect(getStatusColor('unknown')).toBe('neutral');
    });
  });
  
  describe('getPriorityLabel', () => {
    it('returns "High Priority" for high priority', () => {
      expect(getPriorityLabel('high')).toBe('High Priority');
    });
    
    it('returns "Medium Priority" for medium priority', () => {
      expect(getPriorityLabel('medium')).toBe('Medium Priority');
    });
    
    it('returns "Low Priority" for low priority', () => {
      expect(getPriorityLabel('low')).toBe('Low Priority');
    });
    
    it('returns "Normal Priority" for unknown priority', () => {
      expect(getPriorityLabel('unknown')).toBe('Normal Priority');
    });
  });
  
  describe('RenderStatusIndicator', () => {
    it('renders status indicator with correct props', () => {
      render(<RenderStatusIndicator status="completed" priority="high" />);
      
      expect(screen.getByText('High Priority')).toBeInTheDocument();
    });
  });
});
