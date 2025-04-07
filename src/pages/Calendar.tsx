
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { CalendarIcon, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import MeetingsList from "@/components/calendar/MeetingsList";
import MeetingDetailsDialog from "@/components/calendar/MeetingDetailsDialog";
import NewMeetingDialog from "@/components/calendar/NewMeetingDialog";
import { upcomingMeetings, pastMeetings } from "@/components/calendar/meetingsData";

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
            <MeetingsList 
              meetings={upcomingMeetings} 
              onViewDetails={handleViewDetails} 
              actionLabel="Details"
            />
          </TabsContent>
          
          <TabsContent value="past" className="mt-4">
            <MeetingsList 
              meetings={pastMeetings} 
              onViewDetails={handleViewDetails} 
              actionLabel="View Summary"
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Meeting Details Dialog */}
      <MeetingDetailsDialog
        open={meetingDetailsDialogOpen}
        onOpenChange={setMeetingDetailsDialogOpen}
        meeting={selectedMeeting}
      />
      
      {/* New Meeting Dialog */}
      <NewMeetingDialog
        open={isNewMeetingDialogOpen}
        onOpenChange={setIsNewMeetingDialogOpen}
        onSchedule={handleScheduleMeeting}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        meetingTime={meetingTime}
        setMeetingTime={setMeetingTime}
        meetingDuration={meetingDuration}
        setMeetingDuration={setMeetingDuration}
        meetingType={meetingType}
        setMeetingType={setMeetingType}
        meetingLink={meetingLink}
        setMeetingLink={setMeetingLink}
        meetingInvitees={meetingInvitees}
        setMeetingInvitees={setMeetingInvitees}
      />
    </DashboardLayout>
  );
};

export default CalendarPage;
