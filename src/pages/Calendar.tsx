
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { Calendar as CalendarIcon, ArrowLeft, Plus, Video, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock meeting data
const meetings = [
  {
    id: 1,
    title: "Advisory Meeting",
    date: new Date(2025, 3, 10, 14, 0), // April 10, 2025, 2:00 PM
    duration: 60,
    type: "video",
    participants: ["James Thompson", "Sarah Chen", "Michael Roberts"],
    description: "Quarterly portfolio review and strategy discussion"
  },
  {
    id: 2,
    title: "Tax Planning Session",
    date: new Date(2025, 3, 15, 11, 0), // April 15, 2025, 11:00 AM
    duration: 45,
    type: "video",
    participants: ["James Thompson", "David Wilson"],
    description: "Review tax optimization strategies for upcoming fiscal year"
  },
  {
    id: 3,
    title: "Estate Planning Review",
    date: new Date(2025, 3, 22, 10, 0), // April 22, 2025, 10:00 AM
    duration: 90,
    type: "video",
    participants: ["James Thompson", "Emily Parker", "Robert Johnson"],
    description: "Comprehensive review of estate planning documents and strategy"
  }
];

// Utility function to format dates
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// Utility function to format time
const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};

const CalendarPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date(2025, 3, 10)); // Default to April 10, 2025
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  
  // Get meetings for the selected date
  const meetingsForSelectedDate = date 
    ? meetings.filter(meeting => 
        meeting.date.getDate() === date.getDate() &&
        meeting.date.getMonth() === date.getMonth() &&
        meeting.date.getFullYear() === date.getFullYear()
      ) 
    : [];
  
  // Create an array of dates that have meetings
  const meetingDates = meetings.map(meeting => meeting.date);
  
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
          description="Schedule and manage your advisory meetings and appointments"
          iconColor="text-gray-700"
          iconBgColor="bg-gray-100"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow-sm"
                weekStartsOn={1}
                modifiers={{
                  booked: meetingDates,
                }}
                modifiersStyles={{
                  booked: { 
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(155, 135, 245, 0.1)',
                    borderWidth: '1px',
                    borderColor: 'rgb(155, 135, 245)'
                  }
                }}
              />
              
              <div className="mt-4">
                <Button className="w-full" size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Schedule New Meeting
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">
                {date ? formatDate(date) : "No Date Selected"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {meetingsForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {meetingsForSelectedDate.map((meeting) => (
                    <Dialog key={meeting.id}>
                      <DialogTrigger asChild>
                        <div 
                          key={meeting.id} 
                          className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => setSelectedMeeting(meeting)}
                        >
                          <div className="bg-purple-100 p-2 rounded-full">
                            <Video className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{meeting.title}</p>
                            <div className="flex items-center text-gray-600 text-sm mt-1">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>{formatTime(meeting.date)} ({meeting.duration} min)</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm mt-1">
                              <Users className="h-3.5 w-3.5 mr-1" />
                              <span>{meeting.participants.length} participants</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                            {meeting.type === "video" ? "Video Call" : "In Person"}
                          </Badge>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>{meeting.title}</DialogTitle>
                          <DialogDescription>
                            {formatDate(meeting.date)} at {formatTime(meeting.date)}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div>
                            <h4 className="text-sm font-medium">Description</h4>
                            <p className="text-sm text-gray-600 mt-1">{meeting.description}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Duration</h4>
                            <p className="text-sm text-gray-600 mt-1">{meeting.duration} minutes</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Participants</h4>
                            <ul className="text-sm text-gray-600 mt-1 space-y-1">
                              {meeting.participants.map((participant: string, index: number) => (
                                <li key={index}>{participant}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline">Reschedule</Button>
                            <Button>Join Meeting</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <CalendarIcon className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium">No meetings scheduled</h3>
                  <p className="text-gray-500 mt-1">
                    {date 
                      ? `You don't have any meetings scheduled for ${formatDate(date)}.` 
                      : "Select a date to view scheduled meetings."}
                  </p>
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" /> Schedule Meeting
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
