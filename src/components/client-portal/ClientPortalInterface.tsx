import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/design-system";
import PageTransition from "@/components/ui/page-transition";
import { 
  Users, 
  UserPlus, 
  Mail, 
  Eye, 
  EyeOff, 
  Settings, 
  FileText, 
  ShieldCheck,
  BarChart3,
  FileCheck,
} from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

interface Client {
  id: string;
  name: string;
  email: string;
  accessLevel: "Full" | "Reports Only" | "Limited";
  status: "Active" | "Pending" | "Revoked";
  lastLogin: string;
  reportAccess: string[];
}

const ClientPortalInterface = () => {
  const { showSuccess } = useNotifications();
  const [clients, setClients] = useState<Client[]>([
    {
      id: "c1",
      name: "John Smith",
      email: "john.smith@example.com",
      accessLevel: "Full",
      status: "Active",
      lastLogin: "2024-04-02 14:30",
      reportAccess: ["Performance Reports", "Tax Documents", "Portfolio Valuations"]
    },
    {
      id: "c2",
      name: "Emma Johnson",
      email: "emma.johnson@example.com",
      accessLevel: "Reports Only",
      status: "Active",
      lastLogin: "2024-04-01 09:15",
      reportAccess: ["Performance Reports", "Portfolio Valuations"]
    },
    {
      id: "c3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      accessLevel: "Limited",
      status: "Pending",
      lastLogin: "Never",
      reportAccess: ["Portfolio Valuations"]
    },
    {
      id: "c4",
      name: "Sophia Williams",
      email: "sophia.williams@example.com",
      accessLevel: "Full",
      status: "Active",
      lastLogin: "2024-03-28 16:45",
      reportAccess: ["Performance Reports", "Tax Documents", "Portfolio Valuations", "Investment Proposals"]
    },
    {
      id: "c5",
      name: "Robert Davis",
      email: "robert.davis@example.com",
      accessLevel: "Reports Only",
      status: "Revoked",
      lastLogin: "2024-02-15 11:20",
      reportAccess: []
    }
  ]);

  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    accessLevel: "Limited" as const
  });

  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const toggleVisibility = (clientId: string) => {
    setIsVisible(prev => ({
      ...prev,
      [clientId]: !prev[clientId]
    }));
  };

  const handleInviteClient = () => {
    if (!newClient.name || !newClient.email) {
      return;
    }

    const newClientData: Client = {
      id: `c${clients.length + 1}`,
      name: newClient.name,
      email: newClient.email,
      accessLevel: newClient.accessLevel,
      status: "Pending",
      lastLogin: "Never",
      reportAccess: newClient.accessLevel === "Full" 
        ? ["Performance Reports", "Tax Documents", "Portfolio Valuations"] 
        : newClient.accessLevel === "Reports Only"
          ? ["Performance Reports", "Portfolio Valuations"]
          : ["Portfolio Valuations"]
    };

    setClients([...clients, newClientData]);
    setNewClient({
      name: "",
      email: "",
      accessLevel: "Limited"
    });
    setIsInviteDialogOpen(false);
    
    showSuccess("Invitation sent", `Portal access invitation sent to ${newClient.email}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>;
      case "Pending":
        return <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">Pending</span>;
      case "Revoked":
        return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Revoked</span>;
      default:
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">{status}</span>;
    }
  };

  const getAccessLevelBadge = (level: string) => {
    switch (level) {
      case "Full":
        return <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Full</span>;
      case "Reports Only":
        return <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">Reports Only</span>;
      case "Limited":
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">Limited</span>;
      default:
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">{level}</span>;
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Client Portal</h1>
          <p className="text-muted-foreground">
            Manage client access to reports and financial information
          </p>
        </PageHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Client Access Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-500" />
                    <span>Total Clients</span>
                  </div>
                  <span className="font-bold">{clients.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    <span>Active Access</span>
                  </div>
                  <span className="font-bold">{clients.filter(c => c.status === "Active").length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-amber-500" />
                    <span>Pending Invitations</span>
                  </div>
                  <span className="font-bold">{clients.filter(c => c.status === "Pending").length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <EyeOff className="h-5 w-5 text-red-500" />
                    <span>Revoked Access</span>
                  </div>
                  <span className="font-bold">{clients.filter(c => c.status === "Revoked").length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {clients
                  .filter(client => client.lastLogin !== "Never")
                  .sort((a, b) => new Date(b.lastLogin).getTime() - new Date(a.lastLogin).getTime())
                  .slice(0, 3)
                  .map((client, i) => (
                    <div key={i} className="border-b pb-2 last:border-0 last:pb-0">
                      <div className="font-medium text-sm">{client.name}</div>
                      <div className="text-xs text-muted-foreground flex justify-between">
                        <span>Last login: {client.lastLogin}</span>
                        <span>{client.accessLevel}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Portfolio Valuations", views: 32 },
                  { name: "Performance Reports", views: 28 },
                  { name: "Tax Documents", views: 15 },
                  { name: "Investment Proposals", views: 7 }
                ].map((report, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{report.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Eye className="h-3 w-3 text-muted-foreground" />
                      <span>{report.views} views</span>
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
              <CardTitle>Client Access Management</CardTitle>
              <CardDescription>Manage client portal access and permissions</CardDescription>
            </div>
            <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Client
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Client to Portal</DialogTitle>
                  <DialogDescription>
                    Send an invitation for client portal access
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Client Name</label>
                    <Input 
                      id="name" 
                      placeholder="Full name" 
                      value={newClient.name}
                      onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                    <Input 
                      id="email" 
                      placeholder="client@example.com" 
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="access" className="text-sm font-medium">Access Level</label>
                    <select 
                      id="access"
                      className="w-full p-2 border rounded-md bg-background"
                      value={newClient.accessLevel}
                      onChange={(e) => setNewClient({...newClient, accessLevel: e.target.value as any})}
                    >
                      <option value="Full">Full Access</option>
                      <option value="Reports Only">Reports Only</option>
                      <option value="Limited">Limited Access</option>
                    </select>
                    <p className="text-xs text-muted-foreground">
                      {newClient.accessLevel === "Full" && "Client can access all reports and documents"}
                      {newClient.accessLevel === "Reports Only" && "Client can access performance reports and valuations only"}
                      {newClient.accessLevel === "Limited" && "Client can access portfolio valuations only"}
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleInviteClient}>Send Invitation</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active" className="space-y-4">
              <TabsList>
                <TabsTrigger value="active">Active Clients</TabsTrigger>
                <TabsTrigger value="pending">Pending Invitations</TabsTrigger>
                <TabsTrigger value="revoked">Revoked Access</TabsTrigger>
                <TabsTrigger value="all">All Clients</TabsTrigger>
              </TabsList>

              {["active", "pending", "revoked", "all"].map((tabValue) => (
                <TabsContent key={tabValue} value={tabValue} className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-left text-sm font-medium">Client</th>
                          <th className="py-3 px-4 text-left text-sm font-medium">Email</th>
                          <th className="py-3 px-4 text-left text-sm font-medium">Access Level</th>
                          <th className="py-3 px-4 text-left text-sm font-medium">Status</th>
                          <th className="py-3 px-4 text-left text-sm font-medium">Last Login</th>
                          <th className="py-3 px-4 text-right text-sm font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clients
                          .filter(client => 
                            tabValue === "all" ? true : 
                            tabValue === "active" ? client.status === "Active" :
                            tabValue === "pending" ? client.status === "Pending" : 
                            client.status === "Revoked"
                          )
                          .map((client) => (
                            <tr key={client.id} className="border-b">
                              <td className="py-3 px-4 text-sm">{client.name}</td>
                              <td className="py-3 px-4 text-sm text-muted-foreground">{client.email}</td>
                              <td className="py-3 px-4 text-sm">{getAccessLevelBadge(client.accessLevel)}</td>
                              <td className="py-3 px-4 text-sm">{getStatusBadge(client.status)}</td>
                              <td className="py-3 px-4 text-sm text-muted-foreground">{client.lastLogin}</td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex justify-end items-center space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => toggleVisibility(client.id)}
                                  >
                                    {isVisible[client.id] ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Settings className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Mail className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Client Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { client: "John Smith", action: "Downloaded Q1 Performance Report", time: "Today, 11:42 AM", icon: <FileText className="h-4 w-4" />, color: "bg-blue-100 text-blue-600" },
                  { client: "Sophia Williams", action: "Viewed Portfolio Valuation", time: "Today, 09:15 AM", icon: <BarChart3 className="h-4 w-4" />, color: "bg-purple-100 text-purple-600" },
                  { client: "Emma Johnson", action: "Downloaded Tax Documents", time: "Yesterday, 4:30 PM", icon: <FileCheck className="h-4 w-4" />, color: "bg-green-100 text-green-600" },
                  { client: "John Smith", action: "Logged in to portal", time: "Yesterday, 2:30 PM", icon: <ShieldCheck className="h-4 w-4" />, color: "bg-gray-100 text-gray-600" }
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${activity.color.split(" ")[0]}`}>
                      <span className={activity.color.split(" ")[1]}>
                        {activity.icon}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{activity.client}</div>
                      <div className="text-sm">{activity.action}</div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Client Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Portfolio Valuation", description: "Current portfolio holdings and value", access: "All clients", updated: "Daily" },
                  { name: "Performance Report", description: "Investment performance analysis", access: "Full & Reports Only", updated: "Monthly" },
                  { name: "Tax Documents", description: "Tax statements and forms", access: "Full access only", updated: "Annually" },
                  { name: "Investment Proposals", description: "New investment opportunities", access: "Full access only", updated: "As needed" }
                ].map((report, i) => (
                  <div key={i} className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <div className="font-medium">{report.name}</div>
                      <div className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {report.updated}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {report.description}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Access level: {report.access}
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

export default ClientPortalInterface;
