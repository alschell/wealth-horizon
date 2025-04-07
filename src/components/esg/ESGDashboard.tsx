import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight,
  Leaf,
  Users,
  Building,
  BarChart3
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ESGDashboard = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="environmental">Environmental</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  ESG Score
                </CardTitle>
                <Leaf className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72/100</div>
                <div className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 inline-flex items-center">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    +4.6%
                  </span>{" "}
                  from last quarter
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Environmental</span>
                    <span className="font-medium">68/100</span>
                  </div>
                  <Progress value={68} className="h-1" />
                  
                  <div className="flex items-center justify-between text-xs">
                    <span>Social</span>
                    <span className="font-medium">74/100</span>
                  </div>
                  <Progress value={74} className="h-1" />
                  
                  <div className="flex items-center justify-between text-xs">
                    <span>Governance</span>
                    <span className="font-medium">78/100</span>
                  </div>
                  <Progress value={78} className="h-1" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Portfolio Sustainability
                </CardTitle>
                <PieChart className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">63%</div>
                <div className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 inline-flex items-center">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    +12%
                  </span>{" "}
                  from last year
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Sustainable Investments</span>
                    <span className="font-medium">63%</span>
                  </div>
                  <Progress value={63} className="h-1" />
                  
                  <div className="flex items-center justify-between text-xs">
                    <span>Neutral Investments</span>
                    <span className="font-medium">27%</span>
                  </div>
                  <Progress value={27} className="h-1" />
                  
                  <div className="flex items-center justify-between text-xs">
                    <span>Non-sustainable</span>
                    <span className="font-medium">10%</span>
                  </div>
                  <Progress value={10} className="h-1" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Carbon Footprint
                </CardTitle>
                <LineChart className="h-4 w-4 text-rose-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42 tCO₂e</div>
                <div className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 inline-flex items-center">
                    <ArrowDownRight className="mr-1 h-4 w-4" />
                    -18%
                  </span>{" "}
                  from last year
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Direct Emissions</span>
                    <span className="font-medium">12 tCO₂e</span>
                  </div>
                  <Progress value={28} className="h-1" />
                  
                  <div className="flex items-center justify-between text-xs">
                    <span>Indirect Emissions</span>
                    <span className="font-medium">30 tCO₂e</span>
                  </div>
                  <Progress value={72} className="h-1" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>ESG Performance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-slate-50 rounded-md">
                  <BarChart3 className="h-16 w-16 text-slate-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>ESG Benchmark Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-slate-50 rounded-md">
                  <BarChart className="h-16 w-16 text-slate-200" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Top ESG Performers in Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Tesla Inc.", score: 92, change: "+3.2%" },
                    { name: "Microsoft Corp.", score: 88, change: "+1.5%" },
                    { name: "Ørsted A/S", score: 86, change: "+4.7%" },
                    { name: "Schneider Electric", score: 84, change: "+2.1%" },
                    { name: "Neste Oyj", score: 82, change: "+0.8%" }
                  ].map((company, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-[35px] text-sm font-medium">{i + 1}</div>
                      <div className="flex-1">{company.name}</div>
                      <div className="w-[60px] text-right font-medium">{company.score}/100</div>
                      <div className="w-[60px] text-right text-emerald-500 text-sm">{company.change}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="environmental" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Environmental Score
                </CardTitle>
                <Leaf className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68/100</div>
                <div className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 inline-flex items-center">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    +5.2%
                  </span>{" "}
                  from last quarter
                </div>
              </CardContent>
            </Card>
            
            {/* Additional environmental metrics would go here */}
          </div>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Social Score
                </CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">74/100</div>
                <div className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 inline-flex items-center">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    +3.8%
                  </span>{" "}
                  from last quarter
                </div>
              </CardContent>
            </Card>
            
            {/* Additional social metrics would go here */}
          </div>
        </TabsContent>
        
        <TabsContent value="governance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Governance Score
                </CardTitle>
                <Building className="h-4 w-4 text-indigo-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78/100</div>
                <div className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 inline-flex items-center">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    +2.1%
                  </span>{" "}
                  from last quarter
                </div>
              </CardContent>
            </Card>
            
            {/* Additional governance metrics would go here */}
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ESG Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Annual ESG Impact Report", date: "May 15, 2023", type: "PDF" },
                  { name: "Quarterly ESG Performance", date: "Apr 2, 2023", type: "PDF" },
                  { name: "Carbon Footprint Analysis", date: "Mar 12, 2023", type: "PDF" },
                  { name: "Sustainable Investment Strategy", date: "Jan 28, 2023", type: "PDF" },
                  { name: "ESG Risk Assessment", date: "Dec 10, 2022", type: "PDF" }
                ].map((report, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{report.name}</div>
                      <div className="text-sm text-muted-foreground">{report.date}</div>
                    </div>
                    <div className="text-sm bg-slate-100 px-2 py-1 rounded">
                      {report.type}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ESGDashboard;
