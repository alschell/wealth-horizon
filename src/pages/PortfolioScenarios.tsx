
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PageHeaderCard } from "@/components/dashboard/PageHeaderCard";
import BackButtonHeader from "@/components/navigation/BackButtonHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, 
  BarChart3, 
  FileDown, 
  ChevronRight, 
  Zap, 
  CalendarRange 
} from "lucide-react";

const PortfolioScenarios: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="container py-6">
        <BackButtonHeader title="Back to Dashboard" />
        
        <PageHeaderCard
          title="Portfolio Scenarios"
          description="Run simulations and stress tests on your portfolios to analyze potential outcomes."
          icon={<BarChart3 className="h-6 w-6" />}
        />
        
        <div className="mb-6">
          <Tabs defaultValue="monte-carlo">
            <TabsList className="mb-4">
              <TabsTrigger value="monte-carlo">Monte Carlo Simulation</TabsTrigger>
              <TabsTrigger value="stress-test">Stress Tests</TabsTrigger>
              <TabsTrigger value="what-if">What-If Analysis</TabsTrigger>
              <TabsTrigger value="correlation">Correlation Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="monte-carlo">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Monte Carlo Simulation</span>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <FileDown className="h-4 w-4" /> Export
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Simulating 10,000 market scenarios to estimate portfolio outcomes over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[16/9] w-full bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                    Monte Carlo Simulation Chart
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Expected Return (10yr)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">7.4%</div>
                        <div className="text-xs text-muted-foreground flex items-center mt-1">
                          <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                          <span>4.2% above risk-free rate</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Probability Range (10yr)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">3.1% - 12.8%</div>
                        <div className="text-xs text-muted-foreground flex items-center mt-1">
                          <span>90% confidence interval</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Worst Case Scenario</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">-18.5%</div>
                        <div className="text-xs text-muted-foreground flex items-center mt-1">
                          <span>1% probability over 1yr</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Recommended Actions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-center justify-between p-2 hover:bg-muted rounded-md transition-colors">
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4 text-primary" />
                              <span>Increase diversification to reduce tail risk</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </li>
                          <li className="flex items-center justify-between p-2 hover:bg-muted rounded-md transition-colors">
                            <div className="flex items-center gap-2">
                              <CalendarRange className="h-4 w-4 text-primary" />
                              <span>Adjust time horizon to meet liquidity needs</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stress-test">
              <Card>
                <CardHeader>
                  <CardTitle>Stress Test Analysis</CardTitle>
                  <CardDescription>
                    Test how your portfolio would perform under extreme market conditions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[16/9] w-full bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                    Stress Test Analysis Charts
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="what-if">
              <Card>
                <CardHeader>
                  <CardTitle>What-If Analysis</CardTitle>
                  <CardDescription>
                    Analyze portfolio performance under different allocation scenarios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[16/9] w-full bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                    What-If Analysis Interface
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="correlation">
              <Card>
                <CardHeader>
                  <CardTitle>Correlation Analysis</CardTitle>
                  <CardDescription>
                    Analyze relationships between assets and market factors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[16/9] w-full bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                    Correlation Matrix
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PortfolioScenarios;
