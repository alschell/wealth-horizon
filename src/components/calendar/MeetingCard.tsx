
import React from "react";
import { Button } from "@/components/ui/button";
import { Video, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MeetingCardProps {
  meeting: {
    id: string;
    title: string;
    date: string;
    time: string;
    attendees: string[];
    type: string;
    location: string;
  };
  onViewDetails: (meeting: any) => void;
  actionLabel?: string;
}

const MeetingCard = ({ meeting, onViewDetails, actionLabel = "Details" }: MeetingCardProps) => {
  return (
    <Card key={meeting.id} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 flex items-start gap-4">
          <div className={`mt-1 h-10 w-10 flex items-center justify-center rounded-full 
            ${meeting.type === 'video' ? 'bg-blue-50' : 'bg-green-50'}`}>
            {meeting.type === 'video' ? (
              <Video className={`h-5 w-5 text-blue-600`} />
            ) : (
              <MapPin className={`h-5 w-5 text-green-600`} />
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold">{meeting.title}</h4>
            <div className="mt-1 text-sm text-gray-500">
              <p>{meeting.date} • {meeting.time}</p>
              <p className="mt-1">{meeting.location}</p>
            </div>
            <div className="mt-3 flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              <span>{meeting.attendees.length} attendees</span>
            </div>
          </div>
          <div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewDetails(meeting)}
            >
              {actionLabel}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingCard;
