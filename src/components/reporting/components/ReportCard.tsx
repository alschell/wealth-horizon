
import React from "react";
import { format } from "date-fns";
import { 
  FileCheck, 
  Clock, 
  Download, 
  Bookmark,
  FileText
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Report, AvailableReport } from "../types";
import { reportTypeIcons } from "../utils/reportingUtils";

interface ReportCardProps {
  report: Report;
  toggleStar: (id: number) => void;
  downloadReport: (id: number) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, toggleStar, downloadReport }) => {
  const ReportIcon = reportTypeIcons[report.type as keyof typeof reportTypeIcons] || FileText;
  
  return (
    <Card key={report.id} className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex gap-2 items-center">
            <ReportIcon className="h-5 w-5 text-gray-500" />
            <CardTitle className="text-lg">{report.title}</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleStar(report.id)}
            className="h-8 w-8 text-gray-400 hover:text-gray-600"
          >
            <Bookmark 
              className={cn("h-5 w-5", report.starred && "fill-gray-600 text-gray-600")} 
            />
            <span className="sr-only">Star</span>
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline" className="text-xs font-normal">
            {report.type}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {format(new Date(report.date), "MMM d, yyyy")}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {report.status === "Processing" ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Processing - will be available soon</span>
          </div>
        ) : (
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <FileCheck className="h-4 w-4 text-gray-500" />
              <span>{(report as AvailableReport).format}</span>
            </div>
            <span className="text-muted-foreground">{(report as AvailableReport).size}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        {report.status === "Available" ? (
          <Button 
            onClick={() => downloadReport(report.id)} 
            className="w-full"
            variant="outline"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        ) : (
          <Button disabled variant="outline" className="w-full">
            <Clock className="mr-2 h-4 w-4" />
            Processing
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ReportCard;
