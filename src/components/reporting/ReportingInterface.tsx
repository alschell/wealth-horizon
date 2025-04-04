
import React, { useState } from "react";
import { FileText, FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Report } from "./types";
import { reportsData, scheduledReportsData } from "./data/mockData";
import AvailableReportsTab from "./sections/AvailableReportsTab";
import ScheduledReportsTab from "./sections/ScheduledReportsTab";
import TemplatesTab from "./sections/TemplatesTab";

const ReportingInterface: React.FC = () => {
  const [date, setDate] = React.useState<Date>();
  const [reports, setReports] = useState<Report[]>(reportsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  const toggleStar = (id: number) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, starred: !report.starred } : report
    ));
  };

  const downloadReport = (id: number) => {
    const report = reports.find(r => r.id === id);
    if (report) {
      toast({
        title: "Download started",
        description: `${report.title} is downloading.`,
      });
    }
  };

  const handleRequestReport = () => {
    toast({
      title: "Report requested",
      description: "Your custom report request has been submitted.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <FileText className="h-6 w-6 text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Reporting</h1>
            <p className="text-muted-foreground">
              Generate, download, and schedule financial reports
            </p>
          </div>
        </div>
        <Button onClick={handleRequestReport} className="flex items-center gap-2">
          <FilePlus className="h-4 w-4" />
          Request New Report
        </Button>
      </div>

      <Tabs defaultValue="available" className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">Available Reports</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <AvailableReportsTab
            reports={reports}
            setReports={setReports}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            date={date}
            setDate={setDate}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            toggleStar={toggleStar}
            downloadReport={downloadReport}
          />
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <ScheduledReportsTab scheduledReports={scheduledReportsData} />
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <TemplatesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportingInterface;
