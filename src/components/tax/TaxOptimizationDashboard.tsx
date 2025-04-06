
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/design-system";
import PageTransition from "@/components/ui/page-transition";
import { ArrowUpRight, Download, AlertCircle, TrendingDown, TrendingUp, FileText } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

const TaxOptimizationDashboard = () => {
  const { showInfo } = useNotifications();
  
  const handleGenerateReport = () => {
    showInfo("Generating tax report", "Your report will be ready in a few moments");
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Tax Optimization</h1>
          <p className="text-muted-foreground">
            Optimize your tax strategy and minimize your liability
          </p>
        </PageHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Efficiency Score</CardTitle>
              <CardDescription>Overall portfolio tax efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">82/100</div>
              <div className="flex items-center text-green-600 text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+4 from last quarter</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Potential Tax Savings</CardTitle>
              <CardDescription>Estimated annual savings through optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">$14,500</div>
              <Button variant="outline" size="sm" className="w-full mt-2">
                View Optimization Strategy
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tax-Loss Harvesting</CardTitle>
              <CardDescription>Opportunities to offset gains</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">$8,250</div>
              <div className="flex items-center text-amber-600 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>2 new opportunities available</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="strategies" className="space-y-6">
          <TabsList>
            <TabsTrigger value="strategies">Optimization Strategies</TabsTrigger>
            <TabsTrigger value="jurisdictions">Jurisdiction Analysis</TabsTrigger>
            <TabsTrigger value="reports">Tax Reports</TabsTrigger>
            <TabsTrigger value="calendar">Tax Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="strategies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Tax Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Tax-Loss Harvesting Opportunity",
                      description: "Sell underperforming tech stocks to offset capital gains from recent sales",
                      potential: "$5,200",
                      urgency: "High"
                    },
                    {
                      title: "Asset Location Optimization",
                      description: "Move high-yield bonds to tax-advantaged accounts",
                      potential: "$2,800",
                      urgency: "Medium"
                    },
                    {
                      title: "Charitable Donation Planning",
                      description: "Donate appreciated securities instead of cash for maximum deduction",
                      potential: "$3,500",
                      urgency: "Medium"
                    },
                    {
                      title: "Tax-Efficient Fund Replacement",
                      description: "Replace high-turnover funds with tax-efficient ETFs",
                      potential: "$3,000",
                      urgency: "Low"
                    }
                  ].map((strategy, i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{strategy.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{strategy.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{strategy.potential}</div>
                          <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                            strategy.urgency === "High" ? "bg-red-100 text-red-800" :
                            strategy.urgency === "Medium" ? "bg-amber-100 text-amber-800" :
                            "bg-green-100 text-green-800"
                          }`}>
                            {strategy.urgency} priority
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm">Implement Strategy</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jurisdictions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Multi-Jurisdiction Tax Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { jurisdiction: "United States", taxRate: "37%", taxPaid: "$142,500", exposure: "High" },
                    { jurisdiction: "United Kingdom", taxRate: "45%", taxPaid: "$85,200", exposure: "Medium" },
                    { jurisdiction: "Singapore", taxRate: "22%", taxPaid: "$34,500", exposure: "Low" },
                    { jurisdiction: "Switzerland", taxRate: "11.5%", taxPaid: "$18,700", exposure: "Low" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <div className="font-medium">{item.jurisdiction}</div>
                        <div className="text-sm text-muted-foreground">Tax rate: {item.taxRate}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{item.taxPaid}</div>
                        <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                          item.exposure === "High" ? "bg-red-100 text-red-800" :
                          item.exposure === "Medium" ? "bg-amber-100 text-amber-800" :
                          "bg-green-100 text-green-800"
                        }`}>
                          {item.exposure} exposure
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Tax Reports</CardTitle>
                  <CardDescription>Generate and download tax reports</CardDescription>
                </div>
                <Button onClick={handleGenerateReport}>
                  Generate New Report
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Annual Tax Summary 2023", date: "Mar 15, 2024", size: "2.3 MB" },
                    { name: "Quarterly Capital Gains Report - Q1 2024", date: "Apr 10, 2024", size: "1.8 MB" },
                    { name: "Foreign Tax Credit Analysis", date: "Feb 28, 2024", size: "3.1 MB" },
                    { name: "Estate Tax Planning Report", date: "Jan 15, 2024", size: "4.2 MB" }
                  ].map((report, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-xs text-muted-foreground">Generated on {report.date} • {report.size}</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Calendar</CardTitle>
                <CardDescription>Important tax deadlines and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      date: "April 15, 2024", 
                      event: "Individual Tax Return Deadline (US)", 
                      status: "Upcoming",
                      days: 10
                    },
                    { 
                      date: "June 15, 2024", 
                      event: "Q2 Estimated Tax Payment Due (US)", 
                      status: "Upcoming",
                      days: 71
                    },
                    { 
                      date: "July 31, 2024", 
                      event: "FBAR Filing Deadline (US)", 
                      status: "Upcoming",
                      days: 86
                    },
                    { 
                      date: "September 15, 2024", 
                      event: "Q3 Estimated Tax Payment Due (US)", 
                      status: "Upcoming",
                      days: 132
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <div className="font-medium">{item.event}</div>
                        <div className="text-sm text-muted-foreground">{item.date}</div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        item.days < 30 ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                      }`}>
                        {item.days < 30 ? `${item.days} days left` : item.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default TaxOptimizationDashboard;
