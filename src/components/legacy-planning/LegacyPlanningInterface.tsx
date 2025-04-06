
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  FileText, 
  Users, 
  Shield, 
  BarChart3, 
  Shuffle, 
  ArrowUpRight, 
  Calendar, 
  Plus,
  FileCheck,
  Building2,
  ScrollText,
  Landmark
} from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

const LegacyPlanningInterface = () => {
  const { showSuccess } = useNotifications();
  
  const handleCreatePlan = () => {
    showSuccess("Plan creation initiated", "Please complete the setup process");
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Legacy Planning</h1>
          <p className="text-muted-foreground">
            Plan and manage wealth transfer, succession, and estate strategies
          </p>
        </PageHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Succession Readiness</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Overall Readiness</span>
                    <span className="text-sm font-medium">73%</span>
                  </div>
                  <Progress value={73} max={100} className="h-2" />
                </div>
                <div className="pt-2 space-y-3">
                  {[
                    { name: "Documentation Completeness", value: 82 },
                    { name: "Succession Structure", value: 65 },
                    { name: "Tax Optimization", value: 70 },
                    { name: "Beneficiary Readiness", value: 45 }
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{item.name}</span>
                        <span 
                          className={`${
                            item.value >= 80 ? "text-green-600" : 
                            item.value >= 60 ? "text-amber-600" : 
                            "text-red-600"
                          }`}
                        >
                          {item.value}%
                        </span>
                      </div>
                      <Progress 
                        value={item.value} 
                        max={100} 
                        className="h-1"
                        indicatorClassName={
                          item.value >= 80 ? "bg-green-500" : 
                          item.value >= 60 ? "bg-amber-500" : 
                          "bg-red-500"
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estate Value Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-2">
                  <div className="text-3xl font-bold">$24.8M</div>
                  <div className="text-sm text-muted-foreground">Estimated estate value</div>
                </div>
                <div className="pt-2 space-y-3">
                  {[
                    { name: "Financial Assets", value: "$18.2M", percentage: 73 },
                    { name: "Real Estate", value: "$4.5M", percentage: 18 },
                    { name: "Business Interests", value: "$1.8M", percentage: 7 },
                    { name: "Personal Property", value: "$0.3M", percentage: 2 }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm">{item.name}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full">
                          <div 
                            className="h-1.5 bg-gray-500 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Dates & Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "May 15, 2024", event: "Annual Estate Plan Review", type: "Upcoming" },
                  { date: "July 3, 2024", event: "Trust Distribution Date", type: "Upcoming" },
                  { date: "Sept 10, 2024", event: "Family Council Meeting", type: "Upcoming" },
                  { date: "Dec 31, 2024", event: "Annual Gift Exclusion Deadline", type: "Upcoming" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{item.event}</div>
                      <div className="text-xs text-muted-foreground">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Legacy Plans</CardTitle>
              <CardDescription>Manage wealth transfer and succession strategies</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={handleCreatePlan}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Plan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Legacy Plan</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-center text-muted-foreground">
                    Plan creation form would go here
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="succession" className="space-y-4">
              <TabsList>
                <TabsTrigger value="succession">Succession Planning</TabsTrigger>
                <TabsTrigger value="estate">Estate Planning</TabsTrigger>
                <TabsTrigger value="wealth-transfer">Wealth Transfer</TabsTrigger>
                <TabsTrigger value="philanthropic">Philanthropic Planning</TabsTrigger>
              </TabsList>

              <TabsContent value="succession" className="space-y-4">
                <div className="space-y-4">
                  {[
                    {
                      title: "Family Business Succession Plan",
                      status: "In Progress",
                      progress: 65,
                      description: "Comprehensive plan for transitioning family business leadership and ownership",
                      entities: ["Global Family Holdings Ltd.", "US Asset Management LLC"],
                      lastUpdated: "2024-03-15",
                      icon: <Building2 className="h-10 w-10 text-blue-500" />
                    },
                    {
                      title: "Family Office Leadership Transition",
                      status: "Planning",
                      progress: 35,
                      description: "Structure for transitioning family office leadership to next generation",
                      entities: ["Family Office Entity"],
                      lastUpdated: "2024-02-20",
                      icon: <Users className="h-10 w-10 text-purple-500" />
                    }
                  ].map((plan, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="flex">
                        <div className="p-6 bg-gray-50 flex items-center justify-center">
                          <div className="p-4 bg-white rounded-full">
                            {plan.icon}
                          </div>
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-medium">{plan.title}</h3>
                              <p className="text-sm text-muted-foreground">{plan.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                plan.status === "Complete" ? "bg-green-100 text-green-800" :
                                plan.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                                "bg-gray-100 text-gray-800"
                              }`}>
                                {plan.status}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{plan.progress}%</span>
                              </div>
                              <Progress value={plan.progress} max={100} className="h-2" />
                            </div>
                            <div className="flex justify-between text-sm">
                              <div>
                                <span className="text-muted-foreground">Related Entities: </span>
                                <span>{plan.entities.join(", ")}</span>
                              </div>
                              <div className="text-muted-foreground">
                                Updated: {plan.lastUpdated}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-6 py-3 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">
                          Edit Plan
                        </Button>
                      </div>
                    </Card>
                  ))}

                  <div className="pt-4 flex justify-center">
                    <Button variant="outline" className="flex items-center gap-2">
                      Succession Planning Guide
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="estate" className="space-y-4">
                <div className="space-y-4">
                  {[
                    {
                      title: "Comprehensive Estate Plan",
                      status: "Complete",
                      progress: 100,
                      description: "Master estate plan covering all assets and entities",
                      lastReview: "2024-02-10",
                      nextReview: "2025-02-10",
                      icon: <ScrollText className="h-10 w-10 text-gray-500" />
                    },
                    {
                      title: "International Trust Structures",
                      status: "In Progress",
                      progress: 75,
                      description: "Trust structures for international assets and tax efficiency",
                      lastReview: "2023-11-15",
                      nextReview: "2024-05-15",
                      icon: <Landmark className="h-10 w-10 text-amber-500" />
                    }
                  ].map((plan, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="flex">
                        <div className="p-6 bg-gray-50 flex items-center justify-center">
                          <div className="p-4 bg-white rounded-full">
                            {plan.icon}
                          </div>
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-medium">{plan.title}</h3>
                              <p className="text-sm text-muted-foreground">{plan.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                plan.status === "Complete" ? "bg-green-100 text-green-800" :
                                plan.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                                "bg-gray-100 text-gray-800"
                              }`}>
                                {plan.status}
                              </span>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Completion</span>
                                <span>{plan.progress}%</span>
                              </div>
                              <Progress value={plan.progress} max={100} className="h-2" />
                            </div>
                            <div className="flex justify-between text-sm">
                              <div>
                                <span className="text-muted-foreground">Last Review: </span>
                                <span>{plan.lastReview}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Next Review: </span>
                                <span>{plan.nextReview}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-6 py-3 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View Documents
                        </Button>
                        <Button size="sm">
                          Review Plan
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="wealth-transfer" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Intergenerational Wealth Transfer",
                      beneficiaries: 5,
                      totalValue: "$12.5M",
                      transferMethod: "Trusts & Direct Gifts",
                      status: "Active",
                      taxEfficiency: "High"
                    },
                    {
                      title: "Education & Development Fund",
                      beneficiaries: 8,
                      totalValue: "$3.2M",
                      transferMethod: "Education Trusts",
                      status: "Active",
                      taxEfficiency: "Medium"
                    },
                    {
                      title: "Art & Collectibles Transfer",
                      beneficiaries: 3,
                      totalValue: "$4.8M",
                      transferMethod: "LLC Structure",
                      status: "Planning",
                      taxEfficiency: "Medium"
                    },
                    {
                      title: "Real Estate Holdings Transfer",
                      beneficiaries: 4,
                      totalValue: "$6.5M",
                      transferMethod: "Family Limited Partnership",
                      status: "Planning",
                      taxEfficiency: "High"
                    }
                  ].map((plan, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <CardTitle>{plan.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Beneficiaries:</span>
                            <span className="text-sm font-medium">{plan.beneficiaries}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Total Value:</span>
                            <span className="text-sm font-medium">{plan.totalValue}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Transfer Method:</span>
                            <span className="text-sm font-medium">{plan.transferMethod}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Status:</span>
                            <span className={`text-sm font-medium ${
                              plan.status === "Active" ? "text-green-600" : "text-blue-600"
                            }`}>{plan.status}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Tax Efficiency:</span>
                            <span className={`text-sm font-medium ${
                              plan.taxEfficiency === "High" ? "text-green-600" : 
                              plan.taxEfficiency === "Medium" ? "text-amber-600" : 
                              "text-red-600"
                            }`}>{plan.taxEfficiency}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-4">
                          Manage Plan
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="philanthropic" className="space-y-4">
                <div className="space-y-4">
                  {[
                    {
                      title: "Family Foundation",
                      status: "Active",
                      description: "Private family foundation supporting education and healthcare initiatives",
                      annualBudget: "$750,000",
                      impact: "High",
                      taxBenefit: "$320,000 annually",
                      beneficiaries: ["Educational Institutions", "Healthcare Organizations", "Community Development"]
                    },
                    {
                      title: "Donor-Advised Fund",
                      status: "Active",
                      description: "Flexible giving vehicle for philanthropic activities",
                      annualBudget: "$250,000",
                      impact: "Medium",
                      taxBenefit: "$85,000 annually",
                      beneficiaries: ["Arts & Culture", "Environmental Causes"]
                    }
                  ].map((plan, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-medium">{plan.title}</h3>
                            <p className="text-sm text-muted-foreground">{plan.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                              {plan.status}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="p-3 bg-gray-50 rounded-md">
                            <div className="text-sm text-muted-foreground">Annual Budget</div>
                            <div className="font-medium">{plan.annualBudget}</div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-md">
                            <div className="text-sm text-muted-foreground">Impact Level</div>
                            <div className="font-medium">{plan.impact}</div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-md">
                            <div className="text-sm text-muted-foreground">Tax Benefit</div>
                            <div className="font-medium">{plan.taxBenefit}</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-2">Beneficiary Categories</div>
                          <div className="flex flex-wrap gap-2">
                            {plan.beneficiaries.map((beneficiary, idx) => (
                              <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                {beneficiary}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-6 py-3 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View Impact Report
                        </Button>
                        <Button size="sm">
                          Manage Plan
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Family Governance Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Family Council</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Oversees family wealth and business governance
                  </p>
                  <div className="flex justify-between text-sm">
                    <span>Members: 7</span>
                    <span>Next Meeting: Sep 10, 2024</span>
                  </div>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Investment Committee</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Reviews and approves investment decisions
                  </p>
                  <div className="flex justify-between text-sm">
                    <span>Members: 5</span>
                    <span>Next Meeting: May 15, 2024</span>
                  </div>
                </div>
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Next Generation Development</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Prepares future generations for wealth responsibility
                  </p>
                  <div className="flex justify-between text-sm">
                    <span>Participants: 8</span>
                    <span>Next Workshop: Jun 22, 2024</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Legacy Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Comprehensive Estate Plan", type: "Legal Document", updated: "Feb 10, 2024", status: "Current" },
                  { name: "Family Constitution", type: "Governance", updated: "Jan 15, 2024", status: "Current" },
                  { name: "Succession Framework", type: "Planning Document", updated: "Mar 15, 2024", status: "Current" },
                  { name: "Trust Documents", type: "Legal Document", updated: "Nov 10, 2023", status: "Review Needed" },
                  { name: "Family Mission Statement", type: "Governance", updated: "Dec 5, 2023", status: "Current" }
                ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-sm">{doc.name}</div>
                        <div className="text-xs text-muted-foreground">{doc.type} • Last updated: {doc.updated}</div>
                      </div>
                    </div>
                    <div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        doc.status === "Current" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default LegacyPlanningInterface;
