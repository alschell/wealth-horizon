
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Shield, FileText, Settings, Bell, Plus } from "lucide-react";

const ClientPortalInterface = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="clients" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="documents">Shared Documents</TabsTrigger>
          <TabsTrigger value="settings">Portal Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="clients" className="mt-0">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Active Clients</h3>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Client
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ClientCard 
              name="Sarah Johnson" 
              email="sarah.johnson@example.com" 
              company="Johnson Family Office"
              lastActive="Today at 10:23 AM"
              status="active"
            />
            <ClientCard 
              name="Michael Chen" 
              email="m.chen@examplecorp.com" 
              company="Chen Enterprises"
              lastActive="Yesterday at 4:15 PM"
              status="active"
            />
            <ClientCard 
              name="Emma Williams" 
              email="emma.w@willamsgroup.com" 
              company="Williams Family Trust"
              lastActive="Apr 5, 2025"
              status="pending"
            />
            <ClientCard 
              name="Robert Garcia" 
              email="r.garcia@garciallc.com" 
              company="Garcia LLC"
              lastActive="Mar 28, 2025"
              status="active"
            />
            <ClientCard 
              name="Patricia Miller" 
              email="patricia@miller-foundation.org" 
              company="Miller Foundation"
              lastActive="Today at 9:05 AM"
              status="active"
            />
            <ClientCard 
              name="James Wilson" 
              email="j.wilson@wilsonholdings.com" 
              company="Wilson Holdings"
              lastActive="Apr 2, 2025"
              status="inactive"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="permissions" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-sky-600" /> Permission Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-medium mb-2">Document Access Levels</h3>
                  <p className="text-sm text-gray-600 mb-4">Configure which document types clients can access through the portal</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PermissionItem 
                      title="Financial Reports" 
                      description="Quarterly and annual reports" 
                      enabled={true} 
                    />
                    <PermissionItem 
                      title="Tax Documents" 
                      description="Tax statements and filings" 
                      enabled={true} 
                    />
                    <PermissionItem 
                      title="Investment Recommendations" 
                      description="Investment strategy documents" 
                      enabled={false} 
                    />
                    <PermissionItem 
                      title="Legal Documents" 
                      description="Contracts and agreements" 
                      enabled={false} 
                    />
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-medium mb-2">Feature Access</h3>
                  <p className="text-sm text-gray-600 mb-4">Control which features are available to clients</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PermissionItem 
                      title="Document Download" 
                      description="Ability to download shared documents" 
                      enabled={true} 
                    />
                    <PermissionItem 
                      title="Portfolio Analytics" 
                      description="Access to portfolio performance metrics" 
                      enabled={true} 
                    />
                    <PermissionItem 
                      title="Request Documents" 
                      description="Ability to request additional documents" 
                      enabled={true} 
                    />
                    <PermissionItem 
                      title="Document Upload" 
                      description="Ability to upload documents to the portal" 
                      enabled={false} 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-sky-600" /> Shared Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border-b">
                  <div>
                    <h3 className="font-medium">Q1 2025 Portfolio Performance</h3>
                    <p className="text-sm text-gray-500">Shared with: All Clients</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border-b">
                  <div>
                    <h3 className="font-medium">2024 Tax Summary</h3>
                    <p className="text-sm text-gray-500">Shared with: Johnson Family Office, Chen Enterprises</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border-b">
                  <div>
                    <h3 className="font-medium">Investment Strategy 2025</h3>
                    <p className="text-sm text-gray-500">Shared with: Williams Family Trust</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-4 border-b">
                  <div>
                    <h3 className="font-medium">Estate Planning Update</h3>
                    <p className="text-sm text-gray-500">Shared with: Miller Foundation</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit Permissions</Button>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              </div>
              
              <Button className="mt-6 w-full" variant="outline">
                <Plus className="h-4 w-4 mr-2" /> Share New Document
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-sky-600" /> Portal Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-medium mb-2">Appearance Settings</h3>
                  <p className="text-sm text-gray-600 mb-4">Customize how the client portal looks for your clients</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Custom Logo</h4>
                        <p className="text-xs text-gray-500">Upload your company logo</p>
                      </div>
                      <Button size="sm">Upload</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Brand Colors</h4>
                        <p className="text-xs text-gray-500">Set colors to match your brand</p>
                      </div>
                      <Button size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Welcome Message</h4>
                        <p className="text-xs text-gray-500">Customize greeting text for clients</p>
                      </div>
                      <Button size="sm">Edit</Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="text-lg font-medium mb-2">Notification Settings</h3>
                  <p className="text-sm text-gray-600 mb-4">Configure when and how notifications are sent to clients</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Document Sharing</h4>
                        <p className="text-xs text-gray-500">Notify when new documents are shared</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Bell className="h-4 w-4 mr-2" /> Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Performance Updates</h4>
                        <p className="text-xs text-gray-500">Notify of portfolio performance changes</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Bell className="h-4 w-4 mr-2" /> Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Meeting Reminders</h4>
                        <p className="text-xs text-gray-500">Send reminders for scheduled meetings</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Bell className="h-4 w-4 mr-2" /> Enabled
                      </Button>
                    </div>
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

const ClientCard = ({ name, email, company, lastActive, status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{name}</CardTitle>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        <CardContent className="p-0">
          <div className="text-sm text-gray-500">{email}</div>
          <div className="text-sm font-medium mt-1">{company}</div>
          <div className="flex items-center mt-4 text-xs text-gray-500">
            <span>Last active: {lastActive}</span>
          </div>
          <div className="flex gap-2 mt-4">
            <Button size="sm" variant="outline" className="w-full">View</Button>
            <Button size="sm" variant="outline" className="w-full">Manage</Button>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

const PermissionItem = ({ title, description, enabled }) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md">
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <Button 
        size="sm" 
        variant={enabled ? "default" : "outline"}
        className={enabled ? "" : "text-gray-500"}
      >
        {enabled ? "Enabled" : "Disabled"}
      </Button>
    </div>
  );
};

export default ClientPortalInterface;
