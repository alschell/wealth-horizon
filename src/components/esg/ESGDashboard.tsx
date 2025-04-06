
import React, { useState } from "react";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell, 
  Line, 
  LineChart, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Download, Filter, InfoIcon, RefreshCw, Users } from "lucide-react";

// Sample data for ESG metrics
const esgScoreData = [
  { category: "Environmental", score: 72, color: "#10B981" },
  { category: "Social", score: 81, color: "#3B82F6" },
  { category: "Governance", score: 89, color: "#8B5CF6" },
];

const sectorComparisonData = [
  { name: "Your Portfolio", env: 72, soc: 81, gov: 89 },
  { name: "Sector Average", env: 65, soc: 68, gov: 75 },
  { name: "Industry Leaders", env: 85, soc: 88, gov: 92 },
];

const timeSeriesData = [
  { month: "Jan", score: 76 },
  { month: "Feb", score: 78 },
  { month: "Mar", score: 74 },
  { month: "Apr", score: 75 },
  { month: "May", score: 77 },
  { month: "Jun", score: 80 },
  { month: "Jul", score: 79 },
  { month: "Aug", score: 81 },
  { month: "Sep", score: 80 },
  { month: "Oct", score: 79 },
  { month: "Nov", score: 82 },
  { month: "Dec", score: 81 },
];

const ESGDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeframe, setTimeframe] = useState("1Y");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold">ESG Performance</h2>
          <p className="text-muted-foreground">Monitor and optimize your portfolio's environmental, social, and governance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all-portfolio">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Portfolio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-portfolio">All Portfolios</SelectItem>
              <SelectItem value="equity-portfolio">Equity Portfolio</SelectItem>
              <SelectItem value="fixed-income">Fixed Income</SelectItem>
              <SelectItem value="alternatives">Alternatives</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>ESG Score</CardTitle>
          <CardDescription>Overall portfolio score: 81/100</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {esgScoreData.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.category}</span>
                  <span className="font-medium">{item.score}/100</span>
                </div>
                <Progress 
                  value={item.score} 
                  max={100} 
                  className="h-2" 
                  style={{ "--progress-background": item.color } as any}
                />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <InfoIcon className="h-4 w-4 mr-2" />
            Last updated: April 2, 2025
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="flex items-center font-medium text-emerald-600">
              <ChevronUp className="h-4 w-4" />
              3.2% vs. last quarter
            </span>
          </div>
        </CardFooter>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="environmental">Environmental</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Select defaultValue={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1M">1 Month</SelectItem>
                <SelectItem value="3M">3 Months</SelectItem>
                <SelectItem value="6M">6 Months</SelectItem>
                <SelectItem value="1Y">1 Year</SelectItem>
                <SelectItem value="3Y">3 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Sector Comparison</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={sectorComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="env" name="Environmental" fill="#10B981" />
                    <Bar dataKey="soc" name="Social" fill="#3B82F6" />
                    <Bar dataKey="gov" name="Governance" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">ESG Score Trend</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis domain={[70, 90]} fontSize={12} />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Score Distribution</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={esgScoreData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="score"
                        nameKey="category"
                        label={({ category }) => category}
                        labelLine
                      >
                        {esgScoreData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Holdings ESG Analysis</CardTitle>
              <CardDescription>ESG scores for your largest portfolio positions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">Company</th>
                      <th className="px-6 py-3">Weight</th>
                      <th className="px-6 py-3">Overall</th>
                      <th className="px-6 py-3">Env</th>
                      <th className="px-6 py-3">Social</th>
                      <th className="px-6 py-3">Gov</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4 font-medium">NextGen Energy Co.</td>
                      <td className="px-6 py-4">8.2%</td>
                      <td className="px-6 py-4">92</td>
                      <td className="px-6 py-4">96</td>
                      <td className="px-6 py-4">88</td>
                      <td className="px-6 py-4">91</td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Leader</span></td>
                    </tr>
                    <tr className="bg-gray-50 border-b">
                      <td className="px-6 py-4 font-medium">Global Tech Inc.</td>
                      <td className="px-6 py-4">7.4%</td>
                      <td className="px-6 py-4">83</td>
                      <td className="px-6 py-4">78</td>
                      <td className="px-6 py-4">85</td>
                      <td className="px-6 py-4">87</td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Above Avg</span></td>
                    </tr>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4 font-medium">Sustainable Futures LLC</td>
                      <td className="px-6 py-4">6.8%</td>
                      <td className="px-6 py-4">95</td>
                      <td className="px-6 py-4">97</td>
                      <td className="px-6 py-4">94</td>
                      <td className="px-6 py-4">93</td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Leader</span></td>
                    </tr>
                    <tr className="bg-gray-50 border-b">
                      <td className="px-6 py-4 font-medium">Heritage Banking Corp</td>
                      <td className="px-6 py-4">5.9%</td>
                      <td className="px-6 py-4">76</td>
                      <td className="px-6 py-4">72</td>
                      <td className="px-6 py-4">75</td>
                      <td className="px-6 py-4">82</td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Above Avg</span></td>
                    </tr>
                    <tr className="bg-white border-b">
                      <td className="px-6 py-4 font-medium">IndustrialWorks Co.</td>
                      <td className="px-6 py-4">4.7%</td>
                      <td className="px-6 py-4">65</td>
                      <td className="px-6 py-4">58</td>
                      <td className="px-6 py-4">66</td>
                      <td className="px-6 py-4">72</td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Average</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="ml-auto">
                View All Holdings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ESG Risk Alerts</CardTitle>
                <CardDescription>Recent sustainability and governance issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-3 rounded-lg border">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Supply Chain Risk</h4>
                      <p className="text-sm text-gray-600">Potential labor concerns identified in Global Tech's tier 2 suppliers. Issue requires monitoring.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">March 28, 2025</span>
                        <Button variant="link" size="sm" className="p-0 h-auto font-normal text-xs">View Details</Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-3 rounded-lg border">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Governance Improvement</h4>
                      <p className="text-sm text-gray-600">Heritage Banking has improved board diversity metrics and enhanced climate risk disclosures.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">March 12, 2025</span>
                        <Button variant="link" size="sm" className="p-0 h-auto font-normal text-xs">View Details</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impact Metrics</CardTitle>
                <CardDescription>Measurable sustainability outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-green-800">-12.4%</h4>
                    <p className="text-sm text-green-700">Carbon Intensity</p>
                    <p className="text-xs text-green-600 mt-1">vs. benchmark</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-blue-800">+5.2M</h4>
                    <p className="text-sm text-blue-700">Clean Water (gal)</p>
                    <p className="text-xs text-blue-600 mt-1">preserved annually</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-purple-800">42%</h4>
                    <p className="text-sm text-purple-700">Board Diversity</p>
                    <p className="text-xs text-purple-600 mt-1">avg. across portfolio</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-amber-800">18.5K</h4>
                    <p className="text-sm text-amber-700">Jobs Created</p>
                    <p className="text-xs text-amber-600 mt-1">in underserved areas</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="ml-auto">
                  View Impact Report
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Placeholder for other tabs */}
        <TabsContent value="environmental">
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">Environmental metrics dashboard coming soon</p>
          </div>
        </TabsContent>
        <TabsContent value="social">
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">Social responsibility metrics dashboard coming soon</p>
          </div>
        </TabsContent>
        <TabsContent value="governance">
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">Governance metrics dashboard coming soon</p>
          </div>
        </TabsContent>
        <TabsContent value="impact">
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">Impact analysis dashboard coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ESGDashboard;
