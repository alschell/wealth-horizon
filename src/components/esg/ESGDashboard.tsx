
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/design-system";
import PageTransition from "@/components/ui/page-transition";

const ESGDashboard = () => {
  const esgScores = [
    { category: "Environmental", score: 78, color: "bg-emerald-500" },
    { category: "Social", score: 65, color: "bg-blue-500" },
    { category: "Governance", score: 82, color: "bg-purple-500" },
    { category: "Overall ESG Rating", score: 75, color: "bg-gray-700" },
  ];

  const impactCategories = [
    { name: "Clean Energy", allocation: 32, impact: "High", color: "bg-emerald-500" },
    { name: "Sustainable Water", allocation: 18, impact: "Medium", color: "bg-blue-500" },
    { name: "Education", allocation: 15, impact: "Medium", color: "bg-indigo-500" },
    { name: "Healthcare", allocation: 20, impact: "High", color: "bg-red-500" },
    { name: "Financial Inclusion", allocation: 15, impact: "Medium", color: "bg-amber-500" },
  ];

  const sdgGoals = [
    { number: 1, name: "No Poverty", alignment: 35 },
    { number: 3, name: "Good Health and Well-being", alignment: 72 },
    { number: 4, name: "Quality Education", alignment: 65 },
    { number: 6, name: "Clean Water and Sanitation", alignment: 58 },
    { number: 7, name: "Affordable and Clean Energy", alignment: 81 },
    { number: 13, name: "Climate Action", alignment: 77 },
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">ESG & Impact Investing</h1>
          <p className="text-muted-foreground">
            Track environmental, social, and governance metrics for your portfolio
          </p>
        </PageHeader>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
            <TabsTrigger value="sdg">SDG Alignment</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {esgScores.map((item) => (
                <Card key={item.category}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">{item.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">{item.score}/100</div>
                    <Progress 
                      value={item.score} 
                      max={100} 
                      className="h-2"
                      indicatorClassName={item.color}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio ESG Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {impactCategories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm">{category.allocation}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${category.color}`} 
                          style={{ width: `${category.allocation}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Impact: {category.impact}</span>
                        <span>{category.allocation}% of portfolio</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Impact Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Carbon Offset</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">245 tons</div>
                      <p className="text-xs text-muted-foreground">CO₂ equivalent</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Jobs Created</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,240</div>
                      <p className="text-xs text-muted-foreground">Through investments</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Lives Impacted</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12,500+</div>
                      <p className="text-xs text-muted-foreground">Direct beneficiaries</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sdg" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>UN Sustainable Development Goals Alignment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {sdgGoals.map((goal) => (
                    <div key={goal.number} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          Goal {goal.number}: {goal.name}
                        </span>
                        <span className="text-sm">{goal.alignment}%</span>
                      </div>
                      <Progress 
                        value={goal.alignment} 
                        max={100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ESG Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Quarterly ESG Performance Report",
                    "Annual Impact Assessment",
                    "Carbon Footprint Analysis",
                    "Social Impact Measurement",
                    "Governance Assessment"
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <span>{report}</span>
                      <Button variant="outline" size="sm">Download</Button>
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

export default ESGDashboard;
