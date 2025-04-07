
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";

interface NewMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSchedule: () => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  meetingTime: string;
  setMeetingTime: (time: string) => void;
  meetingDuration: string;
  setMeetingDuration: (duration: string) => void;
  meetingType: string;
  setMeetingType: (type: string) => void;
  meetingLink: string;
  setMeetingLink: (link: string) => void;
  meetingInvitees: string;
  setMeetingInvitees: (invitees: string) => void;
}

const NewMeetingDialog = ({
  open,
  onOpenChange,
  onSchedule,
  selectedDate,
  setSelectedDate,
  meetingTime,
  setMeetingTime,
  meetingDuration,
  setMeetingDuration,
  meetingType,
  setMeetingType,
  meetingLink,
  setMeetingLink,
  meetingInvitees,
  setMeetingInvitees
}: NewMeetingDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule New Meeting</DialogTitle>
          <DialogDescription>
            Fill in the details below to schedule a new advisory meeting.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="title">Meeting Title</Label>
            <Input id="title" placeholder="Enter meeting title" />
          </div>
          
          <div className="space-y-2">
            <DatePicker
              label="Meeting Date"
              placeholder="Select date"
              value={selectedDate}
              onChange={setSelectedDate}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <TimePicker
                id="time"
                label="Start Time"
                value={meetingTime}
                onChange={setMeetingTime}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select value={meetingDuration} onValueChange={setMeetingDuration}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                  <SelectItem value="120">120 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Meeting Type</Label>
            <Select value={meetingType} onValueChange={setMeetingType}>
              <SelectTrigger>
                <SelectValue placeholder="Select meeting type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Video Call</SelectItem>
                <SelectItem value="in-person">In-person</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="meetingLink">Meeting Link</Label>
            <Input 
              id="meetingLink" 
              placeholder="Paste Google Meet, Microsoft Teams, or Zoom link" 
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="invitees">Invitees (email addresses)</Label>
            <Textarea 
              id="invitees" 
              placeholder="Enter email addresses separated by commas"
              value={meetingInvitees}
              onChange={(e) => setMeetingInvitees(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter meeting details" className="min-h-[100px]" />
          </div>
        </div>
        
        <DialogFooter className="flex space-x-2 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSchedule} className="bg-black hover:bg-gray-800">
            Schedule Meeting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewMeetingDialog;
