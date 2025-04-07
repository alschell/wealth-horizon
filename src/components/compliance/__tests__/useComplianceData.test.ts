
import { renderHook, waitFor } from '@testing-library/react';
import { useComplianceData } from '../hooks/useComplianceData';

describe('useComplianceData Hook', () => {
  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useComplianceData());
    
    expect(result.current.activeTab).toBe('overview');
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.upcomingFilings).toEqual([]);
    expect(result.current.regulatoryChanges).toEqual([]);
    expect(result.current.calendarEvents).toEqual([]);
  });
  
  it('should initialize with provided tab', () => {
    const { result } = renderHook(() => useComplianceData({ initialTab: 'filings' }));
    
    expect(result.current.activeTab).toBe('filings');
  });
  
  it('should load data and set loading state to false', async () => {
    const { result } = renderHook(() => useComplianceData());
    
    // Initially loading should be true
    expect(result.current.isLoading).toBe(true);
    
    // After data loads, loading should be false and data should be populated
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    expect(result.current.upcomingFilings.length).toBeGreaterThan(0);
    expect(result.current.regulatoryChanges.length).toBeGreaterThan(0);
    expect(result.current.calendarEvents.length).toBeGreaterThan(0);
  });
  
  it('should update activeTab when setActiveTab is called', async () => {
    const { result } = renderHook(() => useComplianceData());
    
    // Wait for initial loading to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    // Update the active tab
    result.current.setActiveTab('calendar');
    
    expect(result.current.activeTab).toBe('calendar');
  });
});
