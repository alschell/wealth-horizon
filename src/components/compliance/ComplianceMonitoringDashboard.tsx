
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/ui/design-system";
import PageTransition from "@/components/ui/page-transition";
import { 
  AlertCircle, 
  CheckCircle, 
  Calendar, 
  Clock, 
  FileText, 
  Shield, 
  AlertTriangle,
  ArrowUpRight,
  Bell,
  FileCheck,
  BarChart3,
  Users,
  Activity
} from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

interface ComplianceItem {
  id: string;
  name: string;
  category: string;
  deadline: string;
  status: "Completed" | "Pending" | "Overdue" | "At Risk";
  progress: number;
  assignedTo: string;
  region: string;
  lastUpdated: string;
  description: string;
}

const ComplianceMonitoringDashboard = () => {
  const { showSuccess } = useNotifications();
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([
    {
      id: "c1",
      name: "Annual AML Compliance Review",
      category: "KYC/AML",
      deadline: "2024-04-30",
      status: "Pending",
      progress: 65,
      assignedTo: "Sarah Johnson",
      region: "Global",
      lastUpdated: "2024-04-01",
      description: "Annual review of Anti-Money Laundering program effectiveness."
    },
    {
      id: "c2",
      name: "GDPR Data Audit",
      category: "Data Privacy",
      deadline: "2024-04-15",
      status: "At Risk",
      progress: 40,
      assignedTo: "Michael Chen",
      region: "European Union",
      lastUpdated: "2024-03-28",
      description: "Audit of data handling practices for GDPR compliance."
    },
    {
      id: "c3",
      name: "MiFID II Reporting",
      category: "Financial Regulations",
      deadline: "2024-04-10",
      status: "Pending",
      progress: 80,
      assignedTo: "Elizabeth Taylor",
      region: "European Union",
      lastUpdated: "2024-04-02",
      description: "Quarterly transaction reporting under MiFID II requirements."
    },
    {
      id: "c4",
      name: "SEC Form 13F Filing",
      category: "Regulatory Reporting",
      deadline: "2024-05-15",
      status: "Pending",
      progress: 25,
      assignedTo: "David Williams",
      region: "United States",
      lastUpdated: "2024-03-15",
      description: "Quarterly filing of SEC Form 13F for institutional investment managers."
    },
    {
      id: "c5",
      name: "FATCA Certification",
      category: "Tax Compliance",
      deadline: "2024-03-31",
      status: "Overdue",
      progress: 85,
      assignedTo: "Robert Johnson",
      region: "Global",
      lastUpdated: "2024-03-25",
      description: "Annual FATCA certification and reporting requirements."
    },
    {
      id: "c6",
      name: "Suitability Assessment Review",
      category: "Client Protection",
      deadline: "2024-04-20",
      status: "Pending",
      progress: 50,
      assignedTo: "Amanda Lewis",
      region: "Global",
      lastUpdated: "2024-03-22",
      description: "Review of client suitability assessment procedures."
    },
    {
      id: "c7",
      name: "Annual Cybersecurity Assessment",
      category: "IT Security",
      deadline: "2024-05-31",
      status: "Pending",
      progress: 35,
      assignedTo: "James Wilson",
      region: "Global",
      lastUpdated: "2024-03-10",
      description: "Annual assessment of cybersecurity controls and procedures."
    },
    {
      id: "c8",
      name: "Conflicts of Interest Review",
      category: "Corporate Governance",
      deadline: "2024-03-15",
      status: "Completed",
      progress: 100,
      assignedTo: "Patricia Miller",
      region: "Global",
      lastUpdated: "2024-03-14",
      description: "Quarterly review of potential conflicts of interest."
    }
  ]);

  const handleRunReport = () => {
    showSuccess("Compliance report initiated", "Your report will be ready shortly");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case "Pending":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Pending</Badge>;
      case "Overdue":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overdue</Badge>;
      case "At Risk":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">At Risk</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "Pending":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "Overdue":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "At Risk":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Compliance Monitoring</h1>
          <p className="text-muted-foreground">
            Track, manage, and report on regulatory compliance activities
          </p>
        </PageHeader>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">78%</div>
              <Progress value={78} max={100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">Based on all active requirements</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Items Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-3xl font-bold text-red-500 mr-2">
                  {complianceItems.filter(item => item.status === "Overdue").length}
                </div>
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Requires immediate attention</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-3xl font-bold text-amber-500 mr-2">
                  {complianceItems.filter(item => item.status === "At Risk").length}
                </div>
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Monitor closely</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-3xl font-bold text-blue-500 mr-2">
                  {complianceItems.filter(item => 
                    item.status !== "Completed" && 
                    getDaysRemaining(item.deadline) <= 14 && 
                    getDaysRemaining(item.deadline) > 0
                  ).length}
                </div>
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Due in the next 14 days</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Compliance Requirements</CardTitle>
              <CardDescription>Monitor and manage regulatory obligations</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={handleRunReport}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Run Compliance Report
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Generate Compliance Report</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-center text-muted-foreground">
                    Report generation options would go here
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Requirements</TabsTrigger>
                <TabsTrigger value="at-risk">At Risk</TabsTrigger>
                <TabsTrigger value="by-region">By Region</TabsTrigger>
                <TabsTrigger value="by-category">By Category</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="space-y-3">
                  {complianceItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-between p-4 border rounded-md"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-100 rounded-full">
                          {getStatusIcon(item.status)}
                        </div>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.category} • Assigned to: {item.assignedTo}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className={`text-sm ${
                              item.status === "Overdue" ? "text-red-600" : ""
                            }`}>
                              {new Date(item.deadline).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="mt-1">{getStatusBadge(item.status)}</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Shield className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="at-risk" className="space-y-4">
                <div className="space-y-3">
                  {complianceItems
                    .filter(item => item.status === "At Risk" || item.status === "Overdue")
                    .map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-between p-4 border rounded-md"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-gray-100 rounded-full">
                            {getStatusIcon(item.status)}
                          </div>
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {item.category} • Assigned to: {item.assignedTo}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className={`text-sm ${
                                item.status === "Overdue" ? "text-red-600" : ""
                              }`}>
                                {new Date(item.deadline).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="mt-1">{getStatusBadge(item.status)}</div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Shield className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="by-region" className="space-y-6">
                {["Global", "European Union", "United States"].map((region) => (
                  <div key={region} className="space-y-3">
                    <h3 className="font-medium mb-2">{region}</h3>
                    {complianceItems
                      .filter(item => item.region === region)
                      .map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center justify-between p-4 border rounded-md"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-100 rounded-full">
                              {getStatusIcon(item.status)}
                            </div>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {item.category} • Assigned to: {item.assignedTo}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className={`text-sm ${
                                  item.status === "Overdue" ? "text-red-600" : ""
                                }`}>
                                  {new Date(item.deadline).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="mt-1">{getStatusBadge(item.status)}</div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Shield className="h-4 w-4 mr-2" />
                              Review
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="by-category" className="space-y-6">
                {["KYC/AML", "Data Privacy", "Financial Regulations", "Regulatory Reporting", "Tax Compliance", "Client Protection", "IT Security", "Corporate Governance"]
                  .filter(category => complianceItems.some(item => item.category === category))
                  .map((category) => (
                    <div key={category} className="space-y-3">
                      <h3 className="font-medium mb-2">{category}</h3>
                      {complianceItems
                        .filter(item => item.category === category)
                        .map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-between p-4 border rounded-md"
                          >
                            <div className="flex items-center gap-4">
                              <div className="p-2 bg-gray-100 rounded-full">
                                {getStatusIcon(item.status)}
                              </div>
                              <div>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  Region: {item.region} • Assigned to: {item.assignedTo}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className={`text-sm ${
                                    item.status === "Overdue" ? "text-red-600" : ""
                                  }`}>
                                    {new Date(item.deadline).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="mt-1">{getStatusBadge(item.status)}</div>
                              </div>
                              <Button variant="outline" size="sm">
                                <Shield className="h-4 w-4 mr-2" />
                                Review
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Calendar</CardTitle>
              <CardDescription>Upcoming regulatory deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceItems
                  .filter(item => item.status !== "Completed")
                  .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                  .slice(0, 5)
                  .map((item, i) => (
                    <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                      <div className={`p-2 rounded-full ${
                        item.status === "Overdue" ? "bg-red-100" :
                        getDaysRemaining(item.deadline) <= 7 ? "bg-amber-100" :
                        "bg-blue-100"
                      }`}>
                        <Calendar className={`h-4 w-4 ${
                          item.status === "Overdue" ? "text-red-600" :
                          getDaysRemaining(item.deadline) <= 7 ? "text-amber-600" :
                          "text-blue-600"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className={`text-xs ${
                            item.status === "Overdue" ? "text-red-600" :
                            getDaysRemaining(item.deadline) <= 7 ? "text-amber-600" :
                            "text-gray-600"
                          }`}>
                            {item.status === "Overdue" 
                              ? `Overdue by ${Math.abs(getDaysRemaining(item.deadline))} days` 
                              : `Due in ${getDaysRemaining(item.deadline)} days`}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(item.deadline).toLocaleDateString()} • {item.category}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Activities</CardTitle>
              <CardDescription>Recent compliance-related activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { icon: <FileCheck className="h-4 w-4" />, color: "bg-green-100 text-green-600", text: "SEC Form ADV Annual Update completed", date: "April 2, 2024", user: "David Williams" },
                  { icon: <Users className="h-4 w-4" />, color: "bg-blue-100 text-blue-600", text: "KYC refresh completed for 15 high-risk clients", date: "March 30, 2024", user: "Sarah Johnson" },
                  { icon: <Bell className="h-4 w-4" />, color: "bg-red-100 text-red-600", text: "FATCA Certification deadline missed", date: "March 31, 2024", user: "System Alert" },
                  { icon: <Activity className="h-4 w-4" />, color: "bg-purple-100 text-purple-600", text: "Quarterly transaction monitoring review initiated", date: "March 29, 2024", user: "Michael Chen" },
                  { icon: <Shield className="h-4 w-4" />, color: "bg-gray-100 text-gray-600", text: "Annual compliance training assigned to all staff", date: "March 25, 2024", user: "HR System" }
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <div className={`p-2 rounded-full ${activity.color.split(" ")[0]}`}>
                      <span className={activity.color.split(" ")[1]}>
                        {activity.icon}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm">{activity.text}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {activity.date} • {activity.user}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <div></div>
          <Button variant="outline" className="flex items-center gap-2">
            Compliance Policy Documentation
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default ComplianceMonitoringDashboard;
