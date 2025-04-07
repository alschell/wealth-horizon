
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Plus, 
  Search, 
  ChevronRight, 
  Users, 
  FileText, 
  ArrowUpRight,
  Clock,
  Shield,
  Map
} from "lucide-react";
import { Input } from "@/components/ui/input";

const EntityManagementDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:items-center">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search entities..." className="pl-10" />
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add New Entity
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all">All Entities</TabsTrigger>
          <TabsTrigger value="structure">Entity Structure</TabsTrigger>
          <TabsTrigger value="governance">Governance</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EntityCard 
              name="Smith Family Holdings LLC" 
              type="Holding Company"
              jurisdiction="Delaware, USA"
              complianceStatus="Compliant"
            />
            <EntityCard 
              name="Smith Investments LP" 
              type="Limited Partnership"
              jurisdiction="Nevada, USA"
              complianceStatus="Compliant"
            />
            <EntityCard 
              name="Smith Properties LLC" 
              type="Real Estate Holding"
              jurisdiction="California, USA"
              complianceStatus="Action Required"
              alert={true}
            />
            <EntityCard 
              name="Smith Family Trust" 
              type="Family Trust"
              jurisdiction="Wyoming, USA"
              complianceStatus="Compliant"
            />
            <EntityCard 
              name="Smith International Corp." 
              type="International Business"
              jurisdiction="Singapore"
              complianceStatus="Under Review"
            />
            <EntityCard 
              name="Smith Foundation" 
              type="Non-Profit"
              jurisdiction="New York, USA"
              complianceStatus="Compliant"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="structure" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5 text-purple-600" /> Entity Structure Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-4 rounded-md mb-4 text-center text-gray-500">
                Interactive entity structure map visualization would be shown here
              </div>
              
              <h3 className="text-lg font-medium mt-6 mb-4">Entity Relationships</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Smith Family Holdings LLC</h4>
                      <p className="text-sm text-gray-500">Parent Entity</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 pl-6 border-l-2 border-gray-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium">Smith Investments LP</h4>
                        <p className="text-xs text-gray-500">100% Ownership</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium">Smith Properties LLC</h4>
                        <p className="text-xs text-gray-500">85% Ownership</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium">Smith International Corp.</h4>
                        <p className="text-xs text-gray-500">75% Ownership</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Smith Family Trust</h4>
                      <p className="text-sm text-gray-500">Independent Entity</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 pl-6 border-l-2 border-gray-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium">Smith Family Holdings LLC</h4>
                        <p className="text-xs text-gray-500">15% Ownership</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-medium">Smith Foundation</h4>
                        <p className="text-xs text-gray-500">100% Control</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="governance" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" /> Governance & Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-medium mb-4">Board Members & Directors</h3>
              <div className="space-y-4 mb-6">
                <div className="p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Smith Family Holdings LLC</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">John Smith (Chair)</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">Sarah Johnson</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">Michael Chen</span>
                      </div>
                    </div>
                    <Button size="sm">Manage</Button>
                  </div>
                </div>
                <div className="p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Smith Investments LP</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">Sarah Johnson (Chair)</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">Robert Garcia</span>
                      </div>
                    </div>
                    <Button size="sm">Manage</Button>
                  </div>
                </div>
                <div className="p-4 border rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Smith Family Trust</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">John Smith (Trustee)</span>
                        <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">Emily Smith (Trustee)</span>
                      </div>
                    </div>
                    <Button size="sm">Manage</Button>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-4">Governance Documents</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <h4 className="font-medium">Operating Agreement - Smith Family Holdings</h4>
                      <p className="text-xs text-gray-500">Last updated: Mar 15, 2025</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <h4 className="font-medium">Partnership Agreement - Smith Investments LP</h4>
                      <p className="text-xs text-gray-500">Last updated: Feb 10, 2025</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <h4 className="font-medium">Trust Agreement - Smith Family Trust</h4>
                      <p className="text-xs text-gray-500">Last updated: Jan 22, 2025</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" /> Compliance Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                  <h3 className="font-medium text-yellow-800 flex items-center gap-2">
                    <Clock className="h-5 w-5" /> Upcoming Compliance Deadlines
                  </h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between items-center p-2 bg-white rounded border border-yellow-100">
                      <div>
                        <p className="font-medium text-sm">Smith Properties LLC - Annual Report</p>
                        <p className="text-xs text-gray-500">Due in 15 days (Apr 22, 2025)</p>
                      </div>
                      <Button size="sm">Take Action</Button>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-white rounded border border-yellow-100">
                      <div>
                        <p className="font-medium text-sm">Smith International Corp. - Tax Filing</p>
                        <p className="text-xs text-gray-500">Due in 30 days (May 7, 2025)</p>
                      </div>
                      <Button size="sm">Take Action</Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Entity Compliance Status</h3>
                  <div className="space-y-3">
                    <ComplianceStatusCard 
                      entity="Smith Family Holdings LLC" 
                      status="Compliant" 
                      lastUpdate="Apr 1, 2025"
                      items={[
                        { name: "Annual Filing", status: "Complete", date: "Mar 15, 2025" },
                        { name: "Tax Reporting", status: "Complete", date: "Mar 1, 2025" },
                        { name: "Ownership Disclosure", status: "Complete", date: "Feb 10, 2025" }
                      ]}
                    />
                    <ComplianceStatusCard 
                      entity="Smith Properties LLC" 
                      status="Action Required" 
                      lastUpdate="Mar 30, 2025"
                      alert={true}
                      items={[
                        { name: "Annual Filing", status: "Pending", date: "Due Apr 22, 2025", alert: true },
                        { name: "Tax Reporting", status: "Complete", date: "Mar 1, 2025" },
                        { name: "Property Assessment", status: "Complete", date: "Feb 28, 2025" }
                      ]}
                    />
                    <ComplianceStatusCard 
                      entity="Smith International Corp." 
                      status="Under Review" 
                      lastUpdate="Mar 25, 2025"
                      items={[
                        { name: "International Filing", status: "Under Review", date: "Submitted Mar 20, 2025" },
                        { name: "Tax Reporting", status: "Pending", date: "Due May 7, 2025" },
                        { name: "Regulatory Disclosure", status: "Complete", date: "Feb 15, 2025" }
                      ]}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const EntityCard = ({ name, type, jurisdiction, complianceStatus, alert = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Compliant': return 'bg-green-100 text-green-800';
      case 'Action Required': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card className={alert ? "border-red-300" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Building2 className="h-5 w-5 mr-2 text-purple-600" />
            <CardTitle className="text-base">{name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Type:</span>
            <span className="font-medium">{type}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Jurisdiction:</span>
            <span className="font-medium">{jurisdiction}</span>
          </div>
          <div className="flex justify-between text-sm items-center">
            <span className="text-gray-500">Status:</span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(complianceStatus)}`}>
              {complianceStatus}
            </span>
          </div>
          
          <div className="flex gap-2 mt-4 pt-2 border-t">
            <Button size="sm" className="w-full">View Details</Button>
            <Button size="sm" variant="outline" className="w-auto">
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ComplianceStatusCard = ({ entity, status, lastUpdate, items, alert = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Compliant': return 'bg-green-100 text-green-800';
      case 'Action Required': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getItemStatusColor = (status) => {
    switch (status) {
      case 'Complete': return 'text-green-600';
      case 'Pending': return 'text-yellow-600';
      case 'Under Review': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };
  
  return (
    <div className={`p-4 border rounded-md ${alert ? "border-red-300" : ""}`}>
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium">{entity}</h4>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-3">Last updated: {lastUpdate}</p>
      
      <div className="space-y-2 mt-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <div className="text-sm">
              <span className="font-medium">{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${getItemStatusColor(item.status)}`}>{item.status}</span>
              <span className="text-xs text-gray-500">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
      
      <Button size="sm" className="w-full mt-3">View All Requirements</Button>
    </div>
  );
};

export default EntityManagementDashboard;
