
import React from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Settings, Link2Off } from "lucide-react";
import { useToast } from "@/components/ui/toaster";
import NoIntegrations from "./NoIntegrations";
import { connectedIntegrations } from "./integrationData";

const ActiveIntegrations = () => {
  const { toast } = useToast();
  const [activeIntegrations, setActiveIntegrations] = React.useState(connectedIntegrations);

  const handleDisconnect = (id: string) => {
    const integration = activeIntegrations.find((i) => i.id === id);
    if (integration) {
      toast({
        title: "Integration Disconnected",
        description: `${integration.name} has been disconnected successfully.`,
      });
      
      // Remove from active integrations
      setActiveIntegrations(activeIntegrations.filter((i) => i.id !== id));
    }
  };

  if (activeIntegrations.length === 0) {
    return <NoIntegrations />;
  }

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Integration</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Synced</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activeIntegrations.map((integration) => (
            <TableRow key={integration.id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center">
                    {integration.icon}
                  </div>
                  <span>{integration.name}</span>
                </div>
              </TableCell>
              <TableCell>{integration.category.charAt(0).toUpperCase() + integration.category.slice(1)}</TableCell>
              <TableCell>
                <div className={`inline-flex px-2 py-1 text-xs rounded-full ${
                  integration.connectionStatus === "active" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-amber-100 text-amber-800"
                }`}>
                  {integration.connectionStatus.charAt(0).toUpperCase() + integration.connectionStatus.slice(1)}
                </div>
              </TableCell>
              <TableCell>{integration.lastSynced}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDisconnect(integration.id)}
                  >
                    <Link2Off className="h-4 w-4 mr-1" />
                    Disconnect
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ActiveIntegrations;
