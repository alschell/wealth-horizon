
import { getStatusColor, getPriorityLabel } from '../StatusUtils';

describe('StatusUtils', () => {
  describe('getStatusColor', () => {
    it('should return "success" for completed status', () => {
      expect(getStatusColor('completed')).toBe('success');
    });

    it('should return "warning" for pending status', () => {
      expect(getStatusColor('pending')).toBe('warning');
    });

    it('should return "error" for overdue status', () => {
      expect(getStatusColor('overdue')).toBe('error');
    });

    it('should return "neutral" for unknown status', () => {
      expect(getStatusColor('unknown')).toBe('neutral');
    });
  });

  describe('getPriorityLabel', () => {
    it('should return "High Priority" for high priority', () => {
      expect(getPriorityLabel('high')).toBe('High Priority');
    });

    it('should return "Medium Priority" for medium priority', () => {
      expect(getPriorityLabel('medium')).toBe('Medium Priority');
    });

    it('should return "Low Priority" for low priority', () => {
      expect(getPriorityLabel('low')).toBe('Low Priority');
    });

    it('should return "Normal Priority" for unknown priority', () => {
      expect(getPriorityLabel('unknown')).toBe('Normal Priority');
    });
  });
});
