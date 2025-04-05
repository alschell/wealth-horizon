
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { CreditCard, ArrowLeft, Plus, ChevronRight, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { mockCreditFacilitiesFlat } from "@/components/trading/data/creditFacilities";
import { useToast } from "@/hooks/use-toast";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

// Add risk status to mock data
const facilitiesWithRisk = mockCreditFacilitiesFlat.map((facility, index) => {
  // Randomly assign risk status for demo purposes
  const riskStatuses = ["safe", "warning", "margin-call"];
  const randomStatus = riskStatuses[Math.floor(Math.random() * (index === 0 ? 1 : 3))];
  
  return {
    ...facility,
    riskStatus: randomStatus,
    utilizationRate: Math.round((facility.used / facility.limit) * 100)
  };
});

const CreditFacilities = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("active");
  
  // Calculate summary statistics
  const totalLimit = facilitiesWithRisk.reduce((sum, facility) => sum + facility.limit, 0);
  const totalUsed = facilitiesWithRisk.reduce((sum, facility) => sum + facility.used, 0);
  const totalAvailable = totalLimit - totalUsed;
  const overallUtilizationRate = Math.round((totalUsed / totalLimit) * 100);
  
  // Data for pie chart
  const pieData = [
    { name: "Used", value: totalUsed, color: "#818CF8" },
    { name: "Available", value: totalAvailable, color: "#4ADE80" }
  ];
  
  // Facilities by risk status for pie chart
  const facilitiesByRisk = [
    { name: "Safe", value: facilitiesWithRisk.filter(f => f.riskStatus === "safe").length, color: "#4ADE80" },
    { name: "Warning", value: facilitiesWithRisk.filter(f => f.riskStatus === "warning").length, color: "#FBBF24" },
    { name: "Margin Call", value: facilitiesWithRisk.filter(f => f.riskStatus === "margin-call").length, color: "#F87171" }
  ].filter(item => item.value > 0);

  const handleNewFacility = () => {
    toast({
      title: "Credit Facility Application",
      description: "Your application for a new credit facility has been started.",
    });
  };
  
  const handleAction = (action: string, facilityId: string) => {
    const facility = facilitiesWithRisk.find(f => f.id === facilityId);
    
    toast({
      title: `${action} Requested`,
      description: `Your request to ${action.toLowerCase()} for ${facility?.name} has been submitted.`,
    });
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
          icon={CreditCard}
          title="Manage Credit Facilities"
          description="View, manage, and monitor your credit lines and lending facilities"
          iconColor="text-gray-700"
          iconBgColor="bg-gray-100"
        />
        
        {/* Overview Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Overall Utilization</CardTitle>
              <CardDescription>Total lending capacity usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="pt-4">
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Utilization</span>
                    <span>{overallUtilizationRate}%</span>
                  </div>
                  <Progress value={overallUtilizationRate} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 text-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Used</p>
                    <p className="text-lg font-semibold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', compactDisplay: 'short' }).format(totalUsed)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Still Available</p>
                    <p className="text-lg font-semibold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', compactDisplay: 'short' }).format(totalAvailable)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Facility Risk Status</CardTitle>
              <CardDescription>Monitor margin call risks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="pt-4">
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={facilitiesByRisk}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                        labelLine={false}
                      >
                        {facilitiesByRisk.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 mx-auto mb-1 text-green-500" />
                    <p className="text-xs text-gray-700">Safe</p>
                    <p className="font-semibold">{facilitiesWithRisk.filter(f => f.riskStatus === "safe").length}</p>
                  </div>
                  <div className="text-center p-2 bg-amber-50 rounded-lg">
                    <AlertCircle className="h-5 w-5 mx-auto mb-1 text-amber-500" />
                    <p className="text-xs text-gray-700">Warning</p>
                    <p className="font-semibold">{facilitiesWithRisk.filter(f => f.riskStatus === "warning").length}</p>
                  </div>
                  <div className="text-center p-2 bg-red-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 mx-auto mb-1 text-red-500" />
                    <p className="text-xs text-gray-700">Margin Call</p>
                    <p className="font-semibold">{facilitiesWithRisk.filter(f => f.riskStatus === "margin-call").length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Common facility operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 pt-4">
                <Button 
                  className="w-full justify-start" 
                  onClick={() => navigate("/borrow")}
                >
                  <Plus className="mr-2 h-4 w-4" /> Borrow from Facility
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleNewFacility}
                >
                  <CreditCard className="mr-2 h-4 w-4" /> Apply for New Facility
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/dashboard")}
                >
                  <ChevronRight className="mr-2 h-4 w-4" /> Manage Existing Facilities
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Facilities Tabs */}
        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Credit Facilities</h2>
            <Button className="flex items-center gap-1" onClick={handleNewFacility}>
              <Plus className="h-4 w-4" /> Add New Facility
            </Button>
          </div>
          
          <TabsList className="mb-4">
            <TabsTrigger value="active">Active Facilities</TabsTrigger>
            <TabsTrigger value="review">Under Review</TabsTrigger>
            <TabsTrigger value="past">Past Facilities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-0">
            <div className="grid md:grid-cols-1 gap-4">
              {facilitiesWithRisk.map((facility) => {
                // Set status indicators based on risk
                let statusBadge;
                let statusColor;
                
                if (facility.riskStatus === "margin-call") {
                  statusBadge = "Margin Call";
                  statusColor = "bg-red-100 text-red-800 hover:bg-red-100";
                } else if (facility.riskStatus === "warning") {
                  statusBadge = "Warning";
                  statusColor = "bg-amber-100 text-amber-800 hover:bg-amber-100";
                } else {
                  statusBadge = "Active";
                  statusColor = "bg-green-100 text-green-800 hover:bg-green-100";
                }
                
                return (
                  <Card key={facility.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{facility.name}</CardTitle>
                          <p className="text-sm text-gray-500">Type: {facility.type}</p>
                        </div>
                        <Badge className={statusColor}>{statusBadge}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Total Limit</p>
                            <p className="text-lg font-semibold">
                              {new Intl.NumberFormat('en-US', { style: 'currency', currency: facility.currency }).format(facility.limit)}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Used</p>
                            <p className="text-lg font-semibold">
                              {new Intl.NumberFormat('en-US', { style: 'currency', currency: facility.currency }).format(facility.used)}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Available</p>
                            <p className="text-lg font-semibold text-green-600">
                              {new Intl.NumberFormat('en-US', { style: 'currency', currency: facility.currency }).format(facility.available)}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-500">Utilization</p>
                            <div className="flex items-center gap-2">
                              <Progress value={facility.utilizationRate} className="h-2 flex-1" />
                              <span className="text-sm font-medium">{facility.utilizationRate}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" onClick={() => navigate("/borrow")}>
                            Borrow
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleAction("Repay", facility.id)}>
                            Repay
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleAction("Renew", facility.id)}>
                            Renew
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleAction("View Details", facility.id)}>
                            View Details
                          </Button>
                          
                          {facility.riskStatus === "margin-call" && (
                            <Button size="sm" className="ml-auto bg-red-600 hover:bg-red-700" onClick={() => handleAction("Resolve Margin Call", facility.id)}>
                              Resolve Margin Call
                            </Button>
                          )}
                          
                          {facility.riskStatus === "warning" && (
                            <Button size="sm" className="ml-auto bg-amber-600 hover:bg-amber-700" onClick={() => handleAction("Address Warning", facility.id)}>
                              Address Warning
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="review" className="mt-0">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No facilities currently under review</p>
                  <Button className="mt-4" onClick={handleNewFacility}>
                    <Plus className="mr-2 h-4 w-4" /> Apply for New Facility
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="past" className="mt-0">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No past facilities to display</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CreditFacilities;
