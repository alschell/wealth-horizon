
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageHeader } from "@/components/ui/design-system";
import PageTransition from "@/components/ui/page-transition";
import { 
  FileText, 
  FolderOpen, 
  Search, 
  Filter, 
  MoreVertical, 
  Download, 
  Trash, 
  Share, 
  Star, 
  Plus, 
  Clock, 
  User, 
  Shield 
} from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  lastModified: string;
  size: string;
  sharedWith: string[];
  starred: boolean;
}

const DocumentManagementSystem = () => {
  const { showSuccess, showError } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "doc1",
      name: "Investment Policy Statement.pdf",
      type: "PDF",
      category: "Policies",
      lastModified: "2024-04-05",
      size: "3.2 MB",
      sharedWith: ["John Smith", "Sarah Lee"],
      starred: true
    },
    {
      id: "doc2",
      name: "Q1 2024 Portfolio Review.xlsx",
      type: "Excel",
      category: "Reports",
      lastModified: "2024-04-01",
      size: "1.8 MB",
      sharedWith: ["Sarah Lee"],
      starred: false
    },
    {
      id: "doc3",
      name: "Estate Planning Documents.zip",
      type: "Archive",
      category: "Legal",
      lastModified: "2024-03-15",
      size: "15.4 MB",
      sharedWith: [],
      starred: true
    },
    {
      id: "doc4",
      name: "Tax Strategy 2024.docx",
      type: "Word",
      category: "Tax",
      lastModified: "2024-03-10",
      size: "2.1 MB",
      sharedWith: ["John Smith"],
      starred: false
    },
    {
      id: "doc5",
      name: "Trust Agreement.pdf",
      type: "PDF",
      category: "Legal",
      lastModified: "2024-02-18",
      size: "4.7 MB",
      sharedWith: ["John Smith", "Sarah Lee", "Michael Jones"],
      starred: true
    }
  ]);

  const categories = [
    { name: "All Documents", count: documents.length },
    { name: "Reports", count: documents.filter(d => d.category === "Reports").length },
    { name: "Legal", count: documents.filter(d => d.category === "Legal").length },
    { name: "Tax", count: documents.filter(d => d.category === "Tax").length },
    { name: "Policies", count: documents.filter(d => d.category === "Policies").length }
  ];

  const getIconForDocType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'excel':
        return <FileText className="h-8 w-8 text-green-500" />;
      case 'word':
        return <FileText className="h-8 w-8 text-blue-500" />;
      case 'archive':
        return <FileText className="h-8 w-8 text-amber-500" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const toggleStar = (docId: string) => {
    setDocuments(documents.map(doc => 
      doc.id === docId ? { ...doc, starred: !doc.starred } : doc
    ));
  };

  const handleUpload = () => {
    showSuccess("File upload started", "Your document will be available shortly");
  };

  const handleShare = (docName: string) => {
    showSuccess("Sharing options opened", `Prepare to share ${docName}`);
  };

  const handleDelete = (docId: string) => {
    showError("Document cannot be deleted", "You don't have permission to delete this document");
  };

  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHeader className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Document Management</h1>
          <p className="text-muted-foreground">
            Securely store, manage, and share important financial documents
          </p>
        </PageHeader>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 space-y-6">
            <Card>
              <CardContent className="p-4">
                <Button className="w-full mb-4" onClick={handleUpload}>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
                
                <div className="space-y-1">
                  <div className="font-medium text-sm mb-2">Categories</div>
                  {categories.map((category, i) => (
                    <Button
                      key={i}
                      variant="ghost"
                      className="w-full justify-between"
                      size="sm"
                    >
                      <span>{category.name}</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p><span className="font-medium">Q1 2024 Portfolio Review</span> was updated</p>
                      <p className="text-xs text-muted-foreground">Today, 10:24 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p><span className="font-medium">Sarah Lee</span> viewed Trust Agreement</p>
                      <p className="text-xs text-muted-foreground">Yesterday, 3:42 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p>Permission changes to <span className="font-medium">Estate Planning Documents</span></p>
                      <p className="text-xs text-muted-foreground">Apr 4, 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Document Library</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                      <Input
                        placeholder="Search documents..."
                        className="pl-8 w-[260px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="all">All Documents</TabsTrigger>
                    <TabsTrigger value="recent">Recently Modified</TabsTrigger>
                    <TabsTrigger value="starred">Starred</TabsTrigger>
                    <TabsTrigger value="shared">Shared with Me</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4">
                    {filteredDocuments.length > 0 ? (
                      <div className="space-y-2">
                        {filteredDocuments.map((doc) => (
                          <motion.div
                            key={doc.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-3">
                              {getIconForDocType(doc.type)}
                              <div>
                                <div className="font-medium text-sm">{doc.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {doc.category} • Last modified: {new Date(doc.lastModified).toLocaleDateString()} • {doc.size}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => toggleStar(doc.id)}
                              >
                                <Star className={`h-4 w-4 ${doc.starred ? "fill-amber-400 text-amber-400" : "text-gray-400"}`} />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleShare(doc.name)}>
                                    <Share className="h-4 w-4 mr-2" />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDelete(doc.id)}>
                                    <Trash className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-12 text-center">
                        <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No documents found</h3>
                        <p className="text-muted-foreground">Try adjusting your search or filters</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="recent">
                    <div className="space-y-2">
                      {documents
                        .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
                        .slice(0, 3)
                        .map((doc) => (
                          <motion.div
                            key={doc.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-3">
                              {getIconForDocType(doc.type)}
                              <div>
                                <div className="font-medium text-sm">{doc.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {doc.category} • Last modified: {new Date(doc.lastModified).toLocaleDateString()} • {doc.size}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => toggleStar(doc.id)}>
                                <Star className={`h-4 w-4 ${doc.starred ? "fill-amber-400 text-amber-400" : "text-gray-400"}`} />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleShare(doc.name)}>
                                    <Share className="h-4 w-4 mr-2" />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDelete(doc.id)}>
                                    <Trash className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="starred">
                    <div className="space-y-2">
                      {documents
                        .filter(doc => doc.starred)
                        .map((doc) => (
                          <motion.div
                            key={doc.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-3">
                              {getIconForDocType(doc.type)}
                              <div>
                                <div className="font-medium text-sm">{doc.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {doc.category} • Last modified: {new Date(doc.lastModified).toLocaleDateString()} • {doc.size}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => toggleStar(doc.id)}>
                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleShare(doc.name)}>
                                    <Share className="h-4 w-4 mr-2" />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDelete(doc.id)}>
                                    <Trash className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="shared">
                    <div className="space-y-2">
                      {documents
                        .filter(doc => doc.sharedWith.length > 0)
                        .map((doc) => (
                          <motion.div
                            key={doc.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-3">
                              {getIconForDocType(doc.type)}
                              <div>
                                <div className="font-medium text-sm">{doc.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {doc.category} • Shared with: {doc.sharedWith.join(", ")} • {doc.size}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => toggleStar(doc.id)}>
                                <Star className={`h-4 w-4 ${doc.starred ? "fill-amber-400 text-amber-400" : "text-gray-400"}`} />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleShare(doc.name)}>
                                    <Share className="h-4 w-4 mr-2" />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDelete(doc.id)}>
                                    <Trash className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default DocumentManagementSystem;
