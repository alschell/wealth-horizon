
import React from "react";
import MeetingCard from "./MeetingCard";

interface MeetingsListProps {
  meetings: any[];
  onViewDetails: (meeting: any) => void;
  actionLabel?: string;
}

const MeetingsList = ({ meetings, onViewDetails, actionLabel }: MeetingsListProps) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {meetings.map(meeting => (
        <MeetingCard 
          key={meeting.id} 
          meeting={meeting} 
          onViewDetails={onViewDetails} 
          actionLabel={actionLabel}
        />
      ))}
    </div>
  );
};

export default MeetingsList;
