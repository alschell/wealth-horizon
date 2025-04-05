import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Clock, CheckCircle, BarChart3, Lightbulb, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdviceInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const handleNewAdvice = () => {
    navigate("/advice/new");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Lightbulb className="h-6 w-6 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Financial Insights</h1>
        </div>
        <Button onClick={handleNewAdvice} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Advisory Mandate
        </Button>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="active">Active Mandates</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="benchmarking">Performance Benchmarking</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Mandates</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">
                  1 discretionary, 1 advisory
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">
                  Setup completed, waiting for bank approval
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Performance</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+8.2%</div>
                <p className="text-xs text-muted-foreground">
                  Average performance across all mandates (YTD)
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cursor-pointer hover:bg-accent/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Advisory Mandate
                </CardTitle>
                <CardDescription>
                  Setup a new advisory relationship with a bank
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 flex justify-end">
                <Button variant="ghost" size="sm" className="text-sm">
                  Start <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:bg-accent/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Compare Advisors
                </CardTitle>
                <CardDescription>
                  Benchmark performances across all mandates
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 flex justify-end">
                <Button variant="ghost" size="sm" className="text-sm">
                  View <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:bg-accent/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Review Latest Advice
                </CardTitle>
                <CardDescription>
                  See the latest investment recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 flex justify-end">
                <Button variant="ghost" size="sm" className="text-sm">
                  Review <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-black" />
            Active Advisory Mandates
          </h2>
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>UBS Wealth Management</CardTitle>
                <CardDescription>Discretionary Mandate - Started Jan 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Performance (YTD)</span>
                  <span className="font-medium text-green-600">+10.3%</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Assets Under Management</span>
                  <span className="font-medium">$2.4M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Review</span>
                  <span className="font-medium">March 15, 2025</span>
                </div>
                <Button variant="outline" className="w-full mt-4">View Details</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Credit Suisse Private Banking</CardTitle>
                <CardDescription>Advisory Mandate - Started June 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Performance (YTD)</span>
                  <span className="font-medium text-green-600">+6.1%</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Assets Under Advice</span>
                  <span className="font-medium">$1.8M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Advice</span>
                  <span className="font-medium">April 2, 2025</span>
                </div>
                <Button variant="outline" className="w-full mt-4">View Details</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-black" />
            Pending Advisory Mandates
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>JP Morgan Private Bank</CardTitle>
              <CardDescription>Discretionary Mandate - Submitted March 28, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium text-amber-600">Under Review</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Proposed Assets</span>
                <span className="font-medium">$3.2M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expected Approval</span>
                <span className="font-medium">April 15, 2025</span>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1">View Details</Button>
                <Button variant="destructive" className="flex-1">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmarking" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-black" />
            Performance Benchmarking
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Mandate Performance Comparison</CardTitle>
              <CardDescription>Year-to-date performance across all mandates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-accent/20 rounded-md">
                <p className="text-muted-foreground">Performance comparison chart will be displayed here</p>
              </div>
              <div className="grid gap-4 grid-cols-2 mt-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Top Performing Mandate</h3>
                  <p className="text-lg font-bold">UBS Wealth Management</p>
                  <p className="text-sm text-green-600">+10.3% YTD</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Industry Benchmark</h3>
                  <p className="text-lg font-bold">S&P 500</p>
                  <p className="text-sm text-green-600">+7.2% YTD</p>
                </div>
              </div>
              <Button className="w-full mt-4">Generate Detailed Report</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdviceInterface;
