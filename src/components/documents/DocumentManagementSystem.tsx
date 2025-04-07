
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, Clock, Star, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DocumentManagementSystem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative w-full sm:w-1/2 lg:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="flex items-center gap-2">
          <Upload className="h-4 w-4" /> Upload Document
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DocumentCard
              title="Investment Policy Statement"
              date="Updated Apr 2, 2025"
              type="PDF"
              favorite={true}
            />
            <DocumentCard
              title="Tax Return 2024"
              date="Updated Mar 15, 2025"
              type="PDF"
              favorite={false}
            />
            <DocumentCard
              title="Estate Plan"
              date="Updated Feb 28, 2025"
              type="DOCX"
              favorite={true}
            />
            <DocumentCard
              title="Portfolio Review Q1 2025"
              date="Updated Apr 5, 2025"
              type="PPTX"
              favorite={false}
            />
            <DocumentCard
              title="Family Trust Agreement"
              date="Updated Jan 15, 2025"
              type="PDF"
              favorite={true}
            />
            <DocumentCard
              title="Retirement Planning"
              date="Updated Mar 30, 2025"
              type="XLSX"
              favorite={false}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DocumentCard
              title="Portfolio Review Q1 2025"
              date="Updated Apr 5, 2025"
              type="PPTX"
              favorite={false}
            />
            <DocumentCard
              title="Investment Policy Statement"
              date="Updated Apr 2, 2025"
              type="PDF"
              favorite={true}
            />
            <DocumentCard
              title="Retirement Planning"
              date="Updated Mar 30, 2025"
              type="XLSX"
              favorite={false}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DocumentCard
              title="Investment Policy Statement"
              date="Updated Apr 2, 2025"
              type="PDF"
              favorite={true}
            />
            <DocumentCard
              title="Estate Plan"
              date="Updated Feb 28, 2025"
              type="DOCX"
              favorite={true}
            />
            <DocumentCard
              title="Family Trust Agreement"
              date="Updated Jan 15, 2025"
              type="PDF"
              favorite={true}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="shared" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DocumentCard
              title="Tax Return 2024"
              date="Shared with: Tax Advisor"
              type="PDF"
              favorite={false}
              shared={true}
            />
            <DocumentCard
              title="Estate Plan"
              date="Shared with: Family Attorney"
              type="DOCX"
              favorite={true}
              shared={true}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const DocumentCard = ({ title, date, type, favorite, shared = false }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50 p-4 pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-blue-100">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          {favorite && <Star className="h-4 w-4 text-amber-400 fill-amber-400" />}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {shared ? null : <Clock className="h-3.5 w-3.5" />}
            <span>{date}</span>
          </div>
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-md">{type}</span>
        </div>
        <div className="flex mt-4 space-x-2">
          <Button variant="outline" size="sm" className="w-full">View</Button>
          <Button variant="outline" size="sm" className="w-full">Download</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentManagementSystem;
