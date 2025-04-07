
import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { EmptyState } from './EmptyState';
import { LoadingState } from './LoadingState';
import { ComplianceCalendarProps } from './types';

export const ComplianceCalendar: React.FC<ComplianceCalendarProps> = ({ 
  calendarEvents,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Compliance Calendar</CardTitle>
          <CardDescription>Upcoming compliance deadlines and events</CardDescription>
        </CardHeader>
        <CardContent>
          <LoadingState message="Loading calendar events..." />
        </CardContent>
      </Card>
    );
  }

  const handleViewDetails = (eventId: number) => {
    console.log(`Viewing details for event ${eventId}`);
    // Implementation would go here in a real app
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Calendar</CardTitle>
        <CardDescription>Upcoming compliance deadlines and events</CardDescription>
      </CardHeader>
      <CardContent>
        {calendarEvents.length > 0 ? (
          <div className="space-y-4">
            {calendarEvents.map(event => (
              <div key={event.id} className="flex items-center border-b pb-3 last:border-b-0 last:pb-0">
                <div className="flex-shrink-0 w-14 h-14 bg-gray-100 rounded-md flex flex-col items-center justify-center mr-4">
                  <span className="text-sm font-medium">{event.date.split(' ')[0]}</span>
                  <span className="text-xs text-muted-foreground">{event.date.split(' ')[1].replace(',', '')}</span>
                </div>
                <div className="flex-grow">
                  <p className="font-medium">{event.title}</p>
                  <div className="flex items-center">
                    <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleViewDetails(event.id)}>Details</Button>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Calendar}
            title="No Upcoming Events"
            description="No upcoming compliance events scheduled for the next 90 days."
            action={{
              label: "Add Event",
              onClick: () => console.log("Add calendar event clicked")
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};
