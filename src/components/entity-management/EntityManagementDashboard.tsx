
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Layers, 
  MoreVertical, 
  Plus, 
  Building2, 
  Users, 
  FileText, 
  Link, 
  Shield, 
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

interface Entity {
  id: string;
  name: string;
  type: string;
  jurisdiction: string;
  status: "Active" | "Pending" | "Inactive";
  compliance: number;
  assets: string;
  relations: {
    parent?: string;
    children: string[];
    associates: string[];
  };
  documents: number;
  lastUpdated: string;
}

const EntityManagementDashboard = () => {
  const { showSuccess } = useNotifications();
  const [entities, setEntities] = useState<Entity[]>([
    {
      id: "e1",
      name: "Global Family Holdings Ltd.",
      type: "Holding Company",
      jurisdiction: "Cayman Islands",
      status: "Active",
      compliance: 92,
      assets: "$245M",
      relations: {
        children: ["e2", "e3", "e4"],
        associates: []
      },
      documents: 24,
      lastUpdated: "2024-03-28"
    },
    {
      id: "e2",
      name: "European Investments SA",
      type: "Investment Vehicle",
      jurisdiction: "Luxembourg",
      status: "Active",
      compliance: 87,
      assets: "$108M",
      relations: {
        parent: "e1",
        children: ["e5"],
        associates: ["e6"]
      },
      documents: 18,
      lastUpdated: "2024-03-15"
    },
    {
      id: "e3",
      name: "US Asset Management LLC",
      type: "Asset Management",
      jurisdiction: "Delaware, USA",
      status: "Active",
      compliance: 95,
      assets: "$86M",
      relations: {
        parent: "e1",
        children: [],
        associates: []
      },
      documents: 15,
      lastUpdated: "2024-04-01"
    },
    {
      id: "e4",
      name: "APAC Holdings Pte Ltd",
      type: "Holding Company",
      jurisdiction: "Singapore",
      status: "Active",
      compliance: 89,
      assets: "$52M",
      relations: {
        parent: "e1",
        children: [],
        associates: ["e7"]
      },
      documents: 12,
      lastUpdated: "2024-02-18"
    },
    {
      id: "e5",
      name: "Swiss Real Estate GmbH",
      type: "Real Estate",
      jurisdiction: "Switzerland",
      status: "Active",
      compliance: 93,
      assets: "$34M",
      relations: {
        parent: "e2",
        children: [],
        associates: []
      },
      documents: 9,
      lastUpdated: "2024-03-22"
    },
    {
      id: "e6",
      name: "Innovation Ventures Ltd",
      type: "Venture Capital",
      jurisdiction: "United Kingdom",
      status: "Pending",
      compliance: 78,
      assets: "$18M",
      relations: {
        associates: ["e2"]
      },
      documents: 7,
      lastUpdated: "2024-01-15"
    },
    {
      id: "e7",
      name: "East Asia Opportunities Fund",
      type: "Investment Fund",
      jurisdiction: "Hong Kong",
      status: "Active",
      compliance: 91,
      assets: "$42M",
      relations: {
        associates: ["e4"]
      },
      documents: 11,
      lastUpdated: "2024-02-05"
    }
  ]);

  const handleAddEntity = () => {
    showSuccess("Entity creation initiated", "Please complete the entity setup form");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>;
      case "Inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getEntityTypeIcon = (type: string) => {
    switch (type) {
      case "Holding Company":
        return <Building2 className="h-5 w-5" />;
      case "Investment Vehicle":
      case "Investment Fund":
        return <TrendingUp className="h-5 w-5" />;
      case "Asset Management":
        return <Layers className="h-5 w-5" />;
      case "Real Estate":
        return <Building2 className="h-5 w-5" />;
      case "Venture Capital":
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <Building2 className="h-5 w-5" />;
    }
  };

  const getComplianceStatus = (score: number) => {
    if (score >= 90) return "High";
    if (score >= 80) return "Moderate";
    return "Attention Required";
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-amber-600";
    return "text-red-600";
  };

  const getComplianceIcon = (score: number) => {
    if (score >= 90) return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    if (score >= 80) return <CheckCircle2 className="h-5 w-5 text-amber-500" />;
    return <AlertCircle className="h-5 w-5 text-red-500" />;
  };

  const getEntityChildren = (entityId: string) => {
    return entities.filter(e => e.relations.parent === entityId);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Multi-Entity Management</h1>
          <p className="text-muted-foreground">
            Manage and monitor your complex legal entity structure
          </p>
        </PageHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Entity Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-gray-500" />
                    <span>Total Entities</span>
                  </div>
                  <span className="font-bold">{entities.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Active Entities</span>
                  </div>
                  <span className="font-bold">{entities.filter(e => e.status === "Active").length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                    <span>Compliance Issues</span>
                  </div>
                  <span className="font-bold">{entities.filter(e => e.compliance < 80).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-500" />
                    <span>Jurisdictions</span>
                  </div>
                  <span className="font-bold">{new Set(entities.map(e => e.jurisdiction)).size}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall Compliance</span>
                  <span className="text-sm font-medium">
                    {Math.round(entities.reduce((acc, curr) => acc + curr.compliance, 0) / entities.length)}%
                  </span>
                </div>
                <Progress 
                  value={Math.round(entities.reduce((acc, curr) => acc + curr.compliance, 0) / entities.length)} 
                  max={100} 
                  className="h-2"
                />
                <div className="pt-4 space-y-2">
                  {[
                    { name: "KYC/AML Compliance", value: 94 },
                    { name: "Regulatory Filings", value: 88 },
                    { name: "Document Completeness", value: 92 }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${item.value >= 90 ? "text-green-600" : "text-amber-600"}`}>
                          {item.value}%
                        </span>
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full">
                          <div 
                            className={`h-1.5 rounded-full ${item.value >= 90 ? "bg-green-500" : "bg-amber-500"}`} 
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { entity: "US Asset Management LLC", event: "Compliance review completed", date: "Apr 1, 2024" },
                  { entity: "Global Family Holdings Ltd.", event: "Ownership structure updated", date: "Mar 28, 2024" },
                  { entity: "Swiss Real Estate GmbH", event: "New document added", date: "Mar 22, 2024" },
                  { entity: "European Investments SA", event: "Tax filing submitted", date: "Mar 15, 2024" }
                ].map((update, i) => (
                  <div key={i} className="border-b pb-2 last:border-0 last:pb-0">
                    <div className="font-medium text-sm">{update.entity}</div>
                    <div className="text-xs text-muted-foreground flex justify-between">
                      <span>{update.event}</span>
                      <span>{update.date}</span>
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
              <CardTitle>Entity Structure</CardTitle>
              <CardDescription>Manage your legal entities and their relationships</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={handleAddEntity}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Entity
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Entity</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-center text-muted-foreground">
                    Entity creation form would go here
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="list" className="space-y-4">
              <TabsList>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="hierarchy">Hierarchy View</TabsTrigger>
                <TabsTrigger value="compliance">Compliance View</TabsTrigger>
              </TabsList>

              <TabsContent value="list" className="space-y-4">
                <div className="space-y-3">
                  {entities.map((entity) => (
                    <motion.div
                      key={entity.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-between p-4 border rounded-md"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-100 rounded-full">
                          {getEntityTypeIcon(entity.type)}
                        </div>
                        <div>
                          <div className="font-medium">{entity.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {entity.type} • {entity.jurisdiction}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium">{entity.assets}</div>
                          <div>{getStatusBadge(entity.status)}</div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="h-4 w-4 mr-2" />
                              Compliance Review
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link className="h-4 w-4 mr-2" />
                              Manage Relationships
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="hierarchy">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-8">
                      {entities
                        .filter(entity => !entity.relations.parent)
                        .map(entity => (
                          <div key={entity.id} className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                              <div className="p-2 bg-gray-100 rounded-full">
                                {getEntityTypeIcon(entity.type)}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{entity.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {entity.type} • {entity.jurisdiction} • {entity.assets}
                                </div>
                              </div>
                              <div>
                                {getStatusBadge(entity.status)}
                              </div>
                            </div>
                            
                            {getEntityChildren(entity.id).length > 0 && (
                              <div className="pl-8 space-y-3 border-l-2 border-gray-200">
                                {getEntityChildren(entity.id).map(childEntity => (
                                  <div key={childEntity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
                                    <div className="p-2 bg-gray-100 rounded-full">
                                      {getEntityTypeIcon(childEntity.type)}
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-medium">{childEntity.name}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {childEntity.type} • {childEntity.jurisdiction} • {childEntity.assets}
                                      </div>
                                    </div>
                                    <div>
                                      {getStatusBadge(childEntity.status)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="compliance">
                <div className="space-y-3">
                  {entities
                    .sort((a, b) => a.compliance - b.compliance)
                    .map((entity) => (
                      <motion.div
                        key={entity.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-between p-4 border rounded-md"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-gray-100 rounded-full">
                            {getComplianceIcon(entity.compliance)}
                          </div>
                          <div>
                            <div className="font-medium">{entity.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {entity.type} • {entity.jurisdiction}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className={`font-medium ${getComplianceColor(entity.compliance)}`}>
                              {entity.compliance}% - {getComplianceStatus(entity.compliance)}
                            </div>
                            <div className="flex items-center mt-1">
                              <Progress 
                                value={entity.compliance} 
                                max={100} 
                                className="h-1.5 w-24"
                                indicatorClassName={
                                  entity.compliance >= 90 ? "bg-green-500" : 
                                  entity.compliance >= 80 ? "bg-amber-500" : 
                                  "bg-red-500"
                                }
                              />
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Shield className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <div></div>
          <Button variant="outline" className="flex items-center gap-2">
            Entity Structure Report
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </PageTransition>
  );
};

export default EntityManagementDashboard;
