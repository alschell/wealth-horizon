
import React, { useState } from "react";
import { 
  FileText, 
  Download, 
  Calendar, 
  BarChart3, 
  LineChart, 
  Filter, 
  ArrowUpDown, 
  FileCheck,
  FilePlus,
  Clock,
  ChevronDown,
  Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

// Define proper types for our report data
interface ReportBase {
  id: number;
  title: string;
  type: string;
  date: string;
  status: string;
  category: string;
  starred?: boolean;
}

interface AvailableReport extends ReportBase {
  status: "Available";
  format: string;
  size: string;
}

interface ProcessingReport extends ReportBase {
  status: "Processing";
  format?: string;
  size?: string;
}

type Report = AvailableReport | ProcessingReport;

// Sample report data
const reportsData: Report[] = [
  {
    id: 1,
    title: "Q1 2025 Performance Report",
    type: "Performance",
    date: "2025-04-01",
    status: "Available",
    format: "PDF",
    size: "2.4 MB",
    category: "portfolio",
    starred: true
  },
  {
    id: 2,
    title: "March 2025 Transaction Report",
    type: "Transactions",
    date: "2025-03-31",
    status: "Available",
    format: "XLSX",
    size: "1.8 MB",
    category: "transaction"
  },
  {
    id: 3,
    title: "Risk Analysis Report",
    type: "Risk",
    date: "2025-03-25",
    status: "Available",
    format: "PDF",
    size: "3.2 MB",
    category: "risk"
  },
  {
    id: 4,
    title: "Q4 2024 Performance Report",
    type: "Performance",
    date: "2025-01-15",
    status: "Available",
    format: "PDF",
    size: "2.6 MB",
    category: "portfolio"
  },
  {
    id: 5,
    title: "Tax Documentation 2024",
    type: "Tax",
    date: "2025-02-28",
    status: "Available",
    format: "PDF",
    size: "4.1 MB",
    category: "tax"
  },
  {
    id: 6,
    title: "Custom Wealth Report",
    type: "Custom",
    date: "2025-04-06",
    status: "Processing",
    category: "custom"
  },
  {
    id: 7,
    title: "ESG Impact Analysis",
    type: "ESG",
    date: "2025-03-10",
    status: "Available",
    format: "PDF",
    size: "2.9 MB",
    category: "esg"
  }
];

// Sample scheduled reports
const scheduledReports = [
  {
    id: 1,
    title: "Monthly Performance Summary",
    frequency: "Monthly",
    nextDate: "2025-05-01",
    format: "PDF",
    recipients: ["your.email@example.com"]
  },
  {
    id: 2,
    title: "Transaction Report",
    frequency: "Weekly",
    nextDate: "2025-04-11",
    format: "XLSX",
    recipients: ["your.email@example.com", "advisor@example.com"]
  },
  {
    id: 3,
    title: "Portfolio Valuation",
    frequency: "Daily",
    nextDate: "2025-04-05",
    format: "PDF",
    recipients: ["your.email@example.com"]
  }
];

// Icon mapping for report types
const reportTypeIcons = {
  "Performance": BarChart3,
  "Transactions": ArrowUpDown,
  "Risk": LineChart,
  "Tax": FileText,
  "Custom": FilePlus,
  "ESG": Bookmark
};

const ReportingInterface: React.FC = () => {
  const [date, setDate] = React.useState<Date>();
  const [reports, setReports] = useState<Report[]>(reportsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  // Filter and sort reports
  const filteredReports = reports
    .filter(report => 
      (selectedCategory === "all" || report.category === selectedCategory) &&
      (report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       report.type.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortDirection === "desc" 
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "title") {
        return sortDirection === "desc" 
          ? b.title.localeCompare(a.title)
          : a.title.localeCompare(b.title);
      } else if (sortBy === "type") {
        return sortDirection === "desc" 
          ? b.type.localeCompare(a.type)
          : a.type.localeCompare(b.type);
      }
      return 0;
    });

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "desc" ? "asc" : "desc");
  };

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
          <FileText className="h-8 w-8 text-black" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reporting</h1>
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
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-2 flex-1 flex-wrap">
              <div className="w-full md:w-auto">
                <Input
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-[250px]"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="portfolio">Portfolio</SelectItem>
                  <SelectItem value="transaction">Transactions</SelectItem>
                  <SelectItem value="risk">Risk Analysis</SelectItem>
                  <SelectItem value="tax">Tax</SelectItem>
                  <SelectItem value="esg">ESG</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full md:w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Filter by date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                  {date && (
                    <div className="p-3 border-t border-border">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setDate(undefined)}
                        className="w-full"
                      >
                        Clear date
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortBy("date")}>
                    Date {sortBy === "date" && (sortDirection === "desc" ? "↓" : "↑")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("title")}>
                    Name {sortBy === "title" && (sortDirection === "desc" ? "↓" : "↑")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("type")}>
                    Type {sortBy === "type" && (sortDirection === "desc" ? "↓" : "↑")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={toggleSortDirection}>
                    {sortDirection === "desc" ? "Ascending order" : "Descending order"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {filteredReports.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredReports.map((report) => {
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
                          className="h-8 w-8 text-gray-400 hover:text-amber-400"
                        >
                          <Bookmark 
                            className={cn("h-5 w-5", report.starred && "fill-amber-400 text-amber-400")} 
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
              })}
            </div>
          ) : (
            <div className="bg-muted/50 rounded-lg p-8 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No reports found</h3>
              <p className="text-muted-foreground mb-4">
                No reports match your current filters. Try adjusting your search criteria.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setDate(undefined);
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Report Templates
                </CardTitle>
                <Button size="sm">Create Template</Button>
              </div>
              <CardDescription>
                Customize and save report templates for future use
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-muted/50 border-dashed">
                  <CardHeader>
                    <CardTitle className="text-lg">Portfolio Overview</CardTitle>
                    <CardDescription>
                      Performance summary with asset allocation details
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Generate Report</Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-muted/50 border-dashed">
                  <CardHeader>
                    <CardTitle className="text-lg">Transaction History</CardTitle>
                    <CardDescription>
                      Detailed view of all transactions across accounts
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Generate Report</Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-muted/50 border-dashed">
                  <CardHeader>
                    <CardTitle className="text-lg">Tax Reporting</CardTitle>
                    <CardDescription>
                      Year-end tax documentation and summary
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Generate Report</Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportingInterface;
