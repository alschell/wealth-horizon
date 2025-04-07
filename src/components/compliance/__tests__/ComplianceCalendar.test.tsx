
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ComplianceCalendar } from '../ComplianceCalendar';

const mockEvents = [
  {
    id: 1,
    title: 'Annual Filing',
    date: 'Apr 20, 2025',
    type: 'regulatory'
  },
  {
    id: 2,
    title: 'Tax Deadline',
    date: 'May 15, 2025',
    type: 'tax'
  }
];

describe('ComplianceCalendar', () => {
  it('renders the calendar with events', () => {
    render(<ComplianceCalendar calendarEvents={mockEvents} />);
    
    expect(screen.getByText('Compliance Calendar')).toBeInTheDocument();
    expect(screen.getByText('Annual Filing')).toBeInTheDocument();
    expect(screen.getByText('Tax Deadline')).toBeInTheDocument();
  });
  
  it('shows empty state when no events are provided', () => {
    render(<ComplianceCalendar calendarEvents={[]} />);
    
    expect(screen.getByText('No Upcoming Events')).toBeInTheDocument();
    expect(screen.getByText('No upcoming compliance events scheduled for the next 90 days.')).toBeInTheDocument();
  });
  
  it('shows loading state when isLoading is true', () => {
    render(<ComplianceCalendar calendarEvents={[]} isLoading={true} />);
    
    expect(screen.getByText('Loading calendar events...')).toBeInTheDocument();
  });
});
