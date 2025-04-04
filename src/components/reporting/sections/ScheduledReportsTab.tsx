
import React from "react";
import { format } from "date-fns";
import { Calendar, FilePlus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScheduledReport } from "../types";

interface ScheduledReportsTabProps {
  scheduledReports: ScheduledReport[];
}

const ScheduledReportsTab: React.FC<ScheduledReportsTabProps> = ({ scheduledReports }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Scheduled Reports
          </CardTitle>
          <Button size="sm">
            <FilePlus className="mr-2 h-4 w-4" />
            Schedule New Report
          </Button>
        </div>
        <CardDescription>
          Reports that are automatically generated and sent on a schedule
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-[1fr,auto,auto,auto] px-4 py-3 text-sm font-medium bg-muted/50">
            <div>Report Title</div>
            <div>Frequency</div>
            <div>Next Generation</div>
            <div></div>
          </div>
          <Separator />
          {scheduledReports.map((report, i) => (
            <div key={report.id}>
              <div className="grid grid-cols-[1fr,auto,auto,auto] items-center px-4 py-3">
                <div>
                  <div className="font-medium">{report.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {report.recipients.join(", ")}
                  </div>
                </div>
                <Badge variant="outline" className="justify-self-start">
                  {report.frequency}
                </Badge>
                <div className="text-sm">
                  {format(new Date(report.nextDate), "MMM d, yyyy")}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit schedule</DropdownMenuItem>
                    <DropdownMenuItem>Edit recipients</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Delete schedule
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {i < scheduledReports.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduledReportsTab;
