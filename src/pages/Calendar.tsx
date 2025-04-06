
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { Calendar as CalendarIcon, Plus, ArrowLeft, Users, Video, MapPin, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";
import { TimePicker } from "@/components/ui/time-picker";
import { DatePicker } from "@/components/ui/date-picker";

// Mock meeting data
const upcomingMeetings = [
  {
    id: "1",
    title: "Quarterly Portfolio Review",
    date: "April 10, 2025",
    time: "2:00 PM - 3:00 PM EST",
    attendees: ["James Anderson", "Sarah Williams", "Michael Chen"],
    type: "video",
    location: "Zoom"
  },
  {
    id: "2",
    title: "Tax Planning Discussion",
    date: "April 15, 2025",
    time: "10:30 AM - 11:30 AM EST",
    attendees: ["James Anderson", "Robert Johnson", "Emily Tax"],
    type: "video",
    location: "Microsoft Teams"
  },
  {
    id: "3",
    title: "Estate Planning Update",
    date: "April 22, 2025",
    time: "1:00 PM - 2:30 PM EST",
    attendees: ["James Anderson", "Laura Miller", "David Estate"],
    type: "in-person",
    location: "New York Office - Conference Room B"
  }
];

const pastMeetings = [
  {
    id: "4",
    title: "Investment Strategy Session",
    date: "March 24, 2025",
    time: "11:00 AM - 12:00 PM EST",
    attendees: ["James Anderson", "Sarah Williams", "Michael Chen"],
    type: "video",
    location: "Zoom"
  },
  {
    id: "5",
    title: "Annual Review Meeting",
    date: "February 15, 2025",
    time: "3:00 PM - 4:30 PM EST",
    attendees: ["James Anderson", "Robert Johnson", "Emily Tax"],
    type: "in-person",
    location: "New York Office - Conference Room A"
  }
];

const CalendarPage = () => {
  const navigate = useNavigate();
  const [isNewMeetingDialogOpen, setIsNewMeetingDialogOpen] = useState(false);
  const [meetingDetailsDialogOpen, setMeetingDetailsDialogOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [meetingTime, setMeetingTime] = useState("09:00");
  const [meetingDuration, setMeetingDuration] = useState("60");
  const [meetingType, setMeetingType] = useState("video");
  const [meetingInvitees, setMeetingInvitees] = useState("");
  const [meetingLink, setMeetingLink] = useState("");

  const handleScheduleMeeting = () => {
    // In a real app, this would call an API to create the meeting
    toast.success("New meeting scheduled successfully");
    setIsNewMeetingDialogOpen(false);
  };

  const handleViewDetails = (meeting: any) => {
    setSelectedMeeting(meeting);
    setMeetingDetailsDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
        
        <PageHeaderCard
          icon={CalendarIcon}
          title="Calendar"
          description="Schedule and manage your advisory meetings and events"
          iconColor="text-gray-700"
          iconBgColor="bg-gray-100"
        />
        
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">My Meetings</h3>
          <Button 
            onClick={() => setIsNewMeetingDialogOpen(true)}
            className="bg-black hover:bg-gray-800"
          >
            <Plus className="h-4 w-4 mr-2" /> Schedule New Meeting
          </Button>
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {upcomingMeetings.map(meeting => (
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
                          onClick={() => handleViewDetails(meeting)}
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              {pastMeetings.map(meeting => (
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
                          onClick={() => handleViewDetails(meeting)}
                        >
                          View Summary
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Schedule New Meeting Dialog */}
      <Dialog open={isNewMeetingDialogOpen} onOpenChange={setIsNewMeetingDialogOpen}>
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
              <TimePicker
                id="time"
                label="Start Time"
                value={meetingTime}
                onChange={setMeetingTime}
              />
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select value={meetingDuration} onValueChange={setMeetingDuration}>
                  <SelectTrigger>
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
            <Button variant="outline" onClick={() => setIsNewMeetingDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleMeeting} className="bg-black hover:bg-gray-800">
              Schedule Meeting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Meeting Details Dialog */}
      <Dialog open={meetingDetailsDialogOpen} onOpenChange={setMeetingDetailsDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedMeeting?.title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border-b pb-2">
              <div className="flex items-center gap-2 mb-2">
                <CalendarIcon className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{selectedMeeting?.date}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{selectedMeeting?.attendees?.join(', ')}</span>
              </div>
              {selectedMeeting?.type === 'video' && (
                <div className="flex items-center gap-2 mb-2">
                  <ExternalLink className="h-4 w-4 text-gray-500" />
                  <Button variant="link" className="p-0 h-auto text-blue-600">
                    Join meeting link
                  </Button>
                </div>
              )}
              {selectedMeeting?.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{selectedMeeting?.location}</span>
                </div>
              )}
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Meeting Details</h4>
              <p className="text-sm text-gray-600">
                This is a {selectedMeeting?.type} meeting scheduled for {selectedMeeting?.time}.
                {selectedMeeting?.type === 'in-person' && ` The meeting will take place at ${selectedMeeting?.location}.`}
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
    </DashboardLayout>
  );
};

export default CalendarPage;
