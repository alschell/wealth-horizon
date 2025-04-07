
import React from 'react';
import { Calendar, Button } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

interface ComplianceCalendarProps {
  calendarEvents: Array<{
    id: number;
    title: string;
    date: string;
    type: string;
  }>;
}

export const ComplianceCalendar: React.FC<ComplianceCalendarProps> = ({ calendarEvents }) => {
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
                <Button size="sm" variant="outline">Details</Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <p className="text-muted-foreground">No upcoming compliance events scheduled.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
