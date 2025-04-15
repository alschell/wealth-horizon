
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Users, ExternalLink, MapPin } from "lucide-react";

interface MeetingDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  meeting: any;
}

const MeetingDetailsDialog = ({ open, onOpenChange, meeting }: MeetingDetailsDialogProps) => {
  if (!meeting) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{meeting.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="border-b pb-2">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{meeting.date}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{meeting.attendees?.join(', ')}</span>
            </div>
            {meeting.type === 'video' && (
              <div className="flex items-center gap-2 mb-2">
                <ExternalLink className="h-4 w-4 text-gray-500" />
                <Button variant="link" className="p-0 h-auto text-blue-600">
                  Join meeting link
                </Button>
              </div>
            )}
            {meeting.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{meeting.location}</span>
              </div>
            )}
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Meeting Details</h4>
            <p className="text-sm text-gray-600">
              This is a {meeting.type} meeting scheduled for {meeting.time}.
              {meeting.type === 'in-person' && ` The meeting will take place at ${meeting.location}.`}
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" className="mr-2">
            Edit Meeting
          </Button>
          <Button variant="destructive">
            Cancel Meeting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingDetailsDialog;
