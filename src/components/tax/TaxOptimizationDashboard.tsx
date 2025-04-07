
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  Search, 
  PieChart, 
  ArrowUpRight, 
  FileText, 
  Clock, 
  BarChart3,
  ChevronRight,
  AlertTriangle,
  Check,
  Calendar,
  ArrowRight
} from "lucide-react";

const TaxOptimizationDashboard = () => {
  const [taxYear, setTaxYear] = useState("2024");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
        <div className="flex items-center gap-4">
          <div className="flex-1 sm:w-auto">
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={taxYear}
              onChange={(e) => setTaxYear(e.target.value)}
            >
              <option value="2024">Tax Year 2024</option>
              <option value="2023">Tax Year 2023</option>
              <option value="2022">Tax Year 2022</option>
            </select>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search tax items..." className="pl-10" />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="whitespace-nowrap">
            Download Report
          </Button>
          <Button className="whitespace-nowrap">
            Tax Advisor
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Check className="h-5 w-5 mr-2 text-green-500" /> 
              Tax Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                <span className="text-sm">Federal Filing</span>
                <span className="text-sm font-medium text-green-600">Complete</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                <span className="text-sm">State Filing</span>
                <span className="text-sm font-medium text-green-600">Complete</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                <span className="text-sm">Q1 Estimated Tax</span>
                <span className="text-sm font-medium text-yellow-600">Due Apr 15</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" /> 
              Tax Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-2 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm">
                <div className="font-medium">Capital Gains Harvesting Opportunity</div>
                <div className="text-xs mt-1">Potential savings: $12,500</div>
                <Button size="sm" className="mt-2 bg-amber-600 hover:bg-amber-700 text-white w-full">Review</Button>
              </div>
              <div className="p-2 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
                <div className="font-medium">Charitable Contribution Strategy</div>
                <div className="text-xs mt-1">Potential savings: $8,200</div>
                <Button size="sm" variant="outline" className="mt-2 border-green-600 text-green-600 hover:bg-green-50 w-full">Review</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-500" /> 
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-2 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-md">
                <div className="font-medium text-sm">Q1 Estimated Tax Payment</div>
                <div className="text-xs text-gray-600 mt-1">Due: April 15, 2025</div>
              </div>
              <div className="p-2 border-l-4 border-blue-400 bg-blue-50 rounded-r-md">
                <div className="font-medium text-sm">FBAR Filing</div>
                <div className="text-xs text-gray-600 mt-1">Due: April 15, 2025</div>
              </div>
              <div className="p-2 border-l-4 border-gray-400 bg-gray-50 rounded-r-md">
                <div className="font-medium text-sm">Q2 Estimated Tax Payment</div>
                <div className="text-xs text-gray-600 mt-1">Due: June 15, 2025</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="planning">Tax Planning</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="jurisdictions">Jurisdictions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-blue-600" /> Tax Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-10 rounded-md flex items-center justify-center mb-4">
                  <div className="text-center text-gray-400">Tax breakdown chart visualization</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm">Federal Income Tax</span>
                    </div>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm">State Income Tax</span>
                    </div>
                    <span className="text-sm font-medium">12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-amber-500 rounded-full mr-2"></div>
                      <span className="text-sm">Capital Gains Tax</span>
                    </div>
                    <span className="text-sm font-medium">23%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-purple-500 rounded-full mr-2"></div>
                      <span className="text-sm">International Tax</span>
                    </div>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-3 w-3 bg-gray-500 rounded-full mr-2"></div>
                      <span className="text-sm">Other Taxes</span>
                    </div>
                    <span className="text-sm font-medium">8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" /> Tax Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-10 rounded-md flex items-center justify-center mb-4">
                  <div className="text-center text-gray-400">Tax trends year-over-year chart</div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Key Insights</h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-start">
                        <div className="h-5 w-5 flex items-center justify-center mr-2">
                          <div className="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
                        </div>
                        <span>Total tax liability decreased 8% from previous year</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 flex items-center justify-center mr-2">
                          <div className="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
                        </div>
                        <span>Effective tax rate improved by 2.5 percentage points</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 flex items-center justify-center mr-2">
                          <div className="h-1.5 w-1.5 bg-blue-500 rounded-full"></div>
                        </div>
                        <span>International tax exposure reduced by 12%</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" /> Recent Tax Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <h4 className="font-medium">2024 Federal Tax Return</h4>
                      <p className="text-xs text-gray-500">Filed: April 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Download</Button>
                    <Button size="sm" variant="ghost">View</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <h4 className="font-medium">2024 California Tax Return</h4>
                      <p className="text-xs text-gray-500">Filed: April 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Download</Button>
                    <Button size="sm" variant="ghost">View</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <h4 className="font-medium">2024 Tax Planning Strategy</h4>
                      <p className="text-xs text-gray-500">Created: January 10, 2024</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Download</Button>
                    <Button size="sm" variant="ghost">View</Button>
                  </div>
                </div>
              </div>
              
              <Button className="mt-4" variant="outline">
                View All Documents
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="planning" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Tax Planning Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Investment Tax Strategy</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Optimize your investment portfolio to minimize tax impact and maximize after-tax returns.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white border rounded-md">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">Tax-Loss Harvesting</h4>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Recommended</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Potential savings: $8,500</p>
                      <Button size="sm" className="mt-2 w-full">Review Strategy</Button>
                    </div>
                    <div className="p-3 bg-white border rounded-md">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">Asset Location Optimization</h4>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Recommended</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Potential savings: $12,200</p>
                      <Button size="sm" className="mt-2 w-full">Review Strategy</Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Estate & Gift Tax Planning</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Strategies to efficiently transfer wealth while minimizing estate and gift tax liabilities.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white border rounded-md">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">Annual Gift Exclusion</h4>
                        <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">In Progress</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Potential savings: $16,000 per recipient</p>
                      <Button size="sm" className="mt-2 w-full">Continue Strategy</Button>
                    </div>
                    <div className="p-3 bg-white border rounded-md">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">Grantor Retained Annuity Trust</h4>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Explore</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Potential savings: Significant for appreciated assets</p>
                      <Button size="sm" variant="outline" className="mt-2 w-full">Learn More</Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Business Tax Strategies</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Tax optimization strategies for your business entities and operations.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white border rounded-md">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">Entity Structure Review</h4>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Recommended</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Potential savings: Varies based on structure</p>
                      <Button size="sm" className="mt-2 w-full">Review Strategy</Button>
                    </div>
                    <div className="p-3 bg-white border rounded-md">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">Retirement Plan Optimization</h4>
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Explore</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Potential savings: Up to $68,000 annually</p>
                      <Button size="sm" variant="outline" className="mt-2 w-full">Learn More</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Tax Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">2024 Tax Documents</h3>
                  <Button variant="outline" size="sm">Upload Document</Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">2024 Federal Tax Return</h4>
                        <p className="text-xs text-gray-500">Filed: April 15, 2024 • 12 pages</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">Download</Button>
                      <Button size="sm" variant="ghost">View</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">2024 California Tax Return</h4>
                        <p className="text-xs text-gray-500">Filed: April 15, 2024 • 8 pages</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">Download</Button>
                      <Button size="sm" variant="ghost">View</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">W-2 Forms (Consolidated)</h4>
                        <p className="text-xs text-gray-500">Received: January 31, 2024 • 3 pages</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">Download</Button>
                      <Button size="sm" variant="ghost">View</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">1099 Forms (Consolidated)</h4>
                        <p className="text-xs text-gray-500">Received: February 15, 2024 • 5 pages</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">Download</Button>
                      <Button size="sm" variant="ghost">View</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Tax Planning Documents</h3>
                  <Button variant="outline" size="sm">Upload Document</Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-green-500" />
                      <div>
                        <h4 className="font-medium">2024 Tax Planning Strategy</h4>
                        <p className="text-xs text-gray-500">Created: January 10, 2024 • 15 pages</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">Download</Button>
                      <Button size="sm" variant="ghost">View</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-green-500" />
                      <div>
                        <h4 className="font-medium">Estate Tax Planning Review</h4>
                        <p className="text-xs text-gray-500">Created: February 22, 2024 • 8 pages</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">Download</Button>
                      <Button size="sm" variant="ghost">View</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-green-500" />
                      <div>
                        <h4 className="font-medium">Charitable Giving Strategy</h4>
                        <p className="text-xs text-gray-500">Created: March 15, 2024 • 6 pages</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">Download</Button>
                      <Button size="sm" variant="ghost">View</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="jurisdictions" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Tax Jurisdictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Active Tax Jurisdictions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">United States (Federal)</h4>
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Compliant</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Filing Status:</span>
                          <span>Joint Return</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Last Filed:</span>
                          <span>April 15, 2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Next Deadline:</span>
                          <span>April 15, 2025</span>
                        </div>
                      </div>
                      <Button size="sm" className="mt-4 w-full" variant="outline">View Details</Button>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">California</h4>
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Compliant</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Filing Status:</span>
                          <span>Joint Return</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Last Filed:</span>
                          <span>April 15, 2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Next Deadline:</span>
                          <span>April 15, 2025</span>
                        </div>
                      </div>
                      <Button size="sm" className="mt-4 w-full" variant="outline">View Details</Button>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">New York</h4>
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Compliant</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Filing Status:</span>
                          <span>Non-Resident</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Last Filed:</span>
                          <span>April 15, 2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Next Deadline:</span>
                          <span>April 15, 2025</span>
                        </div>
                      </div>
                      <Button size="sm" className="mt-4 w-full" variant="outline">View Details</Button>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">United Kingdom</h4>
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Monitoring</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Filing Status:</span>
                          <span>Non-Resident</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Tax Treaty:</span>
                          <span>Yes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Next Review:</span>
                          <span>June 30, 2025</span>
                        </div>
                      </div>
                      <Button size="sm" className="mt-4 w-full" variant="outline">View Details</Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Jurisdiction Analysis</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Review potential tax implications of new or changing jurisdictions.
                  </p>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Potential New Jurisdictions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 border rounded-md">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Singapore</h4>
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              Analysis <ArrowRight className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Considering expansion of international operations to Singapore.
                          </p>
                        </div>
                        <div className="p-3 border rounded-md">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Nevada</h4>
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              Analysis <ArrowRight className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Considering relocation of primary residence to Nevada.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaxOptimizationDashboard;
